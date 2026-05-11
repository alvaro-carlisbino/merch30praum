import type { ArtistConfig } from "@/lib/artists/types";

/**
 * Embed oficial do Spotify. Usa o path `artist/{id}` ou `album/{id}` configurado no registry.
 * O iframe segue o tema dark do Spotify por padrão; carrega lazy.
 */
export function SpotifyEmbed({ artist, height = 352 }: { artist: ArtistConfig; height?: number }) {
  if (!artist.spotifyEmbedPath) return null;

  const src = `https://open.spotify.com/embed/${artist.spotifyEmbedPath}?utm_source=generator&theme=0`;

  return (
    <div
      className="relative overflow-hidden border"
      style={{ borderColor: "var(--border)" }}
    >
      <iframe
        title={`Spotify · ${artist.displayName}`}
        src={src}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ display: "block", borderRadius: 0 }}
      />
    </div>
  );
}
