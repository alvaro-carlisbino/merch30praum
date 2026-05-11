"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ARTIST_SLUGS, ARTISTS } from "@/lib/artists/registry";
import type { ArtistSlug } from "@/lib/artists/types";
import { ArtistPortrait } from "@/components/artists/ArtistPortrait";

const PORTAL_NAME: Record<ArtistSlug, string> = {
  matue: "matue-portal",
  wiu: "wiu-portal",
  teto: "teto-portal",
  brandao: "brandao-portal",
};

export function UniversePanels() {
  const [hovered, setHovered] = useState<ArtistSlug | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative grid h-[100svh] min-h-[640px] w-full"
      style={{
        gridTemplateColumns:
          hovered && !prefersReducedMotion
            ? buildExpandedTemplate(hovered)
            : "repeat(4, 1fr)",
        transition: "grid-template-columns 700ms cubic-bezier(0.7, 0, 0.3, 1)",
      }}
      onMouseLeave={() => setHovered(null)}
      aria-label="Universos 30praum"
    >
      {ARTIST_SLUGS.map((slug) => {
        const cfg = ARTISTS[slug];
        const isHovered = hovered === slug;
        const isDimmed = hovered !== null && !isHovered;
        return (
          <Link
            key={slug}
            href={`/${slug}`}
            data-cursor={`Entrar · ${cfg.displayName}`}
            onMouseEnter={() => setHovered(slug)}
            onFocus={() => setHovered(slug)}
            onBlur={() => setHovered(null)}
            className="group relative block h-full overflow-hidden"
            style={{
              viewTransitionName: PORTAL_NAME[slug],
              background: cfg.panelBackground,
            }}
            aria-label={`Entrar no universo ${cfg.displayName}`}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: isHovered ? 1.06 : 1.0,
                opacity: isHovered ? 0.95 : 0.6,
              }}
              transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
            >
              <ArtistPortrait
                artist={cfg}
                priority
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 60%, ${cfg.panelAccent}, transparent 75%)`,
                mixBlendMode: "screen",
              }}
              animate={{ opacity: isHovered ? 0.55 : 0.22 }}
              transition={{ duration: 0.6 }}
            />

            <motion.div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: "rgba(0,0,0,1)" }}
              animate={{ opacity: isDimmed ? 0.55 : 0 }}
              transition={{ duration: 0.4 }}
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.65) 100%)",
              }}
            />

            <div className="relative flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em]">
                <span
                  style={{
                    color: isHovered ? cfg.panelAccent : "rgba(255,255,255,0.55)",
                  }}
                >
                  {String(ARTIST_SLUGS.indexOf(slug) + 1).padStart(2, "0")}
                </span>
                <span
                  className="hidden sm:inline"
                  style={{ color: cfg.panelAccent }}
                >
                  {cfg.drop.statusLabel}
                </span>
              </div>

              <div className="mt-auto">
                <motion.p
                  className="text-[10px] uppercase tracking-[0.3em] text-white/55"
                  animate={{ opacity: isHovered ? 1 : 0.6 }}
                  transition={{ duration: 0.3 }}
                >
                  {cfg.universeName}
                </motion.p>
                <motion.h2
                  className="mt-3 leading-[0.85] font-bold text-white"
                  style={{
                    fontSize: "clamp(2rem, 4.4vw, 4.5rem)",
                    letterSpacing: "-0.03em",
                    fontFamily: isHovered ? undefined : "var(--font-body, system-ui)",
                  }}
                  animate={{ y: isHovered ? -4 : 0 }}
                  transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
                >
                  {cfg.displayName}
                </motion.h2>
                <motion.p
                  className="mt-3 max-w-xs text-sm text-white/80"
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 8,
                    height: isHovered ? "auto" : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {cfg.album.title} · {cfg.album.year}
                  {cfg.album.collaborator ? ` · ${cfg.album.collaborator}` : ""}
                </motion.p>
                <motion.div
                  className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]"
                  initial={false}
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -6 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: cfg.panelAccent }}
                >
                  Entrar no universo
                  <span aria-hidden>→</span>
                </motion.div>
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

function buildExpandedTemplate(active: ArtistSlug): string {
  return ARTIST_SLUGS.map((slug) => (slug === active ? "3.4fr" : "1fr")).join(" ");
}
