import { NextResponse, type NextRequest } from "next/server";

const ADMIN_REALM = "30praum admin (demo)";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const user = process.env.ADMIN_DEMO_USER;
  const pass = process.env.ADMIN_DEMO_PASSWORD;

  // Sem credenciais configuradas → admin trancado por padrão (não vaza demo público).
  if (!user || !pass) {
    return new NextResponse("Admin não configurado.", { status: 503 });
  }

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const decoded = decodeBasic(header.slice(6));
    if (decoded && decoded.user === user && timingSafeEqual(decoded.pass, pass)) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${ADMIN_REALM}", charset="UTF-8"`,
    },
  });
}

function decodeBasic(token: string): { user: string; pass: string } | null {
  try {
    const decoded = atob(token);
    const idx = decoded.indexOf(":");
    if (idx < 0) return null;
    return { user: decoded.slice(0, idx), pass: decoded.slice(idx + 1) };
  } catch {
    return null;
  }
}

/**
 * Comparação constant-time. Não usar comparação direta de string em segredos —
 * vaza informação por timing.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export const config = {
  matcher: ["/admin/:path*"],
};
