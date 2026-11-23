import { NextResponse, type NextRequest } from "next/server";

// Versão nova do site, aberta só com ?visual=editado. Quem não usa o parâmetro segue no site atual.
const EDITED_ORIGIN =
  "https://30praum-git-atualiz-006645-alvaro-carlisbinos-projects-f318b4cb.vercel.app";
const COOKIE = "visual";
const WEEK = 60 * 60 * 24 * 7;

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const visual = nextUrl.searchParams.get("visual");

  if (visual === "original") {
    const url = nextUrl.clone();
    url.searchParams.delete("visual");
    const response = NextResponse.redirect(url);
    response.cookies.delete(COOKIE);
    return response;
  }

  const edited = visual === "editado" || request.cookies.get(COOKIE)?.value === "editado";
  if (!edited) return NextResponse.next();

  const target = new URL(nextUrl.pathname + nextUrl.search, EDITED_ORIGIN);
  target.searchParams.delete("visual");
  const response = NextResponse.rewrite(target);

  if (visual === "editado") {
    response.cookies.set(COOKIE, "editado", {
      path: "/",
      maxAge: WEEK,
      sameSite: "lax",
      secure: true,
      httpOnly: true,
    });
  }
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  if (!nextUrl.pathname.startsWith("/_next/static")) {
    response.headers.set("Cache-Control", "private, no-store");
  }
  return response;
}

export const config = {
  matcher: ["/((?!admin|api).*)"],
};
