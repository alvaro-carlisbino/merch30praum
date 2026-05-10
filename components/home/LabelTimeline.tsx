"use client";

import { motion, useReducedMotion } from "motion/react";
import { TIMELINE } from "@/lib/timeline/registry";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function LabelTimeline() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="label-timeline"
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
        <ScrollReveal stagger={0.12}>
          <p
            className="text-[10px] uppercase tracking-[0.4em]"
            style={{ color: "var(--accent)" }}
          >
            Linha do tempo
          </p>
          <h2
            id="label-timeline"
            className="mt-4 font-display uppercase leading-[0.85]"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              letterSpacing: "-0.03em",
            }}
          >
            10 anos da casa.
          </h2>
        </ScrollReveal>

        <ol className="mt-16 grid gap-0">
          {TIMELINE.map((entry, i) => (
            <motion.li
              key={entry.year + entry.headline}
              initial={reduce ? false : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                delay: i * 0.05,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-6 sm:gap-12 py-8 group"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <span
                className="font-display tabular-nums leading-none"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  letterSpacing: "-0.02em",
                  color: "var(--accent)",
                }}
              >
                {entry.year}
              </span>
              <div>
                <h3
                  className="font-display leading-tight"
                  style={{
                    fontSize: "clamp(1.25rem, 2.4vw, 2rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {entry.headline}
                </h3>
                <p className="mt-3 max-w-2xl text-sm sm:text-base text-fg/80 leading-relaxed">
                  {entry.detail}
                </p>
              </div>
              {entry.tag && (
                <span className="hidden sm:flex items-start text-[10px] uppercase tracking-[0.3em] text-muted">
                  {entry.tag}
                </span>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
