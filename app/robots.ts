import type { MetadataRoute } from "next";
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://merch30praum.vercel.app";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // Protótipo em apresentação: fora dos buscadores até virar o site oficial.
        disallow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
