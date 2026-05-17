import "server-only";
import { unstable_cache } from "next/cache";
import { getPayloadClient } from "@/lib/payload/client";
import {
  PARTNERS as STATIC_PARTNERS,
  type PartnerInfo,
  type PartnerSlug,
} from "@/lib/partners/registry";

const TTL = 60 * 60 * 4;

function adapt(doc: Record<string, unknown>): PartnerInfo {
  const release = (doc.release as Record<string, unknown>) ?? {};
  return {
    slug: doc.slug as PartnerSlug,
    name: doc.name as string,
    category: doc.category as string,
    years: doc.years as string,
    status: doc.status as PartnerInfo["status"],
    brandColor: doc.brandColor as string,
    bgColor: doc.bgColor as string,
    headline: doc.headline as string,
    shortPitch: doc.shortPitch as string,
    story: doc.story as string,
    quote: (doc.quote as string) || "",
    release: {
      name: release.name as string,
      format: release.format as string,
      year: release.year as string,
    },
    externalLink: doc.externalLink as string,
    internalLink: (doc.internalLink as string) || undefined,
    logoPath: (doc.logoPath as string) || undefined,
    heroImage: doc.heroImage as string,
    galleryImages: ((doc.galleryImages as Array<Record<string, unknown>>) ?? []).map(
      (g) => g.url as string
    ),
    artistsInvolved: (doc.artistsInvolved as string[] | undefined) ?? undefined,
  };
}

function fallbackAll(): PartnerInfo[] {
  return Object.values(STATIC_PARTNERS);
}

export const getAllPartners = unstable_cache(
  async (): Promise<PartnerInfo[]> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "partners",
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
  ["partners:all"],
  { tags: ["partners"], revalidate: TTL }
);

export const getPartner = unstable_cache(
  async (slug: string): Promise<PartnerInfo | null> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "partners",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 1,
      });
      if (res.docs[0]) return adapt(res.docs[0] as unknown as Record<string, unknown>);
    } catch {}
    return (STATIC_PARTNERS[slug as PartnerSlug] ?? null) as PartnerInfo | null;
  },
  ["partners:by-slug"],
  { tags: ["partners"], revalidate: TTL }
);

export const getActivePartners = unstable_cache(
  async (): Promise<PartnerInfo[]> => {
    const all = await getAllPartners();
    return all.filter((p) => p.status === "active");
  },
  ["partners:active"],
  { tags: ["partners"], revalidate: TTL }
);
