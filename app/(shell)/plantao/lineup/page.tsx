import Link from "next/link";
import { getCurrentPlantao, getPastPlantao } from "@/lib/cms/plantao";
import { LineupCinema } from "@/components/plantao/LineupCinema";

function longDate(iso: string) {
  return new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });
}

export async function generateMetadata() {
  const current = await getCurrentPlantao();
  return {
    title: `Line-up · Plantão ${current.year}`,
    description: `Todos os artistas confirmados do Plantão Festival ${current.year}, em ordem editorial: da abertura ao headliner.`,
  };
}

export default async function PlantaoLineupPage() {
  const [current, past] = await Promise.all([getCurrentPlantao(), getPastPlantao()]);
  const last = past[0] ?? null;
  const retro = current.lineup.length === 0 && Boolean(last);
  const showing = retro && last ? last : current;

  return (
    <article>
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
            style={{ fontSize: "clamp(3rem, 14vw, 12rem)", letterSpacing: "-0.04em" }}
          >
            {retro ? (
              <>
                Line-up {current.year} <br /> em construção.
              </>
            ) : (
              <>
                {showing.lineup.length} nomes. <br /> Uma noite só.
              </>
            )}
          </h1>
          <p className="mt-10 max-w-2xl text-base sm:text-xl text-fg/85 leading-relaxed">
            {retro
              ? `Os nomes de ${current.year} saem primeiro pra lista de espera. Enquanto isso, revê quem passou pelo palco em ${showing.year}. A ordem é editorial, não alfabética: começa na abertura, termina no headliner.`
              : "A ordem aqui é editorial, não alfabética: começa na abertura, termina no headliner. Scroll pra baixo e percorre a noite."}
          </p>
          <p className="mt-3 text-sm opacity-60">
            Plantão {showing.year} · {showing.venue}, {showing.city}
          </p>
        </div>
      </section>
      <LineupCinema lineup={showing.lineup} />
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20 flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2
              className="font-display uppercase leading-[0.9]"
              style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", letterSpacing: "-0.03em" }}
            >
              {retro ? "Quer saber primeiro?" : "É isso. Garanta o seu."}
            </h2>
            <p className="mt-4 text-sm opacity-60">
              {retro
                ? `Plantão ${current.year} · ${longDate(current.date)} · ${current.city}`
                : `${longDate(showing.date)} · ${showing.venue} · ${showing.city}`}
            </p>
          </div>
          <Link
            href={retro ? "/plantao#lista" : "/plantao/ingressos"}
            data-cursor={retro ? "Lista de espera" : "Ingressos"}
            className="inline-flex items-center gap-3 px-8 py-5 text-xs uppercase tracking-[0.3em] font-medium transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--accent)", color: "var(--bg)", boxShadow: "0 0 28px rgba(255,45,45,0.32)" }}
          >
            {retro ? "Entrar na lista de espera" : "Ingressos"}
          </Link>
        </div>
      </section>
    </article>
  );
}
