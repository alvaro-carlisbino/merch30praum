"use client";

import { motion } from "motion/react";
import type { ArtistConfig } from "@/lib/artists/types";
import { DropBadge } from "../DropBadge";
import { ArtistPortrait } from "../ArtistPortrait";
import { BigArtistNumber } from "../BigArtistNumber";
import { BrandaoXerox } from "./BrandaoXerox";

export function BrandaoHero({ artist }: { artist: ArtistConfig }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        viewTransitionName: "brandao-portal",
        minHeight: "min(100vh, 1080px)",
        background: "var(--bg)",
      }}
    >
      <BigArtistNumber slug={artist.slug} />
      <BrandaoXerox />
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
        className="absolute inset-0 opacity-70 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>`,
          )}")`,
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(0,0,0,0.35) 3px, rgba(0,0,0,0.35) 4px)",
        }}
      />

      <motion.div
        aria-hidden
        className="absolute left-0 right-0 h-[20vh] z-10 pointer-events-none opacity-20"
        style={{
          background: "linear-gradient(transparent, #fff, transparent)",
          mixBlendMode: "screen",
        }}
        animate={{ top: ["-20%", "120%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      />

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24 grid lg:grid-cols-2 lg:gap-12 lg:items-end min-h-[inherit]">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="px-2 py-1 text-[10px] uppercase tracking-[0.3em]"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              85
            </span>
            <DropBadge drop={artist.drop} />
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
              CE · Fortaleza · 2026
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6, 1], x: [0, -2, 1, 0] }}
            transition={{ duration: 0.6 }}
            className="mt-6 font-display uppercase leading-[0.82]"
            style={{
              fontSize: "clamp(4rem, 18vw, 14rem)",
              letterSpacing: "0.02em",
            }}
          >
            ISSO É TRAP
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-2 inline-block px-3 py-1 font-display"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
              letterSpacing: "0.04em",
            }}
          >
            VOL. 02
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-8 max-w-lg text-sm sm:text-base text-fg/80 leading-relaxed font-mono"
          >
            {artist.manifesto}
          </motion.p>

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="mt-6 max-w-md font-display uppercase tracking-wide leading-snug text-fg/85"
            style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)" }}
          >
            “{artist.signatureLyric}”
            <cite className="block mt-2 not-italic text-[10px] uppercase tracking-[0.3em] text-muted">
              — {artist.album.title}, {artist.album.year}
            </cite>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="mt-10 grid gap-3 sm:grid-cols-2 max-w-xl"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              <span className="text-[10px] uppercase tracking-[0.3em]">
                {artist.tagline}
              </span>
            </div>
            <div
              className="px-3 py-2 text-[10px] uppercase tracking-[0.3em]"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              {artist.drop.availabilityNote}
            </div>
          </motion.div>
        </div>

        <div className="relative mt-10 aspect-[4/5] w-full overflow-hidden lg:hidden border border-border">
          <ArtistPortrait artist={artist} priority sizes="100vw" />
        </div>
      </div>
    </section>
  );
}
