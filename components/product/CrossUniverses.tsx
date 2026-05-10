import Link from "next/link";
import { ARTISTS } from "@/lib/artists/registry";
import type { ArtistSlug } from "@/lib/artists/types";

interface CrossUniversesProps {
  current: ArtistSlug;
}

export function CrossUniverses({ current }: CrossUniversesProps) {
  const others = Object.values(ARTISTS).filter((a) => a.slug !== current);

  return (
    <section
      className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-16"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <header className="flex items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
            Outras almas da casa
          </p>
          <h2
            className="mt-2 font-display leading-[0.95]"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Quem manda é a 30praum.
          </h2>
        </div>
        <Link
          href="/"
          className="hidden sm:inline-block text-[10px] uppercase tracking-[0.3em] hover:text-accent"
        >
          Hub completo →
        </Link>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        {others.map((a) => (
          <Link
            key={a.slug}
            href={`/${a.slug}`}
            className="group relative block aspect-[4/3] overflow-hidden"
            style={{ background: a.panelBackground, color: "#fff" }}
          >
            <div
              aria-hidden
              className="absolute inset-0 transition-opacity"
              style={{
                background: `radial-gradient(circle at 50% 70%, ${a.panelAccent}, transparent 70%)`,
                opacity: 0.35,
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${a.panelAccent}, transparent 60%)`,
                mixBlendMode: "screen",
              }}
            />
            <div className="relative flex h-full flex-col justify-between p-5">
              <p
                className="text-[10px] uppercase tracking-[0.35em]"
                style={{ color: a.panelAccent }}
              >
                {a.drop.statusLabel}
              </p>
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {a.universeName}
                </p>
                <h3
                  className="mt-1 text-2xl font-bold"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {a.displayName}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
