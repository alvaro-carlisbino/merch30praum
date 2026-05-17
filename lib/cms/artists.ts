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
  bornYear?: number | null;
  joinedYear?: number | null;
  signatureLyric?: string | null;
  bioParagraphs?: { value: string }[] | null;
  facts?: { label: string; value: string }[] | null;
  signatureSongs?: { name: string }[] | null;
  universeName: string;
  tagline?: string | null;
  manifesto?: string | null;
  shopifyCollectionHandle?: string | null;
  motionPreset?: ArtistConfig["motionPreset"] | null;
  drop: ArtistConfig["drop"];
  voice?: {
    epigraph?: string | null;
    process?: { step: string }[] | null;
  } | null;
  album: {
    title: string;
    year: string;
    collaborator?: string | null;
    coverImage: string;
    tagline?: string | null;
    highlightedTracks?: { name: string }[] | null;
  };
  portraitImage: string;
  realPhotoUrl?: string | null;
  photoObjectPosition?: string | null;
  photoFilter?: string | null;
  heroImage: string;
  lookbookImages?: { url: string }[] | null;
  panelAccent: string;
  panelBackground: string;
  socials?: ArtistConfig["socials"] | null;
  spotifyEmbedPath?: string | null;
}

function adaptArtist(doc: PayloadArtistDoc): ArtistConfig {
  return {
    slug: doc.slug,
    displayName: doc.displayName,
    realName: doc.realName ?? "",
    origin: doc.origin,
    bornYear: doc.bornYear ?? 0,
    joinedYear: doc.joinedYear ?? 0,
    bioParagraphs: (doc.bioParagraphs ?? []).map((p) => p.value),
    facts: doc.facts ?? [],
    signatureSongs: (doc.signatureSongs ?? []).map((s) => s.name),
    universeName: doc.universeName,
    tagline: doc.tagline ?? "",
    manifesto: doc.manifesto ?? "",
    shopifyCollectionHandle: doc.shopifyCollectionHandle ?? "",
    motionPreset: doc.motionPreset ?? "slow",
    portraitImage: doc.portraitImage,
    realPhotoUrl: doc.realPhotoUrl ?? undefined,
    photoObjectPosition: doc.photoObjectPosition ?? undefined,
    photoFilter: doc.photoFilter ?? undefined,
    heroImage: doc.heroImage,
    lookbookImages: extractLookbook(doc.lookbookImages),
    panelAccent: doc.panelAccent,
    panelBackground: doc.panelBackground,
    album: {
      title: doc.album.title,
      year: doc.album.year,
      collaborator: doc.album.collaborator ?? undefined,
      coverImage: doc.album.coverImage,
      tagline: doc.album.tagline ?? "",
      highlightedTracks: (doc.album.highlightedTracks ?? []).map((t) => t.name),
    },
    drop: doc.drop,
    voice: {
      epigraph: doc.voice?.epigraph ?? "",
      process: extractProcess(doc.voice?.process),
    },
    signatureLyric: doc.signatureLyric ?? "",
    socials: doc.socials ?? undefined,
    spotifyEmbedPath: doc.spotifyEmbedPath ?? undefined,
  };
}

function extractLookbook(items: { url: string }[] | null | undefined): [string, string, string] {
  const urls = (items ?? []).map((i) => i.url);
  return [urls[0] ?? "", urls[1] ?? "", urls[2] ?? ""];
}

function extractProcess(items: { step: string }[] | null | undefined): [string, string, string] {
  const steps = (items ?? []).map((i) => i.step);
  return [steps[0] ?? "", steps[1] ?? "", steps[2] ?? ""];
}

function fallbackAll(): ArtistConfig[] {
  return ARTIST_SLUGS.map((s) => STATIC_ARTISTS[s]);
}

function fallbackOne(slug: ArtistSlug): ArtistConfig | null {
  return STATIC_ARTISTS[slug] ?? null;
}

export const getAllArtists = unstable_cache(
  async (): Promise<ArtistConfig[]> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "artists",
        limit: 100,
        depth: 1,
        pagination: false,
      });
      if (!res.docs.length) return fallbackAll();
      return res.docs.map((d) => adaptArtist(d as unknown as PayloadArtistDoc));
    } catch {
      return fallbackAll();
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
      if (!doc) return fallbackOne(slug);
      return adaptArtist(doc as unknown as PayloadArtistDoc);
    } catch {
      return fallbackOne(slug);
    }
  },
  ["artists:by-slug"],
  { tags: ["artists"], revalidate: FOUR_HOURS }
);
