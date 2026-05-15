interface StatCardProps {
  label: string;
  value: string;
  delta?: { value: string; positive: boolean };
  foot?: string;
}

export function StatCard({ label, value, delta, foot }: StatCardProps) {
  return (
    <article
      className="rounded-2xl border p-4 sm:p-6"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
      }}
    >
      <p className="text-[9px] uppercase tracking-[0.26em] text-muted sm:text-[10px] sm:tracking-[0.3em]">
        {label}
      </p>
      <p
        className="mt-2 font-display tabular-nums leading-none sm:mt-3"
        style={{
          fontSize: "clamp(1.4rem, 3.2vw, 2.6rem)",
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </p>
      <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        {delta ? (
          <span
            className="inline-flex items-center gap-1 text-[11px] tabular-nums sm:text-xs"
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
          <span className="text-[9px] uppercase tracking-[0.24em] text-muted sm:tracking-[0.28em]">
            {foot}
          </span>
        )}
      </div>
    </article>
  );
}
