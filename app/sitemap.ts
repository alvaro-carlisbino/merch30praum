import type { MetadataRoute } from "next";
import { getAllArtists } from "@/lib/cms/artists";
import { getAllAlbums } from "@/lib/cms/albums";
import { getAllNews } from "@/lib/cms/news";
import { getAllPartners } from "@/lib/cms/partners";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://30praum.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [artists, albums, news, partners] = await Promise.all([
    getAllArtists(),
    getAllAlbums(),
    getAllNews(),
    getAllPartners(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/artistas`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/releases`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/shows`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/news`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/plantao`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/plantao/lineup`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/plantao/ingressos`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/plantao/edicoes`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/plantao/info`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/parcerias`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/catalogo`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/incubadora`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/incubadora/submeter`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/imprensa`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/loja`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
  ];

  const artistRoutes: MetadataRoute.Sitemap = artists.map((a) => ({
    url: `${BASE_URL}/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const albumRoutes: MetadataRoute.Sitemap = albums.map((a) => ({
    url: `${BASE_URL}/album/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const newsRoutes: MetadataRoute.Sitemap = news.map((post) => ({
    url: `${BASE_URL}/news/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const partnerRoutes: MetadataRoute.Sitemap = partners.map((p) => ({
    url: `${BASE_URL}/parcerias/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...artistRoutes, ...albumRoutes, ...newsRoutes, ...partnerRoutes];
}
