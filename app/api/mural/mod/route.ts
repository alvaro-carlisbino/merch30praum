import { NextResponse, type NextRequest } from "next/server";
import { isSameOrigin } from "@/lib/fans/session";
import { ROOM_RE } from "@/lib/mural/moderation";
import { getPayloadClient, getViewer } from "@/lib/mural/server";

export const dynamic = "force-dynamic";

// Ações da equipe direto no chat. Só funciona com login do Payload.
export async function POST(req: NextRequest) {
  if (!isSameOrigin(req.headers)) return NextResponse.json({ error: "Origem inválida." }, { status: 403 });
  let input: Record<string, unknown>;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }
  const payload = await getPayloadClient();
  const viewer = await getViewer(payload, req.headers);
  if (!viewer.isMod) return NextResponse.json({ error: "Só a equipe pode moderar." }, { status: 403 });

  const action = String(input.action ?? "");
  try {
    if (action === "hide") {
      const id = Number(input.id);
      await payload.update({ collection: "mural-messages", id, data: { status: "hidden" }, overrideAccess: true });
      return NextResponse.json({ ok: true });
    }

    if (action === "ban") {
      const id = Number(input.id);
      const hours = Math.min(Math.max(Number(input.hours) || 24, 1), 24 * 365);
      const doc = await payload.findByID({ collection: "mural-messages", id, depth: 0, overrideAccess: true });
      const fingerprint = String(doc.fingerprint ?? "");
      if (!fingerprint) return NextResponse.json({ error: "Sem como identificar o autor." }, { status: 422 });
      await payload.create({
        collection: "mural-bans",
        data: {
          fingerprint,
          nickname: String(doc.nickname ?? ""),
          reason: String(input.reason ?? "Banido pelo chat"),
          until: new Date(Date.now() + hours * 3_600_000).toISOString(),
          bannedBy: viewer.userEmail ?? viewer.name ?? "equipe",
        },
        overrideAccess: true,
      });
      // Some com tudo que a pessoa escreveu nas últimas 24h.
      await payload.update({
        collection: "mural-messages",
        where: {
          fingerprint: { equals: fingerprint },
          createdAt: { greater_than: new Date(Date.now() - 86_400_000).toISOString() },
        },
        data: { status: "hidden" },
        overrideAccess: true,
      });
      return NextResponse.json({ ok: true });
    }

    if (action === "clear") {
      const room = String(input.room ?? "");
      if (!ROOM_RE.test(room)) return NextResponse.json({ error: "Sala inválida." }, { status: 400 });
      const res = await payload.update({
        collection: "mural-messages",
        where: { room: { equals: room }, status: { equals: "visible" } },
        data: { status: "hidden" },
        overrideAccess: true,
      });
      return NextResponse.json({ ok: true, cleared: res.docs.length });
    }

    return NextResponse.json({ error: "Ação desconhecida." }, { status: 400 });
  } catch (err) {
    console.error("[mural] falha na moderação", err);
    return NextResponse.json({ error: "Não deu agora." }, { status: 503 });
  }
}
