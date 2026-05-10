"use client";

import { motion, useReducedMotion } from "motion/react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const QUOTES = [
  {
    quote: "Maior estreia do Spotify Brasil.",
    source: "Rolling Stone Brasil",
    context: "sobre 333 · Matuê · 2024",
    accent: "#1f6bff",
  },
  {
    quote: "Polo do trap nordestino.",
    source: "Correio Braziliense",
    context: "30praum · Fortaleza · 2025",
    accent: "#c89858",
  },
  {
    quote: "30 mil pessoas em dois dias.",
    source: "Rolling Stone · ISTOÉ",
    context: "Plantão Festival · 2024",
    accent: "#c8506a",
  },
  {
    quote: "950 milhões de reproduções.",
    source: "Portal de Prefeitura",
    context: "Álbum 333 · streaming · 2024",
    accent: "#ff3b1f",
  },
];

export function PressQuotesWall() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="press-wall"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
        <header className="mb-16 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-end">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.4em]"
              style={{ color: "var(--accent)" }}
            >
              Disseram sobre
            </p>
            <h2
              id="press-wall"
              className="mt-4 font-display uppercase leading-[0.85]"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Imprensa
              <br />
              <span style={{ color: "var(--accent)" }}>certifica.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-fg/80 leading-relaxed">
            Não é hype interno — é registro. Os números e marcos abaixo foram
            reportados pela imprensa nacional ao longo dos últimos anos.
          </p>
        </header>

        <ol className="space-y-0">
          {QUOTES.map((q, i) => (
            <motion.li
              key={i}
              initial={reduce ? false : { opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: [0.7, 0, 0.3, 1],
              }}
              className="grid grid-cols-[auto_1fr] gap-6 sm:gap-12 py-10 group"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <span
                className="font-display tabular-nums leading-none self-start"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  letterSpacing: "0.04em",
                  color: q.accent,
                }}
              >
                0{i + 1}
              </span>

              <div>
                <blockquote
                  className="font-display uppercase leading-[0.92]"
                  style={{
                    fontSize: "clamp(2rem, 7vw, 6.5rem)",
                    letterSpacing: "-0.03em",
                    color: "var(--fg)",
                  }}
                >
                  “{q.quote}”
                </blockquote>
                <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.3em]">
                  <cite
                    className="not-italic font-semibold"
                    style={{ color: q.accent }}
                  >
                    — {q.source}
                  </cite>
                  <span style={{ color: "var(--muted)" }}>{q.context}</span>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        <ScrollReveal>
          <p
            className="mt-16 text-[10px] uppercase tracking-[0.3em]"
            style={{ color: "var(--muted)" }}
          >
            Fontes: Rolling Stone Brasil · Billboard Brasil · Correio Braziliense ·
            ISTOÉ · Portal de Prefeitura. Dados reportados entre 2024 e 2026.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
