import "server-only";
import type { Payload } from "payload";
import { getPayloadClient } from "@/lib/payload/client";
import { readSession } from "@/lib/fans/session";
import { createHash } from "node:crypto";
import { fingerprintFrom } from "./moderation";
import type { AuthorType, FanView, MuralFeed, MuralMessage, MuralViewer } from "./types";

export interface ChatConfig {
  enabled: boolean;
  slowModeSeconds: number;
  retentionDays: number;
  blockedWords: string[];
  pinned: { text: string; href?: string } | null;
}

const DEFAULT_CONFIG: ChatConfig = {
  enabled: true,
  slowModeSeconds: 3,
  retentionDays: 14,
  blockedWords: [],
  pinned: null,
};

let configCache: { at: number; value: ChatConfig } | null = null;

export async function getChatConfig(payload: Payload): Promise<ChatConfig> {
  if (configCache && Date.now() - configCache.at < 15_000) return configCache.value;
  let value = DEFAULT_CONFIG;
  try {
    const doc = (await payload.findGlobal({ slug: "mural-config", depth: 0, overrideAccess: true })) as unknown as Record<
      string,
      unknown
    >;
    const pinned = (doc.pinned ?? {}) as { text?: string | null; href?: string | null };
    value = {
      enabled: doc.enabled !== false,
      slowModeSeconds: Number(doc.slowModeSeconds ?? 3),
      retentionDays: Number(doc.retentionDays ?? 14),
      blockedWords: String(doc.blockedWords ?? "")
        .split("\n")
        .map((w) => w.trim())
        .filter(Boolean),
      pinned: pinned.text ? { text: pinned.text, href: pinned.href || undefined } : null,
    };
  } catch {
    // Sem a tabela de configuração o chat roda com o padrão.
  }
  configCache = { at: Date.now(), value };
  return value;
}

export interface Viewer extends MuralViewer {
  fingerprint: string;
  banned: boolean;
  userEmail: string | null;
  fan: (FanView & { id: number; lastMessageAt: string | null }) | null;
}

function fanFingerprint(id: number): string {
  return createHash("sha256").update(`fan:${id}|${process.env.PAYLOAD_SECRET ?? "mural"}`).digest("hex").slice(0, 24);
}

async function loadFan(payload: Payload, headers: Headers): Promise<Viewer["fan"]> {
  const session = readSession(headers);
  if (!session) return null;
  const doc = await payload
    .findByID({ collection: "fans", id: session.id, depth: 0, overrideAccess: true, disableErrors: true })
    .catch(() => null);
  if (!doc || Number(doc.sessionVersion ?? 1) !== session.v) return null;
  const f = doc as unknown as Record<string, string | null | undefined>;
  const fullName = [f.firstName, f.lastName].filter(Boolean).join(" ");
  return {
    id: session.id,
    nickname: f.nickname ?? null,
    needsProfile: !(f.nickname && f.firstName && f.lastName && f.birthDate && f.city && f.state && f.acceptedTermsAt),
    fullName,
    city: f.city ?? "",
    state: f.state ?? "",
    phone: f.phone ?? "",
    lastMessageAt: f.lastMessageAt ?? null,
  };
}

export async function getViewer(payload: Payload, headers: Headers, opts: { checkBan?: boolean } = {}): Promise<Viewer> {
  let fingerprint = fingerprintFrom(headers);
  let fan: Viewer["fan"] = null;
  let name: string | null = null;
  let badge: AuthorType = "fan";
  let isMod = false;
  let userEmail: string | null = null;
  try {
    const { user } = await payload.auth({ headers });
    if (user) {
      const u = user as unknown as Record<string, unknown>;
      name = String(u.chatName || u.name || "30praum").slice(0, 40);
      badge = u.chatBadge === "artist" ? "artist" : "staff";
      isMod = true;
      userEmail = typeof u.email === "string" ? u.email : null;
    }
  } catch {}

  if (!isMod) {
    fan = await loadFan(payload, headers);
    if (fan) {
      // Com conta, limite, denúncia e banimento valem para a pessoa e não para o IP.
      fingerprint = fanFingerprint(fan.id);
      name = fan.nickname;
    }
  }

  let banned = false;
  if (!isMod && opts.checkBan) {
    const bans = await payload.count({
      collection: "mural-bans",
      where: { fingerprint: { equals: fingerprint }, until: { greater_than: new Date().toISOString() } },
      overrideAccess: true,
    });
    banned = bans.totalDocs > 0;
  }
  return { fingerprint, banned, name, badge, isMod, userEmail, fan };
}

