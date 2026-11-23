import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "fan_session";
export const OAUTH_COOKIE = "fan_oauth";
export const ID_TOKEN_COOKIE = "fan_idt";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;
export const AUTH_PATH = "/api/auth/shopify";

export const cookieBase = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
};

function mac(label: string, data: string): Buffer {
  const secret = process.env.PAYLOAD_SECRET;
  if (!secret) throw new Error("PAYLOAD_SECRET ausente");
  return createHmac("sha256", `${label}:${secret}`).update(data).digest();
}

// O rótulo impede que um cookie de OAuth seja aceito como sessão e vice-versa.
export function seal(label: string, value: object, ttlSeconds: number): string {
  const body = Buffer.from(JSON.stringify({ ...value, exp: Date.now() + ttlSeconds * 1000 })).toString("base64url");
  return `${body}.${mac(label, body).toString("base64url")}`;
}

export function unseal<T extends object>(label: string, token: string | undefined | null): T | null {
  if (!token) return null;
  const [body, sig, extra] = token.split(".");
  if (!body || !sig || extra !== undefined) return null;
  const given = Buffer.from(sig, "base64url");
  const expected = mac(label, body);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  try {
    const value = JSON.parse(Buffer.from(body, "base64url").toString()) as T & { exp?: number };
    return typeof value.exp === "number" && value.exp > Date.now() ? value : null;
  } catch {
    return null;
  }
}

export interface FanSession {
  id: number;
  v: number;
}

export const sealSession = (s: FanSession) => seal("fan-session", s, SESSION_MAX_AGE);

export function readSession(headers: Headers): FanSession | null {
  const raw = headers.get("cookie") ?? "";
  const pair = raw.split(/;\s*/).find((c) => c.startsWith(`${SESSION_COOKIE}=`));
  const session = unseal<FanSession>("fan-session", pair?.slice(SESSION_COOKIE.length + 1));
  return session && Number.isInteger(session.id) && Number.isInteger(session.v) ? session : null;
}

// Só aceita caminho interno: impede usar o login como redirecionamento aberto.
export function safeNext(next: string | null | undefined): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || /[\\\u0000-\u001f]/.test(next)) return "/";
  return next.split("#")[0].slice(0, 300);
}

export function isSameOrigin(headers: Headers): boolean {
  const origin = headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === (headers.get("x-forwarded-host") ?? headers.get("host"));
  } catch {
    return false;
  }
}
