import { NextResponse, type NextRequest } from "next/server";
import { GATE_COOKIE, verifyGateToken } from "@/lib/gate/token";

const PUBLIC_PATHS = new Set<string>([
  "/unlock",
  "/api/unlock",
  "/api/health",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
]);

function isPublicAsset(pathname: string): boolean {
  if (pathname.startsWith("/_next/")) return true;
  if (pathname.startsWith("/assets/")) return true;
  if (/\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|css|js|map|woff2?|ttf|otf|txt|xml)$/i.test(pathname)) {
    return true;
  }
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (PUBLIC_PATHS.has(pathname) || isPublicAsset(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get(GATE_COOKIE)?.value;
  let ok = false;
  try {
    ok = await verifyGateToken(token);
  } catch {
    ok = false;
  }
  if (ok) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/unlock";
  url.search = "";
  if (pathname !== "/" || search) {
    url.searchParams.set("from", pathname + search);
  }
  const res = NextResponse.redirect(url);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
