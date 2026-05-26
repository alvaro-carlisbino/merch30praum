import { NextResponse } from "next/server";
import { GATE_COOKIE, GATE_TTL_MS, signGateToken } from "@/lib/gate/token";

export const runtime = "nodejs";

const ALLOWED_EMAIL = "house@limitless.app.br";
const FAILURE_DELAY_MS = 1200;

function timingSafeStringEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  const len = Math.max(ab.length, bb.length);
  let diff = ab.length ^ bb.length;
  for (let i = 0; i < len; i += 1) {
    diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  }
  return diff === 0;
}

function unauthorized() {
  return NextResponse.json({ ok: false }, { status: 401 });
}

export async function POST(req: Request) {
  const expected = process.env.ACESS_PASSWORD;
  if (!expected || expected.length < 4) {
    return NextResponse.json({ ok: false, error: "gate-misconfigured" }, { status: 503 });
  }

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    return unauthorized();
  }

  const email = typeof (body as { email?: unknown })?.email === "string"
    ? ((body as { email: string }).email).trim().toLowerCase()
    : "";
  const password = typeof (body as { password?: unknown })?.password === "string"
    ? (body as { password: string }).password
    : "";

  const emailOk = timingSafeStringEqual(email, ALLOWED_EMAIL);
  const passOk = timingSafeStringEqual(password, expected);

  if (!(emailOk && passOk)) {
    await new Promise((r) => setTimeout(r, FAILURE_DELAY_MS));
    return unauthorized();
  }

  const token = await signGateToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: GATE_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(GATE_TTL_MS / 1000),
  });
  res.headers.set("Cache-Control", "no-store");
  return res;
}
