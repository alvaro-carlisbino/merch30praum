import type { ArtistSlug } from "@/lib/artists/types";
import { ARTIST_SLUGS } from "@/lib/artists/registry";
import type { DomainProduct, ShopifyProduct } from "./types";

const TAG_PREFIX = "artist:";

export function resolveArtistFromTags(tags: string[]): ArtistSlug | null {
  for (const tag of tags) {
    const lowered = tag.toLowerCase();
    if (lowered.startsWith(TAG_PREFIX)) {
      const candidate = lowered.slice(TAG_PREFIX.length);
      if ((ARTIST_SLUGS as string[]).includes(candidate)) {
        return candidate as ArtistSlug;
      }
    }
  }
  return null;
}

export function transformProduct(p: ShopifyProduct): DomainProduct {
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    descriptionHtml: p.descriptionHtml,
    featuredImage: p.featuredImage,
    images: p.images,
    priceMin: p.priceRange.minVariantPrice,
    priceMax: p.priceRange.maxVariantPrice,
    options: p.options,
    variants: p.variants,
    tags: p.tags,
    artist: resolveArtistFromTags(p.tags),
  };
}
