import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "30praum",
    short_name: "30praum",
    description:
      "Lançamentos, shows, Plantão Festival e loja oficial da 30praum.",
    lang: "pt-BR",
    start_url: "/?source=app",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    categories: ["music", "entertainment", "shopping"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Loja", url: "/loja", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Shows", url: "/shows", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Plantão", url: "/plantao", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Lançamentos", url: "/releases", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
