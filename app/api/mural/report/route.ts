import { NextResponse, type NextRequest } from "next/server";
import { getPayloadClient, getViewer } from "@/lib/mural/server";

export const dynamic = "force-dynamic";

const REASONS = new Set(["ofensa", "sexual", "spam", "dados", "outro"]);
// Dado pessoal e conteúdo sexual saem mais rápido.
const HIDE_AT: Record<string, number> = { dados: 2, sexual: 2 };
const DEFAULT_HIDE_AT = 3;

type Report = { fp: string; reason: string; at: string };

export async function POST(req: NextRequest) {
  let id: number;
  let reason = "outro";
  try {
    const input = await req.json();
    id = Number(input.id);
    if (REASONS.has(String(input.reason))) reason = String(input.reason);
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }
  if (!Number.isInteger(id) || id <= 0) return NextResponse.json({ error: "Recado inválido." }, { status: 400 });

  try {
    const payload = await getPayloadClient();
    const viewer = await getViewer(payload, req.headers, { checkBan: true });
    if (viewer.banned) return NextResponse.json({ ok: true });
    const doc = await payload.findByID({
      collection: "mural-messages",
      id,
      depth: 0,
      overrideAccess: true,
      disableErrors: true,
    });
    if (!doc) return NextResponse.json({ ok: true });

    // Denúncia da equipe tira do ar na hora.
    if (viewer.isMod) {
      await payload.update({ collection: "mural-messages", id, data: { status: "hidden" }, overrideAccess: true });
      return NextResponse.json({ ok: true, hidden: true });
    }

    const raw = Array.isArray(doc.reportedBy) ? (doc.reportedBy as unknown[]) : [];
    const reports: Report[] = raw.map((r) =>
      typeof r === "string" ? { fp: r, reason: "outro", at: "" } : (r as Report),
    );
    if (reports.some((r) => r.fp === viewer.fingerprint) || doc.fingerprint === viewer.fingerprint) {
      return NextResponse.json({ ok: true });
    }
    const next = [...reports, { fp: viewer.fingerprint, reason, at: new Date().toISOString() }];
    const threshold = Math.min(
      DEFAULT_HIDE_AT,
      ...next.map((r) => HIDE_AT[r.reason] ?? DEFAULT_HIDE_AT),
    );
    const hide = next.length >= threshold;
    await payload.update({
      collection: "mural-messages",
      id,
      data: { reportedBy: next, reports: next.length, ...(hide ? { status: "hidden" as const } : {}) },
      overrideAccess: true,
    });
    return NextResponse.json({ ok: true, hidden: hide });
  } catch (err) {
    console.error("[mural] falha ao denunciar", err);
    return NextResponse.json({ error: "Não deu para registrar agora." }, { status: 503 });
  }
}
