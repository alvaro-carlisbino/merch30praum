import "server-only";
import { unstable_cache } from "next/cache";
import { getPayloadClient } from "@/lib/payload/client";
import type { ArtistConfig, ArtistSlug } from "@/lib/artists/types";
import { ARTISTS as STATIC_ARTISTS, ARTIST_SLUGS } from "@/lib/artists/registry";

const FOUR_HOURS = 60 * 60 * 4;

interface PayloadArtistDoc {
  slug: ArtistSlug;
  displayName: string;
  realName?: string | null;
  origin: string;
  joinedYear?: number | null;
  bioParagraphs?: { value: string }[] | null;
  facts?: { label: string; value: string }[] | null;
  universeName: string;
  tagline?: string | null;
  shopifyCollectionHandle?: string | null;
  album: {
    title: string;
    year: string;
    collaborator?: string | null;
    coverImage: string;
    tracks?: { name: string }[] | null;
  };
  portraitImage: string;
  panelAccent: string;
  panelBackground: string;
  socials?: ArtistConfig["socials"] | null;
}

function adaptArtist(doc: PayloadArtistDoc): ArtistConfig {
  return {
    slug: doc.slug,
    displayName: doc.displayName,
    realName: doc.realName ?? "",
    origin: doc.origin,
    joinedYear: doc.joinedYear ?? 0,
    bioParagraphs: (doc.bioParagraphs ?? []).map((p) => p.value),
    facts: doc.facts ?? [],
    universeName: doc.universeName,
    tagline: doc.tagline ?? "",
    shopifyCollectionHandle: doc.shopifyCollectionHandle ?? "",
    portraitImage: doc.portraitImage,
    panelAccent: doc.panelAccent,
    panelBackground: doc.panelBackground,
    album: {
      title: doc.album.title,
      year: doc.album.year,
      collaborator: doc.album.collaborator ?? undefined,
      coverImage: doc.album.coverImage,
      tracks: (doc.album.tracks ?? []).map((t) => t.name),
    },
    socials: doc.socials ?? undefined,
  };
}

export const getAllArtists = unstable_cache(
  async (): Promise<ArtistConfig[]> => {
    const fallback = ARTIST_SLUGS.map((s) => STATIC_ARTISTS[s]);
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "artists",
        limit: 100,
        depth: 1,
        pagination: false,
      });
      if (!res.docs.length) return fallback;
      return res.docs.map((d) => adaptArtist(d as unknown as PayloadArtistDoc));
    } catch {
      return fallback;
    }
  },
  ["artists:all"],
  { tags: ["artists"], revalidate: FOUR_HOURS }
);

export const getArtist = unstable_cache(
  async (slug: ArtistSlug): Promise<ArtistConfig | null> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "artists",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 1,
      });
      const doc = res.docs[0];
      if (doc) return adaptArtist(doc as unknown as PayloadArtistDoc);
    } catch {}
    return STATIC_ARTISTS[slug] ?? null;
  },
  ["artists:by-slug"],
  { tags: ["artists"], revalidate: FOUR_HOURS }
);
