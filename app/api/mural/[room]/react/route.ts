import { NextResponse, type NextRequest } from "next/server";
import { isSameOrigin } from "@/lib/fans/session";
import { ROOM_RE } from "@/lib/mural/moderation";
import { getPayloadClient, getViewer } from "@/lib/mural/server";
import { REACTION_EMOJIS } from "@/lib/mural/types";

export const dynamic = "force-dynamic";

const ALLOWED = new Set<string>(REACTION_EMOJIS);
const BURST = { windowMs: 10_000, max: 12 };

export async function POST(req: NextRequest, ctx: { params: Promise<{ room: string }> }) {
  const { room } = await ctx.params;
  if (!ROOM_RE.test(room)) return NextResponse.json({ error: "Sala inválida." }, { status: 400 });
  if (!isSameOrigin(req.headers)) return NextResponse.json({ error: "Origem inválida." }, { status: 403 });
  let emoji = "";
  try {
    emoji = String((await req.json()).emoji ?? "");
  } catch {}
  if (!ALLOWED.has(emoji)) return NextResponse.json({ error: "Reação inválida." }, { status: 400 });

  try {
    const payload = await getPayloadClient();
    const viewer = await getViewer(payload, req.headers, { checkBan: true });
    if (viewer.banned) return NextResponse.json({ ok: true });
    const recent = await payload.count({
      collection: "mural-reactions",
      where: {
        fingerprint: { equals: viewer.fingerprint },
        createdAt: { greater_than: new Date(Date.now() - BURST.windowMs).toISOString() },
      },
      overrideAccess: true,
    });
    if (recent.totalDocs >= BURST.max) return NextResponse.json({ ok: true, throttled: true });
    await payload.create({
      collection: "mural-reactions",
      data: { room, emoji, fingerprint: viewer.fingerprint },
      overrideAccess: true,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[mural] falha ao reagir", err);
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
