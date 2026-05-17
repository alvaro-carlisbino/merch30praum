import { ARTISTS } from "@/lib/artists/registry";
import { getCurrentPlantao } from "@/lib/plantao/registry";
import { IMG } from "@/lib/images/unsplash";

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

const matue = ARTISTS.matue;
const wiu = ARTISTS.wiu;
const teto = ARTISTS.teto;
const plantao = getCurrentPlantao();

export const FEED_ITEMS: FeedItem[] = [
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
