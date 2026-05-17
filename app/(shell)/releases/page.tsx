import Link from "next/link";
import Image from "next/image";
import { getAllAlbums } from "@/lib/cms/albums";
import { STATUS_LABEL } from "@/lib/albums/registry";

export const metadata = {
  title: "Lançamentos · 30praum",
  description:
    "Catálogo de releases da 30praum — XTRANHO, Colapso Global, Isso é Trap Vol.02 e mais.",
};

export default async function ReleasesPage() {
  const all = await getAllAlbums();
  const albums = [...all].sort(
    (a, b) =>
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
  );
  const [featured, ...rest] = albums;

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

      {featured && (
        <section className="mx-auto max-w-screen-2xl px-4 pb-12 sm:px-8">
          <Link
            href={`/album/${featured.slug}`}
            data-cursor={featured.title}
            className="group grid items-stretch overflow-hidden rounded-3xl lg:grid-cols-[1.1fr_1fr]"
            style={{ background: featured.bgHex }}
          >
            <div className="relative aspect-square lg:aspect-auto lg:min-h-[480px]">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                unoptimized
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {featured.status && (
                <span
                  className="absolute left-5 top-5 inline-flex items-center rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.28em]"
                  style={{
                    background: "rgba(0,0,0,0.72)",
                    color: featured.accentHex,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {STATUS_LABEL[featured.status]}
                </span>
              )}
            </div>

            <div
              className="flex flex-col justify-end gap-5 p-6 sm:p-10 lg:p-12"
              style={{ color: "#f5f5f5" }}
            >
              <p
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ color: featured.accentHex }}
              >
                Mais recente
              </p>
              <h2
                className="font-display uppercase leading-[0.92]"
                style={{
                  fontSize: "clamp(2rem, 4.4vw, 3.6rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                {featured.title}
              </h2>
              <p className="text-sm text-white/80">
                {featured.artists.map((a) => a.name).join(" · ")} ·{" "}
                {featured.year}
              </p>
              {featured.editorialPitch && (
                <p className="max-w-md text-base italic leading-snug text-white/90 sm:text-lg">
                  &ldquo;{featured.editorialPitch}&rdquo;
                </p>
              )}
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/65 tabular-nums">
                {featured.totalTracks} faixas · {featured.duration}
              </p>
              <span
                className="mt-2 inline-flex w-fit items-center rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] transition-colors group-hover:bg-white group-hover:text-black"
                style={{
                  borderColor: featured.accentHex,
                  color: featured.accentHex,
                }}
              >
                Ouvir agora →
              </span>
            </div>
          </Link>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mx-auto max-w-screen-2xl px-4 pb-20 sm:px-8 sm:pb-24">
          <h2
            className="mb-6 text-[10px] uppercase tracking-[0.4em] text-muted"
            id="catalogo-anterior"
          >
            Catálogo
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {rest.map((alb) => (
              <li key={alb.slug}>
                <Link
                  href={`/album/${alb.slug}`}
                  data-cursor={alb.title}
                  className="group block"
                >
                  <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{
                      aspectRatio: "1 / 1",
                      background: alb.bgHex,
                    }}
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
                      <p className="mt-3 text-sm italic leading-snug text-fg/85">
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
      )}
    </>
  );
}
