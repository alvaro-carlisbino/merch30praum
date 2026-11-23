import Link from "next/link";
import type { CSSProperties } from "react";
import type { LineupArtist } from "@/lib/plantao/registry";

interface Props {
  lineup: LineupArtist[];
  accent: string;
}

export function LineupGrid({ lineup, accent }: Props) {
  return (
    <ul
      className="border-t border-white/15"
      style={{ "--lineup-accent": accent } as CSSProperties}
    >
      {lineup.map((artist, i) => {
        const row = (
          <div className="group flex items-baseline justify-between gap-4 py-3 sm:gap-8 sm:py-4">
            <h3
              className="font-display min-w-0 uppercase leading-none text-white transition-colors duration-200 group-hover:text-[var(--lineup-accent)]"
              style={{
                fontSize: artist.isHeadliner
                  ? "clamp(3rem, 9vw, 7.5rem)"
                  : "clamp(1.9rem, 4.6vw, 3.75rem)",
              }}
            >
              {artist.displayName}
            </h3>
            {artist.highlightLabel && (
              <p className="shrink-0 max-w-[42%] text-right text-xs leading-snug text-white/60 sm:text-sm">
                {artist.highlightLabel}
              </p>
            )}
          </div>
        );
        return (
          <li key={`${artist.displayName}-${i}`} className="border-b border-white/15">
            {artist.artistSlug ? (
              <Link href={`/${artist.artistSlug}`} data-cursor={artist.displayName} className="block">
                {row}
              </Link>
            ) : (
              row
            )}
          </li>
        );
      })}
    </ul>
  );
}
