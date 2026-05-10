import type { ArtistConfig } from "@/lib/artists/types";

interface ArtistVoiceProps {
  artist: ArtistConfig;
}

export function ArtistVoice({ artist }: ArtistVoiceProps) {
  return (
    <section
      aria-label={`Voz do artista — ${artist.displayName}`}
      className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-16 grid gap-10 lg:grid-cols-[1fr_1.4fr]"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
          Voz do artista
        </p>
        <p className="mt-3 text-sm uppercase tracking-[0.2em]">
          — {artist.displayName}
        </p>
      </div>
      <div>
        <blockquote
          className="font-display leading-[1.05]"
          style={{
            fontSize: "clamp(1.5rem, 3.4vw, 2.6rem)",
            letterSpacing: "-0.01em",
          }}
        >
          “{artist.voice.epigraph}”
        </blockquote>
        <ol className="mt-10 grid gap-4 sm:grid-cols-3">
          {artist.voice.process.map((step, i) => (
            <li
              key={i}
              className="p-4"
              style={{
                border: "1px solid var(--border)",
                background: "color-mix(in srgb, var(--fg) 3%, transparent)",
              }}
            >
              <span
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ color: "var(--accent)" }}
              >
                {String(i + 1).padStart(2, "0")} · etapa
              </span>
              <p className="mt-2 text-sm leading-snug">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
