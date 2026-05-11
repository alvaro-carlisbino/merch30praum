"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { WordReveal } from "@/components/motion/WordReveal";
import { BrandStamps } from "@/components/effects/BrandStamps";
import { IMG } from "@/lib/images/unsplash";

export function HeroBrand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const subtleScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 50% 60%, color-mix(in srgb, var(--accent) 14%, var(--bg)) 0%, var(--bg) 75%)",
      }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('${IMG.heroFortaleza}')`,
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
          opacity: 0.18,
          filter: "grayscale(0.7) brightness(0.55) contrast(1.1)",
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.4, 0, 0.2, 1] }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--bg) 80%)",
        }}
      />

      <motion.div
        aria-hidden
        style={{ scale: subtleScale }}
        className="absolute inset-0 pointer-events-none mix-blend-screen"
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute top-6 left-0 right-0 z-10 flex items-center justify-between px-6 sm:px-10 text-[10px] uppercase tracking-[0.4em]"
        style={{ color: "var(--muted)" }}
      >
        <span>30 · PRAUM</span>
        <span className="hidden sm:inline">EST. 2016</span>
        <span>FORTALEZA · CE</span>
      </div>

      <BrandStamps
        stamps={[
          { text: "30PRAUM\n10 ANOS", rotate: -10, top: "18%", left: "4%", delay: 1.0, variant: "ring" },
          { text: "MERCH\nOFICIAL", rotate: 8, top: "70%", right: "5%", delay: 1.2, variant: "rect" },
        ]}
      />

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[10px] uppercase tracking-[0.5em] mb-8"
          style={{ color: "var(--accent)" }}
        >
          Loja oficial · Merch
        </motion.p>

        <WordReveal
          text="30PRAUM"
          as="h1"
          stagger={0.12}
          className="font-display uppercase leading-[0.78]"
          wordClassName="text-[clamp(6rem,28vw,28rem)] tracking-[-0.05em]"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] uppercase tracking-[0.3em]"
        >
          <span style={{ color: "var(--muted)" }}>04 universos</span>
          <span aria-hidden style={{ color: "var(--accent)" }}>·</span>
          <span style={{ color: "var(--muted)" }}>03 álbuns vivos</span>
          <span aria-hidden style={{ color: "var(--accent)" }}>·</span>
          <span style={{ color: "var(--muted)" }}>10 anos de casa</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-10 max-w-xl text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--fg)", opacity: 0.85 }}
        >
          Casa de Matuê, Wiu, Teto e Brandão85. Fundada em 2016 em Fortaleza
          pra colocar o trap nordestino no centro do mapa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-12 flex flex-col sm:flex-row gap-3"
        >
          <Link
            href="#universos"
            data-cursor="Entrar na casa"
            className="px-8 py-4 text-xs uppercase tracking-[0.3em] font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Entrar na casa →
          </Link>
          <Link
            href="/about"
            data-cursor="Sobre a 30praum"
            className="px-8 py-4 text-xs uppercase tracking-[0.3em] font-medium transition-colors"
            style={{
              border: "1px solid var(--border)",
              color: "var(--fg)",
            }}
          >
            Manifesto
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.4em]"
          style={{ color: "var(--muted)" }}
        >
          scroll
        </span>
        <span
          className="block h-8 w-px"
          style={{ background: "var(--accent)" }}
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-[0.4em] z-10 hidden md:flex"
        style={{ color: "var(--muted)" }}
      >
        <span>Matuê · Wiu · Teto · Brandão85</span>
        <span>Plantão Festival · Renner · Sabor Matuê</span>
      </div>
    </section>
  );
}
