import "server-only";
import { unstable_cache } from "next/cache";
import { getPayloadClient } from "@/lib/payload/client";
import {
  PLANTAO_EDITIONS as STATIC_EDITIONS,
  CURRENT_PLANTAO,
  type PlantaoEdition,
  type PlantaoSlug,
} from "@/lib/plantao/registry";

const TTL = 60 * 60 * 4;

function adapt(doc: Record<string, unknown>): PlantaoEdition {
  return {
    slug: doc.slug as PlantaoSlug,
    year: doc.year as number,
    title: doc.title as string,
    date: typeof doc.date === "string" ? doc.date.slice(0, 10) : new Date(doc.date as string).toISOString().slice(0, 10),
    doorsAt: doc.doorsAt as string,
    venue: doc.venue as string,
    city: doc.city as string,
    state: doc.state as string,
    status: doc.status as PlantaoEdition["status"],
    tagline: doc.tagline as string,
    manifesto: doc.manifesto as string,
    posterImage: doc.posterImage as string,
    heroImage: doc.heroImage as string,
    heroVideoUrl: (doc.heroVideoUrl as string) || undefined,
    aftermovieUrl: (doc.aftermovieUrl as string) || undefined,
    lineup: ((doc.lineup as Array<Record<string, unknown>>) ?? []).map((l) => ({
      displayName: l.displayName as string,
      artistSlug: (l.artistSlug as PlantaoEdition["lineup"][number]["artistSlug"]) || undefined,
      highlightLabel: (l.highlightLabel as string) || undefined,
      imageUrl: l.imageUrl as string,
      isHeadliner: Boolean(l.isHeadliner),
      isSpecial: Boolean(l.isSpecial),
    })),
    sectors: ((doc.sectors as Array<Record<string, unknown>>) ?? []).map((s) => ({
      name: s.name as string,
      priceFrom: typeof s.priceFrom === "number" ? s.priceFrom : undefined,
      priceTo: typeof s.priceTo === "number" ? s.priceTo : undefined,
      status: s.status as PlantaoEdition["sectors"][number]["status"],
      perks: (s.perks as string) || undefined,
    })),
    ticketsUrl: doc.ticketsUrl as string,
    embedTicketsUrl: (doc.embedTicketsUrl as string) || undefined,
    galleryImages: ((doc.galleryImages as Array<Record<string, unknown>>) ?? []).map((g) => g.url as string),
    stats: {
      attendees: (doc.stats as Record<string, unknown>)?.attendees as number | undefined,
      onlineViewers: (doc.stats as Record<string, unknown>)?.onlineViewers as number | undefined,
      investment: (doc.stats as Record<string, unknown>)?.investment as string | undefined,
      hoursOfShow: (doc.stats as Record<string, unknown>)?.hoursOfShow as number | undefined,
    },
    infoFAQ: ((doc.infoFAQ as Array<Record<string, unknown>>) ?? []).map((f) => ({
      question: f.question as string,
      answer: f.answer as string,
    })),
  };
}

function fallbackAll(): PlantaoEdition[] {
  return Object.values(STATIC_EDITIONS);
}

export const getAllPlantao = unstable_cache(
  async (): Promise<PlantaoEdition[]> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({ collection: "plantao", limit: 50, depth: 1, pagination: false });
      if (!res.docs.length) return fallbackAll();
      return res.docs.map((d) => adapt(d as unknown as Record<string, unknown>));
    } catch {
      return fallbackAll();
    }
  },
  ["plantao:all"],
  { tags: ["plantao"], revalidate: TTL }
);

export const getCurrentPlantao = unstable_cache(
  async (): Promise<PlantaoEdition> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "plantao",
        where: { isCurrent: { equals: true } },
        limit: 1,
        depth: 1,
      });
      if (res.docs[0]) return adapt(res.docs[0] as unknown as Record<string, unknown>);
    } catch {}
    return STATIC_EDITIONS[CURRENT_PLANTAO];
  },
  ["plantao:current"],
  { tags: ["plantao"], revalidate: TTL }
);

export const getPlantao = unstable_cache(
  async (slug: string): Promise<PlantaoEdition | null> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "plantao",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 1,
      });
      const doc = res.docs[0];
      if (doc) return adapt(doc as unknown as Record<string, unknown>);
    } catch {}
    return (STATIC_EDITIONS[slug as PlantaoSlug] ?? null) as PlantaoEdition | null;
  },
  ["plantao:by-slug"],
  { tags: ["plantao"], revalidate: TTL }
);

export const getPastPlantao = unstable_cache(
  async (): Promise<PlantaoEdition[]> => {
    const all = await getAllPlantao();
    return all.filter((e) => e.status === "past").sort((a, b) => b.year - a.year);
  },
  ["plantao:past"],
  { tags: ["plantao"], revalidate: TTL }
);
