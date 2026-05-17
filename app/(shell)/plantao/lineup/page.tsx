import { getCurrentPlantao } from "@/lib/cms/plantao";
import { LineupCinema } from "@/components/plantao/LineupCinema";
import Link from "next/link";

export const metadata = {
  title: "Line-up · Plantão 2026",
  description:
    "Todos os artistas confirmados — apresentação cinematográfica do line-up do Plantão Festival 2026.",
};

export default async function PlantaoLineupPage() {
  const current = await getCurrentPlantao();

  return (
    <article>
      {/* Intro */}
      <section className="relative isolate flex min-h-[60svh] items-end overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,45,45,0.18), transparent 60%), radial-gradient(circle at 70% 70%, rgba(255,211,77,0.08), transparent 60%), var(--bg)",
          }}
        />
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-8 py-24">
          <h1
            className="font-display uppercase leading-[0.82] plantao-neon-text"
            style={{
              fontSize: "clamp(3rem, 14vw, 12rem)",
              letterSpacing: "-0.04em",
            }}
          >
            10 nomes. <br />
            Uma noite só.
          </h1>
          <p className="mt-10 max-w-2xl text-base sm:text-xl text-fg/85 leading-relaxed">
            A ordem aqui é editorial, não alfabética — começa na abertura, termina no headliner.
            Scroll pra baixo e percorre a noite.
          </p>
          <p className="mt-3 text-sm opacity-60">Plantão {current.year} · {current.venue}, {current.city}</p>
        </div>
      </section>

      <LineupCinema lineup={current.lineup} />

      {/* CTA ingresso */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20 flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2
              className="font-display uppercase leading-[0.9]"
              style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", letterSpacing: "-0.03em" }}
            >
              É isso. Garanta o seu.
            </h2>
            <p className="mt-4 text-sm opacity-60">25 de abril · Marina Park · Fortaleza</p>
          </div>
          <Link
            href="/plantao/ingressos"
            data-cursor="Ingressos"
            className="inline-flex items-center gap-3 px-8 py-5 text-xs uppercase tracking-[0.3em] font-medium transition-transform hover:-translate-y-0.5"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              boxShadow: "0 0 28px rgba(255,45,45,0.32)",
            }}
          >
            Ingressos →
          </Link>
        </div>
      </section>
    </article>
  );
}
