import { NextResponse, type NextRequest } from "next/server";
import { AUTH_PATH, OAUTH_COOKIE, cookieBase, safeNext, seal } from "@/lib/fans/session";
import { buildAuthorizeUrl, isFanLoginEnabled, siteUrl } from "@/lib/fans/shopify-auth";

export const dynamic = "force-dynamic";

const OAUTH_TTL = 600;

export async function GET(req: NextRequest) {
  const next = safeNext(req.nextUrl.searchParams.get("next"));
  if (!isFanLoginEnabled) return NextResponse.redirect(`${siteUrl()}${next}#chat-erro`, 303);
  try {
    const { url, oauth } = await buildAuthorizeUrl(next);
    const res = NextResponse.redirect(url, 303);
    res.headers.set("Cache-Control", "no-store");
    res.cookies.set(OAUTH_COOKIE, seal("fan-oauth", oauth, OAUTH_TTL), { ...cookieBase, path: AUTH_PATH, maxAge: OAUTH_TTL });
    return res;
  } catch (err) {
    console.error("[fans] falha ao iniciar login", err instanceof Error ? err.message : "erro desconhecido");
    return NextResponse.redirect(`${siteUrl()}${next}#chat-erro`, 303);
  }
}
