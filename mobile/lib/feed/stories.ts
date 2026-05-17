import { useMemo } from "react";
import { useArtists } from "@/lib/cms/queries";
import type { ArtistSlug } from "@/lib/artists/types";

export interface StoryItem {
  slug: ArtistSlug;
  label: string;
  avatar: string;
  isActiveDrop: boolean;
}

const ORDER: ArtistSlug[] = ["matue", "wiu", "teto", "brandao"];

export function useStories(): StoryItem[] {
  const { data: artists } = useArtists();
  return useMemo(() => {
    if (!artists) return [];
    const map = new Map(artists.map((a) => [a.slug, a]));
    return ORDER.flatMap((slug) => {
      const a = map.get(slug);
      if (!a) return [];
      return [
        {
          slug,
          label: a.displayName,
          avatar: a.portraitImage,
          isActiveDrop: a.drop.status === "live" || a.drop.status === "debut",
        },
      ];
    });
  }, [artists]);
}
