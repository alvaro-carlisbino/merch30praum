import { NextResponse, type NextRequest } from "next/server";
import { ROOM_RE } from "@/lib/mural/moderation";
import { getPayloadClient, readFeed } from "@/lib/mural/server";
import type { MuralFeed } from "@/lib/mural/types";

// Feed público, igual para todo mundo, servido pelo CDN. Não pode ler cookie
// nem query string: é isso que deixa milhares de visitantes dividirem a mesma
// resposta em vez de cada um consultar o banco.
const ANON_VIEWER: MuralFeed["viewer"] = { name: null, badge: "fan", isMod: false };

export async function GET(_req: NextRequest, ctx: { params: Promise<{ room: string }> }) {
  const { room } = await ctx.params;
  if (!ROOM_RE.test(room)) return NextResponse.json({ error: "sala inválida" }, { status: 400 });
  try {
    const payload = await getPayloadClient();
    const feed: MuralFeed = { ...(await readFeed(payload, room)), viewer: ANON_VIEWER };
    return NextResponse.json(feed, {
      headers: { "Cache-Control": "public, max-age=0, s-maxage=2, stale-while-revalidate=10" },
    });
  } catch (err) {
    console.error("[mural] falha ao ler feed", err);
    return NextResponse.json({ error: "chat indisponível" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
