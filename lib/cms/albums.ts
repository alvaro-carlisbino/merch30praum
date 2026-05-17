import "server-only";
import { unstable_cache } from "next/cache";
import { getPayloadClient } from "@/lib/payload/client";
import {
  ALBUMS as STATIC_ALBUMS,
  type AlbumPageInfo,
  type AlbumSlug,
} from "@/lib/albums/registry";

const TTL = 60 * 60 * 4;

function adapt(doc: Record<string, unknown>): AlbumPageInfo {
  return {
    slug: doc.slug as AlbumSlug,
    title: doc.title as string,
    artists: ((doc.artists as Array<Record<string, unknown>>) ?? []).map((a) => ({
      name: a.name as string,
      slug: a.slug as AlbumPageInfo["artists"][number]["slug"],
    })),
    year: doc.year as string,
    releaseDate:
      typeof doc.releaseDate === "string"
        ? doc.releaseDate.slice(0, 10)
        : new Date(doc.releaseDate as string).toISOString().slice(0, 10),
    totalTracks: doc.totalTracks as number,
    duration: doc.duration as string,
    coverImage: doc.coverImage as string,
    manifesto: doc.manifesto as string,
    tagline: doc.tagline as string,
    editorialPitch: (doc.editorialPitch as string) || undefined,
    status: (doc.status as AlbumPageInfo["status"]) || undefined,
    accentHex: doc.accentHex as string,
    bgHex: doc.bgHex as string,
    tracks: ((doc.tracks as Array<Record<string, unknown>>) ?? []).map((t) => ({
      title: t.title as string,
      duration: t.duration as string,
      featured: t.featured ? String(t.featured) : undefined,
    })),
    streamingLinks: ((doc.streamingLinks as Array<Record<string, unknown>>) ?? []).map((l) => ({
      label: l.label as string,
      href: l.href as string,
    })),
    dropArtistSlug: doc.dropArtistSlug as AlbumPageInfo["dropArtistSlug"],
  };
}

function fallbackAll(): AlbumPageInfo[] {
  return Object.values(STATIC_ALBUMS);
}

export const getAllAlbums = unstable_cache(
  async (): Promise<AlbumPageInfo[]> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "albums",
        limit: 100,
        depth: 1,
        pagination: false,
      });
      if (!res.docs.length) return fallbackAll();
      return res.docs.map((d) => adapt(d as unknown as Record<string, unknown>));
    } catch {
      return fallbackAll();
    }
  },
  ["albums:all"],
  { tags: ["albums"], revalidate: TTL }
);

export const getAlbum = unstable_cache(
  async (slug: string): Promise<AlbumPageInfo | null> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "albums",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 1,
      });
      if (res.docs[0]) return adapt(res.docs[0] as unknown as Record<string, unknown>);
    } catch {}
    return (STATIC_ALBUMS[slug as AlbumSlug] ?? null) as AlbumPageInfo | null;
  },
  ["albums:by-slug"],
  { tags: ["albums"], revalidate: TTL }
);
