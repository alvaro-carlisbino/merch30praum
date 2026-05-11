import { Instagram, Music2, Youtube, ExternalLink } from "lucide-react";
import type { ArtistConfig } from "@/lib/artists/types";

const SOCIAL_ITEMS: {
  key: keyof NonNullable<ArtistConfig["socials"]>;
  label: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}[] = [
  { key: "spotify", label: "Spotify", Icon: Music2 },
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "tiktok", label: "TikTok", Icon: Music2 },
  { key: "youtube", label: "YouTube", Icon: Youtube },
  { key: "appleMusic", label: "Apple Music", Icon: Music2 },
  { key: "soundcloud", label: "SoundCloud", Icon: Music2 },
];

export function ArtistSocials({ artist }: { artist: ArtistConfig }) {
  if (!artist.socials) return null;
  const entries = SOCIAL_ITEMS.filter((i) => artist.socials?.[i.key]);
  if (entries.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {entries.map(({ key, label, Icon }) => {
        const url = artist.socials![key]!;
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor={label}
            className="group inline-flex items-center gap-2 border px-4 py-2.5 text-sm transition-colors hover:bg-fg/5"
            style={{ borderColor: "var(--border)" }}
          >
            <Icon size={16} strokeWidth={1.5} />
            <span>{label}</span>
            <ExternalLink
              size={12}
              strokeWidth={1.5}
              className="opacity-40 group-hover:opacity-80 transition-opacity"
            />
          </a>
        );
      })}
    </div>
  );
}
