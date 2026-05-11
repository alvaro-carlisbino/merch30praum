/**
 * Wordmark oficial 30praum — "30" serifado bold + "PRAUM" letterspacing aberto.
 * Duas variantes: `inline` (uma linha, header/nav) e `stacked` (vertical,
 * "30" gigante sobre "PRAUM", hero/footer).
 */
interface BrandLogoProps {
  className?: string;
  variant?: "inline" | "stacked";
  /** Sobrescreve cor — default usa currentColor */
  color?: string;
}

export function BrandLogo({ className, variant = "inline", color }: BrandLogoProps) {
  if (variant === "stacked") {
    return (
      <span
        className={className}
        aria-label="30praum"
        style={{
          fontFamily: "var(--font-brand)",
          color: color ?? "currentColor",
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          lineHeight: 0.85,
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: "1em",
            letterSpacing: "-0.02em",
          }}
        >
          30
        </span>
        <span
          style={{
            fontWeight: 500,
            fontSize: "0.28em",
            letterSpacing: "0.35em",
            marginTop: "0.18em",
            marginLeft: "0.35em",
          }}
        >
          PRAUM
        </span>
      </span>
    );
  }

  return (
    <span
      className={className}
      aria-label="30praum"
      style={{
        fontFamily: "var(--font-brand)",
        color: color ?? "currentColor",
        display: "inline-flex",
        alignItems: "baseline",
        gap: "0.32em",
      }}
    >
      <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>30</span>
      <span style={{ fontWeight: 500, letterSpacing: "0.3em", fontSize: "0.78em" }}>
        PRAUM
      </span>
    </span>
  );
}
