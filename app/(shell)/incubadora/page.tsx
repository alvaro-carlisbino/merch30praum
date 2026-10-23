import Link from "next/link";
import Image from "next/image";
import { getIncubadora } from "@/lib/cms/incubadora";
export const metadata = {
  title: "Incubadora",
  description:
    "Envie seu som para o A&R da 30praum. Para artistas com faixas autorais lançadas.",
};
export default async function IncubadoraPage() {
  const INCUBADORA = await getIncubadora();
  return (
    <article>
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
          Formulário de envio de som para o A&R da 30praum.
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
            Mandar som
          </Link>
          <a
            href="#como-funciona"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg"
          >
            Como funciona
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
        <h2
          className="font-display leading-[0.95] max-w-4xl"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.025em" }}
        >
          Por que existe
        </h2>
        <div className="mt-10 grid gap-6 max-w-3xl text-base sm:text-lg text-fg/85 leading-relaxed">
          {INCUBADORA.manifesto.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
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
            Como funciona
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
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24 grid gap-16 lg:grid-cols-2">
          <div>
            <h3
              className="font-display uppercase leading-[0.95]"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}
            >
              O que a gente procura
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
              O que não pesa
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
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
          <h2
            className="font-display uppercase leading-[0.9]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
          >
            Como alguns chegaram
          </h2>
          <p className="mt-4 max-w-xl text-fg/75 leading-relaxed">
            Nenhum deles chegou por um processo seletivo. Ficam aqui como referência do tipo de
            artista que a casa costuma ouvir.
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
                  {c.joinedYear && <p className="mt-4 text-xs opacity-55">Assinou em {c.joinedYear}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
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
            Mandar som
          </Link>
        </div>
      </section>
    </article>
  );
}
