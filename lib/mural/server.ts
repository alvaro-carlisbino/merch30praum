import "server-only";
import type { Payload } from "payload";
import { getPayloadClient } from "@/lib/payload/client";
import { fingerprintFrom } from "./moderation";
import type { AuthorType, MuralMessage, MuralViewer } from "./types";

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
    const doc = (await payload.findGlobal({ slug: "mural-config", depth: 0, overrideAccess: true })) as Record<
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
}

export async function getViewer(payload: Payload, headers: Headers, opts: { checkBan?: boolean } = {}): Promise<Viewer> {
  const fingerprint = fingerprintFrom(headers);
  let name: string | null = null;
  let badge: AuthorType = "fan";
  let isMod = false;
  let userEmail: string | null = null;
  try {
    const { user } = await payload.auth({ headers });
    if (user) {
      const u = user as Record<string, unknown>;
      name = String(u.chatName || u.name || "30praum").slice(0, 40);
      badge = u.chatBadge === "artist" ? "artist" : "staff";
      isMod = true;
      userEmail = typeof u.email === "string" ? u.email : null;
    }
  } catch {}

  let banned = false;
  if (!isMod && opts.checkBan) {
    const bans = await payload.count({
      collection: "mural-bans",
      where: { fingerprint: { equals: fingerprint }, until: { greater_than: new Date().toISOString() } },
      overrideAccess: true,
    });
    banned = bans.totalDocs > 0;
  }
  return { fingerprint, banned, name, badge, isMod, userEmail };
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
