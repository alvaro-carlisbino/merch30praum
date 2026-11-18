import { NextResponse, type NextRequest } from "next/server";
import { getPayloadClient } from "@/lib/payload/client";
import { fingerprintFrom } from "@/lib/mural/moderation";

export const dynamic = "force-dynamic";

const AUTO_HIDE_AT = 3;

export async function POST(req: NextRequest) {
  let id: number;
  try {
    id = Number((await req.json()).id);
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }
  if (!Number.isInteger(id) || id <= 0) return NextResponse.json({ error: "Recado inválido." }, { status: 400 });

  const fingerprint = fingerprintFrom(req.headers);
  try {
    const payload = await getPayloadClient();
    const doc = await payload.findByID({
      collection: "mural-messages",
      id,
      depth: 0,
      overrideAccess: true,
      disableErrors: true,
    });
    if (!doc) return NextResponse.json({ ok: true });

    const reporters = Array.isArray(doc.reportedBy) ? (doc.reportedBy as string[]) : [];
    if (reporters.includes(fingerprint) || doc.fingerprint === fingerprint) {
      return NextResponse.json({ ok: true });
    }
    const next = [...reporters, fingerprint];
    await payload.update({
      collection: "mural-messages",
      id,
      data: {
        reportedBy: next,
        reports: next.length,
        ...(next.length >= AUTO_HIDE_AT ? { status: "hidden" as const } : {}),
      },
      overrideAccess: true,
    });
    return NextResponse.json({ ok: true, hidden: next.length >= AUTO_HIDE_AT });
  } catch (err) {
    console.error("[mural] falha ao denunciar", err);
    return NextResponse.json({ error: "Não deu para registrar agora." }, { status: 503 });
  }
}
