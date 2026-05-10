"use client";

import { motion, useReducedMotion } from "motion/react";

const CHALLENGES = [
  {
    accusation: "Tem que ser do Sudeste pra emplacar.",
    rebuttal: "30 mil pessoas no Plantão · Fortaleza",
  },
  {
    accusation: "Independente não escala.",
    rebuttal: "950M+ plays · Sony distribui",
  },
  {
    accusation: "Trap nordestino é nicho.",
    rebuttal: "Recorde de estreia no Spotify Brasil",
  },
  {
    accusation: "Vai durar 5 minutos.",
    rebuttal: "10 anos · 4 universos · capítulo seguinte",
  },
];

export function ChallengerWall() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="challenger"
      className="relative overflow-hidden"
      style={{
        background: "var(--accent)",
        color: "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`,
          )}")`,
        }}
      />

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
        <header className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-70">
            Anti-fé · Capítulo 30praum
          </p>
          <h2
            id="challenger"
            className="mt-4 font-display uppercase leading-[0.85]"
            style={{
              fontSize: "clamp(3rem, 11vw, 11rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Disseram
            <br />
            que não dava.
          </h2>
        </header>

        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CHALLENGES.map((c, i) => (
            <motion.li
              key={i}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="flex flex-col"
              style={{ borderTop: "1.5px solid currentColor" }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-65 mt-5 mb-3 tabular-nums">
                CRÍTICA 0{i + 1}
              </span>
              <p
                className="font-display leading-tight"
                style={{
                  fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)",
                  letterSpacing: "-0.01em",
                  textDecoration: "line-through",
                  textDecorationThickness: "2px",
                  textDecorationColor: "currentColor",
                  opacity: 0.55,
                }}
              >
                {c.accusation}
              </p>
              <span
                className="mt-5 text-[10px] uppercase tracking-[0.3em]"
                style={{ opacity: 0.65 }}
              >
                Resposta:
              </span>
              <p
                className="mt-2 font-display uppercase"
                style={{
                  fontSize: "clamp(1.1rem, 1.9vw, 1.6rem)",
                  letterSpacing: "-0.01em",
                  fontWeight: 700,
                }}
              >
                {c.rebuttal}
              </p>
            </motion.li>
          ))}
        </ol>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 max-w-md text-sm sm:text-base leading-relaxed"
          style={{ opacity: 0.75 }}
        >
          A 30praum não pediu licença pra existir e não vai pedir pra continuar.
          O que vem aí é capítulo 11.
        </motion.p>
      </div>
    </section>
  );
}