type Doc = Record<string, unknown> & { id: number | string };

export function toMessage(doc: Doc, viewer?: Viewer): MuralMessage {
  const msg: MuralMessage = {
    id: Number(doc.id),
    nickname: String(doc.nickname ?? ""),
    body: String(doc.body ?? ""),
    createdAt: String(doc.createdAt ?? ""),
    authorType: (doc.authorType as AuthorType) || "fan",
  };
  if (viewer && doc.fingerprint === viewer.fingerprint) msg.mine = true;
  if (viewer?.isMod) msg.reports = Number(doc.reports ?? 0);
  return msg;
}

// Leitura única do feed. Sem viewer é a versão pública, que vai para o CDN.
const REMOVED_WINDOW_MS = 10 * 60_000;
const REACTION_WINDOW_MS = 45_000;

export async function readFeed(payload: Payload, room: string, viewer?: Viewer): Promise<Omit<MuralFeed, "viewer">> {
  const now = Date.now();
  const [config, messages, removed, reactions] = await Promise.all([
    getChatConfig(payload),
    payload.find({
      collection: "mural-messages",
      where: {
        and: [
          { room: { equals: room } },
          { status: { equals: "visible" } },
          { or: [{ shadow: { equals: false } }, { shadow: { exists: false } }] },
        ],
      },
      sort: "-createdAt",
      limit: 60,
      depth: 0,
      pagination: false,
      overrideAccess: true,
    }),
    payload.find({
      collection: "mural-messages",
      where: {
        room: { equals: room },
        status: { equals: "hidden" },
        updatedAt: { greater_than: new Date(now - REMOVED_WINDOW_MS).toISOString() },
      },
      limit: 200,
      depth: 0,
      pagination: false,
      overrideAccess: true,
      select: { status: true },
    }),
    payload.find({
      collection: "mural-reactions",
      where: {
        room: { equals: room },
        createdAt: { greater_than: new Date(now - REACTION_WINDOW_MS).toISOString() },
      },
      sort: "-createdAt",
      limit: 100,
      depth: 0,
      pagination: false,
      overrideAccess: true,
      select: { emoji: true },
    }),
  ]);
  return {
    messages: messages.docs.map((d) => toMessage(d as unknown as Doc, viewer)).reverse(),
    removed: removed.docs.map((d) => Number(d.id)),
    reactions: reactions.docs.map((r) => ({ id: Number(r.id), emoji: String(r.emoji ?? "") })).filter((r) => r.emoji),
    serverTime: new Date(now).toISOString(),
    enabled: config.enabled,
    slowModeSeconds: config.slowModeSeconds,
    pinned: room === "geral" ? config.pinned : null,
  };
}

// Limpeza preguiçosa: roda de vez em quando junto com um envio, sem cron.
let lastCleanup = 0;
export async function maybeCleanup(payload: Payload, config: ChatConfig) {
  if (Date.now() - lastCleanup < 10 * 60_000) return;
  lastCleanup = Date.now();
  const now = Date.now();
  const iso = (ms: number) => new Date(now - ms).toISOString();
  await Promise.allSettled([
    payload.delete({
      collection: "mural-messages",
      where: { createdAt: { less_than: iso(config.retentionDays * 86_400_000) } },
      overrideAccess: true,
    }),
    payload.delete({
      collection: "mural-presence",
      where: { seenAt: { less_than: iso(10 * 60_000) } },
      overrideAccess: true,
    }),
    payload.delete({
      collection: "mural-reactions",
      where: { createdAt: { less_than: iso(10 * 60_000) } },
      overrideAccess: true,
    }),
    payload.delete({
      collection: "mural-bans",
      where: { until: { less_than: new Date(now).toISOString() } },
      overrideAccess: true,
    }),
  ]);
}

export { getPayloadClient };
