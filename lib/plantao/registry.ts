import { IMG } from "@/lib/images/paths";
export type PlantaoSlug = "plantao-2023" | "plantao-2024" | "plantao-2026" | "plantao-2028";
export type LineupArtist = {
  displayName: string;
  artistSlug?: "matue" | "wiu" | "teto" | "brandao";
  highlightLabel?: string;
  imageUrl: string;
  isHeadliner?: boolean;
  isSpecial?: boolean;
};
export type PlantaoSector = {
  name: string;
  priceFrom?: number;
  priceTo?: number;
  status: "available" | "soldout" | "upcoming";
  perks?: string;
};
export type PlantaoEdition = {
  slug: PlantaoSlug;
  year: number;
  title: string;
  date: string;
  dateAnnounced?: boolean;
  doorsAt: string; 
  venue: string;
  city: string;
  state: string;
  status: "upcoming" | "live" | "past";
  tagline: string;
  manifesto: string;
  posterImage: string;
  heroImage: string;
  heroVideoUrl?: string;
  aftermovieUrl?: string;
  lineup: LineupArtist[];
  sectors: PlantaoSector[];
  ticketsUrl: string;
  embedTicketsUrl?: string;
  galleryImages: string[];
  stats: {
    attendees?: number;
    onlineViewers?: number;
  };
  infoFAQ: { question: string; answer: string }[];
};
const lineup2026: LineupArtist[] = [
  {
    displayName: "Matuê",
    artistSlug: "matue",
    highlightLabel: "Headliner",
    imageUrl: IMG.lineupMatue,
    isHeadliner: true,
  },
  {
    displayName: "Teto",
    artistSlug: "teto",
    highlightLabel: "Show especial · Colapso Global",
    imageUrl: IMG.lineupTetoWiu,
    isSpecial: true,
  },
  {
    displayName: "Wiu",
    artistSlug: "wiu",
    highlightLabel: "Show especial · Colapso Global",
    imageUrl: IMG.lineupWiu,
    isSpecial: true,
  },
  {
    displayName: "Brandão85",
    artistSlug: "brandao",
    highlightLabel: "Convida Jovem Dex e Leviano",
    imageUrl: IMG.lineupBrandao,
  },
  {
    displayName: "BK'",
    highlightLabel: "Convidado especial",
    imageUrl: IMG.lineupBK,
  },
  {
    displayName: "Recayd Mob",
    highlightLabel: "Convidados",
    imageUrl: IMG.lineupRecayd,
  },
  {
    displayName: "TZ da Coronel",
    imageUrl: IMG.lineupTZ,
  },
  {
    displayName: "Ajuliacosta",
    imageUrl: IMG.lineupAjullia,
  },
  {
    displayName: "Alee",
    imageUrl: IMG.lineupAlee,
  },
  {
    displayName: "Ryu, The Runner",
    imageUrl: IMG.lineupRyu,
  },
  {
    displayName: "DJ Thales",
    imageUrl: IMG.lineupDJThales,
  },
];
export const PLANTAO_EDITIONS: Record<PlantaoSlug, PlantaoEdition> = {
  "plantao-2023": {
    slug: "plantao-2023",
    year: 2023,
    title: "Plantão 2023",
    date: "2023-04-20",
    doorsAt: "20:00",
    venue: "Marina Park",
    city: "Fortaleza",
    state: "CE",
    status: "past",
    tagline: "A primeira edição, no Marina Park",
    manifesto:
      "A primeira edição do festival da 30praum, com Matuê, Teto, Wiu, Djonga, Major RD, Marcelo D2, L7nnon, Welisson e Arthurzim.",
    posterImage: IMG.plantaoPoster25,
    heroImage: IMG.plantaoHero25,
    lineup: [],
    sectors: [],
    ticketsUrl: "",
    galleryImages: [],
    stats: {},
    infoFAQ: [],
  },
  "plantao-2024": {
    slug: "plantao-2024",
    year: 2024,
    title: "Plantão 2024",
    date: "2024-04-19",
    doorsAt: "",
    venue: "Marina Park",
    city: "Fortaleza",
    state: "CE",
    status: "past",
    tagline: "Dois dias e quase 500 mil na transmissão",
    manifesto:
      "A segunda edição do festival da 30praum, em 19 e 20 de abril, no Marina Park, em Fortaleza. A transmissão teve quase 500 mil espectadores únicos.",
    posterImage: IMG.plantaoPoster24,
    heroImage: IMG.plantaoHero24,
    lineup: [],
    sectors: [],
    ticketsUrl: "",
    galleryImages: [
      IMG.plantaoGallery1,
      IMG.plantaoGallery2,
      IMG.plantaoGallery3,
      IMG.plantaoGallery4,
      IMG.plantaoGallery5,
      IMG.plantaoGallery6,
    ],
    stats: { onlineViewers: 500000 },
    infoFAQ: [],
  },
  "plantao-2026": {
    slug: "plantao-2026",
    year: 2026,
    title: "Plantão 2026",
    date: "2026-04-25",
    doorsAt: "15:00",
    venue: "Marina Park",
    city: "Fortaleza",
    state: "CE",
    status: "past",
    tagline: "A edição dos 10 anos da 30praum",
    manifesto:
      "A terceira edição marcou os 10 anos da 30praum. Matuê, Teto, Wiu e Brandão85 dividiram o palco com BK', Recayd Mob, TZ da Coronel, Ajuliacosta, Alee e Ryu, The Runner.",
    posterImage: IMG.plantaoPoster26,
    heroImage: IMG.plantaoHero26,
    lineup: lineup2026,
    sectors: [],
    ticketsUrl: "",
    galleryImages: [IMG.plantaoGallery1, IMG.plantaoGallery3, IMG.plantaoGallery5],
    stats: {},
    infoFAQ: [],
  },
  "plantao-2028": {
    slug: "plantao-2028",
    year: 2028,
    title: "Plantão 2028",
    date: "2028-01-01",
    dateAnnounced: false,
    doorsAt: "A anunciar",
    venue: "Local a anunciar",
    city: "Fortaleza",
    state: "CE",
    status: "upcoming",
    tagline: "Data e line-up ainda não anunciados",
    manifesto:
      "O Plantão acontece de dois em dois anos. A próxima edição é em 2028, com data, local e line-up ainda não anunciados. Deixa seu e-mail que a gente avisa assim que sair.",
    posterImage: IMG.plantaoPoster26,
    heroImage: IMG.plantaoHero26,
    lineup: [],
    sectors: [],
    ticketsUrl: "",
    galleryImages: [],
    stats: {},
    infoFAQ: [],
  },
};
export const CURRENT_PLANTAO: PlantaoSlug = "plantao-2028";
export function getPlantao(slug: string): PlantaoEdition | undefined {
  return PLANTAO_EDITIONS[slug as PlantaoSlug];
}
export function getCurrentPlantao(): PlantaoEdition {
  return PLANTAO_EDITIONS[CURRENT_PLANTAO];
}
export function getPastPlantao(): PlantaoEdition[] {
  return Object.values(PLANTAO_EDITIONS)
    .filter((e) => e.status === "past")
    .sort((a, b) => b.year - a.year);
}
export function getUpcomingPlantao(): PlantaoEdition[] {
  return Object.values(PLANTAO_EDITIONS).filter((e) => e.status === "upcoming");
}
