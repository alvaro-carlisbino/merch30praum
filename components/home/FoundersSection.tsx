"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { IMG } from "@/lib/images/unsplash";

const FOUNDERS = [
  {
    name: "Matuê",
    role: "Cofundador · Artista",
    detail:
      "Matheus Brasileiro Aguiar. Fortaleza, 1993. Voz e direção musical da 30praum desde o primeiro dia.",
    accent: "#1f6bff",
    photo: IMG.founderMatue,
    photoPosition: "center 28%",
  },
  {
    name: "Clara Mendes",
    role: "CEO · Cofundadora",
    detail:
      "Veio de Berlim aprender português em Fortaleza, conheceu Matuê, ficou e virou a operação inteira da casa.",
    accent: "#c8506a",
    photo: IMG.founderClara,
    photoPosition: "center 30%",
  },
  {
    name: "Lucas Degas",
    role: "Cofundador · Direção",
    detail:
      "Cofundador desde 2016. Comanda parte da operação criativa e o Plantão Festival ao lado de Clara e Matuê.",
    accent: "#c89858",
    photo: IMG.founderLucas,
    photoPosition: "center 28%",
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
          <h2
            id="founders"
            className="font-display uppercase leading-[0.85]"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Três nomes,
            <br />
            <span style={{ color: "var(--accent)" }}>uma casa.</span>
          </h2>
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
              className="group relative overflow-hidden border flex flex-col"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={f.photo}
                  alt={f.name}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{
                    objectPosition: f.photoPosition,
                    filter: "brightness(0.78) contrast(1.05) saturate(0.95)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 50%, var(--bg) 100%), radial-gradient(circle at 30% 25%, ${f.accent}22, transparent 60%)`,
                  }}
                />
              </div>

              <div className="relative p-6 sm:p-7">
                <h3
                  className="font-display uppercase leading-[0.95]"
                  style={{
                    fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {f.name}
                </h3>
                <p
                  className="mt-2 text-sm"
                  style={{ color: f.accent }}
                >
                  {f.role}
                </p>
                <p className="mt-4 text-sm text-fg/75 leading-relaxed">
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
