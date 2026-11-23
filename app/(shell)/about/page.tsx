import Image from "next/image";
import Link from "next/link";
import { ARTIST_SLUGS } from "@/lib/artists/registry";
import { getAllArtists } from "@/lib/cms/artists";
import { IMG } from "@/lib/images/paths";
export const metadata = {
  title: "Sobre",
  description:
    "30praum: gravadora cearense fundada em 2016 por Matuê e Clara Mendes. Casa de Matuê, Wiu, Teto e Brandão85.",
};
const STATS = [
  { label: "Fundação", value: "2016" },
  { label: "Sede", value: "Fortaleza · CE" },
  { label: "Distribuição", value: "Independente" },
  { label: "Artistas", value: "4" },
] as const;

const MARCOS = [
  {
    year: "2016",
    title: "A 30praum nasce",
    body: "Matuê e Clara Mendes fundam o selo em Fortaleza, longe do eixo Rio-São Paulo onde o rap brasileiro costumava ser decidido.",
  },
  {
    year: "2019",
    title: "Acordo com a Sony",
    body: "A gravadora passa a ter distribuição da Sony Music Brasil. O acordo dura cinco anos.",
  },
  {
    year: "2020",
    title: "Máquina do Tempo",
    body: "Primeiro álbum do Matuê, lançado pela casa.",
  },
  {
    year: "2024",
    title: "333 e independência",
    body: "333 tem a maior estreia de um álbum no Spotify Brasil. A 30praum volta a lançar de forma independente, Brandão85 assina com a casa e o Plantão faz a segunda edição, agora em dois dias.",
  },
  {
    year: "2025",
    title: "XTRANHO",
    body: "Matuê leva a turnê do 333 à MEO Arena, em Lisboa. Em dezembro sai XTRANHO.",
  },
  {
    year: "2026",
    title: "Dez anos",
    body: "Colapso Global, de Teto e Wiu, e Isso É Trap Vol. 2, do Brandão85. O Plantão comemora os 10 anos da gravadora e Matuê toca no Palco Mundo do Rock in Rio Lisboa.",
  },
];

