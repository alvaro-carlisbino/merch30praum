import Link from "next/link";
import Image from "next/image";
import { getUpcomingShows, getPastShows } from "@/lib/cms/shows";
import { getAllArtists } from "@/lib/cms/artists";
import type { Show } from "@/lib/shows/registry";
import type { ArtistConfig } from "@/lib/artists/types";
export const metadata = {
  title: "Shows",
  description:
    "Próximos shows de Matuê, Wiu, Teto e Brandão85, com links de ingresso quando a venda é online.",
};
function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit" }),
    month: d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", month: "short" }).replace(".", "").toUpperCase(),
    year: d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", year: "numeric" }),
    time: d.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit" }),
  };
}
const STATUS_COPY: Record<
  Show["status"],
  { label: string; tone: "accent" | "muted" }
> = {
  upcoming: { label: "Ingressos", tone: "accent" },
  soldout: { label: "Esgotado", tone: "muted" },
  tba: { label: "Venda local", tone: "muted" },
  past: { label: "Encerrado", tone: "muted" },
};
const CARD_PHOTOS: Record<string, string> = {
  matue: "/artists/matue.webp",
  wiu: "/artists/wiu.webp",
  teto: "/artists/teto.webp",
  brandao: "/artists/brandao.webp",
};
function ShowCard({ show, artist, past = false }: { show: Show; artist: ArtistConfig; past?: boolean }) {
  const status = STATUS_COPY[past ? "past" : show.status];
  const date = formatDate(show.date);
  const photo = CARD_PHOTOS[artist.slug];
  const ctaActive = !past && show.status === "upcoming" && show.ticketsUrl;
  return (
    <article
      className="grid items-center gap-4 rounded-2xl border p-4 sm:grid-cols-[auto_auto_1fr_auto] sm:gap-6 sm:p-5"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--fg) 3%, var(--bg))",
      }}
    >
      <div className="hidden h-16 w-16 overflow-hidden rounded-xl sm:block">
        {photo && (
          <Image
            src={photo}
            alt={artist.displayName}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
        <p
          className="font-display leading-none tabular-nums"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
        >
          {date.day}
        </p>
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
          {date.month} · {date.year}
        </p>
        {!show.hideTime && (
          <p className="text-[10px] tabular-nums text-muted sm:hidden">{date.time}</p>
        )}
      </div>
      <div className="min-w-0">
        <Link
          href={`/${artist.slug}`}
          data-cursor={artist.displayName}
          className="font-display uppercase leading-tight transition-opacity hover:opacity-80"
          style={{
            fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
            letterSpacing: "0.02em",
          }}
        >
          {artist.displayName}
        </Link>
        <p className="mt-1 truncate text-sm text-fg/85">
          {show.venue} · {show.city}/{show.state}
        </p>
        {show.event && (
          <p
            className="mt-1 text-[10px] uppercase tracking-[0.28em]"
            style={{ color: "var(--accent)" }}
          >
            {show.event}
          </p>
        )}
        {show.note && (
          <p className="mt-1 text-xs italic text-muted">{show.note}</p>
        )}
      </div>
      <div className="sm:text-right">
        {ctaActive ? (
          <a
            href={show.ticketsUrl}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="Ingressos"
            className="inline-flex items-center rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
            }}
          >
            {status.label}
          </a>
        ) : (
          <span
            className="inline-flex items-center rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em]"
            style={{
              borderColor: "var(--border)",
              color: status.tone === "accent" ? "var(--accent)" : "var(--muted)",
            }}
          >
            {status.label}
          </span>
        )}
      </div>
    </article>
  );
}
export default async function ShowsPage() {
  const [upcoming, past, artists] = await Promise.all([
    getUpcomingShows(),
    getPastShows(),
    getAllArtists(),
  ]);
  const artistMap = new Map(artists.map((a) => [a.slug, a]));
  const grouped = new Map<string, Show[]>();
  for (const show of upcoming) {
    const key = show.event ?? `show-${show.id}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(show);
  }
  return (
    <>
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
          Datas anunciadas de Matuê, Wiu, Teto e Brandão85. Quando a venda é feita pela produção
          local, a data aparece sem link: confira nos perfis oficiais do artista e da casa de show.
        </p>
      </section>
      <section className="mx-auto max-w-screen-2xl px-4 pb-16 sm:px-8 sm:pb-20">
        <div className="space-y-10">
          {[...grouped.entries()].map(([event, shows]) => (
            <div key={event}>
              {shows[0].event && (
                <header className="mb-4 flex items-baseline gap-3">
                  <h2
                    className="font-display uppercase"
                    style={{
                      fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                      letterSpacing: "0.02em",
                      color: "var(--accent)",
                    }}
                  >
                    {shows[0].event}
                  </h2>
                  <span className="text-xs text-muted">
                    {shows.length} {shows.length === 1 ? "data" : "datas"}
                  </span>
                </header>
              )}
              <ul className="space-y-3">
                {shows.map((show) => (
                  <li key={show.id}>
                    <ShowCard show={show} artist={artistMap.get(show.artistSlug)!} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      {past.length > 0 && (
        <section
          className="border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8 sm:py-20">
            <h2
              className="mb-6 font-display uppercase leading-[0.92] text-muted"
              style={{
                fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Já aconteceu
            </h2>
            <ul className="space-y-3 opacity-65">
              {past.map((show) => (
                <li key={show.id}>
                  <ShowCard show={show} artist={artistMap.get(show.artistSlug)!} past />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto grid max-w-screen-2xl gap-6 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2
              className="font-display uppercase leading-[0.92]"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Plantão
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-fg/80 sm:text-base">
              O festival da 30praum, em Fortaleza. Teve três edições, de 2024 a 2026. A próxima
              ainda não foi anunciada.
            </p>
          </div>
          <Link
            href="/plantao"
            data-cursor="Plantão"
            className="inline-flex items-center rounded-full border px-6 py-3 text-sm transition-colors hover:bg-white hover:text-black"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
            }}
          >
            Ver o Plantão
          </Link>
        </div>
      </section>
    </>
  );
}
