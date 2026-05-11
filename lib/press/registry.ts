import { IMG } from "@/lib/images/unsplash";

export type PressAssetType = "logo" | "photo" | "bio" | "document";

export type PressAsset = {
  slug: string;
  title: string;
  type: PressAssetType;
  description: string;
  format: string; // ex: PNG · 4096×4096, ZIP · 12MB
  downloadUrl: string; // mock: vai pro mesmo lugar
  relatedArtist?: string; // slug
  thumbnail: string;
};

export const PRESS_CONTACTS = {
  ar: { label: "A&R · descoberta de artistas", email: "ar@30praum.com" },
  booking: { label: "Booking · shows e festivais", email: "booking@30praum.com" },
  imprensa: { label: "Imprensa · matérias e entrevistas", email: "imprensa@30praum.com" },
  parcerias: { label: "Parcerias · marcas e licenciamentos", email: "parcerias@30praum.com" },
  geral: { label: "Geral · escritório Fortaleza", email: "ola@30praum.com" },
};

export const PRESS_KIT_ASSETS: PressAsset[] = [
  // Logos institucionais
  {
    slug: "logo-30praum-pack",
    title: "Logo 30praum · pack completo",
    type: "logo",
    description: "Logo principal em todas as variações: positivo, negativo, monograma e marca-d'água. SVG + PNG.",
    format: "ZIP · 8.4MB",
    downloadUrl: "#",
    thumbnail: IMG.pressLogo30praum,
  },
  {
    slug: "logo-plantao-pack",
    title: "Logo Plantão Festival · pack completo",
    type: "logo",
    description: "Identidade do festival em todas as edições — incluindo o 'monstro' icônico do palco.",
    format: "ZIP · 12.1MB",
    downloadUrl: "#",
    thumbnail: IMG.pressLogoPlantao,
  },
  {
    slug: "logo-sabor-pack",
    title: "Logo Sabor Matuê · pack",
    type: "logo",
    description: "Identidade visual da linha FMCG da holding — versões coloridas, monocromáticas e mockup de embalagem.",
    format: "ZIP · 6.2MB",
    downloadUrl: "#",
    thumbnail: IMG.pressLogoSabor,
  },

  // Fotos de artistas
  {
    slug: "photo-matue-press",
    title: "Matuê · fotos de imprensa 2026",
    type: "photo",
    description: "Sessão oficial de imprensa do XTRANHO. 8 fotos de alta resolução, créditos obrigatórios.",
    format: "ZIP · 64MB · TIFF + JPG",
    downloadUrl: "#",
    relatedArtist: "matue",
    thumbnail: IMG.pressPhotoMatue,
  },
  {
    slug: "photo-teto-press",
    title: "Teto · fotos de imprensa 2026",
    type: "photo",
    description: "Material de divulgação Colapso Global. 6 fotos selecionadas.",
    format: "ZIP · 48MB",
    downloadUrl: "#",
    relatedArtist: "teto",
    thumbnail: IMG.pressPhotoTeto,
  },
  {
    slug: "photo-wiu-press",
    title: "Wiu · fotos de imprensa 2026",
    type: "photo",
    description: "Sessão oficial Colapso Global. 6 fotos de alta resolução.",
    format: "ZIP · 42MB",
    downloadUrl: "#",
    relatedArtist: "wiu",
    thumbnail: IMG.pressPhotoWiu,
  },
  {
    slug: "photo-brandao-press",
    title: "Brandão85 · fotos de imprensa 2026",
    type: "photo",
    description: "Material de divulgação Isso é Trap Vol.02. 6 fotos selecionadas.",
    format: "ZIP · 44MB",
    downloadUrl: "#",
    relatedArtist: "brandao",
    thumbnail: IMG.pressPhotoBrandao,
  },

  // Bios em pt-BR e en-US
  {
    slug: "bio-30praum-ptbr",
    title: "Biografia 30praum · pt-BR",
    type: "bio",
    description: "Biografia oficial da gravadora em português brasileiro. Versões curta (500), média (1500) e longa (3000 caracteres).",
    format: "TXT · 12KB",
    downloadUrl: "#",
    thumbnail: IMG.pressBio,
  },
  {
    slug: "bio-30praum-en",
    title: "30praum biography · English",
    type: "bio",
    description: "Official label biography for international press. Short (500), medium (1500), long (3000 chars) versions.",
    format: "TXT · 11KB",
    downloadUrl: "#",
    thumbnail: IMG.pressBio,
  },
  {
    slug: "bio-artists-pack",
    title: "Bios oficiais · roster completo",
    type: "bio",
    description: "Biografias oficiais de Matuê, Teto, Wiu e Brandão85 — pt-BR e en-US, em três extensões cada.",
    format: "ZIP · 48KB · 24 arquivos",
    downloadUrl: "#",
    thumbnail: IMG.pressBio,
  },

  // Documentos
  {
    slug: "media-kit-2026",
    title: "Media Kit 30praum 2026 · números e dados",
    type: "document",
    description:
      "Documento oficial com números do roster (streams, certificações), audiência por plataforma, geografia de fãs, casos de parceria.",
    format: "PDF · 18 páginas · 4.2MB",
    downloadUrl: "#",
    thumbnail: IMG.pressMediaKit,
  },
  {
    slug: "plantao-press-pack-2026",
    title: "Plantão 2026 · press pack do festival",
    type: "document",
    description:
      "Histórico do festival, lineup oficial, estatísticas, mapa do evento, contatos de produção, autorização de mídia.",
    format: "PDF · 24 páginas · 6.8MB",
    downloadUrl: "#",
    thumbnail: IMG.pressPlantaoPack,
  },
];

export function getPressAssetsByType(type: PressAssetType): PressAsset[] {
  return PRESS_KIT_ASSETS.filter((a) => a.type === type);
}

export function getPressAssetsByArtist(artistSlug: string): PressAsset[] {
  return PRESS_KIT_ASSETS.filter((a) => a.relatedArtist === artistSlug);
}
