import Image from "next/image";
import Link from "next/link";
import { ARTISTS } from "@/lib/artists/registry";
import { IMG } from "@/lib/images/unsplash";

export const metadata = {
  title: "Sobre",
  description:
    "30praum: gravadora cearense fundada em 2016 por Matuê e Clara Mendes. Casa de Matuê, Wiu, Teto e Brandão85.",
};

const STATS = [
  { label: "Fundação", value: "2016" },
  { label: "Sede", value: "Fortaleza · CE" },
  { label: "Time", value: "~50 pessoas" },
  { label: "Artistas", value: "4 universos" },
] as const;

const MARCOS = [
  {
    year: "2016",
    title: "30praum nasce",
    body: "Matuê e Clara Mendes fundam o selo em Fortaleza. Missão: descentralizar o trap brasileiro do eixo Rio-SP e colocar o Nordeste no centro do mapa.",
  },
  {
    year: "2020",
    title: "Máquina do Tempo",
    body: "Primeiro álbum solo do Matuê pelo selo. Wiu produz 6 das 7 faixas. A casa começa a virar referência sonora.",
  },
  {
    year: "2024",
    title: "Recorde Spotify BR",
    body: "333 (Matuê) bate o recorde de maior estreia do Spotify Brasil e ultrapassa 950 milhões de reproduções. Plantão Festival reúne 30 mil pessoas em Fortaleza.",
  },
  {
    year: "2025",
    title: "Independência total · liderada pela Clara",
    body: "Sob direção da CEO Clara Mendes, a 30praum corta intermediários: passa a operar com distribuição própria, direitos autorais sem terceiros e gestão de marketing in-house. Matuê lança XTRANHO no mesmo ano.",
  },
  {
    year: "2026",
    title: "Década completa",
    body: "Colapso Global (Wiu+Teto) e Isso é Trap Vol.02 (Brandão85) abrem o ano. Plantão Festival comemora 10 anos da casa.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-screen-2xl px-4 pt-16 pb-12 sm:px-8 sm:pt-20">
        <p className="text-[10px] uppercase tracking-[0.4em] text-muted">
          A holding · desde 2016
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
          Gravadora cearense que descentralizou o trap brasileiro. Fundada em
          2016 por Matuê e Clara Mendes em Fortaleza, hoje é casa de 4 artistas
          principais (Matuê, Wiu, Teto e Brandão85), de um festival próprio
          (Plantão) e de uma operação de aproximadamente 50 pessoas.
        </p>
      </section>

      {/* STATS */}
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

      {/* CLARA SPOTLIGHT — destaque pra CEO */}
      <section
        className="border-t"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--fg) 3%, var(--bg))",
        }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16">
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{ aspectRatio: "4 / 5" }}
            >
              <Image
                src={IMG.founderClara}
                alt="Clara Mendes — Cofundadora e CEO da 30praum"
                fill
                unoptimized
                quality={95}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "center 20%" }}
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.45) 100%)",
                }}
              />
              <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                <p
                  className="text-[10px] uppercase tracking-[0.32em] text-white/80"
                >
                  CEO · Cofundadora
                </p>
                <p
                  className="mt-2 font-display uppercase leading-tight text-white"
                  style={{
                    fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
                    letterSpacing: "0.01em",
                    textShadow: "0 2px 14px rgba(0,0,0,0.6)",
                  }}
                >
                  Clara Mendes
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-muted">
                A pessoa que segura o selo de pé
              </p>
              <h2
                className="font-display uppercase leading-[0.9]"
                style={{
                  fontSize: "clamp(2rem, 4.6vw, 3.6rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                Sem ela, não tem
                <br />
                30praum.
              </h2>

              <blockquote
                className="border-l-2 pl-5 text-base italic leading-relaxed text-fg/90 sm:text-lg"
                style={{ borderColor: "var(--accent)" }}
              >
                &ldquo;Não é gravadora pra render mais. É gravadora pra durar mais.&rdquo;
                <footer className="mt-3 text-xs not-italic uppercase tracking-[0.28em] text-muted">
                  Clara Mendes · CEO 30praum
                </footer>
              </blockquote>

              <div className="grid gap-5 text-sm leading-relaxed text-fg/85 sm:text-base">
                <p>
                  Veio da Alemanha pra aprender português em Fortaleza em 2014.
                  Conheceu o Matuê, ficou — e em 2016 fundaram juntos a 30praum.
                  Desde o dia 1 ela é a CEO: a estratégia, a operação, a
                  estrutura jurídica e financeira da casa toda passa pela mão dela.
                </p>
                <p>
                  Hoje toca um time de ~50 pessoas entre Fortaleza e São Paulo,
                  com gestão sem intermediário em distribuição, direitos autorais
                  e marketing. Foi ela quem tocou a virada pra independência
                  total em 2024 e estruturou o Plantão Festival como linha de
                  receita estratégica do selo.
                </p>
                <p>
                  Enquanto os artistas são o som da casa, Clara é a infraestrutura
                  invisível que faz o som chegar ao mundo. Cada decisão de longo
                  prazo, cada contrato, cada nome novo no roster — passa pela
                  cabeça dela primeiro.
                </p>
              </div>

              <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-3 text-xs uppercase tracking-[0.22em] text-muted sm:grid-cols-3">
                <li>
                  <span className="block text-[9px] tracking-[0.32em] text-muted/70">
                    Origem
                  </span>
                  <span className="mt-1 block text-fg/90 normal-case tracking-normal">
                    Alemanha → BR
                  </span>
                </li>
                <li>
                  <span className="block text-[9px] tracking-[0.32em] text-muted/70">
                    Função
                  </span>
                  <span className="mt-1 block text-fg/90 normal-case tracking-normal">
                    CEO · sócia
                  </span>
                </li>
                <li>
                  <span className="block text-[9px] tracking-[0.32em] text-muted/70">
                    Desde
                  </span>
                  <span className="mt-1 block text-fg/90 normal-case tracking-normal">
                    2016 (dia 1)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS — Clara primeiro */}
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
            Os dois sócios que tocam a 30praum desde o primeiro dia em
            Fortaleza.
          </p>
        </div>

        <ul className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          <FounderCard
            photo={IMG.founderClara}
            role="Cofundadora · CEO"
            name="Clara Mendes"
            realName="Clara Mendes"
            origin="Alemanha → Fortaleza · CE"
            paragraphs={[
              "Veio da Alemanha pra aprender português em Fortaleza em 2014, ficou e virou sócia. CEO da 30praum desde o dia 1, comanda a operação que hoje tem ~50 pessoas entre Fortaleza e São Paulo.",
              "Tocou a virada pra independência total em 2024 (distribuição própria, direitos autorais sem intermediário) e estrutura o festival Plantão como receita estratégica do selo.",
            ]}
          />
          <FounderCard
            photo={IMG.founderMatue}
            role="Cofundador · artista"
            name="Matuê"
            realName="Matheus Brasileiro Aguiar"
            origin="Fortaleza · CE · n. 1993"
            paragraphs={[
              "Cofundador e principal voz da casa. Viveu na Califórnia entre os 8 e os 11 anos, voltou pra Fortaleza com inglês fluente e ouvido pra um trap que ninguém aqui fazia ainda.",
              "Estreou em álbum em 2020 com Máquina do Tempo, bateu recorde do Spotify BR com 333 (2024) e fechou a trilogia com XTRANHO (2025).",
            ]}
          />
        </ul>
      </section>

      {/* TIMELINE / MARCOS */}
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
              10 anos em 5 marcos
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-fg/75 sm:text-base">
              Pontos que definiram o que a casa virou hoje.
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

      {/* ROSTER PRINCIPAL */}
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
              As quatro almas da casa
            </h2>
            <Link
              href="/#roster"
              data-cursor="Roster"
              className="inline-flex items-center rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
              }}
            >
              Ver no home →
            </Link>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {Object.values(ARTISTS).map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/${a.slug}`}
                  data-cursor={a.displayName}
                  className="group block overflow-hidden rounded-2xl"
                  style={{
                    background: a.panelBackground,
                    color: "#fff",
                  }}
                >
                  <div className="p-6">
                    <p
                      className="text-[10px] uppercase tracking-[0.3em]"
                      style={{ color: a.panelAccent }}
                    >
                      {a.universeName}
                    </p>
                    <p
                      className="mt-3 font-display"
                      style={{
                        fontSize: "clamp(1.4rem, 2vw, 1.75rem)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {a.displayName}
                    </p>
                    <p className="mt-2 text-xs text-white/65">
                      {a.realName} · {a.origin}
                    </p>
                    <p className="mt-4 text-xs text-white/55">
                      Entrou em {a.joinedYear}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
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
              Quer falar com a casa?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-fg/80 sm:text-base">
              Press kit, parcerias, candidatura artística — cada porta tem
              endereço próprio.
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
              Imprensa →
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
              Parcerias →
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
              Incubadora →
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
