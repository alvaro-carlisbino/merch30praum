"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const STATS = [
  { number: "10", label: "Anos de casa", note: "Fundada em 2016 por Matuê e Clara Mendes em Fortaleza" },
  { number: "04", label: "Universos", note: "Matuê · Wiu · Teto · Brandão85" },
  { number: "30K", label: "Plantão Festival", note: "Recorde em Fortaleza · 2 dias · Marina Park" },
  { number: "950M+", label: "Plays no álbum 333", note: "Matuê · maior estreia do Spotify Brasil" },
];

export function StatsHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      >
        <span
          className="font-display uppercase text-fg whitespace-nowrap"
          style={{
            fontSize: "clamp(12rem, 38vw, 50rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
          }}
        >
          30PRAUM
        </span>
      </motion.div>

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-8 py-24 sm:py-32">
        <ScrollReveal stagger={0.12}>
          <p
            className="text-[10px] uppercase tracking-[0.4em]"
            style={{ color: "var(--accent)" }}
          >
            EST. 2016 · FORTALEZA · CE
          </p>
          <h2
            className="mt-4 font-display uppercase leading-[0.85]"
            style={{
              fontSize: "clamp(3rem, 9vw, 7rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Não é gravadora.
            <br />
            <span style={{ color: "var(--accent)" }}>É casa.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-base sm:text-lg text-fg/80 leading-relaxed">
            A 30praum nasceu pra fazer o que ninguém fazia: descentralizar o
            trap do eixo Rio-SP e plantar o Nordeste como capital. 50+
            funcionários entre Fortaleza e SP, festival próprio, álbuns
            recorde no streaming. Esse merch é a peça física dessa história.
          </p>
        </ScrollReveal>

        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="flex flex-col"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <span
                className="font-display leading-none mt-6"
                style={{
                  fontSize: "clamp(4.5rem, 11vw, 9rem)",
                  letterSpacing: "-0.05em",
                  color: "var(--fg)",
                }}
              >
                {stat.number}
              </span>
              <span
                className="mt-4 text-[10px] uppercase tracking-[0.3em]"
                style={{ color: "var(--accent)" }}
              >
                {stat.label}
              </span>
              <span className="mt-3 text-sm text-muted leading-relaxed">
                {stat.note}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
