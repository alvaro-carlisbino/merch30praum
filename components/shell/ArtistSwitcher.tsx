import Link from "next/link";
import { ARTIST_SLUGS, ARTISTS } from "@/lib/artists/registry";
import { cn } from "@/lib/utils/cn";

interface ArtistSwitcherProps {
  current?: string;
  className?: string;
}

export function ArtistSwitcher({ current, className }: ArtistSwitcherProps) {
  return (
    <nav
      className={cn(
        "flex items-center gap-1 text-xs uppercase tracking-widest",
        className,
      )}
      aria-label="Universos"
    >
      {ARTIST_SLUGS.map((slug) => {
        const cfg = ARTISTS[slug];
        const isActive = slug === current;
        return (
          <Link
            key={slug}
            href={`/${slug}`}
            className={cn(
              "px-2 py-1 transition-opacity",
              isActive ? "opacity-100" : "opacity-55 hover:opacity-100",
            )}
            style={isActive ? { color: cfg.panelAccent } : undefined}
          >
            {cfg.displayName}
          </Link>
        );
      })}
    </nav>
  );
}
