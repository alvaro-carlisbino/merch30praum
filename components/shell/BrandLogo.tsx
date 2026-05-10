interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-display, system-ui)",
        letterSpacing: "0.04em",
        fontWeight: 700,
      }}
      aria-label="30praum"
    >
      <span style={{ display: "inline-block" }}>30</span>
      <span style={{ display: "inline-block", opacity: 0.55, margin: "0 0.1em" }}>·</span>
      <span style={{ display: "inline-block" }}>PRAUM</span>
    </span>
  );
}
