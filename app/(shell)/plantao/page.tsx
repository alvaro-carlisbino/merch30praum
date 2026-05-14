import Link from "next/link";
import Image from "next/image";
import {
  getCurrentPlantao,
  getPastPlantao,
  PLANTAO_EDITIONS,
} from "@/lib/plantao/registry";

export const metadata = {
  title: "Plantão Festival · Fortaleza",
  description:
    "O festival próprio da 30praum em Fortaleza · 25 de abril · Marina Park · 10 anos da gravadora",
};

const PLANTAO_RED = "#ff2d5a";
const PAST_IMAGES = [
  "/figma-plantao/past-1.png",
  "/figma-plantao/past-2.png",
  "/figma-plantao/past-3.png",
];

export default function PlantaoHubPage() {
  const current = getCurrentPlantao();
  const past = getPastPlantao();

  return (
    <>
      <section
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "min(86svh, 880px)",
          background: "#0a0204",
        }}
        aria-label="Plantão 2026"
      >
        {/* gradient bg suave (vermelho-bordô) */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 70% 40%, rgba(255,45,90,0.18) 0%, rgba(20,2,8,0) 60%), linear-gradient(180deg, #1a0410 0%, #0a0204 100%)",
          }}
        />

        <div className="relative z-10 mx-auto grid h-full max-w-screen-2xl items-center gap-8 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          {/* coluna esquerda: títulos + CTA */}
          <div className="flex flex-col items-start gap-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/70">
              25 de Abril · Marina Park · Fortaleza/CE
            </p>

            <div className="relative w-full max-w-xl" style={{ aspectRatio: "399 / 143" }}>
              <Image
                src="/figma-plantao/title-plantao.png"
                alt="Plantão 2026"
                fill
                priority
                quality={95}
                sizes="(min-width: 1024px) 600px, 92vw"
                className="object-contain object-left"
              />
            </div>

            <p className="max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
              {current.manifesto}
            </p>

            <Link
              href="/plantao/ingressos"
              data-cursor="Garanta seu ingresso"
              className="relative block w-full max-w-md transition-transform hover:-translate-y-0.5"
            >
              <div className="relative w-full" style={{ aspectRatio: "404 / 126" }}>
                <Image
                  src="/figma-plantao/cta-ingresso.png"
                  alt="Garanta o teu ingresso — 25 de Abril | Marina Park"
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, 92vw"
                  className="object-contain object-left"
                />
              </div>
            </Link>
          </div>

          {/* coluna direita: poster vertical do show */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{
                aspectRatio: "541 / 835",
                background: "#1a0410",
                boxShadow:
                  "0 24px 80px rgba(255,45,90,0.25), 0 8px 24px rgba(0,0,0,0.4)",
              }}
            >
              <Image
                src="/figma-plantao/hero.png"
                alt="Plantão Festival — palco"
                fill
                priority
                quality={95}
                sizes="(min-width: 1024px) 540px, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_auto] lg:items-end">
          <h1
            className="font-display uppercase leading-[0.92]"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Uma noite, frente ao mar, toda a cena.
          </h1>
          <div className="relative aspect-square w-36 self-center justify-self-center sm:w-48">
            <Image
              src="/figma-plantao/mascote.png"
              alt=""
              aria-hidden
              fill
              sizes="240px"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section
        className="border-y"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-4 sm:px-8">
          <Stat label="Edição" value="3ª" foot={`${current.year}`} />
          <Stat
            label="Público presencial"
            value="30K+"
            foot="2024 · cumulativo"
          />
          <Stat
            label="Online · YouTube"
            value="500K"
            foot="audiência 2025"
          />
          <Stat
            label="Investimento"
            value="R$ 5M"
            foot="edição 2024"
          />
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
            Line-up 2026
          </h2>
          <Link
            href="/plantao/lineup"
            data-cursor="Line-up completo"
            className="inline-flex items-center rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
            style={{ borderColor: PLANTAO_RED, color: PLANTAO_RED }}
          >
            Line-up completo →
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {current.lineup.slice(0, 10).map((artist) => (
            <li key={artist.displayName}>
              <Link
                href="/plantao/lineup"
                data-cursor={artist.displayName}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
                style={{
                  border: `2px solid ${PLANTAO_RED}`,
                  boxShadow: `0 0 0 0 ${PLANTAO_RED}`,
                  transition: "box-shadow 400ms cubic-bezier(0.7,0,0.3,1)",
                }}
              >
                <Image
                  src={artist.imageUrl}
                  alt={artist.displayName}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  style={{
                    filter: "brightness(0.85) contrast(1.05)",
                    objectPosition: "center 25%",
                  }}
                  sizes="(min-width: 1024px) 20vw, 50vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <p
                    className="font-display uppercase leading-tight text-white"
                    style={{
                      fontSize: "clamp(0.95rem, 1.4vw, 1.2rem)",
                      letterSpacing: "0.02em",
                      textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                    }}
                  >
                    {artist.displayName}
                  </p>
                  {artist.highlightLabel && (
                    <p
                      className="mt-1 text-[9px] uppercase tracking-[0.2em]"
                      style={{ color: PLANTAO_RED }}
                    >
                      {artist.highlightLabel}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="relative overflow-hidden border-t"
        style={{
          borderColor: "var(--border)",
          background: "#0a0204",
        }}
      >
        <div className="relative mx-auto grid max-w-screen-2xl gap-8 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="relative h-16 w-full max-w-md sm:h-20">
              <Image
                src="/figma-plantao/cta-ingresso.png"
                alt="Garanta seu ingresso"
                fill
                sizes="400px"
                className="object-contain object-left"
              />
            </div>
            <p
              className="mt-5 text-sm uppercase tracking-[0.3em]"
              style={{ color: PLANTAO_RED }}
            >
              25 de abril · Marina Park
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-fg/80 sm:text-base">
              Lote 6 ativo. R$ 150 (Front) a R$ 655 (VIP com banheiro e
              alimentação inclusos). Meia-entrada com carteirinha ou solidária
              mediante 2kg de alimento não-perecível.
            </p>
          </div>
          <Link
            href="/plantao/ingressos"
            data-cursor="Comprar ingresso"
            className="inline-flex items-center rounded-full px-7 py-4 text-sm font-semibold tracking-[0.04em] transition-transform hover:-translate-y-0.5"
            style={{
              background: PLANTAO_RED,
              color: "#fff",
              boxShadow: `0 0 32px ${PLANTAO_RED}55`,
            }}
          >
            Ingressos →
          </Link>
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
            O Plantão tem história
          </h2>
          <Link
            href="/plantao/edicoes"
            data-cursor="Ver edições"
            className="inline-flex items-center rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
            style={{ borderColor: PLANTAO_RED, color: PLANTAO_RED }}
          >
            Ver edições →
          </Link>
        </div>

        <ul className="grid gap-5 sm:grid-cols-3 sm:gap-6">
          {past.slice(0, 3).map((ed, i) => (
            <li key={ed.slug}>
              <Link
                href="/plantao/edicoes"
                data-cursor={ed.title}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl"
                style={{ border: `2px solid ${PLANTAO_RED}` }}
              >
                <Image
                  src={PAST_IMAGES[i] ?? ed.heroImage}
                  alt={ed.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.85) 100%)",
                  }}
                />
                <div className="relative flex h-full flex-col justify-end p-5 text-white sm:p-6">
                  <p
                    className="text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: PLANTAO_RED }}
                  >
                    {new Date(ed.date).toLocaleDateString("pt-BR")}
                  </p>
                  <p
                    className="mt-2 font-display uppercase"
                    style={{
                      fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {ed.title}
                  </p>
                  <p className="mt-2 text-sm text-white/85">{ed.tagline}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-2">
          <div>
            <h2
              className="font-display uppercase leading-[0.92]"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Antes de ir, tira a dúvida.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-fg/80 sm:text-base">
              Regras de entrada, acessibilidade, política de meia, faixa etária,
              transferência, transmissão online — tudo oficial em um lugar.
            </p>
            <Link
              href="/plantao/info"
              data-cursor="Informações"
              className="mt-8 inline-flex items-center rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
              style={{ borderColor: PLANTAO_RED, color: PLANTAO_RED }}
            >
              Ler informações →
            </Link>
          </div>
          <ul className="grid gap-3">
            {current.infoFAQ.slice(0, 4).map((q) => (
              <li
                key={q.question}
                className="rounded-2xl border p-5"
                style={{ borderColor: "var(--border)" }}
              >
                <p className="font-display text-base">{q.question}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg/70">
                  {q.answer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Stat({
  label,
  value,
  foot,
}: {
  label: string;
  value: string;
  foot: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
        {label}
      </p>
      <p
        className="mt-3 font-display"
        style={{
          fontSize: "clamp(1.6rem, 3.4vw, 2.8rem)",
          letterSpacing: "-0.01em",
          color: PLANTAO_RED,
        }}
      >
        {value}
      </p>
      <p className="mt-2 text-xs text-muted">{foot}</p>
    </div>
  );
}

void PLANTAO_EDITIONS;
