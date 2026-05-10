"use client";

import { motion } from "motion/react";

export function TetoEditions() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: -8 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.7, 0, 0.3, 1] }}
        className="absolute top-28 right-8 hidden md:block"
      >
        <svg viewBox="0 0 180 180" width="180" height="180">
          <defs>
            <path id="circle-text-teto" d="M 90,90 m -68,0 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0" />
          </defs>
          <circle cx="90" cy="90" r="84" fill="none" stroke="var(--accent)" strokeWidth="2.5" opacity="0.85" />
          <circle cx="90" cy="90" r="68" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
          <circle cx="90" cy="90" r="48" fill="color-mix(in srgb, var(--accent) 18%, transparent)" stroke="var(--accent)" strokeWidth="1" />
          <text
            fill="var(--accent)"
            fontFamily="Archivo Black, Impact, system-ui"
            fontSize="13"
            letterSpacing="3"
          >
            <textPath href="#circle-text-teto" startOffset="0%">
              EDIÇÃO NUMERADA · TETO × WIU · 30PRAUM ·
            </textPath>
          </text>
          <text
            x="90"
            y="78"
            textAnchor="middle"
            fontFamily="ui-monospace, Menlo, monospace"
            fontSize="9"
            fill="var(--accent)"
            letterSpacing="2"
          >
            SÉRIE
          </text>
          <text
            x="90"
            y="108"
            textAnchor="middle"
            fontFamily="Archivo Black, Impact, system-ui"
            fontSize="34"
            fill="var(--fg)"
            letterSpacing="-1"
          >
            100/100
          </text>
          <line x1="40" y1="118" x2="140" y2="118" stroke="var(--accent)" strokeWidth="0.7" opacity="0.6" />
          <text
            x="90"
            y="132"
            textAnchor="middle"
            fontFamily="ui-monospace, Menlo, monospace"
            fontSize="7"
            fill="var(--accent-2)"
            letterSpacing="3"
          >
            ED. 2026 · BR
          </text>
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute hidden md:flex top-1/2 -left-2 flex-col gap-2 items-start"
      >
        {["NUMERADA", "À MÃO", "30 PRAUM"].map((label, i) => (
          <span
            key={label}
            className="px-3 py-1 font-mono uppercase tracking-[0.3em]"
            style={{
              fontSize: "9px",
              background: "color-mix(in srgb, var(--fg) 12%, transparent)",
              border: "1px dashed var(--border)",
              color: "var(--fg)",
              transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)`,
            }}
          >
            {label}
          </span>
        ))}
      </motion.div>

      <motion.svg
        viewBox="0 0 200 90"
        width="200"
        height="90"
        className="absolute bottom-24 right-12 hidden lg:block"
        initial={{ opacity: 0, rotate: -3 }}
        animate={{ opacity: 1, rotate: -3 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <rect x="2" y="2" width="196" height="86" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 4" opacity="0.85" />
        <text x="14" y="28" fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fill="var(--accent)" letterSpacing="2">CARIMBO MANUAL</text>
        <line x1="14" y1="36" x2="186" y2="36" stroke="var(--accent)" strokeWidth="0.6" opacity="0.5" />
        <text x="14" y="58" fontFamily="Archivo Black, Impact, system-ui" fontSize="22" fill="var(--fg)" letterSpacing="-1">COLAPSO GLOBAL</text>
        <text x="14" y="76" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="var(--accent-2)" letterSpacing="3">2026 · CEARÁ · BAHIA</text>
      </motion.svg>
    </div>
  );
}
