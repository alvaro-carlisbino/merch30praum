import { NextResponse, type NextRequest } from "next/server";
import type { Where } from "payload";
import { MAX_BODY, MAX_NICK, RATE, ROOM_RE, checkBody, checkNickname, cleanText } from "@/lib/mural/moderation";
import { getChatConfig, getPayloadClient, getViewer, maybeCleanup, toMessage, type Viewer } from "@/lib/mural/server";
import type { MuralFeed } from "@/lib/mural/types";

export const dynamic = "force-dynamic";

const ONLINE_WINDOW_MS = 30_000;
const VISITOR_RE = /^[a-z0-9]{8,40}$/i;

type Ctx = { params: Promise<{ room: string }> };
type Payload = Awaited<ReturnType<typeof getPayloadClient>>;

async function touchPresence(payload: Payload, room: string, visitor: string) {
  const key = `${room}:${visitor}`;
  const seenAt = new Date().toISOString();
  const found = await payload.find({
    collection: "mural-presence",
    where: { key: { equals: key } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  if (found.docs[0]) {
    await payload.update({ collection: "mural-presence", id: found.docs[0].id, data: { seenAt }, overrideAccess: true });
  } else {
    await payload.create({ collection: "mural-presence", data: { key, room, seenAt }, overrideAccess: true });
  }
}

// Recado de banido só aparece para quem escreveu (shadowban).
function visibleTo(viewer: Viewer): Where {
  return {
    or: [
      { shadow: { equals: false } },
      { shadow: { exists: false } },
      { fingerprint: { equals: viewer.fingerprint } },
    ],
  };
}

export async function GET(req: NextRequest, ctx: Ctx) {
  const { room } = await ctx.params;
  if (!ROOM_RE.test(room)) return NextResponse.json({ error: "sala inválida" }, { status: 400 });

  const params = req.nextUrl.searchParams;
  const after = params.get("after");
  const visitor = params.get("v") ?? "";
  const afterDate = after && !Number.isNaN(Date.parse(after)) ? new Date(after).toISOString() : null;
  const serverTime = new Date().toISOString();

  try {
    const payload = await getPayloadClient();
    const [config, viewer] = await Promise.all([getChatConfig(payload), getViewer(payload, req.headers)]);

    if (params.get("p") === "1" && VISITOR_RE.test(visitor)) {
      // Contador é acessório: se a presença falhar (corrida no create), o feed segue.
      await touchPresence(payload, room, visitor).catch(() => {});
    }

    const [fresh, removed, reactions, online] = await Promise.all([
      payload.find({
        collection: "mural-messages",
        where: {
          and: [
            { room: { equals: room } },
            { status: { equals: "visible" } },
            ...(afterDate ? [{ createdAt: { greater_than: afterDate } }] : []),
            visibleTo(viewer),
          ],
        },
        sort: "-createdAt",
        limit: 60,
        depth: 0,
        overrideAccess: true,
      }),
      afterDate
        ? payload.find({
            collection: "mural-messages",
            where: {
              room: { equals: room },
              status: { equals: "hidden" },
              updatedAt: { greater_than: new Date(Date.parse(afterDate) - 60_000).toISOString() },
            },
            limit: 300,
            depth: 0,
            overrideAccess: true,
            select: { status: true },
          })
        : Promise.resolve({ docs: [] as { id: number | string }[] }),
      afterDate
        ? payload.find({
            collection: "mural-reactions",
            where: {
              room: { equals: room },
              createdAt: { greater_than: afterDate },
              fingerprint: { not_equals: viewer.fingerprint },
            },
            limit: 200,
            depth: 0,
            overrideAccess: true,
            select: { emoji: true },
          })
        : Promise.resolve({ docs: [] as { emoji?: unknown }[] }),
      payload.count({
        collection: "mural-presence",
        where: {
          room: { equals: room },
          seenAt: { greater_than: new Date(Date.now() - ONLINE_WINDOW_MS).toISOString() },
        },
        overrideAccess: true,
      }),
    ]);

    const reactionCounts: Record<string, number> = {};
    for (const r of reactions.docs) {
      const e = String((r as { emoji?: unknown }).emoji ?? "");
      if (e) reactionCounts[e] = (reactionCounts[e] ?? 0) + 1;
    }

    const feed: MuralFeed = {
      messages: fresh.docs.map((d) => toMessage(d as Parameters<typeof toMessage>[0], viewer)).reverse(),
      removed: removed.docs.map((d) => Number(d.id)),
      reactions: reactionCounts,
      online: Math.max(online.totalDocs, 1),
      serverTime,
      enabled: config.enabled,
      slowModeSeconds: config.slowModeSeconds,
      pinned: room === "geral" ? config.pinned : null,
      viewer: { name: viewer.name, badge: viewer.badge, isMod: viewer.isMod },
    };
    return NextResponse.json(feed, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[mural] falha ao ler", err);
    return NextResponse.json({ error: "chat indisponível" }, { status: 503 });
  }
}

export async function POST(req: NextRequest, ctx: Ctx) {
  const { room } = await ctx.params;
  if (!ROOM_RE.test(room)) return NextResponse.json({ error: "Sala inválida." }, { status: 400 });

  let input: Record<string, unknown>;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }
  // Campo isca: robô preenche, gente não vê.
  if (input.website) return NextResponse.json({ ok: true });

  try {
    const payload = await getPayloadClient();
    const [config, viewer] = await Promise.all([
      getChatConfig(payload),
      getViewer(payload, req.headers, { checkBan: true }),
    ]);

    if (!config.enabled && !viewer.isMod) {
      return NextResponse.json({ error: "O chat está fechado agora." }, { status: 423 });
    }

    const body = cleanText(input.body, MAX_BODY);
    let nickname: string;
    if (viewer.isMod && viewer.name) {
      nickname = viewer.name;
      if (!body) return NextResponse.json({ error: "Escreve alguma coisa." }, { status: 422 });
    } else {
      nickname = cleanText(input.nickname, MAX_NICK).replace(/\n/g, " ");
      const nick = checkNickname(nickname, false);
      if (!nick.ok) return NextResponse.json({ error: nick.reason, code: nick.code }, { status: 422 });
      const verdict = checkBody(body, config.blockedWords);
      if (!verdict.ok) return NextResponse.json({ error: verdict.reason, code: verdict.code }, { status: 422 });

      const recent = await payload.find({
        collection: "mural-messages",
        where: {
          fingerprint: { equals: viewer.fingerprint },
          createdAt: { greater_than: new Date(Date.now() - 60_000).toISOString() },
        },
        sort: "-createdAt",
        limit: RATE.perMinute,
        depth: 0,
        overrideAccess: true,
        select: { body: true, createdAt: true },
      });
      const last = recent.docs[0];
      const gap = Math.max(config.slowModeSeconds * 1000, RATE.minGapMs);
      if (last && Date.now() - Date.parse(String(last.createdAt)) < gap) {
        const wait = Math.ceil((gap - (Date.now() - Date.parse(String(last.createdAt)))) / 1000);
        return NextResponse.json({ error: `Calma, espera ${wait}s.`, code: "slow", wait }, { status: 429 });
      }
      if (recent.docs.length >= RATE.perMinute) {
        return NextResponse.json({ error: "Muitos recados seguidos. Respira e volta em um minuto.", code: "rate" }, { status: 429 });
      }
      if (recent.docs.some((d) => String(d.body).trim().toLowerCase() === body.toLowerCase())) {
        return NextResponse.json({ error: "Esse recado você já mandou.", code: "dup" }, { status: 422 });
      }
    }

    const doc = await payload.create({
      collection: "mural-messages",
      data: {
        room,
        nickname,
        body,
        fingerprint: viewer.fingerprint,
        status: "visible",
        authorType: viewer.isMod ? viewer.badge : "fan",
        shadow: viewer.banned,
        reports: 0,
        reportedBy: [],
      },
      overrideAccess: true,
    });
    maybeCleanup(payload, config).catch(() => {});
    return NextResponse.json({ message: toMessage(doc as Parameters<typeof toMessage>[0], viewer) }, { status: 201 });
  } catch (err) {
    console.error("[mural] falha ao salvar", err);
    return NextResponse.json({ error: "O chat caiu por um instante. Tenta de novo." }, { status: 503 });
  }
}
