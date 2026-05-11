import Image from "next/image";
import Link from "next/link";
import { SABOR_MATUE } from "@/lib/sabor/registry";
import { IMG } from "@/lib/images/unsplash";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { ArrowRight, ArrowDown } from "lucide-react";

export const metadata = {
  title: "Sabor Matuê · holding 30praum",
  description:
    "A primeira frente FMCG da holding 30praum. Linha de geladinhos premium em parceria com fábrica cearense — lançamento verão 26/27.",
};

const STATUS_LABEL = {
  "coming-soon": "Em breve",
  available: "Disponível",
  limited: "Edição limitada",
} as const;

export default function SaborPage() {
  return (
    <article>
      {/* HERO */}
      <section className="relative isolate min-h-[100svh] overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-20 sabor-melt" />
        <div
          aria-hidden
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: `url(${IMG.saborHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.55) contrast(1.1) saturate(0.9)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,10,13,0.25) 0%, rgba(12,10,13,0.85) 80%, rgba(12,10,13,1) 100%)",
          }}
        />

        <div className="relative mx-auto flex max-w-screen-2xl flex-col justify-end px-4 sm:px-8 pt-32 pb-16 min-h-[100svh]">
          <h1
            className="font-display uppercase leading-[0.82]"
            style={{
              fontSize: "clamp(3.5rem, 14vw, 13rem)",
              letterSpacing: "-0.04em",
              color: "var(--fg)",
            }}
          >
            Sabor <br />
            <span style={{ color: "var(--accent)" }}>Matuê.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg sm:text-2xl text-fg/85 leading-snug">
            {SABOR_MATUE.tagline}
          </p>

          <dl className="mt-12 grid gap-6 grid-cols-2 sm:grid-cols-4 max-w-3xl">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] opacity-60">Lançamento</dt>
              <dd className="mt-2 font-display text-2xl">Verão {SABOR_MATUE.launchYear - 1}/{String(SABOR_MATUE.launchYear).slice(-2)}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] opacity-60">Origem</dt>
              <dd className="mt-2 font-display text-2xl">{SABOR_MATUE.origin}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] opacity-60">SKUs</dt>
              <dd className="mt-2 font-display text-2xl">5 sabores +1 ltd.</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] opacity-60">Categoria</dt>
              <dd className="mt-2 font-display text-2xl">FMCG · Premium</dd>
            </div>
          </dl>

          <a
            href="#sabores"
            className="mt-12 inline-flex items-center gap-3 px-6 py-4 text-xs uppercase tracking-[0.3em] border transition-colors hover:bg-fg/5 w-fit"
            style={{ borderColor: "var(--border)", color: "var(--fg)" }}
          >
            Conhecer os sabores
            <ArrowDown size={14} strokeWidth={1.5} />
          </a>
        </div>
      </section>

      {/* Manifesto */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
        <WordReveal
          text="O EP virou meme. Virou estampa. Agora vira sabor."
          as="h2"
          className="font-display uppercase leading-[0.85]"
          stagger={0.07}
          wordClassName="text-[clamp(2rem,7vw,6rem)] tracking-[-0.03em]"
        />
        <ScrollReveal stagger={0.1}>
          <div className="mt-10 grid gap-6 max-w-3xl text-base sm:text-xl text-fg/85 leading-relaxed">
            {SABOR_MATUE.manifesto.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Sabores */}
      <section id="sabores" className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2
              className="font-display uppercase leading-[0.85]"
              style={{ fontSize: "clamp(2rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
            >
              Cada faixa, <br /> um geladinho.
            </h2>
            <p className="max-w-sm text-fg/75 text-sm sm:text-base leading-relaxed">
              Cada sabor referencia uma música. Embalagem desenhada faixa a faixa.
              Ingredientes da Serra de Baturité ao litoral do Ceará.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SABOR_MATUE.productLine.map((s, idx) => (
              <ScrollReveal key={s.slug}>
                <article
                  className="group relative flex flex-col overflow-hidden border"
                  style={{ borderColor: "var(--border)", background: `linear-gradient(180deg, ${s.color}22, transparent 70%)` }}
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: "brightness(0.85) contrast(1.05)" }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(180deg, transparent 50%, rgba(12,10,13,0.85) 100%)",
                      }}
                    />
                    {s.status === "limited" && (
                      <span
                        className="absolute right-4 top-4 px-2 py-1 text-[9px] uppercase tracking-[0.2em]"
                        style={{
                          background: "rgba(0,0,0,0.7)",
                          color: s.accent,
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {STATUS_LABEL[s.status]}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 p-5">
                    <h3
                      className="font-display uppercase text-3xl leading-tight"
                      style={{ letterSpacing: "-0.02em", color: s.accent }}
                    >
                      {s.name}
                    </h3>
                    <p className="text-sm font-medium text-fg/85">{s.tagline}</p>
                    <p className="text-sm text-fg/65 leading-relaxed">{s.description}</p>
                    {s.inspirationTrack && (
                      <p
                        className="mt-2 text-xs italic opacity-60 border-t pt-3"
                        style={{ borderColor: "var(--border)" }}
                      >
                        Faixa de inspiração — {s.inspirationTrack}
                      </p>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Distribuição */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
          <ScrollReveal>
            <h2
              className="font-display uppercase leading-[0.85]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Três fases. <br /> Norte → Brasil → LATAM.
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {[SABOR_MATUE.distribution.phase1, SABOR_MATUE.distribution.phase2, SABOR_MATUE.distribution.phase3].map(
              (phase, idx) => (
                <article
                  key={phase.label}
                  className="border p-7"
                  style={{
                    borderColor: "var(--border)",
                    background: "color-mix(in srgb, var(--fg) 3%, transparent)",
                  }}
                >
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                      letterSpacing: "-0.02em",
                      color: "var(--accent)",
                    }}
                  >
                    Fase {idx + 1}
                  </h3>
                  <p className="mt-3 font-display text-xl" style={{ letterSpacing: "-0.01em" }}>
                    {phase.label}
                  </p>
                  <p className="mt-1 text-sm text-fg/80">{phase.region}</p>
                  <ul className="mt-5 space-y-1.5 text-sm">
                    {phase.channels.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-fg/70">
                        <span aria-hidden style={{ color: "var(--accent)" }}>·</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Parceiro fabril */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20 grid gap-10 lg:grid-cols-2 lg:items-end">
          <h2
            className="font-display uppercase leading-[0.9]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)", letterSpacing: "-0.02em" }}
          >
            Sem aditivo. <br /> Sem corante artificial.
          </h2>
          <p className="max-w-md text-fg/85 leading-relaxed">{SABOR_MATUE.partnerNote}</p>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2
              className="font-display uppercase leading-[0.9]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Quer um <span style={{ color: "var(--accent)" }}>antes</span>?
            </h2>
            <p className="mt-4 max-w-md text-fg/80">
              Cadastra teu email e a gente avisa primeiro quando os primeiros sabores ficarem
              disponíveis em pop-up no Plantão e na loja oficial.
            </p>
          </div>
          <Link
            href="https://instagram.com/sabormatue"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-3 px-7 py-4 text-xs uppercase tracking-[0.3em] font-medium transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            @sabormatue
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </article>
  );
}
