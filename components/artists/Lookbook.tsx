"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { ArtistConfig } from "@/lib/artists/types";

const TREATMENT_BY_PRESET: Record<
  ArtistConfig["motionPreset"],
  { mixBlend: string; opacity: number; saturate: string; tilt: number }
> = {
  glitch: {
    mixBlend: "screen",
    opacity: 0.85,
    saturate: "saturate(0.7) hue-rotate(190deg)",
    tilt: -2.5,
  },
  slow: {
    mixBlend: "soft-light",
    opacity: 0.92,
    saturate: "saturate(0.85) hue-rotate(330deg)",
    tilt: 1.8,
  },
  collage: {
    mixBlend: "multiply",
    opacity: 0.88,
    saturate: "saturate(0.65) sepia(0.35)",
    tilt: -3,
  },
  xerox: {
    mixBlend: "screen",
    opacity: 0.95,
    saturate: "grayscale(1) contrast(1.4)",
    tilt: 2,
  },
};

export function Lookbook({ artist }: { artist: ArtistConfig }) {
  const reduce = useReducedMotion();
  const treatment = TREATMENT_BY_PRESET[artist.motionPreset];

  return (
    <section
      aria-label="Lookbook editorial"
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20">
        <header className="mb-12 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
              Lookbook · capítulo {artist.album.title}
            </p>
            <h2
              className="mt-4 font-display leading-[0.9]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Vestindo {artist.universeName.toLowerCase()}.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted leading-relaxed">
            Editorial fotográfico do drop. Tratamento gráfico responde à pegada
            de {artist.displayName} — não é catálogo, é capa de revista.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-12 sm:grid-rows-[auto_auto] sm:gap-4">
          <LookFrame
            src={artist.lookbookImages[0]}
            alt={`${artist.displayName} lookbook 1`}
            label="Cena 01 · close"
            treatment={treatment}
            reduce={!!reduce}
            tilt={treatment.tilt}
            className="sm:col-span-7 aspect-[4/5]"
          />
          <LookFrame
            src={artist.lookbookImages[1]}
            alt={`${artist.displayName} lookbook 2`}
            label="Cena 02 · ambiente"
            treatment={treatment}
            reduce={!!reduce}
            tilt={-treatment.tilt}
            className="sm:col-span-5 sm:row-span-2 aspect-[3/4] sm:aspect-auto sm:h-full"
          />
          <LookFrame
            src={artist.lookbookImages[2]}
            alt={`${artist.displayName} lookbook 3`}
            label="Cena 03 · detalhe"
            treatment={treatment}
            reduce={!!reduce}
            tilt={treatment.tilt * 0.4}
            className="sm:col-span-7 aspect-[16/9]"
          />
        </div>
      </div>
    </section>
  );
}

interface LookFrameProps {
  src: string;
  alt: string;
  label: string;
  treatment: { mixBlend: string; opacity: number; saturate: string };
  reduce: boolean;
  tilt: number;
  className?: string;
}

function LookFrame({
  src,
  alt,
  label,
  treatment,
  reduce,
  tilt,
  className,
}: LookFrameProps) {
  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 40, rotate: tilt * 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      whileHover={reduce ? undefined : { rotate: tilt * 0.3, scale: 1.02 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
        border: "1px solid var(--border)",
        transformOrigin: "center",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover"
        style={{ filter: treatment.saturate }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(180deg, transparent 50%, color-mix(in srgb, var(--bg) 85%, transparent) 100%)`,
          mixBlendMode: treatment.mixBlend as React.CSSProperties["mixBlendMode"],
          opacity: treatment.opacity,
        }}
      />
      <figcaption
        className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.3em]"
        style={{ color: "rgba(255,255,255,0.85)" }}
      >
        {label}
      </figcaption>
    </motion.figure>
  );
}
