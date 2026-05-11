import Link from "next/link";
import Image from "next/image";
import { INCUBADORA } from "@/lib/incubadora/registry";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ArrowRight, ArrowDown } from "lucide-react";

export const metadata = {
  title: "Incubadora · 30praum",
  description:
    "O canal de candidatura à 30praum. Para artistas com som autoral que querem ser ouvidos por quem escuta direito.",
};

export default function IncubadoraPage() {
  return (
    <article>
      {/* HERO — limpo, sem chip de label */}
      <section className="relative isolate min-h-[88svh] overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 incubadora-scan" />
        <div className="relative mx-auto flex max-w-screen-2xl flex-col justify-end px-4 sm:px-8 pt-32 pb-16 min-h-[88svh]">
          <h1
            className="font-display uppercase leading-[0.82]"
            style={{
              fontSize: "clamp(3rem, 13vw, 12rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Incubadora.
          </h1>

          <p
            className="mt-10 max-w-2xl text-xl sm:text-3xl leading-snug"
            style={{ color: "var(--accent)" }}
          >
            {INCUBADORA.shortTagline}
          </p>

          <p className="mt-6 max-w-2xl text-base sm:text-lg text-fg/85 leading-relaxed">
            Canal oficial de candidatura à 30praum. Não é talent show, não é vitrine — é onde a
            gravadora escuta quem ainda não está dentro.
          </p>

          <div className="mt-14 flex flex-wrap items-center gap-6">
            <Link
              href="/incubadora/submeter"
              data-cursor="Submeter"
              className="inline-flex items-center gap-3 px-8 py-5 text-xs uppercase tracking-[0.2em] font-medium transition-transform hover:-translate-y-0.5"
              style={{
                background: "var(--accent)",
                color: "var(--bg)",
                boxShadow: "0 0 28px rgba(46,240,124,0.22)",
              }}
            >
              Mandar demo
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 text-sm opacity-75 hover:opacity-100"
            >
              Como funciona
              <ArrowDown size={14} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      {/* Manifesto — sem eyebrow */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
        <h2
          className="font-display leading-[0.95] max-w-4xl"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.025em" }}
        >
          A porta sempre existiu. Agora tem endereço.
        </h2>
        <ScrollReveal stagger={0.1}>
          <div className="mt-10 grid gap-6 max-w-3xl text-base sm:text-xl text-fg/85 leading-relaxed">
            {INCUBADORA.manifesto.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Como funciona — minimal, sem decoração extra */}
      <section
        id="como-funciona"
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
          <h2
            className="font-display uppercase leading-[0.9]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
          >
            Quatro passos.
          </h2>

          <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {INCUBADORA.howItWorks.map((step) => (
              <article key={step.step}>
                <h3
                  className="font-display text-xl"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-fg/75 leading-relaxed">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* O que buscamos / o que NÃO buscamos — direto */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24 grid gap-16 lg:grid-cols-2">
          <div>
            <h3
              className="font-display uppercase leading-[0.95]"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}
            >
              O que abre porta.
            </h3>
            <ul className="mt-8 space-y-4 text-fg/85">
              {INCUBADORA.whatWeLookFor.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-relaxed">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 flex-none rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="font-display uppercase leading-[0.95] text-fg/55"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}
            >
              O que não vai funcionar.
            </h3>
            <ul className="mt-8 space-y-4 text-fg/55">
              {INCUBADORA.whatWeDontLookFor.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-relaxed">
                  <span aria-hidden className="mt-2 flex-none text-lg leading-none">×</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cases como prova de processo, não roster */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
          <h2
            className="font-display uppercase leading-[0.9]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
          >
            Quem entrou assim.
          </h2>
          <p className="mt-4 max-w-xl text-fg/75 leading-relaxed">
            Três casos pra mostrar como funciona. Nenhum dos quatro pilares do roster atual
            chegou por contrato grande. Foi conversa, processo, tempo.
          </p>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {INCUBADORA.casesOfSuccess.map((c) => (
              <Link
                key={c.artistSlug}
                href={`/${c.artistSlug}`}
                className="group relative block aspect-[3/4] overflow-hidden border"
                style={{ borderColor: "var(--border)" }}
              >
                <Image
                  src={c.image}
                  alt={c.displayName}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "brightness(0.6) contrast(1.1)" }}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, transparent 40%, rgba(4,7,5,0.95) 100%)",
                  }}
                />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <p
                    className="font-display uppercase text-4xl"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {c.displayName}
                  </p>
                  <p className="mt-3 text-sm text-fg/80 leading-relaxed">{c.excerpt}</p>
                  <p className="mt-4 text-xs opacity-55">Entrou em {c.joinedYear}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — direto, sem chip */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <h2
            className="font-display uppercase leading-[0.9]"
            style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
          >
            Tem som? <br />
            <span style={{ color: "var(--accent)" }}>Manda.</span>
          </h2>
          <Link
            href="/incubadora/submeter"
            data-cursor="Submeter"
            className="inline-flex items-center gap-3 px-8 py-5 text-xs uppercase tracking-[0.2em] font-medium transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Submeter demo
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </article>
  );
}
