import { IMG } from "@/lib/images/unsplash";

export type PlantaoSlug = "plantao-2024" | "plantao-2025" | "plantao-2026" | "plantao-2027";

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
  date: string; // ISO
  doorsAt: string; // HH:MM
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
    investment?: string;
    hoursOfShow?: number;
  };
  infoFAQ: { question: string; answer: string }[];
};

const lineup2026: LineupArtist[] = [
  {
    displayName: "Matuê",
    artistSlug: "matue",
    highlightLabel: "Headliner · XTRANHO ao vivo",
    imageUrl: IMG.lineupMatue,
    isHeadliner: true,
  },
  {
    displayName: "Teto & Wiu",
    highlightLabel: "Show especial · Colapso Global",
    imageUrl: IMG.lineupTetoWiu,
    isSpecial: true,
  },
  {
    displayName: "Brandão85",
    artistSlug: "brandao",
    highlightLabel: "Isso é Trap Vol.02",
    imageUrl: IMG.lineupBrandao,
  },
  {
    displayName: "BK'",
    highlightLabel: "convidado especial",
    imageUrl: IMG.lineupBK,
  },
  {
    displayName: "Recayd Mob",
    highlightLabel: "convidados",
    imageUrl: IMG.lineupRecayd,
  },
  {
    displayName: "TZ da Coronel",
    imageUrl: IMG.lineupTZ,
  },
  {
    displayName: "Ajulliacosta",
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
    highlightLabel: "abertura",
    imageUrl: IMG.lineupDJThales,
  },
];

export const PLANTAO_EDITIONS: Record<PlantaoSlug, PlantaoEdition> = {
  "plantao-2024": {
    slug: "plantao-2024",
    year: 2024,
    title: "Plantão 2024",
    date: "2024-04-20",
    doorsAt: "15:00",
    venue: "Marina Park",
    city: "Fortaleza",
    state: "CE",
    status: "past",
    tagline: "A consolidação do plantão como referência nacional",
    manifesto:
      "A segunda edição confirmou: Fortaleza é capital do trap. 30 mil pessoas na Beira-Mar, R$5 milhões investidos, 17 artistas no palco — o Plantão saiu de projeto independente pra referência do gênero no país.",
    posterImage: IMG.plantaoPoster24,
    heroImage: IMG.plantaoHero24,
    aftermovieUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
    stats: {
      attendees: 30000,
      investment: "R$ 5 milhões",
      hoursOfShow: 9,
    },
    infoFAQ: [],
  },

  "plantao-2025": {
    slug: "plantao-2025",
    year: 2025,
    title: "Plantão 2025",
    date: "2025-04-26",
    doorsAt: "15:00",
    venue: "Marina Park",
    city: "Fortaleza",
    state: "CE",
    status: "past",
    tagline: "A primeira transmissão massiva — 500 mil online",
    manifesto:
      "A terceira edição abriu o jogo pra quem não estava em Fortaleza. Transmissão oficial no YouTube atraiu quase 500 mil espectadores únicos. O Plantão deixa de ser local pra ser nacional sem perder a quebrada.",
    posterImage: IMG.plantaoPoster25,
    heroImage: IMG.plantaoHero25,
    aftermovieUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    lineup: [],
    sectors: [],
    ticketsUrl: "",
    galleryImages: [
      IMG.plantaoGallery2,
      IMG.plantaoGallery4,
      IMG.plantaoGallery5,
      IMG.plantaoGallery6,
    ],
    stats: {
      attendees: 22000,
      onlineViewers: 500000,
      hoursOfShow: 10,
    },
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
    status: "live",
    tagline: "10 anos de 30praum · uma noite às margens da Beira-Mar",
    manifesto:
      "A 3ª edição marca os 10 anos da 30praum. Reúne a base, os novos e os convidados — Matuê, Teto, Wiu, Brandão85 e mais 7 nomes — em um dia só, frente ao mar. Quem viu sabe: não é um show, é uma cena se reconhecendo.",
    posterImage: IMG.plantaoPoster26,
    heroImage: IMG.plantaoHero26,
    heroVideoUrl: "/assets/plantao26-loop.mp4",
    aftermovieUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    lineup: lineup2026,
    sectors: [
      { name: "Front Boladão", priceFrom: 650, status: "soldout", perks: "Banheiro exclusivo · brindes oficiais" },
      { name: "Front", priceFrom: 150, priceTo: 300, status: "available", perks: "Acesso à grade" },
      { name: "VIP", priceFrom: 350, priceTo: 655, status: "available", perks: "Banheiro exclusivo · alimentação inclusa" },
      { name: "Camarote 30praum", priceFrom: 1200, status: "upcoming", perks: "Open bar premium · vista palco" },
    ],
    ticketsUrl: "https://stingressos.com.br/eventos/plantao-2026",
    embedTicketsUrl: "https://stingressos.com.br/eventos/plantao-2026",
    galleryImages: [IMG.plantaoGallery1, IMG.plantaoGallery3, IMG.plantaoGallery5],
    stats: {
      attendees: 20000,
      onlineViewers: 500000,
      investment: "R$ 5 milhões+",
      hoursOfShow: 10,
    },
    infoFAQ: [
      {
        question: "Onde é o Plantão 2026?",
        answer:
          "Marina Park Hotel · Av. Pres. Castelo Branco, 400 — Praia de Iracema, Fortaleza/CE. Acessível por transporte público, app de mobilidade e estacionamento conveniado.",
      },
      {
        question: "Que horas abrem os portões?",
        answer: "15h00 para o público geral. Recomendamos chegar até 17h para ver os shows de abertura sem fila.",
      },
      {
        question: "Como faço meia-entrada?",
        answer:
          "Estudante com carteirinha válida ou meia-solidária mediante doação de 2kg de alimento não-perecível na entrada. Carteirinha digital aceita.",
      },
      {
        question: "Menores de idade podem entrar?",
        answer:
          "+16 anos entram desacompanhados. <16 precisam de autorização cartorária dos pais ou estar acompanhados por responsável legal maior de 21.",
      },
      {
        question: "Posso transferir meu ingresso?",
        answer: "Transferência foi desativada para evitar cambistas. Em caso de força maior, abrir chamado em suporte@stingressos.com.br.",
      },
      {
        question: "O que posso levar?",
        answer:
          "Documento original, óculos escuros, carregador portátil, bonés/buckets oficiais e copos oficiais da 30praum. Proibido: cadeiras, vidro, mochilas, bebidas/alimentos externos.",
      },
      {
        question: "Tem acessibilidade PCD?",
        answer:
          "Sim. Sinalização direcionada até área PCD com vista preferencial. Acompanhante grátis mediante laudo. Banheiros PCD disponíveis.",
      },
      {
        question: "Vai ter transmissão?",
        answer:
          "Sim, transmissão oficial no canal 30praum no YouTube. A última edição reuniu quase 500 mil espectadores únicos.",
      },
    ],
  },

  "plantao-2027": {
    slug: "plantao-2027",
    year: 2027,
    title: "Plantão 2027",
    date: "2027-04-24",
    doorsAt: "15:00",
    venue: "A confirmar",
    city: "Fortaleza",
    state: "CE",
    status: "upcoming",
    tagline: "Em breve · prepare-se",
    manifesto:
      "A quinta edição já está em construção. Mais palco. Mais nomes. Mais Brasil. Cadastre-se na lista de espera pra receber lineup e pré-venda antes de qualquer outro lugar.",
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

export const CURRENT_PLANTAO: PlantaoSlug = "plantao-2026";

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
