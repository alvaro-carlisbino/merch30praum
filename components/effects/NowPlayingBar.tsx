"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ARTISTS, isArtistSlug } from "@/lib/artists/registry";
import { ALBUMS, isAlbumSlug } from "@/lib/albums/registry";
import { SoundwavePulse } from "./SoundwavePulse";

export function NowPlayingBar() {
  const pathname = usePathname();
  const ctx = deriveContext(pathname);

  if (!ctx) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={ctx.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.4, ease: [0.7, 0, 0.3, 1] }}
        className="pointer-events-auto fixed bottom-4 left-4 z-[60] hidden sm:block"
      >
        <Link
          href={ctx.href}
          data-cursor={ctx.cta}
          className="group flex items-center gap-3 rounded-full backdrop-blur-md"
          style={{
            border: "1px solid var(--border)",
            background: "color-mix(in srgb, var(--bg) 70%, transparent)",
            padding: "0.4rem 0.4rem 0.4rem 0.8rem",
          }}
        >
          <span className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.3em]">
            <SoundwavePulse bars={4} size="sm" color="var(--accent)" />
            <span style={{ color: "var(--muted)" }}>{ctx.kicker}</span>
          </span>
          <span
            className="font-display text-sm uppercase tracking-wider"
            style={{ color: "var(--fg)" }}
          >
            {ctx.title}
          </span>
          <span
            className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
            }}
            aria-hidden
          >
            →
          </span>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}

interface Ctx {
  id: string;
  kicker: string;
  title: string;
  href: string;
  cta: string;
}

function deriveContext(pathname: string): Ctx | null {
  const segs = pathname.split("/").filter(Boolean);

  if (segs[0] === "album" && segs[1] && isAlbumSlug(segs[1])) {
    const album = ALBUMS[segs[1]];
    return {
      id: `album-${segs[1]}`,
      kicker: "agora tocando",
      title: album.title,
      href: `/${album.dropArtistSlug}`,
      cta: `Vestir · ${album.title}`,
    };
  }

  if (segs[0] && isArtistSlug(segs[0])) {
    const a = ARTISTS[segs[0]];
    return {
      id: `artist-${a.slug}`,
      kicker: a.drop.statusLabel,
      title: `${a.displayName} · ${a.universeName}`,
      href: `/${a.slug}#drop`,
      cta: `Drop · ${a.displayName}`,
    };
  }

  if (pathname === "/" || pathname === "/about") {
    return {
      id: "house",
      kicker: "no ar",
      title: "30praum · 10 anos",
      href: "/parcerias",
      cta: "Ver parcerias",
    };
  }

  if (segs[0] === "parcerias") {
    return {
      id: "parcerias",
      kicker: "expansões",
      title: "Renner · Plantão · Sony",
      href: "/",
      cta: "Voltar ao hub",
    };
  }

  return null;
}
