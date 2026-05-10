"use client";

import { motion, useReducedMotion } from "motion/react";

interface StampDef {
  text: string;
  rotate: number;
  top: string;
  right?: string;
  left?: string;
  delay: number;
  variant: "ring" | "rect" | "ribbon";
  color?: string;
}

interface BrandStampsProps {
  stamps?: StampDef[];
  className?: string;
}

const DEFAULTS: StampDef[] = [
  { text: "30PRAUM\nCERTIFIED", rotate: -8, top: "8%", right: "5%", delay: 0.1, variant: "ring" },
  { text: "MERCH\nOFICIAL", rotate: 6, top: "55%", left: "3%", delay: 0.25, variant: "rect" },
  { text: "BR · CE", rotate: -4, top: "32%", right: "8%", delay: 0.4, variant: "ribbon" },
  { text: "ED.\n2026", rotate: 12, top: "78%", right: "12%", delay: 0.55, variant: "rect" },
];

export function BrandStamps({ stamps = DEFAULTS, className }: BrandStampsProps) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {stamps.map((s, i) => (
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: s.rotate * 1.6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: s.rotate }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            delay: s.delay,
            ease: [0.7, 0, 0.3, 1],
          }}
          className="absolute"
          style={{
            top: s.top,
            right: s.right,
            left: s.left,
            color: s.color ?? "var(--accent)",
            mixBlendMode: "difference",
          }}
        >
          <Stamp variant={s.variant} text={s.text} />
        </motion.div>
      ))}
    </div>
  );
}

function Stamp({ variant, text }: { variant: StampDef["variant"]; text: string }) {
  const style: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(0.6rem, 0.9vw, 0.85rem)",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    lineHeight: 1.05,
    whiteSpace: "pre-line",
    textAlign: "center",
    fontWeight: 700,
    padding: "0.7rem 1rem",
    color: "currentColor",
  };

  if (variant === "ring") {
    return (
      <div
        style={{
          ...style,
          border: "1.5px solid currentColor",
          borderRadius: "999px",
          background:
            "radial-gradient(circle at 50% 50%, transparent 50%, color-mix(in srgb, currentColor 12%, transparent) 100%)",
          width: "8rem",
          height: "8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        {text}
      </div>
    );
  }
  if (variant === "rect") {
    return (
      <div
        style={{
          ...style,
          border: "1.5px dashed currentColor",
          padding: "0.6rem 1.2rem",
        }}
      >
        {text}
      </div>
    );
  }
  return (
    <div
      style={{
        ...style,
        background: "currentColor",
        color: "var(--bg)",
        padding: "0.4rem 1rem",
        boxShadow: "3px 3px 0 currentColor",
      }}
    >
      <span style={{ filter: "invert(1)" }}>{text}</span>
    </div>
  );
}
