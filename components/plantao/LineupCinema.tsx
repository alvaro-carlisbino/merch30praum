"use client";

import { motion, useReducedMotion } from "motion/react";
import type { LineupArtist } from "@/lib/plantao/registry";

export function LineupCinema({ lineup }: { lineup: LineupArtist[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="lineup-cinema flex flex-col">
      {lineup.map((artist, idx) => (
        <motion.section
          key={`${artist.displayName}-${idx}`}
          className="relative isolate flex min-h-[85svh] items-end overflow-hidden border-b"
          style={{ borderColor: "var(--border)" }}
          initial={reduce ? undefined : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* background */}
          <div
            aria-hidden
            className="absolute inset-0 -z-20"
            style={{
              backgroundImage: `url(${artist.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
              filter:
                artist.isHeadliner
                  ? "brightness(0.55) contrast(1.2) saturate(1.15)"
                  : "brightness(0.4) contrast(1.1) saturate(1.05)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(6,3,10,0.1) 0%, rgba(6,3,10,0.7) 70%, rgba(6,3,10,0.98) 100%)",
            }}
          />
          {artist.isHeadliner && (
            <div aria-hidden className="absolute inset-0 -z-10 plantao-bloodglow" />
          )}

          <div className="relative mx-auto w-full max-w-screen-2xl px-4 sm:px-8 pb-16 sm:pb-24">
            {(artist.isHeadliner || artist.isSpecial) && (
              <span
                className="text-sm"
                style={{ color: artist.isHeadliner ? "var(--accent)" : "var(--fg)", opacity: 0.85 }}
              >
                {artist.isHeadliner ? "Headliner" : "Show especial"}
              </span>
            )}

            <motion.h2
              className="mt-4 font-display uppercase leading-[0.82]"
              style={{
                fontSize: "clamp(3rem, 16vw, 14rem)",
                letterSpacing: "-0.04em",
                color: artist.isHeadliner ? "var(--fg)" : "var(--fg)",
                textShadow: artist.isHeadliner
                  ? "0 0 24px rgba(255,45,45,0.35)"
                  : "0 0 16px rgba(0,0,0,0.5)",
              }}
              initial={reduce ? undefined : { y: 40 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
            >
              {artist.displayName}
            </motion.h2>

            {artist.highlightLabel && (
              <p className="mt-6 max-w-xl text-base sm:text-xl text-fg/85">{artist.highlightLabel}</p>
            )}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
