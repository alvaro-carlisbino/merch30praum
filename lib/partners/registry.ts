import { IMG } from "@/lib/images/unsplash";

export type PartnerSlug =
  | "renner"
  | "plantao"
  | "ed-hardy"
  | "raw"
  | "kenner"
  | "sabor-matue";

export interface PartnerInfo {
  slug: PartnerSlug;
  name: string;
  category: string;
  years: string;
  status: "active" | "past" | "upcoming";
  brandColor: string;
  bgColor: string;
  headline: string; // pode ter \n
  shortPitch: string;
  story: string;
  quote: string;
  release: { name: string; format: string; year: string };
  externalLink: string;
  internalLink?: string; // se for vertical interna (ex: /plantao, /sabor)
  logoPath?: string;
  heroImage: string;
  galleryImages: string[];
  artistsInvolved?: string[]; // slugs
}

export const PARTNER_SLUGS: PartnerSlug[] = [
  "plantao",
  "sabor-matue",
  "renner",
  "ed-hardy",
  "raw",
  "kenner",
];

export const PARTNERS: Record<PartnerSlug, PartnerInfo> = {
  plantao: {
    slug: "plantao",
    name: "Plantão Festival",
    category: "Festival próprio · Fortaleza",
    years: "2023 — agora",
    status: "active",
    brandColor: "#ff3535",
    bgColor: "#0c0407",
    headline: "PLANTÃO FESTIVAL\nFORTALEZA NO MAPA",
    shortPitch: "Festival próprio da holding · 30 mil presencial · 500 mil online",
    story:
      "O Plantão é o festival próprio da 30praum, sediado em Fortaleza pra fixar o Nordeste como polo nacional do trap e do rap. 1ª edição em 2023 reuniu 20 mil pessoas. Em 2024, com R$ 5 milhões de investimento, bateu 30 mil presencial. A 3ª edição (2026) marca os 10 anos da gravadora — Marina Park, line-up com Matuê, Teto, Wiu, Brandão85, BK', Recayd Mob, TZ da Coronel.",
    quote: "Não vamos abrir edição em SP nem no Rio. Plantão é Fortaleza.",
    release: {
      name: "Plantão Festival 2026",
      format: "10 anos da 30praum · Marina Park",
      year: "2026",
    },
    externalLink: "https://plantaofestival.com",
    internalLink: "/plantao",
    heroImage: IMG.partnerPlantao,
    galleryImages: [IMG.plantaoGallery1, IMG.plantaoGallery2, IMG.plantaoGallery3],
    artistsInvolved: ["matue", "teto", "wiu", "brandao"],
  },

  "sabor-matue": {
    slug: "sabor-matue",
    name: "Sabor Matuê",
    category: "Food & Beverage · FMCG",
    years: "2026 →",
    status: "upcoming",
    brandColor: "#ff8c5a",
    bgColor: "#1f0d05",
    headline: "SABOR MATUÊ\nA HOLDING SAI DO PALCO",
    shortPitch: "Linha premium de geladinhos · primeira frente FMCG · verão 26/27",
    story:
      "O que começou como referência cultural no EP 'Sabor Overdose no Yakisoba' (Matuê, 2024) vira a primeira frente FMCG da holding 30praum. Linha de geladinhos premium em parceria com fábrica cearense — ingredientes da Serra de Baturité, identidade visual desenhada faixa a faixa. Lançamento Norte/Nordeste no verão 26/27, expansão Brasil em 2028.",
    quote: "Comida-cultura. Underground saindo do freezer.",
    release: {
      name: "Linha Sabor Matuê",
      format: "5 sabores autorais + edição limitada",
      year: "2027",
    },
    externalLink: "https://instagram.com/sabormatue",
    internalLink: "/sabor",
    heroImage: IMG.partnerSabor,
    galleryImages: [IMG.saborReiTue, IMG.saborVampiro, IMG.sabor333],
    artistsInvolved: ["matue"],
  },

  renner: {
    slug: "renner",
    name: "Renner",
    category: "Moda · Varejo",
    years: "2023 — agora",
    status: "active",
    brandColor: "#e85a3c",
    bgColor: "#1a0e0a",
    headline: "RENNER × 30PRAUM\nA RUA NA VITRINE",
    shortPitch: "Coleção em 600 lojas físicas · drops sazonais permanentes",
    story:
      "Lançada em agosto de 2023, a coleção 30praum × Renner colocou o trap brasileiro nas 600 lojas Renner do país. Sete peças no primeiro drop — camisetas, calças e moletons em branco, preto, bege e marrom — com fotografias e colagens de Matuê, Wiu e Teto. R$ 79,90 a R$ 219,90. Esgotou em 48h em 2024. Em 2025 virou parceria permanente: drops sazonais a cada coleção e edições especiais ligadas ao Plantão e aos lançamentos de álbum.",
    quote: "Pela primeira vez, o trap saiu do feed e entrou no shopping.",
    release: {
      name: "Coleção 30praum × Renner",
      format: "7+ peças · 600 lojas · permanente",
      year: "2023 — agora",
    },
    externalLink: "https://www.lojasrenner.com.br/marca/30praum/-/N-o54xd7",
    heroImage: IMG.partnerRenner,
    galleryImages: [
      IMG.partnerRennerGallery1,
      IMG.partnerRennerGallery2,
      IMG.partnerRennerGallery3,
      IMG.partnerRennerGallery4,
    ],
    artistsInvolved: ["matue", "teto", "wiu"],
  },

  "ed-hardy": {
    slug: "ed-hardy",
    name: "Ed Hardy by Matuê",
    category: "Moda · Streetwear licenciado",
    years: "2024 — agora",
    status: "active",
    brandColor: "#a8243c",
    bgColor: "#160710",
    headline: "ED HARDY × MATUÊ\nO TATTOO VIROU TRAP",
    shortPitch: "Cápsula licenciada · Matuê assina coleção exclusiva da Ed Hardy",
    story:
      "Ed Hardy by Matuê é a primeira colaboração licenciada do trap brasileiro com uma marca americana de streetwear premium. Matuê assina visualmente uma cápsula desenhada faixa a faixa — releitura dos tattoos icônicos da marca com elementos de XTRANHO e 333. Lançamento em 2024, drops contínuos via 30praum.store e seleção de boutiques.",
    quote: "Ed Hardy é tatuagem. XTRANHO também. Bate.",
    release: {
      name: "Cápsula Ed Hardy by Matuê",
      format: "Streetwear premium · drops contínuos",
      year: "2024 — agora",
    },
    externalLink: "https://30praum.store/collections/ed-hardy-by-matue",
    heroImage: IMG.partnerEdHardy,
    galleryImages: [
      IMG.partnerEdHardyGallery1,
      IMG.partnerEdHardyGallery2,
      IMG.partnerEdHardyGallery3,
    ],
    artistsInvolved: ["matue"],
  },

  raw: {
    slug: "raw",
    name: "RAW",
    category: "Lifestyle · Rolling papers",
    years: "2024 →",
    status: "active",
    brandColor: "#c79a4a",
    bgColor: "#0e0c08",
    headline: "RAW × 30PRAUM\nO PAPEL TEM CULTURA",
    shortPitch: "Linha de acessórios oficiais · co-branding RAW × 30praum",
    story:
      "A RAW — marca global de rolling papers natural — fechou parceria de co-branding com a 30praum em 2024. A linha oficial 30praum × RAW inclui rolling trays, organizers, bandejas e capacetes em edições limitadas com identidade da gravadora. Distribuição via 30praum.store, headshops parceiros e pop-ups do Plantão.",
    quote: "Pra quem entende, isso é cultura. Não é uso. É ritual.",
    release: {
      name: "Linha 30praum × RAW",
      format: "Acessórios · edições limitadas",
      year: "2024 — agora",
    },
    externalLink: "https://rawthentic.com",
    heroImage: IMG.partnerRaw,
    galleryImages: [IMG.partnerRawGallery1, IMG.partnerRawGallery2, IMG.partnerRawGallery3],
    artistsInvolved: ["matue"],
  },

  kenner: {
    slug: "kenner",
    name: "Kenner",
    category: "Calçados · Footwear",
    years: "2025 →",
    status: "active",
    brandColor: "#3a5f33",
    bgColor: "#0a120a",
    headline: "KENNER × 30PRAUM\nO PÉ NA QUEBRADA",
    shortPitch: "Sandália oficial Plantão · linha limitada por edição",
    story:
      "Kenner — marca brasileira de calçado nascida em 1995, com presença histórica na cultura do skate e do hip-hop — assinou em 2025 a sandália oficial do Plantão Festival. Modelo exclusivo a cada edição, com paleta da identidade do ano e numeração interna 1/2000 em cada par. Vendida na pré-venda do festival e na 30praum.store.",
    quote: "Conforto pra aguentar 10h de Plantão na areia.",
    release: {
      name: "Kenner Plantão 2026",
      format: "Sandália numerada · 2000 unidades",
      year: "2025 — agora",
    },
    externalLink: "https://kenner.com.br",
    heroImage: IMG.partnerKenner,
    galleryImages: [
      IMG.partnerKennerGallery1,
      IMG.partnerKennerGallery2,
      IMG.partnerKennerGallery3,
    ],
    artistsInvolved: ["matue", "teto", "wiu", "brandao"],
  },
};

export function getPartner(slug: string): PartnerInfo | undefined {
  return PARTNERS[slug as PartnerSlug];
}

export function getActivePartners(): PartnerInfo[] {
  return PARTNER_SLUGS.map((s) => PARTNERS[s]).filter((p) => p.status !== "past");
}

export function getPartnersByStatus(status: PartnerInfo["status"]): PartnerInfo[] {
  return PARTNER_SLUGS.map((s) => PARTNERS[s]).filter((p) => p.status === status);
}
