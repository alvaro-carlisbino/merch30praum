import Image from "next/image";

type AlbumStat = { label: string; value: string };
type StreamingLink = { label: string; href: string; icon: "spotify" | "youtube" | "apple" | "deezer" };
type SocialLink = { label: string; href: string; icon: "spotify" | "youtube" | "instagram" | "tiktok" };

interface Props {
  cover: string;
  albumTitle: string;
  albumTagline: string;
  stats: AlbumStat[];
  streamingLinks: StreamingLink[];
  artistNameImage: string;
  artistNameAspect: string;
  artistMotto: string;
  socials: SocialLink[];
}

function IconGlyph({ name }: { name: StreamingLink["icon"] | SocialLink["icon"] }) {
  const stroke = "currentColor";
  const props = { width: 16, height: 16, fill: "none", stroke, strokeWidth: 1.6 };
  switch (name) {
    case "spotify":
      return (
        <svg viewBox="0 0 24 24" {...props} aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <path d="M7 9c4-1 8 0 11 2M7 12.5c3.5-1 7-.5 9.5 1.2M8 16c2.5-.8 5-.5 7 .8" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" {...props} aria-hidden>
          <rect x="2" y="6" width="20" height="12" rx="3" />
          <path d="M10 9.5v5l5-2.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "apple":
      return (
        <svg viewBox="0 0 24 24" {...props} aria-hidden>
          <path d="M16 13c0-2 1.5-3 1.5-3-1-1.5-2.5-1.5-3.5-1.5-1.2 0-2 .7-3 .7-1 0-1.8-.7-3-.7-1.5 0-3 1-3.7 2.5C2.5 13 4 18 6 19c.8.4 1.8.8 2.8.4.8-.3 1.2-.4 2.2-.4s1.4.1 2.2.4c1 .4 2 0 2.8-.4 1-.7 2-2.5 2.5-4-2-.5-2.5-1.7-2.5-2zM13 5c.7-.8 1.2-2 1-3-1 0-2 .6-2.5 1.2-.5.7-1 1.7-.9 2.8 1.1.1 2-.4 2.4-1z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "deezer":
      return (
        <svg viewBox="0 0 24 24" {...props} aria-hidden>
          <rect x="3" y="14" width="3" height="3" fill="currentColor" stroke="none" />
          <rect x="8" y="11" width="3" height="6" fill="currentColor" stroke="none" />
          <rect x="13" y="8" width="3" height="9" fill="currentColor" stroke="none" />
          <rect x="18" y="5" width="3" height="12" fill="currentColor" stroke="none" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" {...props} aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" {...props} aria-hidden>
          <path d="M14 4v10a3 3 0 11-3-3" />
          <path d="M14 4c.5 2.5 2.5 4 5 4" />
        </svg>
      );
  }
}

export function AlbumPanel({
  cover,
  albumTitle,
  albumTagline,
  stats,
  streamingLinks,
  artistNameImage,
  artistNameAspect,
  artistMotto,
  socials,
}: Props) {
  return (
    <section
      aria-labelledby="album-panel"
      className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-8 sm:py-12"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div
          className="relative overflow-hidden rounded-3xl bg-white"
          style={{ aspectRatio: "1 / 1" }}
        >
          <Image
            src={cover}
            alt={`Capa de ${albumTitle}`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <h2
              id="album-panel"
              className="font-display uppercase leading-none"
              style={{
                fontSize: "clamp(2rem, 4.6vw, 3.8rem)",
                letterSpacing: "0.02em",
              }}
            >
              {albumTitle}
            </h2>
            <p className="mt-3 text-sm italic text-fg/80 sm:text-base">
              “{albumTagline}”
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-y-5 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-muted">
                    {s.label}
                  </dt>
                  <dd className="mt-1 text-base">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap gap-3">
              {streamingLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor={l.label}
                  className="inline-flex items-center gap-2 rounded-full border bg-white/5 px-4 py-2 text-xs transition-colors hover:bg-white hover:text-black"
                  style={{ borderColor: "var(--border)" }}
                >
                  <IconGlyph name={l.icon} />
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <div
              className="relative"
              style={{
                width: "min(60%, 360px)",
                aspectRatio: artistNameAspect,
              }}
            >
              <Image
                src={artistNameImage}
                alt=""
                aria-hidden
                fill
                sizes="360px"
                className="object-contain object-left"
              />
            </div>
            <p className="mt-3 text-sm italic text-fg/80">“{artistMotto}”</p>

            <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-muted">
              Acompanhe o artista
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor={s.label}
                  className="inline-flex items-center gap-2 rounded-full border bg-white/5 px-4 py-2 text-xs transition-colors hover:bg-white hover:text-black"
                  style={{ borderColor: "var(--border)" }}
                >
                  <IconGlyph name={s.icon} />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
