import type { ArtistConfig } from "@/lib/artists/types";

interface ArtistBioProps {
  artist: ArtistConfig;
}

export function ArtistBio({ artist }: ArtistBioProps) {
  return (
    <section
      aria-label={`Bio — ${artist.displayName}`}
      className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20 grid gap-12 lg:grid-cols-[1fr_1.6fr]"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
          Quem é
        </p>
        <h2
          className="mt-3 font-display leading-[0.92]"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {artist.realName}
        </h2>
        <p className="mt-4 text-sm uppercase tracking-[0.25em] text-muted">
          {artist.origin} · n. {artist.bornYear}
        </p>
        <dl className="mt-10 grid gap-4">
          {artist.facts.map((fact) => (
            <div
              key={fact.label}
              className="grid grid-cols-[auto_1fr] gap-4 items-baseline pb-3"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <dt className="text-[10px] uppercase tracking-[0.3em] text-muted">
                {fact.label}
              </dt>
              <dd className="text-sm">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <div className="space-y-6">
          {artist.bioParagraphs.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "font-display text-xl sm:text-2xl leading-[1.4]"
                  : "text-base sm:text-lg text-fg/85 leading-relaxed"
              }
              style={i === 0 ? { letterSpacing: "-0.01em" } : undefined}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted mb-4">
            Faixas marcantes
          </p>
          <ul className="flex flex-wrap gap-2">
            {artist.signatureSongs.map((song) => (
              <li
                key={song}
                className="px-4 py-2 text-xs uppercase tracking-widest"
                style={{
                  border: "1px solid var(--border)",
                  background: "color-mix(in srgb, var(--fg) 4%, transparent)",
                }}
              >
                {song}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