export default async function AboutPage() {
  const allArtists = await getAllArtists();
  const artists = [...allArtists].sort(
    (a, b) => ARTIST_SLUGS.indexOf(a.slug) - ARTIST_SLUGS.indexOf(b.slug),
  );
  return (
    <>
      <section className="mx-auto max-w-screen-2xl px-4 pt-16 pb-12 sm:px-8 sm:pt-20">
        <p className="text-[10px] uppercase tracking-[0.4em] text-muted">
          Desde 2016
        </p>
        <h1
          className="mt-4 font-display uppercase leading-[0.92]"
          style={{
            fontSize: "clamp(2.6rem, 7vw, 6rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Sobre a 30praum
        </h1>
        <p
          className="mt-6 max-w-2xl text-base leading-relaxed text-fg/85 sm:text-lg"
        >
          Gravadora independente fundada em 2016 por Matuê e Clara Mendes, em Fortaleza. Hoje
          lança Matuê, Wiu, Teto e Brandão85 e organiza o Plantão, festival que acontece no
          Marina Park desde 2023.
        </p>
      </section>
      <section
        className="border-y"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-4 sm:px-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
                {s.label}
              </p>
              <p
                className="mt-3 font-display"
                style={{
                  fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)",
                  letterSpacing: "-0.01em",
                  color: "var(--accent)",
                }}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8 sm:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2
            className="font-display uppercase leading-[0.92]"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Quem fundou a casa
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-fg/75 sm:text-base">
            Matuê e Clara Mendes estão à frente da 30praum desde 2016.
          </p>
        </div>
        <ul className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          <FounderCard
            photo={IMG.founderClara}
            role="Cofundadora · CEO"
            name="Clara Mendes"
            realName="Clara Mendes"
            origin="Berlim · Fortaleza"
            paragraphs={[
              "Nasceu em Berlim e estudou administração. Chegou a Fortaleza num intercâmbio, aprendeu português na cidade e ficou.",
              "É cofundadora e CEO da 30praum e divide com Matuê o planejamento do Plantão.",
            ]}
          />
          <FounderCard
            photo={IMG.founderMatue}
            role="Cofundador · artista"
            name="Matuê"
            realName="Matheus Brasileiro Aguiar"
            origin="Fortaleza · CE · n. 1993"
            paragraphs={[
              "Passou parte da infância na Califórnia e voltou pra Fortaleza com o trap americano no ouvido, quando quase ninguém fazia isso por aqui.",
              "Lançou Máquina do Tempo em 2020, 333 em 2024 e XTRANHO em 2025. 333 teve a maior estreia de um álbum no Spotify Brasil.",
            ]}
          />
        </ul>
      </section>
      <section
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2
              className="font-display uppercase leading-[0.92]"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Linha do tempo
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-fg/75 sm:text-base">
              Os anos que mudaram a gravadora.
            </p>
          </div>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MARCOS.map((m) => (
              <li
                key={m.year}
                className="rounded-2xl border p-6 sm:p-7"
                style={{
                  borderColor: "var(--border)",
                  background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
                }}
              >
                <p
                  className="font-display tabular-nums"
                  style={{
                    fontSize: "clamp(1.6rem, 2.4vw, 2rem)",
                    color: "var(--accent)",
                  }}
                >
                  {m.year}
                </p>
                <h3
                  className="mt-3 font-display uppercase leading-tight"
                  style={{
                    fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg/80">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2
              className="font-display uppercase leading-[0.92]"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Artistas
            </h2>
            <Link
              href="/artistas"
              data-cursor="Artistas"
              className="inline-flex items-center rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
              }}
            >
              Ver todos
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {artists.map((a) => {
              const latest =
                a.facts.find((f) => f.label === "Último lançamento")?.value ?? a.universeName;
              return (
                <li key={a.slug}>
                  <Link
                    href={`/${a.slug}`}
                    data-cursor={a.displayName}
                    className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
                    style={{ background: a.panelBackground }}
                  >
                    <Image
                      src={a.portraitImage}
                      alt={a.displayName}
                      fill
                      sizes="(min-width: 1024px) 24vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      style={{ objectPosition: "center 20%" }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(180deg, transparent 48%, rgba(0,0,0,0.88) 100%)" }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                      <h3
                        className="font-display uppercase leading-none"
                        style={{ fontSize: "clamp(1.7rem, 3vw, 2.75rem)" }}
                      >
                        {a.displayName}
                      </h3>
                      <p className="mt-2 text-xs leading-snug text-white/80 sm:text-sm">{latest}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto grid max-w-screen-2xl gap-6 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2
              className="font-display uppercase leading-[0.92]"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Contato
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-fg/80 sm:text-base">
              Imprensa, marcas e artistas que querem mandar som.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/imprensa"
              data-cursor="Imprensa"
              className="inline-flex items-center rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
              }}
            >
              Imprensa
            </Link>
            <Link
              href="/parcerias"
              data-cursor="Parcerias"
              className="inline-flex items-center rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
              style={{
                borderColor: "var(--border)",
                color: "var(--fg)",
              }}
            >
              Parcerias
            </Link>
            <Link
              href="/incubadora"
              data-cursor="Incubadora"
              className="inline-flex items-center rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
              style={{
                borderColor: "var(--border)",
                color: "var(--fg)",
              }}
            >
              Incubadora
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
function FounderCard({
  photo,
  role,
  name,
  realName,
  origin,
  paragraphs,
}: {
  photo: string;
  role: string;
  name: string;
  realName: string;
  origin: string;
  paragraphs: string[];
}) {
  return (
    <li
      className="overflow-hidden rounded-2xl border"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16 / 10" }}
      >
        <Image
          src={photo}
          alt={name}
          fill
          unoptimized
          quality={95}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "center 25%" }}
        />
      </div>
      <div className="p-6 sm:p-8">
        <p
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: "var(--accent)" }}
        >
          {role}
        </p>
        <h3
          className="mt-2 font-display uppercase leading-tight"
          style={{
            fontSize: "clamp(1.8rem, 2.6vw, 2.4rem)",
            letterSpacing: "0.01em",
          }}
        >
          {name}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {realName} · {origin}
        </p>
        <div className="mt-5 space-y-3 text-sm leading-relaxed text-fg/85 sm:text-base">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </li>
  );
}
