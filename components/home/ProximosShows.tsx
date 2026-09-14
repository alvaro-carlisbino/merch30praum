import Link from "next/link";
import { getUpcomingShows } from "@/lib/cms/shows";
import { getAllArtists } from "@/lib/cms/artists";
import { Reveal } from "@/components/effects/Reveal";

function fmt(iso: string) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("pt-BR", { day: "2-digit" }),
    month: d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "").toUpperCase(),
  };
}

export async function ProximosShows() {
  const [shows, artists] = await Promise.all([getUpcomingShows(), getAllArtists()]);
  const byArtist = new Map(artists.map((a) => [a.slug, a]));
  const seen = new Set<string>();
  const next = shows
    .filter((s) => {
      const key = `${s.date.slice(0, 10)}-${s.event ?? s.venue}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 4);
  if (next.length === 0) return null;
  return (
    <section aria-labelledby="proximos-shows" className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2
              id="proximos-shows"
              className="font-display uppercase leading-[0.92]"
              style={{ fontSize: "clamp(2rem, 4.6vw, 3.6rem)", letterSpacing: "-0.02em" }}
            >
              Próximos shows.
            </h2>
            <Link href="/shows" data-cursor="Agenda" className="text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-fg">
              Agenda completa →
            </Link>
          </header>
        </Reveal>
        <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
          {next.map((s, i) => {
            const artist = byArtist.get(s.artistSlug);
            const d = fmt(s.date);
            const live = s.status === "upcoming" && s.ticketsUrl;
            return (
              <Reveal key={s.id} delay={i * 60}>
                <li
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-5 py-5 sm:gap-8"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="w-14 text-center">
                    <p className="font-display leading-none tabular-nums" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>{d.day}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-muted">{d.month}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="font-display uppercase leading-tight" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", letterSpacing: "0.02em" }}>
                      {artist?.displayName ?? s.artistSlug}
                      {s.note && <span className="ml-3 font-body text-xs normal-case tracking-normal text-muted">{s.note}</span>}
                    </p>
                    <p className="mt-1 truncate text-sm text-fg/80">
                      {s.venue} · {s.city}/{s.state}
                      {s.event && <span className="text-muted"> · {s.event}</span>}
                    </p>
                  </div>
                  {live ? (
                    <a
                      href={s.ticketsUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="Ingressos"
                      className="inline-flex items-center rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
                      style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                    >
                      Ingressos
                    </a>
                  ) : (
                    <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
                      {s.status === "soldout" ? "Esgotado" : "Em breve"}
                    </span>
                  )}
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
