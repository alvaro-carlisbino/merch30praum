import type { ArtistConfig } from "@/lib/artists/types";

const STATUS_COLOR: Record<ArtistConfig["drop"]["status"], string> = {
  live: "var(--accent)",
  debut: "var(--accent)",
  encore: "var(--accent-2)",
  soldout: "var(--muted)",
};

interface DropBadgeProps {
  drop: ArtistConfig["drop"];
  className?: string;
}

export function DropBadge({ drop, className }: DropBadgeProps) {
  const isPulsing = drop.status === "live" || drop.status === "debut";
  const color = STATUS_COLOR[drop.status];

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
        padding: "0.4rem 0.7rem",
        border: `1px solid ${drop.status === "debut" ? "var(--accent)" : "var(--border)"}`,
        background:
          drop.status === "debut"
            ? "color-mix(in srgb, var(--accent) 14%, transparent)"
            : "color-mix(in srgb, var(--fg) 6%, transparent)",
        fontSize: "10px",
        textTransform: "uppercase",
        letterSpacing: "0.28em",
        color,
      }}
    >
      <span
        aria-hidden
        style={{
          height: "0.5rem",
          width: "0.5rem",
          borderRadius: "999px",
          background: color,
          boxShadow: isPulsing
            ? `0 0 0 4px color-mix(in srgb, ${color} 18%, transparent)`
            : undefined,
        }}
      />
      {drop.statusLabel}
    </div>
  );
}
