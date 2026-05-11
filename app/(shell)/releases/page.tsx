import Link from "next/link";
import Image from "next/image";
import { ALBUMS, ALBUM_SLUGS } from "@/lib/albums/registry";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { WordReveal } from "@/components/motion/WordReveal";

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
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 pt-24 pb-16">
        <WordReveal
          text="Lançamentos da casa."
          as="h1"
          className="font-display uppercase leading-[0.85]"
          stagger={0.08}
          wordClassName="text-[clamp(2.5rem,10vw,9rem)] tracking-[-0.04em]"
        />
        <p className="mt-8 max-w-2xl text-base sm:text-lg text-fg/80 leading-relaxed">
          Três discos, quatro vozes, um selo. Independente desde 2016, totalmente independente
          desde 2024.
        </p>
      </section>

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 pb-24">
        <ScrollReveal stagger={0.1}>
          <div className="grid gap-6 lg:grid-cols-2">
            {albums.map((alb, idx) => (
              <Link
                key={alb.slug}
                href={`/album/${alb.slug}`}
                className="group relative flex flex-col overflow-hidden border"
                style={{ borderColor: "var(--border)", background: alb.bgHex }}
                data-cursor="Ouvir"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={alb.coverImage}
                    alt={alb.title}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.85)" }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${alb.accentHex}33, transparent 70%), linear-gradient(180deg, transparent 40%, ${alb.bgHex} 100%)`,
                    }}
                  />
                  <div className="absolute right-5 top-5">
                    <span
                      className="text-sm tabular-nums"
                      style={{ color: alb.accentHex }}
                    >
                      {alb.year}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 p-6 sm:p-8 text-white">
                  <p className="text-sm opacity-70">{alb.artists.map((a) => a.name).join(" · ")}</p>
                  <h2
                    className="font-display uppercase leading-[0.85]"
                    style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
                  >
                    {alb.title}
                  </h2>
                  <p className="text-sm text-white/75 leading-relaxed max-w-prose">{alb.tagline}</p>
                  <p className="text-xs opacity-55">
                    {alb.totalTracks} faixas · {alb.duration}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </article>
  );
}
