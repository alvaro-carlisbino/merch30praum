import { useMemo } from "react";
import { IMG } from "@/lib/images/unsplash";
import { useArtists, useCurrentPlantao } from "@/lib/cms/queries";

export type FeedItem =
  | {
      kind: "drop";
      id: string;
      artistSlug: "matue" | "wiu" | "teto" | "brandao";
      coverImage: string;
      lettering: string;
      chapter: string;
      cta: string;
      href: string;
    }
  | {
      kind: "plantao";
      id: string;
      heroImage: string;
      title: string;
      tagline: string;
      date: string;
      href: string;
    }
  | {
      kind: "colab";
      id: string;
      coverImage: string;
      title: string;
      caption: string;
      href: string;
    }
  | {
      kind: "news";
      id: string;
      heroImage: string;
      eyebrow: string;
      title: string;
      excerpt: string;
      href: string;
    };

export function useFeedItems(): FeedItem[] {
  const { data: artists } = useArtists();
  const { data: plantao } = useCurrentPlantao();

  return useMemo(() => {
    if (!artists || !plantao) return [];
    const map = new Map(artists.map((a) => [a.slug, a]));
    const matue = map.get("matue");
    const wiu = map.get("wiu");
    const teto = map.get("teto");
    if (!matue || !wiu || !teto) return [];
    return [
      {
        kind: "drop",
        id: "drop-matue-xtranho",
        artistSlug: "matue",
        coverImage: matue.album.coverImage,
        lettering: matue.album.title,
        chapter: matue.drop.chapterName,
        cta: "Ver coleção",
        href: "/loja",
      },
      {
        kind: "plantao",
        id: "plantao-2026",
        heroImage: plantao.heroImage,
        title: plantao.title,
        tagline: plantao.tagline,
        date: plantao.date,
        href: "/plantao",
      },
      {
        kind: "colab",
        id: "wiu-teto-colapso",
        coverImage: wiu.album.coverImage,
        title: `${wiu.displayName} × ${teto.displayName}`,
        caption: "Colapso Global · agora em todas plataformas",
        href: "/eleitos/wiu",
      },
      {
        kind: "news",
        id: "news-incubadora",
        heroImage: IMG.newsIncubadora,
        eyebrow: "Incubadora",
        title: "Inscrições abertas pra próxima leva",
        excerpt:
          "Sete artistas. Seis meses. Um manifesto: descentralizar o trap brasileiro do eixo Rio-SP.",
        href: "/perfil",
      },
    ];
  }, [artists, plantao]);
}
