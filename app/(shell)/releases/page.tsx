import Link from "next/link";
import Image from "next/image";
import { ALBUMS, ALBUM_SLUGS, STATUS_LABEL } from "@/lib/albums/registry";

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
    <>
      <section className="mx-auto max-w-screen-2xl px-4 pt-16 pb-10 sm:px-8 sm:pt-20">
        <h1
          className="font-display uppercase leading-[0.92]"
          style={{
            fontSize: "clamp(2.4rem, 5.8vw, 4.8rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Lançamentos
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-fg/80 sm:text-base">
          Três discos, quatro vozes, um selo. Catálogo aberto da 30praum.
        </p>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 pb-20 sm:px-8 sm:pb-24">
        <ul className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {albums.map((alb) => (
            <li key={alb.slug}>
              <Link
                href={`/album/${alb.slug}`}
                data-cursor={alb.title}
                className="group block"
              >
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{ aspectRatio: "1 / 1", background: alb.bgHex }}
                >
                  <Image
                    src={alb.coverImage}
                    alt={alb.title}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {alb.status && (
                    <span
                      className="absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.28em]"
                      style={{
                        background: "rgba(0,0,0,0.72)",
                        color: alb.accentHex,
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {STATUS_LABEL[alb.status]}
                    </span>
                  )}
                  <span
                    className="absolute bottom-4 right-4 font-display text-sm tabular-nums text-white/90"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                  >
                    {alb.year}
                  </span>
                </div>

                <div className="mt-4">
                  <h3
                    className="font-display uppercase leading-tight"
                    style={{
                      fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {alb.title}
                  </h3>
                  <p className="mt-1 text-sm text-fg/70">
                    {alb.artists.map((a) => a.name).join(" · ")}
                  </p>
                  {alb.editorialPitch && (
                    <p className="mt-3 text-sm italic text-fg/85 leading-snug">
                      &ldquo;{alb.editorialPitch}&rdquo;
                    </p>
                  )}
                  <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-muted tabular-nums">
                    {alb.totalTracks} faixas · {alb.duration}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
