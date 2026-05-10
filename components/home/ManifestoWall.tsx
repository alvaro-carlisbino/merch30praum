"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const LINES = [
  { left: "30", right: "É BANDEIRA." },
  { left: "PRAUM", right: "É CASA." },
  { left: "QUEM MANDA", right: "É A 30PRAUM." },
];

export function ManifestoWall() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      aria-labelledby="manifesto-wall"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <motion.span
        aria-hidden
        style={{ x: bgX }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none whitespace-nowrap"
      >
        <span
          className="font-display uppercase"
          style={{
            fontSize: "clamp(20rem, 60vw, 80rem)",
            letterSpacing: "-0.05em",
            color: "var(--accent)",
            opacity: 0.05,
            lineHeight: 0.8,
          }}
        >
          30PRAUM
        </span>
      </motion.span>

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-8 py-32 sm:py-40">
        <p
          className="text-[10px] uppercase tracking-[0.4em] mb-12"
          style={{ color: "var(--accent)" }}
        >
          Manifesto · 03 atos
        </p>

        <ol className="space-y-4 sm:space-y-2">
          {LINES.map((line, i) => (
            <motion.li
              key={i}
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="grid items-baseline gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]"
            >
              <span
                className="font-display uppercase leading-[0.85]"
                style={{
                  fontSize: "clamp(3rem, 14vw, 12rem)",
                  letterSpacing: "-0.04em",
                  color: "var(--fg)",
                }}
              >
                {line.left}
              </span>
              <motion.span
                className="font-display uppercase leading-[0.85]"
                style={{
                  fontSize: "clamp(3rem, 14vw, 12rem)",
                  letterSpacing: "-0.04em",
                  color: i === LINES.length - 1 ? "var(--accent)" : "var(--muted)",
                }}
                initial={reduce ? false : { x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.15 + 0.2, ease: [0.7, 0, 0.3, 1] }}
              >
                {line.right}
              </motion.span>
            </motion.li>
          ))}
        </ol>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 max-w-xl text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          Não é gravadora. É linha do tempo. Cada peça que sai aqui é resposta
          ao que tava no estúdio quando a faixa nasceu — e quem assina é a
          casa.
        </motion.p>
      </div>
    </section>
  );
}
