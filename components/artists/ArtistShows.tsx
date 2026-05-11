import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getShowsByArtist, type Show } from "@/lib/shows/registry";
import type { ArtistConfig } from "@/lib/artists/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

const STATUS_COPY: Record<Show["status"], string> = {
  upcoming: "Ingressos",
  soldout: "Esgotado",
  tba: "Em breve",
  past: "Encerrado",
};

export function ArtistShows({ artist }: { artist: ArtistConfig }) {
  const all = getShowsByArtist(artist.slug);
  const upcoming = all.filter((s) => s.status !== "past").slice(0, 6);

  if (upcoming.length === 0) return null;

  return (
    <section
      className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-16"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <header className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <h2
          className="font-display uppercase leading-[0.9]"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          Próximas datas.
        </h2>
        <Link
          href="/shows"
          data-cursor="Agenda completa"
          className="inline-flex items-center gap-2 text-sm hover:opacity-80"
          style={{ color: "var(--accent)" }}
        >
          Agenda completa
          <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </header>

      <ul>
        {upcoming.map((show) => (
          <li
            key={show.id}
            className="grid items-center gap-4 border-b py-5 grid-cols-[auto_1fr_auto] sm:gap-8"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="font-display text-2xl tabular-nums">
              {formatDate(show.date)}
            </div>

            <div>
              <p className="font-display text-lg" style={{ letterSpacing: "-0.01em" }}>
                {show.venue}
              </p>
              <p className="text-sm text-fg/70">
                {show.city} · {show.state}
                {show.event && <span className="opacity-65"> — {show.event}</span>}
              </p>
              {show.note && (
                <p className="mt-1 text-xs italic opacity-55">{show.note}</p>
              )}
            </div>

            <div className="text-right">
              {show.status === "upcoming" && show.ticketsUrl ? (
                <a
                  href={show.ticketsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="Comprar"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:opacity-80"
                  style={{ color: "var(--accent)" }}
                >
                  Ingressos
                  <ArrowRight size={14} strokeWidth={1.5} />
                </a>
              ) : (
                <span
                  className="text-xs uppercase tracking-[0.2em]"
                  style={{
                    color: show.status === "soldout" ? "var(--muted)" : "var(--accent-2)",
                  }}
                >
                  {STATUS_COPY[show.status]}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
