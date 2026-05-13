import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getUpcomingShows, getPastShows, type Show } from "@/lib/shows/registry";
import { getArtist } from "@/lib/artists/registry";

export const metadata = {
  title: "Shows · 30praum",
  description:
    "Agenda oficial dos shows do roster — Matuê, Teto, Wiu, Brandão85. Plantão Festival e tour pelo Brasil.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATUS_COPY: Record<Show["status"], { label: string; color: string }> = {
  upcoming: { label: "Ingressos", color: "var(--accent)" },
  soldout: { label: "Esgotado", color: "var(--muted)" },
  tba: { label: "Em breve", color: "var(--muted)" },
  past: { label: "Encerrado", color: "var(--muted)" },
};

function ShowRow({ show }: { show: Show }) {
  const artist = getArtist(show.artistSlug)!;
  const status = STATUS_COPY[show.status];

  return (
    <div
      className="grid items-center gap-4 border-b py-6 grid-cols-[auto_1fr] sm:grid-cols-[7rem_1fr_auto] sm:gap-8"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Data */}
      <div className="font-display tabular-nums">
        <p className="text-2xl sm:text-3xl leading-tight" style={{ letterSpacing: "-0.02em" }}>
          {formatDate(show.date)}
        </p>
        <p className="text-xs opacity-55 mt-0.5">{formatTime(show.date)}</p>
      </div>

      {/* Artista + venue */}
      <div className="col-span-2 sm:col-span-1 sm:order-2">
        <Link
          href={`/${artist.slug}`}
          className="font-display text-2xl sm:text-3xl hover:opacity-80 transition-opacity"
          style={{ letterSpacing: "-0.02em" }}
        >
          {artist.displayName}
        </Link>
        <p className="mt-1 text-sm text-fg/80">
          {show.venue} · {show.city} · {show.state}
          {show.event && <span className="opacity-65"> — {show.event}</span>}
        </p>
        {show.note && <p className="mt-1 text-xs opacity-55 italic">{show.note}</p>}
      </div>

      {/* CTA */}
      <div className="sm:order-3 sm:text-right">
        {show.status === "upcoming" && show.ticketsUrl ? (
          <a
            href={show.ticketsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:opacity-80"
            style={{ color: status.color }}
            data-cursor="Comprar"
          >
            {status.label}
            <ArrowRight size={14} strokeWidth={1.5} />
          </a>
        ) : (
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: status.color }}
          >
            {status.label}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ShowsPage() {
  const upcoming = getUpcomingShows();
  const past = getPastShows();

  // Agrupa próximos por evento (Plantão fica junto)
  const grouped = new Map<string, Show[]>();
  for (const show of upcoming) {
    const key = show.event ?? `show-${show.id}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(show);
  }

  return (
    <article>
      <section className="mx-auto max-w-screen-2xl px-4 pt-16 pb-10 sm:px-8 sm:pt-20">
        <h1
          className="font-display uppercase leading-[0.92]"
          style={{
            fontSize: "clamp(2.4rem, 5.8vw, 4.8rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Shows
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fg/80 sm:text-base">
          Agenda oficial do roster — Plantão Festival, tours por capital,
          festivais convidados.
        </p>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 pb-24">
        <div className="space-y-16">
          {[...grouped.entries()].map(([event, eventShows]) => (
            <div key={event}>
              {eventShows[0].event && (
                <header className="mb-2 flex items-baseline gap-3 border-b pb-3" style={{ borderColor: "var(--border)" }}>
                  <h2
                    className="font-display text-lg sm:text-xl"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {eventShows[0].event}
                  </h2>
                  <span className="text-xs opacity-55">
                    {eventShows.length} {eventShows.length === 1 ? "show" : "shows"}
                  </span>
                </header>
              )}
              <div>
                {eventShows.map((show) => (
                  <ShowRow key={show.id} show={show} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Passados */}
      {past.length > 0 && (
        <section
          className="border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-16">
            <h2
              className="font-display uppercase leading-[0.95]"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em", color: "var(--muted)" }}
            >
              Já aconteceu.
            </h2>
            <div className="mt-8 opacity-65">
              {past.map((show) => (
                <ShowRow key={show.id} show={show} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Plantão */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2
              className="font-display uppercase leading-[0.9]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Plantão é a casa.
            </h2>
            <p className="mt-4 max-w-md text-fg/80">
              O festival próprio da 30praum acontece em Fortaleza. Em 2026 marca os 10 anos da
              gravadora — line-up, ingressos, edições anteriores e tudo o que precisa saber.
            </p>
          </div>
          <Link
            href="/plantao"
            data-cursor="Plantão"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm transition-colors hover:bg-white hover:text-black"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
            }}
          >
            Plantão Festival →
          </Link>
        </div>
      </section>
    </article>
  );
}
