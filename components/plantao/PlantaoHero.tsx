import Link from "next/link";
import { PlantaoCountdown } from "./PlantaoCountdown";
import type { PlantaoEdition } from "@/lib/plantao/registry";

export function PlantaoHero({ edition }: { edition: PlantaoEdition }) {
  const dateBr = new Date(edition.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      {/* background image */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `url(${edition.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4) contrast(1.15) saturate(1.1)",
        }}
      />
      {/* blood overlay */}
      <div aria-hidden className="absolute inset-0 -z-10 plantao-bloodglow" />
      {/* dark veil */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,3,10,0.2) 0%, rgba(6,3,10,0.6) 60%, rgba(6,3,10,0.95) 100%)",
        }}
      />

      <div className="relative mx-auto flex max-w-screen-2xl flex-col justify-end px-4 sm:px-8 pt-32 pb-16 min-h-[100svh]">
        <div className="flex items-center gap-3">
          <span
            className="h-2 w-2 rounded-full plantao-neon-text"
            style={{ background: "var(--accent)", boxShadow: "0 0 12px var(--accent)" }}
          />
          <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
            Plantão Festival · {edition.year}
          </p>
        </div>

        <h1
          className="mt-8 font-display uppercase leading-[0.85] plantao-neon-text"
          style={{
            fontSize: "clamp(3rem, 14vw, 12rem)",
            letterSpacing: "-0.03em",
            color: "var(--fg)",
          }}
        >
          {edition.title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg sm:text-2xl text-fg/85 leading-snug">{edition.tagline}</p>

        <dl className="mt-12 grid gap-6 grid-cols-2 sm:grid-cols-4 max-w-3xl">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.3em] opacity-60">Data</dt>
            <dd className="mt-2 font-display text-xl">{dateBr}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.3em] opacity-60">Local</dt>
            <dd className="mt-2 font-display text-xl">{edition.venue}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.3em] opacity-60">Cidade</dt>
            <dd className="mt-2 font-display text-xl">
              {edition.city} · {edition.state}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.3em] opacity-60">Portões</dt>
            <dd className="mt-2 font-display text-xl">{edition.doorsAt}</dd>
          </div>
        </dl>

        <div className="mt-12 flex flex-wrap items-end gap-12">
          <PlantaoCountdown targetDate={edition.date} label={`Falta para ${edition.title}`} />
          <div className="flex flex-wrap gap-3">
            <Link
              href="/plantao/ingressos"
              data-cursor="Ingressos"
              className="inline-flex items-center gap-3 px-7 py-4 text-xs uppercase tracking-[0.3em] font-medium transition-transform hover:-translate-y-0.5"
              style={{
                background: "var(--accent)",
                color: "var(--bg)",
                boxShadow: "0 0 24px rgba(255,45,45,0.25)",
              }}
            >
              Ingressos →
            </Link>
            <Link
              href="/plantao/lineup"
              data-cursor="Line-up"
              className="inline-flex items-center gap-3 px-7 py-4 text-xs uppercase tracking-[0.3em] font-medium border transition-colors hover:bg-fg/5"
              style={{ borderColor: "var(--border)", color: "var(--fg)" }}
            >
              Line-up completo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
