import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "crypto";

const ALLOWED_TAGS = new Set([
  "products",
  "artists",
  "plantao",
  "news",
  "partners",
  "incubadora",
]);

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret") ?? "";
  const tag = req.nextUrl.searchParams.get("tag") ?? "";
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || !safeEqual(secret, expected)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  if (!ALLOWED_TAGS.has(tag)) {
    return NextResponse.json({ ok: false, error: "invalid tag" }, { status: 400 });
  }

  revalidateTag(tag, "default");
  return NextResponse.json({ ok: true, revalidated: tag });
}
