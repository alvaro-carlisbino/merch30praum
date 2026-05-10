"use client";

import { motion } from "motion/react";
import type { ArtistConfig } from "@/lib/artists/types";
import { DropBadge } from "../DropBadge";
import { ArtistPortrait } from "../ArtistPortrait";
import { BigArtistNumber } from "../BigArtistNumber";
import { TetoEditions } from "./TetoEditions";

export function TetoHero({ artist }: { artist: ArtistConfig }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        viewTransitionName: "teto-portal",
        minHeight: "min(100vh, 1080px)",
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 35%, var(--bg)) 0%, var(--bg) 60%)",
      }}
    >
      <BigArtistNumber slug={artist.slug} />
      <TetoEditions />
      <div className="absolute inset-0 grid lg:grid-cols-[1fr_1fr]">
        <div />
        <div className="relative hidden lg:block">
          <ArtistPortrait artist={artist} priority sizes="50vw" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 55%, transparent) 30%, transparent 65%, color-mix(in srgb, var(--accent) 22%, transparent) 100%)",
            }}
          />
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3'/><feColorMatrix values='0 0 0 0 0.78 0 0 0 0 0.6 0 0 0 0 0.35 0 0 0 0.5 0'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>`,
          )}")`,
        }}
      />

      <motion.div
        aria-hidden
        initial={{ rotate: -3, x: -120, opacity: 0 }}
        animate={{ rotate: -3, x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-12 -left-6 h-10 w-44 pointer-events-none"
        style={{
          background: "color-mix(in srgb, var(--fg) 14%, transparent)",
          border: "1px solid var(--border)",
        }}
      />
      <motion.div
        aria-hidden
        initial={{ rotate: 4, x: 120, opacity: 0 }}
        animate={{ rotate: 4, x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="absolute bottom-24 -right-6 h-10 w-56 pointer-events-none"
        style={{
          background: "color-mix(in srgb, var(--accent) 25%, transparent)",
          border: "1px solid var(--border)",
        }}
      />

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24 grid lg:grid-cols-2 lg:gap-12 lg:items-end min-h-[inherit]">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 flex-wrap">
            <DropBadge drop={artist.drop} />
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
              {artist.drop.chapterName}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.55, 0, 0.45, 1] }}
            className="mt-6 font-display uppercase leading-[0.82] font-black"
            style={{
              fontSize: "clamp(4rem, 17vw, 14rem)",
              letterSpacing: "-0.04em",
            }}
          >
            COLAPSO
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.55, 0, 0.45, 1] }}
            className="font-display uppercase leading-[0.82] font-black"
            style={{
              fontSize: "clamp(3rem, 12vw, 9rem)",
              letterSpacing: "-0.04em",
              color: "var(--accent)",
            }}
          >
            GLOBAL
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 max-w-md text-sm sm:text-base text-fg/85 leading-relaxed"
          >
            {artist.manifesto}
          </motion.p>

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-md text-fg/80 leading-snug uppercase tracking-wide font-display"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)" }}
          >
            “{artist.signatureLyric}”
            <cite className="block mt-2 not-italic text-[10px] uppercase tracking-[0.3em] text-muted normal-case">
              — {artist.album.title}, {artist.album.year}
              {artist.album.collaborator ? ` · ${artist.album.collaborator}` : ""}
            </cite>
          </motion.blockquote>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span
              className="inline-block px-4 py-2 text-[10px] uppercase tracking-[0.3em]"
              style={{
                background: "color-mix(in srgb, var(--fg) 12%, transparent)",
                border: "1px dashed var(--border)",
              }}
            >
              {artist.tagline}
            </span>
            <span
              className="inline-block px-4 py-2 text-[10px] uppercase tracking-[0.3em]"
              style={{
                background: "color-mix(in srgb, var(--accent) 18%, transparent)",
                border: "1px solid color-mix(in srgb, var(--accent) 50%, transparent)",
                color: "var(--fg)",
              }}
            >
              {artist.drop.availabilityNote}
            </span>
          </div>
        </div>

        <div className="relative mt-10 aspect-[4/5] w-full overflow-hidden lg:hidden border border-border">
          <ArtistPortrait artist={artist} priority sizes="100vw" />
        </div>
      </div>
    </section>
  );
}
