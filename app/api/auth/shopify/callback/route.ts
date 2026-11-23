import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { getPayloadClient } from "@/lib/payload/client";
import { AUTH_PATH, ID_TOKEN_COOKIE, OAUTH_COOKIE, SESSION_COOKIE, SESSION_MAX_AGE, cookieBase, safeNext, sealSession, unseal } from "@/lib/fans/session";
import { exchangeCode, fetchCustomer, siteUrl, type OAuthState, type ShopifyCustomer } from "@/lib/fans/shopify-auth";

export const dynamic = "force-dynamic";

function sameText(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

async function upsertFan(customer: ShopifyCustomer) {
  const payload = await getPayloadClient();
  const found = await payload.find({
    collection: "fans",
    where: { shopifyCustomerId: { equals: customer.id } },
    limit: 1,
    depth: 0,
    pagination: false,
    overrideAccess: true,
  });
  const lastLoginAt = new Date().toISOString();
  // Dado vazio na Shopify não apaga o que o fã já preencheu aqui.
  const synced = Object.fromEntries(
    Object.entries({
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      city: customer.city,
      state: customer.state,
    }).filter(([, v]) => v),
  ) as { email: string };
  const current = found.docs[0];
  if (current) {
    return payload.update({ collection: "fans", id: current.id, data: { ...synced, lastLoginAt }, depth: 0, overrideAccess: true });
  }
  return payload.create({
    collection: "fans",
    data: { ...synced, shopifyCustomerId: customer.id, lastLoginAt, sessionVersion: 1 },
    depth: 0,
    overrideAccess: true,
  });
}

export async function GET(req: NextRequest) {
  const oauth = unseal<OAuthState>("fan-oauth", req.cookies.get(OAUTH_COOKIE)?.value);
  const next = safeNext(oauth?.next);
  const fail = () => {
    const res = NextResponse.redirect(`${siteUrl()}${next}#chat-erro`, 303);
    res.cookies.set(OAUTH_COOKIE, "", { ...cookieBase, path: AUTH_PATH, maxAge: 0 });
    return res;
  };
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  if (!oauth || !code || !state || !sameText(state, oauth.state)) return fail();

  try {
    const { accessToken, idToken } = await exchangeCode(code, oauth);
    const customer = await fetchCustomer(accessToken);
    const fan = await upsertFan(customer);
    const res = NextResponse.redirect(`${siteUrl()}${next}#chat`, 303);
    res.headers.set("Cache-Control", "no-store");
    res.cookies.set(OAUTH_COOKIE, "", { ...cookieBase, path: AUTH_PATH, maxAge: 0 });
    res.cookies.set(SESSION_COOKIE, sealSession({ id: Number(fan.id), v: Number(fan.sessionVersion ?? 1) }), {
      ...cookieBase,
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    if (idToken.length < 3500) {
      res.cookies.set(ID_TOKEN_COOKIE, idToken, { ...cookieBase, path: AUTH_PATH, maxAge: SESSION_MAX_AGE });
    }
    return res;
  } catch (err) {
    console.error("[fans] falha no retorno do login", err instanceof Error ? err.message : "erro desconhecido");
    return fail();
  }
}
