import Image from "next/image";
import Link from "next/link";
import type { LineupArtist } from "@/lib/plantao/registry";
import { blurFor } from "@/lib/images/blur-data";

interface Props {
  lineup: LineupArtist[];
  accent: string;
}

export function LineupGrid({ lineup, accent }: Props) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {lineup.map((artist, i) => {
        const card = (
          <div
            className="group relative block h-full overflow-hidden rounded-2xl"
            style={{ aspectRatio: "4 / 5", background: "#140208" }}
          >
            {artist.imageUrl ? (
              <>
                <Image
                  src={artist.imageUrl}
                  alt={artist.displayName}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 50vw"
                  placeholder={blurFor(artist.imageUrl) ? "blur" : "empty"}
                  blurDataURL={blurFor(artist.imageUrl)}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  style={{ objectPosition: "center 20%" }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 40%, rgba(8,2,5,0.92) 100%)" }}
                />
              </>
            ) : (
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${accent}22, transparent 62%), #140208`,
                }}
              />
            )}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 sm:p-5">
              {artist.isHeadliner && (
                <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: accent }}>
                  Headliner
                </span>
              )}
              <h3
                className="font-display uppercase leading-[0.92] text-white"
                style={{
                  fontSize: artist.isHeadliner ? "clamp(1.4rem, 2.6vw, 2.1rem)" : "clamp(1.05rem, 1.9vw, 1.5rem)",
                  letterSpacing: "-0.01em",
                  textShadow: "0 2px 14px rgba(0,0,0,0.8)",
                }}
              >
                {artist.displayName}
              </h3>
              {artist.highlightLabel && !artist.isHeadliner && (
                <p className="text-[10px] leading-snug text-white/65">{artist.highlightLabel}</p>
              )}
            </div>
          </div>
        );
        return (
          <li key={`${artist.displayName}-${i}`}>
            {artist.artistSlug ? (
              <Link href={`/${artist.artistSlug}`} data-cursor={artist.displayName} className="block h-full">
                {card}
              </Link>
            ) : (
              card
            )}
          </li>
        );
      })}
    </ul>
  );
}
