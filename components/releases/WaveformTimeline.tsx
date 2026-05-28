"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { STATUS_LABEL, type AlbumPageInfo } from "@/lib/albums/registry";
export function WaveformTimeline({ albums }: { albums: AlbumPageInfo[] }) {
  const reduce = useReducedMotion();
  const sorted = [...albums].sort(
    (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime(),
  );
  const tMin = new Date(sorted[0].releaseDate).getTime();
  const tMax = new Date(sorted[sorted.length - 1].releaseDate).getTime();
  const span = Math.max(tMax - tMin, 1);
  const positions = sorted.map((a) => {
    const t = new Date(a.releaseDate).getTime();
    return ((t - tMin) / span) * 100;
  });
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const years = Array.from(new Set(sorted.map((a) => a.year))).sort();
  return (
    <div className="relative w-full">
      <div className="relative h-[24rem] sm:h-[32rem]">
        <div className="absolute inset-x-0 top-0 flex justify-between text-[10px] uppercase tracking-[0.3em] opacity-55">
          {years.map((year) => (
            <span key={year} className="font-display tabular-nums">
              {year}
            </span>
          ))}
        </div>
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px"
          style={{ background: "var(--border)" }}
          aria-hidden
        />
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-2 opacity-30"
          aria-hidden
        >
          {Array.from({ length: 48 }).map((_, i) => {
            const h = 4 + ((i * 7) % 5) * 4;
            return (
              <span
                key={i}
                className="w-px"
                style={{ height: h, background: "var(--fg)" }}
              />
            );
          })}
        </div>
        {sorted.map((album, idx) => {
          const isActive = activeIdx === idx;
          const above = idx % 2 === 0;
          const left = positions[idx];
          return (
            <Link
              key={album.slug}
              href={`/album/${album.slug}`}
              data-cursor={album.title}
              className="absolute"
              style={{
                left: `${left}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              <motion.div
                initial={false}
                animate={{
                  opacity: 1,
                  y: above ? "-110%" : "110%",
                  scale: isActive ? 1 : 0.92,
                }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                }
                className="absolute left-1/2 -translate-x-1/2 w-32 sm:w-44 pointer-events-none"
                style={{
                  top: above ? "auto" : 0,
                  bottom: above ? 0 : "auto",
                }}
              >
                <div
                  className="aspect-square overflow-hidden border"
                  style={{
                    borderColor: isActive ? album.accentHex : "var(--border)",
                    boxShadow: isActive
                      ? `0 0 32px ${album.accentHex}50`
                      : "none",
                    transition: "border-color 300ms, box-shadow 300ms",
                  }}
                >
                  <Image
                    src={album.coverImage}
                    alt={album.title}
                    width={400}
                    height={400}
                    unoptimized
                    className="w-full h-full object-cover"
                    style={{
                      filter: isActive ? "brightness(1)" : "brightness(0.78)",
                      transition: "filter 300ms",
                    }}
                  />
                </div>
                <div className="mt-2 px-1">
                  <p
                    className="font-display text-sm leading-tight"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {album.title}
                  </p>
                  <p className="text-[10px] opacity-65 tabular-nums">
                    {album.artists.map((a) => a.name).join(" · ")}
                  </p>
                </div>
              </motion.div>
              <span
                className="relative block rounded-full transition-all"
                style={{
                  width: isActive ? 16 : 10,
                  height: isActive ? 16 : 10,
                  background: album.accentHex,
                  boxShadow: isActive
                    ? `0 0 0 4px var(--bg), 0 0 0 5px ${album.accentHex}`
                    : `0 0 0 3px var(--bg), 0 0 0 4px var(--border)`,
                }}
              />
              {album.status && (
                <span
                  className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-[9px] uppercase tracking-[0.3em] px-2 py-0.5"
                  style={{
                    top: "100%",
                    color: album.accentHex,
                    opacity: isActive ? 1 : 0.55,
                    transition: "opacity 300ms",
                  }}
                >
                  {STATUS_LABEL[album.status]}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
