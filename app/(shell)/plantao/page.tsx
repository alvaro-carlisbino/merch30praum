import Link from "next/link";
import Image from "next/image";
import { getCurrentPlantao, getPastPlantao, PLANTAO_EDITIONS } from "@/lib/plantao/registry";
import { PlantaoHero } from "@/components/plantao/PlantaoHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Plantão Festival · Fortaleza",
  description:
    "O festival próprio da 30praum em Fortaleza · 30 mil presencial · 500 mil online · 10 anos da gravadora",
};

export default function PlantaoHubPage() {
  const current = getCurrentPlantao();
  const past = getPastPlantao();

  const headliners = current.lineup.filter((a) => a.isHeadliner || a.isSpecial);
  const others = current.lineup.filter((a) => !a.isHeadliner && !a.isSpecial);

  return (
    <article>
      <PlantaoHero edition={current} />

      {/* Manifesto */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
        <WordReveal
          text="Uma noite. Frente ao mar. Toda a cena."
          as="h2"
          className="font-display uppercase leading-[0.85]"
          stagger={0.08}
          wordClassName="text-[clamp(2.5rem,8vw,7rem)] tracking-[-0.03em]"
        />
        <ScrollReveal stagger={0.12}>
          <p className="mt-8 max-w-3xl text-base sm:text-xl text-fg/85 leading-relaxed">
            {current.manifesto}
          </p>
        </ScrollReveal>
      </section>

      {/* Stats */}
      <section
        className="border-t border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-16 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <Stat label="Edição" value={`3ª`} foot={`${current.year} · ${current.year - 2023 + 1}ª`} />
          <Stat
            label="Público presencial"
            value="30K+"
            foot="2024 · cumulativo"
          />
          <Stat label="Online · YouTube" value="500K" foot="audiência única 2025" />
          <Stat label="Investimento" value="R$ 5M" foot="edição 2024" />
        </div>
      </section>

      {/* Lineup preview */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <ScrollReveal>
            <h2
              className="font-display uppercase leading-[0.85]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "-0.03em" }}
            >
              10 nomes. <br /> Uma noite.
            </h2>
          </ScrollReveal>
          <Link
            href="/plantao/lineup"
            data-cursor="Line-up completo"
            className="inline-flex items-center gap-2 text-sm hover:opacity-80"
            style={{ color: "var(--accent)" }}
          >
            Line-up completo
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>

        <ScrollReveal stagger={0.06}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {[...headliners, ...others].map((artist, idx) => (
              <Link
                key={artist.displayName}
                href="/plantao/lineup"
                className="group relative block aspect-[3/4] overflow-hidden border"
                style={{ borderColor: "var(--border)" }}
              >
                <Image
                  src={artist.imageUrl}
                  alt={artist.displayName}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "brightness(0.65) contrast(1.1)" }}
                  sizes="(min-width: 1024px) 20vw, 50vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(6,3,10,0.95) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <p className="font-display text-base sm:text-xl leading-tight">
                    {artist.displayName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* CTA Ingressos */}
      <section
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2
              className="font-display uppercase leading-[0.9]"
              style={{ fontSize: "clamp(2rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
            >
              Front Boladão esgotou. <br />
              <span style={{ color: "var(--accent)" }}>Front e VIP ainda abertos.</span>
            </h2>
            <p className="mt-6 max-w-xl text-fg/80 leading-relaxed">
              Lote 6 ativo. R$ 150 (Front) a R$ 655 (VIP com banheiro e alimentação inclusos).
              Meia-entrada com carteirinha ou solidária mediante 2kg de alimento não-perecível.
            </p>
          </div>
          <Link
            href="/plantao/ingressos"
            data-cursor="Comprar ingresso"
            className="inline-flex items-center gap-3 px-8 py-5 text-xs uppercase tracking-[0.3em] font-medium transition-transform hover:-translate-y-0.5"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              boxShadow: "0 0 28px rgba(255,45,45,0.32)",
            }}
          >
            Ingressos
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* Edições anteriores */}
      <section
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <h2
              className="font-display uppercase leading-[0.9]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              O Plantão tem história.
            </h2>
            <Link
              href="/plantao/edicoes"
              className="inline-flex items-center gap-2 text-sm hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              Ver todas as edições
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {past.map((ed) => (
              <Link
                key={ed.slug}
                href="/plantao/edicoes"
                className="group relative block aspect-[16/10] overflow-hidden border"
                style={{ borderColor: "var(--border)" }}
              >
                <Image
                  src={ed.heroImage}
                  alt={ed.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "brightness(0.55)" }}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, transparent 50%, rgba(6,3,10,0.95) 100%)",
                  }}
                />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-70">
                    {new Date(ed.date).toLocaleDateString("pt-BR")}
                  </p>
                  <p
                    className="mt-2 font-display uppercase text-4xl sm:text-5xl"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {ed.title}
                  </p>
                  <p className="mt-2 text-sm text-fg/80 max-w-md">{ed.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info FAQ teaser */}
      <section
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24 grid gap-10 lg:grid-cols-2">
          <div>
            <h2
              className="font-display uppercase leading-[0.9]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Antes de ir, tira a dúvida.
            </h2>
            <p className="mt-6 max-w-md text-fg/80 leading-relaxed">
              Regras de entrada, acessibilidade, política de meia, faixa etária, transferência,
              transmissão online — tudo oficial em um lugar.
            </p>
            <Link
              href="/plantao/info"
              className="mt-8 inline-flex items-center gap-2 text-sm hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              Ler informações completas
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
          <ul className="grid gap-3">
            {current.infoFAQ.slice(0, 4).map((q) => (
              <li
                key={q.question}
                className="border p-5"
                style={{ borderColor: "var(--border)" }}
              >
                <p className="font-display text-base">{q.question}</p>
                <p className="mt-2 text-sm text-fg/70 leading-relaxed">{q.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
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
      <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">{label}</p>
      <p
        className="mt-3 font-display"
        style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em", color: "var(--accent)" }}
      >
        {value}
      </p>
      <p className="mt-2 text-xs opacity-60">{foot}</p>
    </div>
  );
}

// silence unused PLANTAO_EDITIONS lint while keeping import available for future use
void PLANTAO_EDITIONS;
