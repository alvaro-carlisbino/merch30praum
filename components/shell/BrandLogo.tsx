import Image from "next/image";

/**
 * Wordmark oficial 30PRAUM. Usa o PNG vetorizado do Figma (figma-home/logo-30praum.png)
 * com '30' + 'PRAUM' nas proporções corretas. Duas variantes:
 *  - `inline` (default): 30 + PRAUM lado a lado (header)
 *  - `stacked`: '30' grande em cima, 'PRAUM' como wordmark abaixo (hero/footer)
 */
interface BrandLogoProps {
  className?: string;
  variant?: "inline" | "stacked";
}

export function BrandLogo({ className, variant = "inline" }: BrandLogoProps) {
  if (variant === "stacked") {
    return (
      <span
        className={className}
        aria-label="30praum"
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          lineHeight: 0.85,
          fontFamily: "var(--font-brand)",
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
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <Image
        src="/figma-home/logo-30praum.png"
        alt="30 PRAUM"
        width={221}
        height={44}
        priority
        style={{
          height: "clamp(20px, 2.2vw, 32px)",
          width: "auto",
        }}
      />
    </span>
  );
}
