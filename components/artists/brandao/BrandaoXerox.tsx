"use client";

import { motion } from "motion/react";

export function BrandaoXerox() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: -6 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.7, 0, 0.3, 1] }}
        className="absolute top-28 right-10 hidden md:block"
      >
        <svg viewBox="0 0 180 180" width="180" height="180">
          <rect x="20" y="20" width="140" height="140" fill="var(--accent)" />
          <rect x="20" y="20" width="140" height="140" fill="none" stroke="var(--fg)" strokeWidth="3" />
          <rect x="32" y="32" width="116" height="116" fill="none" stroke="var(--bg)" strokeWidth="0.7" strokeDasharray="3 2" />
          <text
            x="90"
            y="120"
            textAnchor="middle"
            fontFamily="Anton, Impact, system-ui"
            fontSize="120"
            fill="var(--bg)"
            letterSpacing="-2"
          >
            85
          </text>
          <text
            x="90"
            y="44"
            textAnchor="middle"
            fontFamily="ui-monospace, Menlo, monospace"
            fontSize="8"
            fill="var(--bg)"
            letterSpacing="3"
          >
            OFICIAL · ESTAMPA
          </text>
          <text
            x="90"
            y="148"
            textAnchor="middle"
            fontFamily="ui-monospace, Menlo, monospace"
            fontSize="7"
            fill="var(--bg)"
            letterSpacing="2.5"
          >
            BORDADO · ED. 2026
          </text>
        </svg>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute top-1/4 left-6 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <svg viewBox="0 0 90 90" width="90" height="90">
          <line x1="45" y1="0" x2="45" y2="90" stroke="var(--accent)" strokeWidth="0.6" />
          <line x1="0" y1="45" x2="90" y2="45" stroke="var(--accent)" strokeWidth="0.6" />
          <circle cx="45" cy="45" r="22" fill="none" stroke="var(--accent)" strokeWidth="0.6" />
          <circle cx="45" cy="45" r="38" fill="none" stroke="var(--accent)" strokeWidth="0.4" strokeDasharray="2 3" />
          <text
            x="48"
            y="14"
            fontFamily="ui-monospace, Menlo, monospace"
            fontSize="7"
            fill="var(--accent)"
            letterSpacing="2"
          >
            REG MARK
          </text>
        </svg>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute bottom-28 left-8 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        style={{
          width: "120px",
          height: "120px",
          background:
            "radial-gradient(circle, var(--accent) 1.5px, transparent 2px)",
          backgroundSize: "8px 8px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: -30, rotate: -2 }}
        animate={{ opacity: 1, x: 0, rotate: -2 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="absolute hidden lg:block bottom-20 left-10"
        style={{
          background: "var(--accent)",
          color: "var(--bg)",
          padding: "6px 14px",
          fontFamily: "ui-monospace, Menlo, monospace",
          fontSize: "10px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          boxShadow: "3px 3px 0 var(--fg)",
        }}
      >
        CEP 60.000 · FORTALEZA · CE
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute right-0 top-1/2 hidden md:flex flex-col gap-1 pr-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="block"
            style={{
              width: i % 2 === 0 ? "32px" : "18px",
              height: "2px",
              background: "var(--accent)",
              opacity: 0.7,
            }}
          />
        ))}
        <span
          style={{
            fontFamily: "ui-monospace, Menlo, monospace",
            fontSize: "7px",
            color: "var(--accent)",
            letterSpacing: "0.2em",
            marginTop: "4px",
          }}
        >
          BARCODE 85
        </span>
      </motion.div>
    </div>
  );
}
