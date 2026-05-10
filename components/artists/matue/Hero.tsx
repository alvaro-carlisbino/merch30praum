"use client";

import { motion } from "motion/react";
import type { ArtistConfig } from "@/lib/artists/types";
import { DropBadge } from "../DropBadge";
import { ArtistPortrait } from "../ArtistPortrait";
import { BigArtistNumber } from "../BigArtistNumber";
import { MatueSignals } from "./MatueSignals";

export function MatueHero({ artist }: { artist: ArtistConfig }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        viewTransitionName: "matue-portal",
        minHeight: "min(100vh, 1080px)",
        background:
          "radial-gradient(circle at 18% 20%, rgba(31,107,255,0.45), transparent 55%), radial-gradient(circle at 82% 80%, rgba(31,107,255,0.18), transparent 60%), var(--bg)",
      }}
    >
      <BigArtistNumber slug={artist.slug} />
      <MatueSignals />
      <div className="absolute inset-0 grid lg:grid-cols-[1fr_1fr]">
        <div />
        <div className="relative hidden lg:block">
          <ArtistPortrait artist={artist} priority sizes="50vw" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 60%, transparent) 30%, transparent 65%, color-mix(in srgb, var(--accent) 18%, transparent) 100%)",
            }}
          />
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
          maskImage: "radial-gradient(circle at 30% 50%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at 30% 50%, black, transparent 75%)",
        }}
      />

      <motion.div
        aria-hidden
        className="absolute left-0 right-0 top-1/4 h-[1px] pointer-events-none"
        style={{ background: "var(--accent)", opacity: 0.4 }}
        animate={{ scaleX: [0, 1, 0.6, 1, 0.2, 1], x: ["0%", "-5%", "5%", "0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-0 right-0 top-1/2 h-[2px] pointer-events-none"
        style={{ background: "var(--accent)", opacity: 0.8, filter: "blur(1px)" }}
        animate={{ scaleX: [0, 1.2, 0.8, 1], x: ["0%", "2%", "-2%", "0%"] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
      />
      <motion.div
        aria-hidden
        className="absolute left-0 right-0 top-3/4 h-[1px] pointer-events-none"
        style={{ background: "var(--accent-2)", opacity: 0.3 }}
        animate={{ scaleX: [0, 1, 0.4, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24 grid lg:grid-cols-2 lg:gap-12 lg:items-end min-h-[inherit]">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 flex-wrap">
            <DropBadge drop={artist.drop} />
            <span
              className="text-[10px] uppercase tracking-[0.4em] text-accent-2 opacity-80"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              Coordenadas: 333 · sinal estável
            </span>
          </div>

          <h1
            className="mt-6 font-display leading-[0.78] uppercase"
            style={{
              fontSize: "clamp(4rem, 16vw, 14rem)",
              letterSpacing: "-0.05em",
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
              className="block"
            >
              {artist.universeName}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-md text-sm sm:text-base text-fg/80 leading-relaxed"
          >
            {artist.manifesto}
          </motion.p>

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 border-l-2 pl-4 max-w-md italic text-fg/70 text-sm leading-snug"
            style={{ borderColor: "var(--accent)" }}
          >
            “{artist.signatureLyric}”
            <cite className="block mt-2 not-italic text-[10px] uppercase tracking-[0.3em] text-muted">
              — {artist.album.title}, {artist.album.year}
            </cite>
          </motion.blockquote>

          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 max-w-2xl text-[10px] uppercase tracking-[0.3em]">
            <div>
              <dt className="text-muted">Capítulo</dt>
              <dd className="mt-1 text-fg">{artist.drop.chapterName}</dd>
            </div>
            <div>
              <dt className="text-muted">Disponibilidade</dt>
              <dd className="mt-1 text-fg">{artist.drop.availabilityNote}</dd>
            </div>
            <div>
              <dt className="text-muted">Origem</dt>
              <dd className="mt-1 text-fg">CE · Brasil</dd>
            </div>
          </dl>
        </div>

        <div className="relative mt-10 aspect-[4/5] w-full overflow-hidden lg:hidden border border-border">
          <ArtistPortrait artist={artist} priority sizes="100vw" />
        </div>
      </div>
    </section>
  );
}
