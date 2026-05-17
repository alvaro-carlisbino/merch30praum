import "server-only";
import { unstable_cache } from "next/cache";
import { getPayloadClient } from "@/lib/payload/client";
import { SHOWS as STATIC_SHOWS, type Show } from "@/lib/shows/registry";
import type { ArtistSlug } from "@/lib/artists/types";

const TTL = 60 * 60 * 4;

function adapt(doc: Record<string, unknown>, idx: number): Show {
  return {
    id: (doc.id as string) ?? `show-${idx}`,
    artistSlug: doc.artistSlug as ArtistSlug,
    date:
      typeof doc.date === "string"
        ? doc.date.slice(0, 10)
        : new Date(doc.date as string).toISOString().slice(0, 10),
    city: doc.city as string,
    state: doc.state as string,
    venue: doc.venue as string,
    event: (doc.event as string) || undefined,
    ticketsUrl: (doc.ticketsUrl as string) || undefined,
    status: doc.status as Show["status"],
    note: (doc.note as string) || undefined,
  };
}

export const getAllShows = unstable_cache(
  async (): Promise<Show[]> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "shows",
        limit: 500,
        depth: 0,
        pagination: false,
        sort: "date",
      });
      if (!res.docs.length) return STATIC_SHOWS;
      return res.docs.map((d, i) => adapt(d as unknown as Record<string, unknown>, i));
    } catch {
      return STATIC_SHOWS;
    }
  },
  ["shows:all"],
  { tags: ["shows"], revalidate: TTL }
);

export const getUpcomingShows = unstable_cache(
  async (): Promise<Show[]> => {
    const all = await getAllShows();
    const today = new Date().toISOString().slice(0, 10);
    return all
      .filter((s) => s.status !== "past" && s.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date));
  },
  ["shows:upcoming"],
  { tags: ["shows"], revalidate: TTL }
);

export const getPastShows = unstable_cache(
  async (): Promise<Show[]> => {
    const all = await getAllShows();
    const today = new Date().toISOString().slice(0, 10);
    return all
      .filter((s) => s.status === "past" || s.date < today)
      .sort((a, b) => b.date.localeCompare(a.date));
  },
  ["shows:past"],
  { tags: ["shows"], revalidate: TTL }
);

export const getShowsByArtist = unstable_cache(
  async (slug: ArtistSlug): Promise<Show[]> => {
    const all = await getAllShows();
    return all.filter((s) => s.artistSlug === slug);
  },
  ["shows:by-artist"],
  { tags: ["shows"], revalidate: TTL }
);
