/**
 * Gate token — HMAC-SHA256 signed string used to mark a browser as "unlocked".
 *
 * Token format: `${expiryEpochMs}.${signatureBase64Url}`.
 * The signature covers exactly `${expiryEpochMs}` using a server-only secret.
 * Anything client-side (cookie, request body) is never trusted without verify().
 *
 * Web Crypto only — works on Edge (middleware) and Node runtimes.
 */

const COOKIE_NAME = "__h30p_gate";
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export const GATE_COOKIE = COOKIE_NAME;
export const GATE_TTL_MS = TOKEN_TTL_MS;

function getSecret(): string {
  const secret = process.env.GATE_SIGNING_SECRET || process.env.PAYLOAD_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("Gate signing secret is missing or too short");
  }
  return secret;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.byteLength; i += 1) {
    bin += String.fromCharCode(bytes[i]);
  }
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(input: string): Uint8Array {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmac(message: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return new Uint8Array(sig);
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function signGateToken(now: number = Date.now()): Promise<string> {
  const expiry = String(now + TOKEN_TTL_MS);
  const sig = await hmac(expiry);
  return `${expiry}.${base64UrlEncode(sig)}`;
}

export async function verifyGateToken(
  token: string | undefined,
  now: number = Date.now(),
): Promise<boolean> {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot <= 0 || dot === token.length - 1) return false;
  const expiryStr = token.slice(0, dot);
  const sigPart = token.slice(dot + 1);
  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || expiry < now) return false;
  let provided: Uint8Array;
  try {
    provided = base64UrlDecode(sigPart);
  } catch {
    return false;
  }
  const expected = await hmac(expiryStr);
  return timingSafeEqual(provided, expected);
}
