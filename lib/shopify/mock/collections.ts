import type { ShopifyCollection } from "../types";
import { ARTISTS } from "@/lib/artists/registry";
import type { ArtistSlug } from "@/lib/artists/types";
import { getMockProductsByArtist } from "./products";

export function getMockCollectionByHandle(
  handle: string,
): ShopifyCollection | null {
  for (const slug of Object.keys(ARTISTS) as ArtistSlug[]) {
    const cfg = ARTISTS[slug];
    if (cfg.shopifyCollectionHandle === handle) {
      const products = getMockProductsByArtist(slug);
      return {
        id: `gid://mock/Collection/${slug}`,
        handle,
        title: cfg.universeName,
        description: cfg.tagline,
        image: null,
        products,
      };
    }
  }
  return null;
}
