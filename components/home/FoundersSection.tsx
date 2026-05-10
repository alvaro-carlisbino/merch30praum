"use client";

import { motion, useReducedMotion } from "motion/react";

const FOUNDERS = [
  {
    initials: "MT",
    name: "Matuê",
    role: "Cofundador · Artista",
    detail:
      "Matheus Brasileiro Aguiar. Fortaleza, 1993. Voz e direção musical da 30praum desde o primeiro dia.",
    accent: "#1f6bff",
  },
  {
    initials: "CM",
    name: "Clara Mendes",
    role: "CEO · Cofundadora",
    detail:
      "Veio de Berlim aprender português em Fortaleza, conheceu Matuê, ficou e virou a operação inteira da casa.",
    accent: "#c8506a",
  },
  {
    initials: "LM",
    name: "Lucas Mendes",
    role: "Cofundador · Direção",
    detail:
      "Cofundador desde 2016. Comanda parte da operação criativa e o Plantão Festival ao lado de Clara e Matuê.",
    accent: "#c89858",
  },
];

export function FoundersSection() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="founders"
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
        <header className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-end mb-16">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.4em]"
              style={{ color: "var(--accent)" }}
            >
              Fundado por
            </p>
            <h2
              id="founders"
              className="mt-4 font-display uppercase leading-[0.85]"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                letterSpacing: "-0.03em",
              }}
            >
              03 nomes
              <br />
              <span style={{ color: "var(--accent)" }}>uma casa.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-fg/80 leading-relaxed">
            Em 2016, três pessoas decidiram que o trap brasileiro não precisava
            morar no eixo Rio-SP pra ser ouvido. Fortaleza virou ponto de
            partida. Dez anos depois, virou referência.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-3">
          {FOUNDERS.map((f, i) => (
            <motion.article
              key={f.name}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="group relative flex flex-col p-8 transition-all"
              style={{
                background: "color-mix(in srgb, var(--fg) 3%, var(--bg))",
                border: "1px solid var(--border)",
                minHeight: "420px",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${f.accent}33, transparent 65%)`,
                }}
              />

              <div className="relative flex items-start justify-between mb-auto">
                <span
                  className="text-[10px] uppercase tracking-[0.3em] tabular-nums"
                  style={{ color: f.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-display leading-none"
                  style={{
                    fontSize: "clamp(4rem, 8vw, 7rem)",
                    letterSpacing: "-0.04em",
                    color: f.accent,
                    opacity: 0.85,
                  }}
                >
                  {f.initials}
                </span>
              </div>

              <div className="relative mt-12">
                <h3
                  className="font-display uppercase leading-[0.95]"
                  style={{
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {f.name}
                </h3>
                <p
                  className="mt-3 text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: f.accent }}
                >
                  {f.role}
                </p>
                <p className="mt-5 text-sm text-fg/80 leading-relaxed">
                  {f.detail}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
