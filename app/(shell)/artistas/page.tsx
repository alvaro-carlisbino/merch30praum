import Image from "next/image";
import Link from "next/link";
import { ARTISTS, ARTIST_SLUGS } from "@/lib/artists/registry";

export const metadata = {
  title: "Artistas · 30praum",
  description:
    "Roster oficial da 30praum — Matuê, Wiu, Teto, Brandão85. Cada artista, um universo.",
};

const CARDS: Record<string, { photo: string; aspect: string }> = {
  teto: { photo: "/figma-home/card-teto.png", aspect: "229 / 418" },
  wiu: { photo: "/figma-home/card-wiu.png", aspect: "230 / 341" },
  matue: { photo: "/figma-home/card-matue.png", aspect: "230 / 341" },
  brandao: { photo: "/figma-home/card-brandao.png", aspect: "229 / 418" },
};

export default function ArtistasPage() {
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
          Roster
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-fg/80 sm:text-base">
          Quatro almas, uma assinatura. Cada artista da casa tem universo próprio.
        </p>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 pb-20 sm:px-8 sm:pb-24">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {ARTIST_SLUGS.map((slug) => {
            const a = ARTISTS[slug];
            const card = CARDS[slug];
            return (
              <li key={slug}>
                <Link
                  href={`/${slug}`}
                  data-cursor={a.displayName}
                  className="group block"
                >
                  <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{
                      aspectRatio: "5 / 8",
                      background: a.panelBackground,
                    }}
                  >
                    {card && (
                      <Image
                        src={card.photo}
                        alt={a.displayName}
                        fill
                        sizes="(min-width: 640px) 25vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    <p
                      className="text-[10px] uppercase tracking-[0.3em]"
                      style={{ color: a.panelAccent }}
                    >
                      {a.universeName}
                    </p>
                    <h2
                      className="mt-2 font-display uppercase leading-tight"
                      style={{
                        fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {a.displayName}
                    </h2>
                    <p className="mt-1 text-xs text-muted">
                      {a.realName} · {a.origin}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto grid max-w-screen-2xl gap-6 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2
              className="font-display uppercase leading-[0.92]"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Quer chegar até aqui?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-fg/80 sm:text-base">
              A Incubadora é o canal de candidatura. O A&R lê tudo, sem deadline
              e sem fila.
            </p>
          </div>
          <Link
            href="/incubadora"
            data-cursor="Incubadora"
            className="inline-flex items-center rounded-full border px-6 py-3 text-sm transition-colors hover:bg-white hover:text-black"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
            }}
          >
            Incubadora →
          </Link>
        </div>
      </section>
    </>
  );
}
