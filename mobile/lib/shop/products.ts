import { IMG } from "@/lib/images/unsplash";
import type { ArtistSlug } from "@/lib/artists/types";
import type { CategorySlug } from "./categories";

export interface MobileProduct {
  id: string;
  handle: string;
  title: string;
  priceBRL: number;
  image: string;
  artistSlug: ArtistSlug;
  category: CategorySlug;
  isDropLive?: boolean;
}

export const PRODUCTS: MobileProduct[] = [
  {
    id: "p1",
    handle: "xtranho-tee-preto",
    title: "XTRANHO Tee · Preto",
    priceBRL: 249,
    image: IMG.productTshirtBlack,
    artistSlug: "matue",
    category: "camisetas",
    isDropLive: true,
  },
  {
    id: "p2",
    handle: "xtranho-hoodie-cobre",
    title: "XTRANHO Hoodie · Cobre",
    priceBRL: 599,
    image: IMG.productHoodieDark,
    artistSlug: "matue",
    category: "moletons",
    isDropLive: true,
  },
  {
    id: "p3",
    handle: "xtranho-cap-glitch",
    title: "Cap Glitch · XTRANHO",
    priceBRL: 189,
    image: IMG.productCapBlack,
    artistSlug: "matue",
    category: "acessorios",
    isDropLive: true,
  },
  {
    id: "p4",
    handle: "colapso-global-tee",
    title: "Colapso Global Tee · Wiu × Teto",
    priceBRL: 269,
    image: IMG.productTshirtWhite,
    artistSlug: "wiu",
    category: "camisetas",
  },
  {
    id: "p5",
    handle: "colapso-jacket",
    title: "Jaqueta Colapso · Burgundy",
    priceBRL: 899,
    image: IMG.productJacket,
    artistSlug: "wiu",
    category: "jaquetas",
  },
  {
    id: "p6",
    handle: "teto-moletom-cobre",
    title: "Moletom Iconografia · Teto",
    priceBRL: 549,
    image: IMG.productHoodie,
    artistSlug: "teto",
    category: "moletons",
  },
  {
    id: "p7",
    handle: "teto-calca-cargo",
    title: "Cargo Iconografia · Off",
    priceBRL: 489,
    image: IMG.productSweatpants,
    artistSlug: "teto",
    category: "calcas",
  },
  {
    id: "p8",
    handle: "isso-e-trap-tee",
    title: "Isso é Trap Vol.02 Tee",
    priceBRL: 229,
    image: IMG.productTshirtBlack,
    artistSlug: "brandao",
    category: "camisetas",
  },
  {
    id: "p9",
    handle: "brandao-cap",
    title: "Cap Brandão85 · Vermelho",
    priceBRL: 169,
    image: IMG.productCap,
    artistSlug: "brandao",
    category: "acessorios",
  },
  {
    id: "p10",
    handle: "brandao-tote",
    title: "Tote Bag · Brandão85",
    priceBRL: 139,
    image: IMG.productTote,
    artistSlug: "brandao",
    category: "acessorios",
  },
];
