import { NextResponse, type NextRequest } from "next/server";
import { sql } from "@payloadcms/db-postgres";
import { isSameOrigin } from "@/lib/fans/session";
import { MAX_BODY, RATE, ROOM_RE, checkBody, cleanText } from "@/lib/mural/moderation";
import { getChatConfig, getPayloadClient, getViewer, maybeCleanup, readFeed, toMessage } from "@/lib/mural/server";
import type { MuralFeed } from "@/lib/mural/types";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ room: string }> };

// Versão da equipe: traz denúncias e nunca passa pelo CDN. Visitante comum
// é mandado para o feed público.
export async function GET(req: NextRequest, ctx: Ctx) {
  const { room } = await ctx.params;
  if (!ROOM_RE.test(room)) return NextResponse.json({ error: "sala inválida" }, { status: 400 });
  const toPublic = () => NextResponse.redirect(new URL(`/api/mural/${room}/feed`, req.url), 307);
  if (!req.cookies.has("payload-token")) return toPublic();

  try {
    const payload = await getPayloadClient();
    const viewer = await getViewer(payload, req.headers);
    if (!viewer.isMod) return toPublic();
    const feed: MuralFeed = {
      ...(await readFeed(payload, room, viewer)),
      viewer: { name: viewer.name, badge: viewer.badge, isMod: true },
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
  if (!isSameOrigin(req.headers)) return NextResponse.json({ error: "Origem inválida." }, { status: 403 });

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
      const fan = viewer.fan;
      if (!fan) return NextResponse.json({ error: "Entre com sua conta para escrever.", code: "login" }, { status: 401 });
      if (fan.needsProfile || !fan.nickname) {
        return NextResponse.json({ error: "Complete seu cadastro para escrever.", code: "profile" }, { status: 403 });
      }
      nickname = fan.nickname;
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
        pagination: false,
        overrideAccess: true,
        select: { body: true, createdAt: true },
      });
      if (recent.docs.length >= RATE.perMinute) {
        return NextResponse.json({ error: "Muitos recados seguidos. Respira e volta em um minuto.", code: "rate" }, { status: 429 });
      }
      if (recent.docs.some((d) => String(d.body).trim().toLowerCase() === body.toLowerCase())) {
        return NextResponse.json({ error: "Esse recado você já mandou.", code: "dup" }, { status: 422 });
      }

      // Reserva o envio numa única operação: pedidos simultâneos não furam o intervalo.
      const gap = Math.max(config.slowModeSeconds * 1000, RATE.minGapMs);
      const db = payload.db as unknown as { drizzle: { execute: (q: unknown) => Promise<{ rows: unknown[] }> } };
      const claim = await db.drizzle.execute(sql`
        UPDATE fans SET last_message_at = now()
        WHERE id = ${fan.id}
          AND (last_message_at IS NULL OR last_message_at < now() - make_interval(secs => ${gap / 1000}::double precision))
        RETURNING id
      `);
      if (!claim.rows.length) {
        const since = fan.lastMessageAt ? Date.now() - Date.parse(fan.lastMessageAt) : 0;
        const wait = Math.max(1, Math.ceil((gap - since) / 1000));
        return NextResponse.json({ error: `Calma, espera ${wait}s.`, code: "slow", wait }, { status: 429 });
      }
    }

    const doc = await payload.create({
      collection: "mural-messages",
      data: {
        room,
        nickname,
        body,
        fingerprint: viewer.fingerprint,
        ...(viewer.fan ? { fan: viewer.fan.id } : {}),
        status: "visible",
        authorType: viewer.isMod ? viewer.badge : "fan",
        shadow: viewer.banned,
        reports: 0,
        reportedBy: [],
      },
      overrideAccess: true,
    });
    maybeCleanup(payload, config).catch(() => {});
    return NextResponse.json({ message: toMessage(doc as unknown as Parameters<typeof toMessage>[0], viewer) }, { status: 201 });
  } catch (err) {
    console.error("[mural] falha ao salvar", err);
    return NextResponse.json({ error: "O chat caiu por um instante. Tenta de novo." }, { status: 503 });
  }
}
