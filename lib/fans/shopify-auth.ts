import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { createRemoteJWKSet, jwtVerify } from "jose";

const isProd = process.env.NODE_ENV === "production";
const DOMAIN = process.env.SHOPIFY_CUSTOMER_ACCOUNT_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN;
const CLIENT_ID = process.env.SHOPIFY_CUSTOMER_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CUSTOMER_CLIENT_SECRET;
const USER_AGENT = "30praum-site";
const SCOPE = "openid email customer-account-api:full";

export const isFanLoginEnabled = Boolean(DOMAIN && CLIENT_ID);

export function siteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
  return url.replace(/\/$/, "");
}

export const callbackUrl = () => `${siteUrl()}/api/auth/shopify/callback`;

interface Discovery {
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  end_session_endpoint: string;
  jwks_uri: string;
  graphql_api: string;
}

let discovery: { at: number; value: Discovery } | null = null;
let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;

function baseUrl(): string {
  if (!DOMAIN) throw new Error("login da Shopify não configurado");
  // URL com protocolo só existe para o simulador local.
  if (!isProd && /^https?:\/\//.test(DOMAIN)) return DOMAIN.replace(/\/$/, "");
  return `https://${DOMAIN}`;
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT, Accept: "application/json" }, cache: "no-store" });
  if (!res.ok) throw new Error(`descoberta shopify ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getDiscovery(): Promise<Discovery> {
  if (discovery && Date.now() - discovery.at < 3_600_000) return discovery.value;
  const base = baseUrl();
  const [oidc, api] = await Promise.all([
    getJson<Omit<Discovery, "graphql_api">>(`${base}/.well-known/openid-configuration`),
    getJson<{ graphql_api: string }>(`${base}/.well-known/customer-account-api`),
  ]);
  const value: Discovery = { ...oidc, graphql_api: api.graphql_api };
  if (isProd) {
    for (const url of [value.authorization_endpoint, value.token_endpoint, value.end_session_endpoint, value.jwks_uri, value.graphql_api]) {
      if (new URL(url).protocol !== "https:") throw new Error("endpoint da Shopify sem https");
    }
  }
  discovery = { at: Date.now(), value };
  jwks = createRemoteJWKSet(new URL(value.jwks_uri));
  return value;
}

export interface OAuthState {
  state: string;
  nonce: string;
  verifier: string;
  next: string;
}

export async function buildAuthorizeUrl(next: string): Promise<{ url: string; oauth: OAuthState }> {
  const d = await getDiscovery();
  const oauth: OAuthState = {
    state: randomBytes(24).toString("base64url"),
    nonce: randomBytes(24).toString("base64url"),
    verifier: randomBytes(48).toString("base64url"),
    next,
  };
  const url = new URL(d.authorization_endpoint);
  url.searchParams.set("scope", SCOPE);
  url.searchParams.set("client_id", CLIENT_ID!);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", callbackUrl());
  url.searchParams.set("state", oauth.state);
  url.searchParams.set("nonce", oauth.nonce);
  url.searchParams.set("locale", "pt-BR");
  if (!CLIENT_SECRET) {
    url.searchParams.set("code_challenge", createHash("sha256").update(oauth.verifier).digest("base64url"));
    url.searchParams.set("code_challenge_method", "S256");
  }
  return { url: url.toString(), oauth };
}

export async function exchangeCode(code: string, oauth: OAuthState): Promise<{ accessToken: string; idToken: string }> {
  const d = await getDiscovery();
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: CLIENT_ID!,
    redirect_uri: callbackUrl(),
    code,
  });
  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": USER_AGENT,
    Origin: siteUrl(),
  };
  if (CLIENT_SECRET) headers.Authorization = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`;
  else body.set("code_verifier", oauth.verifier);

  const res = await fetch(d.token_endpoint, { method: "POST", headers, body, cache: "no-store" });
  if (!res.ok) throw new Error(`token shopify ${res.status}`);
  const data = (await res.json()) as { access_token?: string; id_token?: string };
  if (!data.access_token || !data.id_token) throw new Error("resposta de token incompleta");

  await jwtVerify(data.id_token, jwks!, { issuer: d.issuer, audience: CLIENT_ID! }).then(({ payload }) => {
    if (payload.nonce !== oauth.nonce) throw new Error("nonce inválido");
  });
  return { accessToken: data.access_token, idToken: data.id_token };
}

export interface ShopifyCustomer {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
}

const CUSTOMER_QUERY = `query FanCustomer {
  customer {
    id
    firstName
    lastName
    emailAddress { emailAddress }
    phoneNumber { phoneNumber }
    defaultAddress { city zoneCode phoneNumber }
  }
}`;

export async function fetchCustomer(accessToken: string): Promise<ShopifyCustomer> {
  const d = await getDiscovery();
  const res = await fetch(d.graphql_api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      Origin: siteUrl(),
      Authorization: accessToken,
    },
    body: JSON.stringify({ query: CUSTOMER_QUERY }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`cliente shopify ${res.status}`);
  const json = (await res.json()) as {
    errors?: unknown[];
    data?: {
      customer?: {
        id: string;
        firstName?: string | null;
        lastName?: string | null;
        emailAddress?: { emailAddress?: string | null } | null;
        phoneNumber?: { phoneNumber?: string | null } | null;
        defaultAddress?: { city?: string | null; zoneCode?: string | null; phoneNumber?: string | null } | null;
      };
    };
  };
  const c = json.data?.customer;
  const email = c?.emailAddress?.emailAddress?.trim().toLowerCase();
  if (json.errors?.length || !c?.id || !email) throw new Error("cliente shopify incompleto");
  const zone = c.defaultAddress?.zoneCode?.toUpperCase() ?? null;
  return {
    id: c.id,
    email,
    firstName: c.firstName || null,
    lastName: c.lastName || null,
    phone: c.phoneNumber?.phoneNumber || c.defaultAddress?.phoneNumber || null,
    city: c.defaultAddress?.city || null,
    state: zone && /^[A-Z]{2}$/.test(zone) ? zone : null,
  };
}

export async function buildLogoutUrl(idToken: string | undefined): Promise<string | null> {
  if (!idToken || !isFanLoginEnabled) return null;
  const d = await getDiscovery();
  const url = new URL(d.end_session_endpoint);
  url.searchParams.set("id_token_hint", idToken);
  url.searchParams.set("post_logout_redirect_uri", `${siteUrl()}/`);
  return url.toString();
}
