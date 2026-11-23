import { NextResponse, type NextRequest } from "next/server";
import { AUTH_PATH, ID_TOKEN_COOKIE, SESSION_COOKIE, cookieBase, isSameOrigin } from "@/lib/fans/session";
import { buildLogoutUrl, siteUrl } from "@/lib/fans/shopify-auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req.headers)) return NextResponse.json({ error: "Origem inválida." }, { status: 403 });
  const url = await buildLogoutUrl(req.cookies.get(ID_TOKEN_COOKIE)?.value).catch(() => null);
  const res = NextResponse.redirect(url ?? `${siteUrl()}/`, 303);
  res.cookies.set(SESSION_COOKIE, "", { ...cookieBase, path: "/", maxAge: 0 });
  res.cookies.set(ID_TOKEN_COOKIE, "", { ...cookieBase, path: AUTH_PATH, maxAge: 0 });
  return res;
}
