"use client";

import { motion } from "motion/react";

export function WiuSonnet() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
      <motion.div
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.4, delay: 0.4 }}
        className="absolute top-32 right-8 hidden md:block"
        style={{ width: "200px", height: "200px" }}
      >
        <motion.svg
          viewBox="0 0 200 200"
          width="200"
          height="200"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="100" cy="100" r="92" fill="none" stroke="var(--accent)" strokeWidth="0.6" opacity="0.45" />
          <circle cx="100" cy="100" r="76" fill="#0a0408" stroke="var(--accent)" strokeWidth="0.4" opacity="0.7" />
          <g opacity="0.85">
            {Array.from({ length: 64 }).map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="26"
                x2="100"
                y2="32"
                stroke="var(--accent)"
                strokeWidth="0.4"
                opacity={i % 4 === 0 ? 0.9 : 0.35}
                transform={`rotate(${(i * 360) / 64} 100 100)`}
              />
            ))}
          </g>
          <circle cx="100" cy="100" r="42" fill="var(--accent)" opacity="0.85" />
          <circle cx="100" cy="100" r="18" fill="#0a0408" />
          <circle cx="100" cy="100" r="3.5" fill="var(--accent)" />
          <text
            x="100"
            y="68"
            textAnchor="middle"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="9"
            fill="#f4e8e4"
            letterSpacing="0.18em"
            opacity="0.85"
          >
            SIDE A · ÚLTIMO ROMÂNTICO
          </text>
          <text
            x="100"
            y="138"
            textAnchor="middle"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="8"
            fill="#f4e8e4"
            letterSpacing="0.22em"
            opacity="0.6"
          >
            33 RPM · WIU · 30PRAUM
          </text>
        </motion.svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-24 right-10 hidden lg:flex flex-col items-end gap-2"
        style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
      >
        <span
          className="italic"
          style={{ color: "var(--accent-2)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase" }}
        >
          Sonetos
        </span>
        <div className="flex flex-col items-end gap-0.5 text-fg/80">
          {["I. à beira", "II. medicina", "III. soneto errado"].map((s, i) => (
            <motion.span
              key={s}
              className="italic"
              style={{ fontSize: "0.95rem" }}
              animate={{ opacity: [0.55, 0.95, 0.55] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.6 }}
            >
              {s}
            </motion.span>
          ))}
        </div>
        <span
          className="block h-px w-24"
          style={{ background: "var(--accent)", opacity: 0.6 }}
        />
        <span
          className="italic"
          style={{ color: "var(--muted)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase" }}
        >
          Lado B no álbum
        </span>
      </motion.div>

      <svg
        viewBox="0 0 240 50"
        className="absolute bottom-10 left-8 hidden md:block"
        width="240"
        height="50"
        aria-hidden
      >
        <motion.path
          d="M0,25 L40,25 L48,8 L56,42 L64,18 L72,32 L80,25 L120,25 L128,12 L136,38 L144,25 L240,25"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
