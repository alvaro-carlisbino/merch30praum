import { IMG } from "@/lib/images/unsplash";
import type { ArtistSlug } from "@/lib/artists/types";
import type { CategorySlug } from "./categories";

export interface CMSProduct {
  id?: string;
  handle: string;
  title: string;
  shortDescription?: string;
  priceBRL: number;
  compareAtPriceBRL?: number;
  image: string;
  galleryImages?: string[];
  artistSlug: ArtistSlug | "house";
  category: CategorySlug;
  tags?: string[];
  isDropLive?: boolean;
  isSoldOut?: boolean;
  isPreOrder?: boolean;
  sizes?: { label: string; available: boolean }[];
  stockNote?: string;
  shopifyVariantId?: string;
  shopifyCollectionHandle?: string;
}

export const STATIC_PRODUCTS: CMSProduct[] = [
  {
    handle: "xtranho-tee-preto",
    title: "XTRANHO Tee · Preto",
    priceBRL: 249,
    image: IMG.productTshirtBlack,
    artistSlug: "matue",
    category: "camisetas",
    isDropLive: true,
    stockNote: "Reposição limitada · enviado em security bag",
  },
  {
    handle: "xtranho-hoodie-cobre",
    title: "XTRANHO Hoodie · Cobre",
    priceBRL: 599,
    image: IMG.productHoodieDark,
    artistSlug: "matue",
    category: "moletons",
    isDropLive: true,
  },
  {
    handle: "xtranho-cap-glitch",
    title: "Cap Glitch · XTRANHO",
    priceBRL: 189,
    image: IMG.productCapBlack,
    artistSlug: "matue",
    category: "acessorios",
    isDropLive: true,
  },
  {
    handle: "colapso-global-tee",
    title: "Colapso Global Tee · Wiu × Teto",
    priceBRL: 269,
    image: IMG.productTshirtWhite,
    artistSlug: "wiu",
    category: "camisetas",
  },
  {
    handle: "colapso-jacket",
    title: "Jaqueta Colapso · Burgundy",
    priceBRL: 899,
    image: IMG.productJacket,
    artistSlug: "wiu",
    category: "jaquetas",
  },
  {
    handle: "teto-moletom-cobre",
    title: "Moletom Iconografia · Teto",
    priceBRL: 549,
    image: IMG.productHoodie,
    artistSlug: "teto",
    category: "moletons",
  },
  {
    handle: "teto-calca-cargo",
    title: "Cargo Iconografia · Off",
    priceBRL: 489,
    image: IMG.productSweatpants,
    artistSlug: "teto",
    category: "calcas",
  },
  {
    handle: "isso-e-trap-tee",
    title: "Isso é Trap Vol.02 Tee",
    priceBRL: 229,
    image: IMG.productTshirtBlack,
    artistSlug: "brandao",
    category: "camisetas",
  },
  {
    handle: "brandao-cap",
    title: "Cap Brandão85 · Vermelho",
    priceBRL: 169,
    image: IMG.productCap,
    artistSlug: "brandao",
    category: "acessorios",
  },
  {
    handle: "brandao-tote",
    title: "Tote Bag · Brandão85",
    priceBRL: 139,
    image: IMG.productTote,
    artistSlug: "brandao",
    category: "acessorios",
  },
];

export function formatBRL(priceBRL: number): string {
  return `R$ ${priceBRL.toLocaleString("pt-BR")},00`;
}
