"use client";

import { motion } from "motion/react";
import type { ArtistConfig } from "@/lib/artists/types";
import { DropBadge } from "../DropBadge";
import { ArtistPortrait } from "../ArtistPortrait";
import { BigArtistNumber } from "../BigArtistNumber";
import { WiuSonnet } from "./WiuSonnet";

export function WiuHero({ artist }: { artist: ArtistConfig }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        viewTransitionName: "wiu-portal",
        minHeight: "min(100vh, 1080px)",
        background:
          "radial-gradient(ellipse at 75% 30%, rgba(232,163,168,0.28), transparent 60%), linear-gradient(180deg, var(--bg) 0%, color-mix(in srgb, var(--accent) 22%, var(--bg)) 100%)",
      }}
    >
      <BigArtistNumber slug={artist.slug} />
      <WiuSonnet />
      <div className="absolute inset-0 grid lg:grid-cols-[1fr_1fr]">
        <div />
        <div className="relative hidden lg:block">
          <ArtistPortrait artist={artist} priority sizes="50vw" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 55%, transparent) 35%, transparent 65%, color-mix(in srgb, var(--accent) 25%, transparent) 100%)",
            }}
          />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.18 0'/></filter><rect width='240' height='240' filter='url(%23n)'/></svg>`,
          )}")`,
          backgroundSize: "260px 260px",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-8 pt-32 pb-24 sm:pt-40 sm:pb-32 grid lg:grid-cols-2 lg:gap-12 lg:items-end min-h-[inherit]">
        <div className="lg:col-span-1">
          <DropBadge drop={artist.drop} />

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
            className="mt-8 font-display italic leading-[0.9]"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 11rem)",
              letterSpacing: "-0.02em",
              color: "var(--fg)",
            }}
          >
            {artist.universeName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="mt-10 max-w-lg text-base sm:text-lg leading-relaxed text-fg/90 font-display italic"
          >
            {artist.manifesto}
          </motion.p>

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-8 max-w-lg font-display italic text-fg/80 leading-snug"
            style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)" }}
          >
            “{artist.signatureLyric}”
            <cite className="block mt-3 not-italic text-[10px] uppercase tracking-[0.3em] text-muted">
              — {artist.album.title}, {artist.album.year}
              {artist.album.collaborator ? ` · ${artist.album.collaborator}` : ""}
            </cite>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-2 text-[10px] uppercase tracking-[0.3em]"
          >
            <span className="flex items-center gap-3">
              <span className="block h-px w-16" style={{ background: "var(--accent)" }} />
              <span className="text-muted">{artist.drop.chapterName}</span>
            </span>
            <span className="text-fg/80">{artist.drop.availabilityNote}</span>
          </motion.div>
        </div>

        <div className="relative mt-10 aspect-[4/5] w-full overflow-hidden lg:hidden border border-border">
          <ArtistPortrait artist={artist} priority sizes="100vw" />
        </div>
      </div>
    </section>
  );
}
