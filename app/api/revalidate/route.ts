import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const tag = url.searchParams.get("tag") ?? "products";
  const secret = url.searchParams.get("secret");

  if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "invalid secret" }, { status: 401 });
  }

  revalidateTag(tag, "default");
  return NextResponse.json({ ok: true, revalidated: tag });
}
