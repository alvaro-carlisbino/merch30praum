import { IMG } from "@/lib/images/paths";
export type PartnerSlug = "plantao" | "renner" | "ed-hardy";
export interface PartnerInfo {
  slug: PartnerSlug;
  name: string;
  category: string;
  years: string;
  status: "active" | "past" | "upcoming";
  brandColor: string;
  bgColor: string;
  headline: string;
  shortPitch: string;
  story: string;
  release: { name: string; format: string; year: string };
  externalLink?: string;
  internalLink?: string;
  logoPath?: string;
  heroImage: string;
  galleryImages: string[];
  artistsInvolved?: string[];
}
export const PARTNER_SLUGS: PartnerSlug[] = ["plantao", "renner", "ed-hardy"];

export const PARTNERS: Record<PartnerSlug, PartnerInfo> = {
  plantao: {
    slug: "plantao",
    name: "Plantão Festival",
    category: "Festival próprio · Fortaleza",
    years: "2024 →",
    status: "active",
    brandColor: "#ff3535",
    bgColor: "#0c0407",
    headline: "PLANTÃO\nFESTIVAL",
    shortPitch: "O festival da 30praum no Marina Park, em Fortaleza",
    story:
      "O Plantão é o festival que a 30praum organiza em Fortaleza, com curadoria de Matuê e Clara Mendes. A primeira edição foi em 2024 no Marina Park. As duas primeiras reuniram cerca de 20 mil pessoas cada, e a transmissão de 2025 passou de 500 mil espectadores únicos. A terceira, em abril de 2026, marcou os 10 anos da gravadora.",
    release: {
      name: "Plantão 2026",
      format: "10 anos da 30praum · Marina Park",
      year: "2026",
    },
    internalLink: "/plantao",
    heroImage: IMG.partnerPlantao,
    galleryImages: [IMG.plantaoGallery1, IMG.plantaoGallery2, IMG.plantaoGallery3],
    artistsInvolved: ["matue", "teto", "wiu", "brandao"],
  },
  renner: {
    slug: "renner",
    name: "Renner",
    category: "Moda · Varejo",
    years: "2023",
    status: "past",
    brandColor: "#e85a3c",
    bgColor: "#1a0e0a",
    headline: "RENNER\n× 30PRAUM",
    shortPitch: "Primeira coleção de roupa da 30praum, vendida nas lojas Renner",
    story:
      "Em agosto de 2023 a 30praum lançou sua primeira coleção de roupas com a Renner. Foram sete peças, entre camisetas, calças e moletons, em branco, preto, bege e marrom, com fotos e colagens de Matuê, Teto e Wiu e o logo da gravadora. Os preços iam de R$ 79,90 a R$ 219,90, no site e nas lojas físicas da Renner.",
    release: {
      name: "Coleção 30praum × Renner",
      format: "7 peças · P ao GG",
      year: "2023",
    },
    externalLink: "https://www.lojasrenner.com.br/marca/30praum/-/N-o54xd7",
    heroImage: IMG.partnerRenner,
    galleryImages: [],
    artistsInvolved: ["matue", "teto", "wiu"],
  },
  "ed-hardy": {
    slug: "ed-hardy",
    name: "Ed Hardy by Matuê",
    category: "Moda · Licenciamento",
    years: "2026",
    status: "active",
    brandColor: "#a8243c",
    bgColor: "#160710",
    headline: "ED HARDY\nBY MATUÊ",
    shortPitch: "Coleção licenciada da Ed Hardy assinada pelo Matuê",
    story:
      "Ed Hardy by Matuê é a coleção da marca americana assinada pelo Matuê. Foi lançada em 2026 na loja oficial da 30praum, a 30praum.store.",
    release: {
      name: "Ed Hardy by Matuê",
      format: "Coleção na 30praum.store",
      year: "2026",
    },
    externalLink: "https://30praum.store",
    heroImage: IMG.partnerEdHardy,
    galleryImages: [IMG.partnerEdHardyGallery1, IMG.partnerEdHardyGallery2, IMG.partnerEdHardyGallery3],
    artistsInvolved: ["matue"],
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
