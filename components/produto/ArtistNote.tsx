import Link from "next/link";
import type { ArtistConfig } from "@/lib/artists/types";

interface Props {
  artist: ArtistConfig;
  dropLabel: string;
}

export function ArtistNote({ artist, dropLabel }: Props) {
  return (
    <section
      aria-label={`Sobre o drop · ${artist.displayName}`}
      className="mx-auto max-w-screen-2xl px-4 sm:px-8"
    >
      <div
        className="grid gap-8 rounded-3xl border p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14"
        style={{ borderColor: "var(--border)" }}
      >
        <blockquote
          className="font-display leading-[1.05]"
          style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)", letterSpacing: "-0.01em" }}
        >
          “{artist.voice.epigraph}”
          <footer className="mt-4 font-body text-xs uppercase tracking-[0.28em] text-muted">
            {artist.displayName} · sobre o drop {dropLabel}
          </footer>
        </blockquote>
        <div className="flex flex-col justify-between gap-6">
          <ul className="space-y-3 text-sm leading-relaxed text-fg/85">
            {artist.voice.process.map((step) => (
              <li key={step} className="flex gap-3">
                <span aria-hidden style={{ color: "var(--accent)" }}>·</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
          <Link
            href={`/${artist.slug}`}
            data-cursor={artist.universeName}
            className="inline-flex w-fit items-center rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
            style={{ borderColor: "var(--border)" }}
          >
            Universo {artist.universeName} →
          </Link>
        </div>
      </div>
    </section>
  );
}
