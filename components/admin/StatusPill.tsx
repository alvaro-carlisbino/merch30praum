import { statusToken, type StatusKind } from "@/lib/admin/status";

interface Props {
  kind: StatusKind;
  status: string;
}

export function StatusPill({ kind, status }: Props) {
  const t = statusToken(kind, status);
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
      style={{ background: t.bg, color: t.fg }}
    >
      {t.label}
    </span>
  );
}
