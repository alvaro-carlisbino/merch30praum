interface Track {
  title: string;
}

interface Props {
  tracks: Track[];
}

export function Tracklist({ tracks }: Props) {
  return (
    <section
      aria-label="Tracklist"
      className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-8 sm:py-16"
    >
      <ol className="divide-y" style={{ borderColor: "var(--border)" }}>
        {tracks.map((t, i) => (
          <li
            key={t.title}
            className="grid grid-cols-[60px_1fr] items-center gap-6 py-5"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <span className="tabular-nums text-sm text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="font-display uppercase"
              style={{
                fontSize: "clamp(1rem, 1.4vw, 1.4rem)",
                letterSpacing: "0.04em",
              }}
            >
              {t.title}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
