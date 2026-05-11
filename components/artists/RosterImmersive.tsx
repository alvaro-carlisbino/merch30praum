"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { ArtistConfig } from "@/lib/artists/types";

/**
 * Roster imersivo no estilo twist: 4 painéis verticais. Hover expande o
 * painel e contrai os irmãos. Click leva pra página do artista.
 * Em mobile (sm-) cai pra grid normal.
 */
export function RosterImmersive({ artists }: { artists: ArtistConfig[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)] lg:h-[78vh] lg:min-h-[640px] gap-1 lg:gap-0">
      {artists.map((artist, i) => {
        const isActive = active === i;
        const isAnyActive = active !== null;
        const lgFlex = isActive ? "lg:flex-[1.6]" : isAnyActive ? "lg:flex-[0.8]" : "lg:flex-1";

        return (
          <motion.div
            key={artist.slug}
            className={`relative aspect-[3/4] sm:aspect-[3/4] lg:aspect-auto lg:h-full ${lgFlex} transition-[flex] duration-700`}
            style={{
              borderRight: i < artists.length - 1 ? "1px solid var(--border)" : undefined,
              flex: undefined,
            }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <Link
              href={`/${artist.slug}`}
              data-cursor={artist.displayName}
              className="group relative block h-full w-full overflow-hidden"
              style={{ background: artist.panelBackground }}
            >
              {/* foto */}
              <Image
                src={artist.realPhotoUrl ?? artist.portraitImage}
                alt={artist.displayName}
                fill
                unoptimized
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-1000"
                style={{
                  objectPosition: artist.photoObjectPosition,
                  filter: isActive
                    ? "brightness(0.85) contrast(1.08)"
                    : "brightness(0.55) contrast(1.05) saturate(0.85)",
                  transform: isActive ? "scale(1.02)" : "scale(1)",
                }}
                priority={i < 2}
              />

              {/* gradient overlay */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 30% 70%, ${artist.panelAccent}40, transparent 70%), linear-gradient(180deg, transparent 40%, ${artist.panelBackground}f8 100%)`,
                }}
              />

              {/* glow ring on active */}
              {!reduce && (
                <motion.div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    boxShadow: isActive
                      ? `inset 0 0 0 1px ${artist.panelAccent}99, inset 0 0 120px ${artist.panelAccent}30`
                      : "inset 0 0 0 1px rgba(255,255,255,0.05)",
                  }}
                  transition={{ duration: 0.5 }}
                />
              )}

              {/* texto */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white flex flex-col gap-3">
                <p
                  className="text-xs"
                  style={{
                    color: isActive ? artist.panelAccent : "rgba(255,255,255,0.65)",
                    transition: "color 600ms",
                  }}
                >
                  {artist.universeName}
                </p>

                <h2
                  className="font-display uppercase leading-[0.85]"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {artist.displayName}
                </h2>

                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    height: isActive ? "auto" : 0,
                  }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-white/85 leading-relaxed max-w-md mt-1">
                    {artist.tagline}
                  </p>
                  <p className="mt-4 text-[11px] opacity-65">{artist.origin}</p>
                  <div
                    className="mt-5 inline-flex items-center gap-2 text-sm border px-4 py-2 transition-colors group-hover:bg-white/10"
                    style={{ borderColor: artist.panelAccent, color: artist.panelAccent }}
                  >
                    Entrar no universo
                    <ArrowUpRight size={14} strokeWidth={1.5} />
                  </div>
                </motion.div>

                {/* fallback always-visible em mobile */}
                <div className="lg:hidden">
                  <p className="text-sm text-white/75 mt-1">{artist.tagline}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
