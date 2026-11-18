import { NextResponse, type NextRequest } from "next/server";
import { getPayloadClient } from "@/lib/payload/client";
import {
  MAX_BODY,
  MAX_NICK,
  RATE,
  ROOM_RE,
  cleanText,
  fingerprintFrom,
  moderate,
} from "@/lib/mural/moderation";
import type { MuralFeed, MuralMessage } from "@/lib/mural/types";

export const dynamic = "force-dynamic";

const ONLINE_WINDOW_MS = 30_000;
const VISITOR_RE = /^[a-z0-9]{8,40}$/i;

type Ctx = { params: Promise<{ room: string }> };

// payload-types.ts não é gerado neste repo, então os docs chegam sem tipo.
type Doc = { id: number | string; [key: string]: unknown };

function toMessage(doc: Doc): MuralMessage {
  return {
    id: Number(doc.id),
    nickname: String(doc.nickname ?? ""),
    body: String(doc.body ?? ""),
    createdAt: String(doc.createdAt ?? ""),
  };
}

async function touchPresence(room: string, visitor: string) {
  const payload = await getPayloadClient();
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
    await payload.update({
      collection: "mural-presence",
      id: found.docs[0].id,
      data: { seenAt },
      overrideAccess: true,
    });
  } else {
    await payload.create({
      collection: "mural-presence",
      data: { key, room, seenAt },
      overrideAccess: true,
    });
  }
}

export async function GET(req: NextRequest, ctx: Ctx) {
  const { room } = await ctx.params;
  if (!ROOM_RE.test(room)) return NextResponse.json({ error: "sala inválida" }, { status: 400 });

  const after = req.nextUrl.searchParams.get("after");
  const visitor = req.nextUrl.searchParams.get("v") ?? "";
  const afterDate = after && !Number.isNaN(Date.parse(after)) ? new Date(after).toISOString() : null;
  const serverTime = new Date().toISOString();

  try {
    const payload = await getPayloadClient();
    // Contador é acessório: se a presença falhar (corrida no create), o feed segue.
    if (VISITOR_RE.test(visitor)) await touchPresence(room, visitor).catch(() => {});

    const [fresh, removed, online] = await Promise.all([
      payload.find({
        collection: "mural-messages",
        where: {
          room: { equals: room },
          status: { equals: "visible" },
          ...(afterDate ? { createdAt: { greater_than: afterDate } } : {}),
        },
        sort: "-createdAt",
        limit: 60,
        depth: 0,
        overrideAccess: true,
        select: { nickname: true, body: true, createdAt: true },
      }),
      afterDate
        ? payload.find({
            collection: "mural-messages",
            where: {
              room: { equals: room },
              status: { equals: "hidden" },
              updatedAt: { greater_than: new Date(Date.parse(afterDate) - 60_000).toISOString() },
            },
            limit: 100,
            depth: 0,
            overrideAccess: true,
            select: { id: true },
          })
        : Promise.resolve({ docs: [] as { id: number }[] }),
      payload.count({
        collection: "mural-presence",
        where: {
          room: { equals: room },
          seenAt: { greater_than: new Date(Date.now() - ONLINE_WINDOW_MS).toISOString() },
        },
        overrideAccess: true,
      }),
    ]);

    const feed: MuralFeed = {
      messages: fresh.docs.map(toMessage).reverse(),
      removed: removed.docs.map((d) => Number(d.id)),
      online: Math.max(online.totalDocs, VISITOR_RE.test(visitor) ? 1 : 0),
      serverTime,
    };
    return NextResponse.json(feed, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[mural] falha ao ler", err);
    return NextResponse.json({ error: "mural indisponível" }, { status: 503 });
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

  const nickname = cleanText(input.nickname, MAX_NICK).replace(/\n/g, " ");
  const body = cleanText(input.body, MAX_BODY);
  const verdict = moderate(nickname, body);
  if (!verdict.ok) return NextResponse.json({ error: verdict.reason }, { status: 422 });

  const fingerprint = fingerprintFrom(req.headers);

  try {
    const payload = await getPayloadClient();
    const recent = await payload.find({
      collection: "mural-messages",
      where: {
        fingerprint: { equals: fingerprint },
        createdAt: { greater_than: new Date(Date.now() - 60_000).toISOString() },
      },
      sort: "-createdAt",
      limit: RATE.perMinute,
      depth: 0,
      overrideAccess: true,
      select: { body: true, createdAt: true },
    });
    const last = recent.docs[0];
    if (last && Date.now() - Date.parse(String(last.createdAt)) < RATE.minGapMs) {
      return NextResponse.json({ error: "Calma, espera uns segundos." }, { status: 429 });
    }
    if (recent.docs.length >= RATE.perMinute) {
      return NextResponse.json({ error: "Muitos recados seguidos. Respira e volta em um minuto." }, { status: 429 });
    }
    if (recent.docs.some((d) => String(d.body).trim().toLowerCase() === body.toLowerCase())) {
      return NextResponse.json({ error: "Esse recado você já mandou." }, { status: 422 });
    }

    const doc = await payload.create({
      collection: "mural-messages",
      data: { room, nickname, body, fingerprint, status: "visible", reports: 0, reportedBy: [] },
      overrideAccess: true,
    });
    return NextResponse.json({ message: toMessage(doc) }, { status: 201 });
  } catch (err) {
    console.error("[mural] falha ao salvar", err);
    return NextResponse.json({ error: "O mural caiu por um instante. Tenta de novo." }, { status: 503 });
  }
}
