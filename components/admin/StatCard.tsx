interface StatCardProps {
  label: string;
  value: string;
  delta?: { value: string; positive: boolean };
  foot?: string;
}

export function StatCard({ label, value, delta, foot }: StatCardProps) {
  return (
    <article
      className="rounded-2xl border p-5 sm:p-6"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
      }}
    >
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
        {label}
      </p>
      <p
        className="mt-3 font-display tabular-nums leading-none"
        style={{
          fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)",
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </p>
      <div className="mt-3 flex items-center justify-between gap-3">
        {delta ? (
          <span
            className="inline-flex items-center gap-1 text-xs tabular-nums"
            style={{
              color: delta.positive ? "#37d18a" : "#ff5577",
            }}
          >
            <span aria-hidden>{delta.positive ? "▲" : "▼"}</span>
            {delta.value}
          </span>
        ) : (
          <span />
        )}
        {foot && (
          <span className="text-[9px] uppercase tracking-[0.28em] text-muted">
            {foot}
          </span>
        )}
      </div>
    </article>
  );
}
