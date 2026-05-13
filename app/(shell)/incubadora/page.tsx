import Link from "next/link";
import Image from "next/image";
import { INCUBADORA } from "@/lib/incubadora/registry";

export const metadata = {
  title: "Incubadora · 30praum",
  description:
    "O canal de candidatura à 30praum. Para artistas com som autoral que querem ser ouvidos por quem escuta direito.",
};

export default function IncubadoraPage() {
  return (
    <article>
      {/* HERO — limpo, sem chip de label */}
      <section className="mx-auto max-w-screen-2xl px-4 pt-16 pb-12 sm:px-8 sm:pt-20">
        <h1
          className="font-display uppercase leading-[0.92]"
          style={{
            fontSize: "clamp(2.4rem, 5.8vw, 4.8rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Incubadora
        </h1>
        <p
          className="mt-6 max-w-2xl text-base leading-snug sm:text-lg"
          style={{ color: "var(--accent)" }}
        >
          {INCUBADORA.shortTagline}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg/80 sm:text-base">
          Canal oficial de candidatura à 30praum. Não é talent show — é onde a
          gravadora escuta quem ainda não está dentro.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/incubadora/submeter"
            data-cursor="Submeter"
            className="inline-flex items-center rounded-full border px-6 py-3 text-sm transition-colors hover:bg-white hover:text-black"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
            }}
          >
            Mandar demo →
          </Link>
          <a
            href="#como-funciona"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg"
          >
            Como funciona ↓
          </a>
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
        <div className="mt-10 grid gap-6 max-w-3xl text-base sm:text-lg text-fg/85 leading-relaxed">
          {INCUBADORA.manifesto.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
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
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
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
            className="inline-flex items-center rounded-full border px-6 py-3 text-sm transition-colors hover:bg-white hover:text-black"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
            }}
          >
            Submeter demo →
          </Link>
        </div>
      </section>
    </article>
  );
}
