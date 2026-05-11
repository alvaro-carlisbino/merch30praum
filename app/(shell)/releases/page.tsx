import Link from "next/link";
import Image from "next/image";
import { ALBUMS, ALBUM_SLUGS, STATUS_LABEL } from "@/lib/albums/registry";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { WaveformTimeline } from "@/components/releases/WaveformTimeline";

export const metadata = {
  title: "Lançamentos · 30praum",
  description:
    "Catálogo de releases da 30praum — XTRANHO, Colapso Global, Isso é Trap Vol.02 e mais.",
};

export default function ReleasesPage() {
  const albums = ALBUM_SLUGS.map((s) => ALBUMS[s]).sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
  );

  return (
    <article>
      {/* HERO */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 pt-24 pb-12">
        <WordReveal
          text="Lançamentos da casa."
          as="h1"
          className="font-display uppercase leading-[0.85]"
          stagger={0.08}
          wordClassName="text-[clamp(2.5rem,10vw,9rem)] tracking-[-0.04em]"
        />
        <p className="mt-8 max-w-2xl text-base sm:text-lg text-fg/80 leading-relaxed">
          Três discos, quatro vozes, um selo. Independente desde 2016, totalmente independente desde 2024.
        </p>
      </section>

      {/* WAVEFORM TIMELINE */}
      <section
        className="border-y"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-6 sm:px-12 py-16">
          <p className="text-xs opacity-55 mb-6 uppercase tracking-[0.3em]">
            Cronologia
          </p>
          <WaveformTimeline albums={albums} />
        </div>
      </section>

      {/* GRID COM CAPA DOMINANTE 80/20 — Stones Throw style */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
        <h2
          className="font-display uppercase leading-[0.9] mb-12"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
        >
          Catálogo aberto.
        </h2>

        <ScrollReveal stagger={0.1}>
          <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((alb) => (
              <Link
                key={alb.slug}
                href={`/album/${alb.slug}`}
                data-cursor={alb.title}
                className="group block"
              >
                {/* Capa dominante — 100% da largura, quase quadrada */}
                <div
                  className="relative aspect-square overflow-hidden"
                  style={{ background: alb.bgHex }}
                >
                  <Image
                    src={alb.coverImage}
                    alt={alb.title}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Status badge — Stones Throw style */}
                  {alb.status && (
                    <span
                      className="absolute top-3 left-3 px-2 py-1 text-[9px] uppercase tracking-[0.25em]"
                      style={{
                        background: "rgba(0,0,0,0.75)",
                        color: alb.accentHex,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {STATUS_LABEL[alb.status]}
                    </span>
                  )}

                  {/* Ano canto inferior */}
                  <span
                    className="absolute bottom-3 right-3 font-display text-sm tabular-nums opacity-90"
                    style={{ color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
                  >
                    {alb.year}
                  </span>
                </div>

                {/* Texto seco abaixo — só metadados */}
                <div className="mt-4 px-1">
                  <h3
                    className="font-display text-2xl leading-[0.95]"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {alb.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-fg/70">
                    {alb.artists.map((a) => a.name).join(" · ")}
                  </p>
                  {alb.editorialPitch && (
                    <p className="mt-3 text-sm italic text-fg/85 leading-snug">
                      "{alb.editorialPitch}"
                    </p>
                  )}
                  <p className="mt-4 text-[10px] uppercase tracking-[0.25em] opacity-55 tabular-nums">
                    {alb.totalTracks} faixas · {alb.duration}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </article>
  );
}
