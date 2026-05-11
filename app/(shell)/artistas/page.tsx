import Link from "next/link";
import Image from "next/image";
import { ARTISTS, ARTIST_SLUGS } from "@/lib/artists/registry";
import { WordReveal } from "@/components/motion/WordReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata = {
  title: "Artistas · 30praum",
  description:
    "Roster oficial da 30praum — Matuê, Wiu, Teto, Brandão85. Cada artista, um universo.",
};

export default function ArtistasPage() {
  const artists = ARTIST_SLUGS.map((s) => ARTISTS[s]);

  return (
    <article>
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 pt-24 pb-12">
        <WordReveal
          text="Quatro almas. Uma assinatura."
          as="h1"
          className="font-display uppercase leading-[0.85]"
          stagger={0.08}
          wordClassName="text-[clamp(2.5rem,10vw,9rem)] tracking-[-0.04em]"
        />
        <p className="mt-8 max-w-2xl text-base sm:text-lg text-fg/80 leading-relaxed">
          Cada artista da casa tem universo próprio. Quem manda é a 30praum.
        </p>
      </section>

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 pb-24">
        <ScrollReveal stagger={0.1}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {artists.map((artist, idx) => (
              <Link
                key={artist.slug}
                href={`/${artist.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden border"
                style={{ borderColor: "var(--border)", background: artist.panelBackground }}
                data-cursor={`Entrar · ${artist.displayName}`}
              >
                <Image
                  src={artist.realPhotoUrl ?? artist.portraitImage}
                  alt={artist.displayName}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{
                    filter: "brightness(0.7) contrast(1.1)",
                    objectPosition: artist.photoObjectPosition,
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 50% 60%, ${artist.panelAccent}55, transparent 70%), linear-gradient(180deg, transparent 50%, ${artist.panelBackground}f0 100%)`,
                  }}
                />
                <div className="relative flex h-full flex-col justify-end p-5 text-white">
                  <p className="text-xs opacity-65">{artist.universeName}</p>
                  <h2
                    className="mt-2 font-display uppercase text-3xl sm:text-4xl"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {artist.displayName}
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-white/75 line-clamp-2">
                    {artist.tagline}
                  </p>
                  <p className="mt-4 text-[11px] opacity-55">{artist.origin}</p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Incubadora CTA */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2
              className="font-display uppercase leading-[0.9]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Quer chegar até aqui?
            </h2>
            <p className="mt-4 max-w-md text-fg/80">
              A Incubadora é o canal de candidatura. O A&R lê tudo, sem deadline e sem fila.
            </p>
          </div>
          <Link
            href="/incubadora"
            className="inline-flex items-center gap-3 px-8 py-5 text-xs uppercase tracking-[0.3em] font-medium transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Incubadora →
          </Link>
        </div>
      </section>
    </article>
  );
}
