import "server-only";
import { unstable_cache } from "next/cache";
import { getPayloadClient } from "@/lib/payload/client";
import { NEWS_POSTS as STATIC_NEWS, type NewsPost, type NewsTag } from "@/lib/news/registry";

const TTL = 60 * 60 * 4;

function adapt(doc: Record<string, unknown>): NewsPost {
  return {
    slug: doc.slug as string,
    title: doc.title as string,
    excerpt: doc.excerpt as string,
    heroImage: doc.heroImage as string,
    publishedAt:
      typeof doc.publishedAt === "string"
        ? doc.publishedAt
        : new Date(doc.publishedAt as string).toISOString(),
    author: doc.author as string,
    tags: (doc.tags as NewsTag[]) ?? [],
    body: ((doc.body as Array<Record<string, unknown>>) ?? []).map((p) => p.paragraph as string),
    relatedArtists: (doc.relatedArtists as string[] | undefined) ?? undefined,
    relatedReleases:
      ((doc.relatedReleases as Array<Record<string, unknown>> | undefined) ?? []).map(
        (r) => r.slug as string
      ) || undefined,
  };
}

export const getAllNews = unstable_cache(
  async (): Promise<NewsPost[]> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "news",
        limit: 200,
        depth: 1,
        pagination: false,
        sort: "-publishedAt",
      });
      if (!res.docs.length) return STATIC_NEWS;
      return res.docs.map((d) => adapt(d as unknown as Record<string, unknown>));
    } catch {
      return STATIC_NEWS;
    }
  },
  ["news:all"],
  { tags: ["news"], revalidate: TTL }
);

export const getNewsPost = unstable_cache(
  async (slug: string): Promise<NewsPost | null> => {
    try {
      const payload = await getPayloadClient();
      const res = await payload.find({
        collection: "news",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 1,
      });
      if (res.docs[0]) return adapt(res.docs[0] as unknown as Record<string, unknown>);
    } catch {}
    return STATIC_NEWS.find((n) => n.slug === slug) ?? null;
  },
  ["news:by-slug"],
  { tags: ["news"], revalidate: TTL }
);

export const getLatestNews = unstable_cache(
  async (count: number = 6): Promise<NewsPost[]> => {
    const all = await getAllNews();
    return all
      .slice()
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, count);
  },
  ["news:latest"],
  { tags: ["news"], revalidate: TTL }
);

export const getNewsByTag = unstable_cache(
  async (tag: NewsTag): Promise<NewsPost[]> => {
    const all = await getAllNews();
    return all.filter((n) => n.tags.includes(tag));
  },
  ["news:by-tag"],
  { tags: ["news"], revalidate: TTL }
);
