"use client";

import { motion } from "motion/react";
import type { ArtistSlug } from "@/lib/artists/types";
import { ARTIST_SLUGS } from "@/lib/artists/registry";

interface BigArtistNumberProps {
  slug: ArtistSlug;
}

export function BigArtistNumber({ slug }: BigArtistNumberProps) {
  const index = ARTIST_SLUGS.indexOf(slug) + 1;
  const padded = String(index).padStart(2, "0");

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute right-0 top-0 select-none overflow-hidden"
      style={{ mixBlendMode: "difference" }}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 0.85, x: 0 }}
      transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
    >
      <span
        className="block font-display leading-[0.78] uppercase"
        style={{
          fontSize: "clamp(8rem, 26vw, 26rem)",
          color: "var(--accent)",
          letterSpacing: "-0.05em",
          padding: "0.2em 0.3em 0 0",
        }}
      >
        #{padded}
      </span>
    </motion.div>
  );
}
