import { ARTISTS } from "@/lib/artists/registry";
import type { ArtistSlug } from "@/lib/artists/types";

export interface StoryItem {
  slug: ArtistSlug;
  label: string;
  avatar: string;
  isActiveDrop: boolean;
}

export const STORIES: StoryItem[] = (["matue", "wiu", "teto", "brandao"] as ArtistSlug[]).map(
  (slug) => {
    const a = ARTISTS[slug];
    return {
      slug,
      label: a.displayName,
      avatar: a.portraitImage,
      isActiveDrop: a.drop.status === "live" || a.drop.status === "debut",
    };
  }
);
