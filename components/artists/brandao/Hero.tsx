import type { ArtistConfig } from "@/lib/artists/types";
import { ArtistPortrait } from "../ArtistPortrait";

/**
 * Hero do Brandão85 — foto domina, tipografia conduz.
 * Identidade "xerox" vem do filtro aplicado pela ArtistPortrait
 * (alto contraste, grayscale parcial), não de overlays decorativos.
 */
export function BrandaoHero({ artist }: { artist: ArtistConfig }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        viewTransitionName: "brandao-portal",
        minHeight: "min(100svh, 1080px)",
        background: "var(--bg)",
      }}
    >
      {/* Foto à direita, ocupa metade em desktop */}
      <div className="absolute inset-0 grid lg:grid-cols-[1fr_1fr]">
        <div />
        <div className="relative hidden lg:block">
          <ArtistPortrait artist={artist} priority sizes="50vw" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 60%, transparent) 35%, transparent 70%)",
            }}
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-8 pt-32 pb-20 grid lg:grid-cols-2 lg:gap-12 lg:items-center min-h-[inherit]">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-65">
            {artist.origin} · {artist.album.year}
          </p>

          <h1
            className="mt-6 font-display uppercase leading-[0.82]"
            style={{
              fontSize: "clamp(3.5rem, 16vw, 12rem)",
              letterSpacing: "0.01em",
            }}
          >
            ISSO É TRAP
          </h1>
          <p
            className="mt-2 inline-block px-3 py-1 font-display"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              fontSize: "clamp(1.2rem, 2.6vw, 2rem)",
              letterSpacing: "0.04em",
            }}
          >
            VOL. 02
          </p>

          <p className="mt-10 max-w-lg text-base text-fg/80 leading-relaxed">
            {artist.manifesto}
          </p>

          <blockquote
            className="mt-8 max-w-md font-display leading-snug text-fg/85"
            style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)" }}
          >
            "{artist.signatureLyric}"
            <cite className="block mt-3 not-italic text-[10px] uppercase tracking-[0.3em] opacity-55">
              — {artist.album.title} · {artist.album.year}
            </cite>
          </blockquote>
        </div>

        {/* Foto mobile (abaixo do texto) */}
        <div className="relative mt-12 aspect-[4/5] w-full overflow-hidden lg:hidden border border-border">
          <ArtistPortrait artist={artist} priority sizes="100vw" />
        </div>
      </div>
    </section>
  );
}
