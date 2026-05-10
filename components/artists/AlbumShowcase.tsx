"use client";

import Link from "next/link";
import type { ArtistConfig } from "@/lib/artists/types";
import { PhysicalMedia } from "@/components/ui/PhysicalMedia";

export function AlbumShowcase({ artist }: { artist: ArtistConfig }) {
  const album = artist.album;

  return (
    <section
      aria-labelledby="album-showcase"
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="relative aspect-square w-full max-w-[640px] mx-auto">
          <PhysicalMedia
            src={album.coverImage}
            alt={`Capa ${album.title} — ${artist.displayName}`}
          />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
            Álbum em destaque
          </p>
          <h2
            id="album-showcase"
            className="mt-4 font-display leading-[0.9]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {album.title}
          </h2>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[10px] uppercase tracking-[0.3em] text-muted">
            <span>{album.year}</span>
            {album.collaborator && <span>· {album.collaborator}</span>}
            <span>· 30praum</span>
          </div>

          <p
            className="mt-8 max-w-md font-display italic"
            style={{
              fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
              lineHeight: 1.35,
              color: "var(--fg)",
            }}
          >
            “{album.tagline}”
          </p>

          <div className="mt-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted mb-4">
              Faixas em destaque
            </p>
            <ol className="space-y-2">
              {album.highlightedTracks.map((track, i) => (
                <li
                  key={track}
                  className="flex items-baseline gap-4 py-2"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span
                    className="text-[10px] tabular-nums uppercase tracking-[0.3em]"
                    style={{ color: "var(--accent)", minWidth: "2ch" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-base sm:text-lg">{track}</span>
                </li>
              ))}
            </ol>
          </div>

          <Link
            href={`/album/${albumSlugFor(artist.slug)}`}
            className="mt-10 inline-flex items-center gap-3 px-6 py-4 text-xs uppercase tracking-[0.3em] font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Ver álbum completo
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function albumSlugFor(artistSlug: ArtistConfig["slug"]): string {
  if (artistSlug === "matue") return "xtranho";
  if (artistSlug === "brandao") return "isso-e-trap-vol-2";
  return "colapso-global";
}
