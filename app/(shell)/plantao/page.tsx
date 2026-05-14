import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Plantão Festival · Fortaleza",
  description:
    "O festival próprio da 30praum em Fortaleza · 25 de abril · Marina Park · 10 anos da gravadora",
};

const PLANTAO_RED = "#ff2d5a";

const STATS = [
  { label: "Edição", value: "3ª", foot: "2026 · 4ª" },
  { label: "Público presencial", value: "30K+", foot: "2024 · cumulativo" },
  { label: "Online · YouTube", value: "500K", foot: "audiência única 2025" },
  { label: "Investimento", value: "5M", foot: "edição 2024" },
];

export default function PlantaoHubPage() {
  return (
    <>
      {/* HERO — banner full width com personagem + PLANTÃO 2026 baked in */}
      <section
        className="relative w-full overflow-hidden"
        aria-label="Plantão 2026"
      >
        <div className="relative w-full" style={{ aspectRatio: "2560 / 1440" }}>
          <Image
            src="/figma-plantao/hero.png"
            alt="Plantão Festival 2026"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* LINEUP TEXT + MANIFESTO + STATS · POSTER */}
      <section
        className="border-y"
        style={{
          borderColor: PLANTAO_RED,
          background: "#0a0204",
        }}
      >
        <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          {/* COL ESQUERDA */}
          <div className="flex flex-col gap-8">
            {/* Lineup text image (Matuê, BK, Recayd Mob, Ajulia Costa, Alee, Ryu) */}
            <div
              className="relative w-full max-w-2xl"
              style={{ aspectRatio: "1222 / 574" }}
            >
              <Image
                src="/figma-plantao/lineup-text.png"
                alt="Matuê · BK · Recayd Mob · Ajulia Costa · Alee · Ryu, the Runner"
                fill
                priority
                quality={95}
                sizes="(min-width: 1024px) 720px, 92vw"
                className="object-contain object-left"
              />
            </div>

            <h2
              className="font-display uppercase leading-[0.92] text-white"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Uma noite. Frente ao mar
              <br />
              toda a cena.
            </h2>

            <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              A 3ª edição marca os 10 anos da 30praum. Reúne a base, os novos e
              os convidados — Matuê, Teto, Wiu, Brandão85 e mais 7 nomes — em
              um dia só, frente ao mar. Quem viu sabe: não é um show, é uma
              cena se reconhecendo.
            </p>

            <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="text-[10px] uppercase tracking-[0.3em] text-white/55">
                    {s.label}
                  </dt>
                  <dd
                    className="mt-3 font-display tabular-nums"
                    style={{
                      fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                      letterSpacing: "-0.01em",
                      color: PLANTAO_RED,
                    }}
                  >
                    {s.value}
                  </dd>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/55">
                    {s.foot}
                  </p>
                </div>
              ))}
            </dl>
          </div>

          {/* COL DIREITA — Poster card */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="flex flex-col gap-5 rounded-3xl border-2 p-5 sm:p-6"
              style={{
                borderColor: PLANTAO_RED,
                background: "#0a0204",
                boxShadow: `0 0 60px ${PLANTAO_RED}33, 0 24px 80px rgba(0,0,0,0.6)`,
              }}
            >
              {/* Title PLANTÃO 2026 */}
              <div
                className="relative w-full"
                style={{ aspectRatio: "798 / 286" }}
              >
                <Image
                  src="/figma-plantao/title-plantao.png"
                  alt="Plantão 2026"
                  fill
                  priority
                  quality={95}
                  sizes="(min-width: 1024px) 480px, 92vw"
                  className="object-contain"
                />
              </div>

              {/* Concert photo (vertical) */}
              <div
                className="relative w-full overflow-hidden rounded-2xl border"
                style={{
                  aspectRatio: "1082 / 1670",
                  borderColor: `${PLANTAO_RED}55`,
                }}
              >
                <Image
                  src="/figma-plantao/poster-vertical.png"
                  alt="Plantão Festival — palco e plateia"
                  fill
                  quality={95}
                  sizes="(min-width: 1024px) 460px, 92vw"
                  className="object-cover"
                />
              </div>

              {/* CTA: GARANTA O TEU INGRESSO + buttons */}
              <div className="flex flex-col items-center gap-4 pt-2">
                <p
                  className="text-center font-display uppercase leading-[0.85] text-white"
                  style={{
                    fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
                    letterSpacing: "0.02em",
                  }}
                >
                  GARANTA{" "}
                  <span style={{ color: PLANTAO_RED }}>O</span>{" "}
                  TEU
                  <br />
                  <span
                    style={{
                      fontFamily: "var(--font-tag-brandao, cursive)",
                      fontSize: "1.2em",
                      letterSpacing: "0.01em",
                    }}
                  >
                    ingresso
                  </span>
                </p>
                <p className="text-center text-[11px] uppercase tracking-[0.3em] text-white/85">
                  25 de Abril · Marina Park
                </p>

                <div className="mt-2 flex w-full flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/plantao/ingressos"
                    data-cursor="Ingressos"
                    className="inline-flex flex-1 items-center justify-center rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition-opacity hover:opacity-90"
                    style={{
                      background: PLANTAO_RED,
                      color: "#fff",
                    }}
                  >
                    Ingressos
                  </Link>
                  <Link
                    href="/plantao/lineup"
                    data-cursor="Line-up Completo"
                    className="inline-flex flex-1 items-center justify-center rounded-full border-2 px-6 py-3 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
                    style={{
                      borderColor: "#fff",
                      color: "#fff",
                    }}
                  >
                    Line-up Completo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LINEUP — 11 NOMES. UMA NOITE. */}
      <section
        className="border-b"
        style={{ borderColor: PLANTAO_RED, background: "#0a0204" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2
              className="font-display uppercase leading-[0.92] text-white"
              style={{
                fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
                letterSpacing: "-0.01em",
              }}
            >
              11 nomes.
              <br />
              Uma noite.
            </h2>
            <Link
              href="/plantao/lineup"
              data-cursor="Line-up Completo"
              className="inline-flex items-center rounded-full border-2 px-6 py-3 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
              style={{ borderColor: PLANTAO_RED, color: PLANTAO_RED }}
            >
              Line-up Completo →
            </Link>
          </div>

          {/* Lineup grid image (8 artistas com border rosa) */}
          <div className="relative w-full" style={{ aspectRatio: "2560 / 1278" }}>
            <Image
              src="/figma-plantao/lineup-grid.png"
              alt="Line-up Plantão 2026"
              fill
              quality={95}
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* HISTÓRIA */}
      <section
        className="border-b"
        style={{ borderColor: PLANTAO_RED, background: "#0a0204" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2
              className="font-display uppercase leading-[0.92] text-white"
              style={{
                fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
                letterSpacing: "-0.01em",
              }}
            >
              O Plantão tem história.
            </h2>
            <Link
              href="/plantao/edicoes"
              data-cursor="Todas as edições"
              className="inline-flex items-center rounded-full border-2 px-6 py-3 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
              style={{ borderColor: PLANTAO_RED, color: PLANTAO_RED }}
            >
              Ver todas edições →
            </Link>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            <PastEditionCard
              href="/plantao/edicoes"
              image="/figma-plantao/past-2025.png"
              title="Plantão 2025"
              cta="Confira agora"
            />
            <PastEditionCard
              href="/plantao/edicoes"
              image="/figma-plantao/past-2024.png"
              title="Plantão 2024"
              cta="Confira agora"
            />
          </ul>
        </div>
      </section>
    </>
  );
}

function PastEditionCard({
  href,
  image,
  title,
  cta,
}: {
  href: string;
  image: string;
  title: string;
  cta: string;
}) {
  return (
    <li>
      <Link
        href={href}
        data-cursor={title}
        className="group relative block overflow-hidden rounded-3xl border-2"
        style={{
          borderColor: PLANTAO_RED,
          boxShadow: `0 0 40px ${PLANTAO_RED}33`,
        }}
      >
        <div className="relative w-full" style={{ aspectRatio: "1142 / 836" }}>
          <Image
            src={image}
            alt={title}
            fill
            quality={95}
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.78) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-6 sm:p-8">
            <h3
              className="font-display uppercase leading-tight text-white"
              style={{
                fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)",
                letterSpacing: "0.01em",
                textShadow: "0 2px 12px rgba(0,0,0,0.7)",
              }}
            >
              {title}
            </h3>
            <span
              className="inline-flex items-center rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.22em] text-white transition-colors group-hover:bg-white group-hover:text-black"
              style={{ background: PLANTAO_RED }}
            >
              {cta} →
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

// const PLANTAO_RED defined above
