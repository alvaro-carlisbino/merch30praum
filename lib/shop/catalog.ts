import type { ArtistSlug } from "@/lib/artists/types";
import { CATEGORIES, type CategorySlug } from "./categories";
import type { CMSProduct } from "./static-products";

export type CatalogArtist = ArtistSlug | "house";
export type SortKey = "drop" | "preco-asc" | "preco-desc" | "nome";

export interface CatalogFilters {
  artista?: CatalogArtist;
  categoria?: CategorySlug;
  tamanho?: string;
  disponivel?: boolean;
  ordem: SortKey;
}

export const ARTIST_LABEL: Record<CatalogArtist, string> = {
  matue: "Matuê",
  wiu: "Wiu",
  teto: "Teto & Wiu",
  brandao: "Brandão85",
  house: "30praum",
};

export const ARTIST_DROP: Record<CatalogArtist, string> = {
  matue: "XTRANHO · 333",
  wiu: "Colapso Global",
  teto: "Colapso Global",
  brandao: "ISSO É TRAP",
  house: "Casa",
};

export const ARTIST_FILTERS: { slug: CatalogArtist; label: string }[] = [
  { slug: "brandao", label: "Brandão85" },
  { slug: "matue", label: "Matuê" },
  { slug: "teto", label: "Teto & Wiu" },
];

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "drop", label: "Drop mais recente" },
  { value: "preco-asc", label: "Menor preço" },
  { value: "preco-desc", label: "Maior preço" },
  { value: "nome", label: "A a Z" },
];

const SIZE_ORDER = ["PP", "P", "M", "G", "GG", "EGG", "G1", "G2"];

const ARTIST_ALIAS: Record<string, CatalogArtist> = {
  matue: "matue",
  wiu: "teto",
  teto: "teto",
  brandao: "brandao",
  house: "house",
};

const CATEGORY_SLUGS = new Set<string>(CATEGORIES.map((c) => c.slug));
const SORT_KEYS = new Set<string>(SORT_OPTIONS.map((s) => s.value));

type SearchParams = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export function parseCatalogFilters(sp: SearchParams): CatalogFilters {
  const artista = first(sp.artista);
  const categoria = first(sp.categoria);
  const tamanho = first(sp.tamanho);
  const ordem = first(sp.ordem);
  return {
    artista: artista && ARTIST_ALIAS[artista] ? ARTIST_ALIAS[artista] : undefined,
    categoria: categoria && CATEGORY_SLUGS.has(categoria) ? (categoria as CategorySlug) : undefined,
    tamanho: tamanho ? tamanho.toUpperCase() : undefined,
    disponivel: first(sp.disponivel) === "1",
    ordem: ordem && SORT_KEYS.has(ordem) ? (ordem as SortKey) : "drop",
  };
}

export function buildCatalogHref(f: Partial<CatalogFilters>): string {
  const q = new URLSearchParams();
  if (f.artista) q.set("artista", f.artista);
  if (f.categoria) q.set("categoria", f.categoria);
  if (f.tamanho) q.set("tamanho", f.tamanho);
  if (f.disponivel) q.set("disponivel", "1");
  if (f.ordem && f.ordem !== "drop") q.set("ordem", f.ordem);
  const s = q.toString();
  return s ? `/catalogo?${s}` : "/catalogo";
}

export function hasActiveFilters(f: CatalogFilters): boolean {
  return Boolean(f.artista || f.categoria || f.tamanho || f.disponivel);
}

export function availableSizes(p: CMSProduct): string[] {
  return (p.sizes ?? [])
    .filter((s) => s.available)
    .map((s) => s.label)
    .sort((a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b));
}

export function isSoldOut(p: CMSProduct): boolean {
  if (p.isSoldOut) return true;
  if (p.sizes && p.sizes.length > 0) return availableSizes(p).length === 0;
  return false;
}

export function isLowStock(p: CMSProduct): boolean {
  if (isSoldOut(p)) return false;
  if (!p.sizes || p.sizes.length === 0) return false;
  const avail = availableSizes(p);
  return avail.length > 0 && avail.length <= 2;
}

export type ProductBadge = { label: string; tone: "muted" | "accent" };

export function productBadge(p: CMSProduct): ProductBadge | null {
  if (isSoldOut(p)) return { label: "Esgotado", tone: "muted" };
  if (isLowStock(p)) return { label: `Últimas · ${availableSizes(p).join(" ")}`, tone: "accent" };
  if (p.isPreOrder) return { label: "Pré-venda", tone: "accent" };
  return null;
}

export function allSizes(products: CMSProduct[]): string[] {
  const set = new Set<string>();
  for (const p of products) for (const s of p.sizes ?? []) set.add(s.label);
  return [...set].sort((a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b));
}

export function applyCatalogFilters(products: CMSProduct[], f: CatalogFilters): CMSProduct[] {
  let list = products.filter((p) => {
    if (f.artista && p.artistSlug !== f.artista) return false;
    if (f.categoria && p.category !== f.categoria) return false;
    if (f.tamanho && !(p.sizes ?? []).some((s) => s.label === f.tamanho && s.available)) return false;
    if (f.disponivel && isSoldOut(p)) return false;
    return true;
  });
  list = [...list];
  switch (f.ordem) {
    case "preco-asc":
      list.sort((a, b) => a.priceBRL - b.priceBRL);
      break;
    case "preco-desc":
      list.sort((a, b) => b.priceBRL - a.priceBRL);
      break;
    case "nome":
      list.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
      break;
    default:
      list.sort((a, b) => Number(Boolean(b.isDropLive)) - Number(Boolean(a.isDropLive)));
  }
  return list;
}

const COLOR_WORDS: { re: RegExp; id: string; label: string; hex: string }[] = [
  { re: /\boff[\s-]?white\b/i, id: "off-white", label: "Off White", hex: "#ece7dd" },
  { re: /\bestonad[ao]\b/i, id: "estonada", label: "Estonada", hex: "#d9d2c5" },
  { re: /\bpret[ao]\b/i, id: "preto", label: "Preto", hex: "#171717" },
  { re: /\bbranc[ao]\b/i, id: "branco", label: "Branco", hex: "#f2f2f2" },
  { re: /\bamarel[ao]\b/i, id: "amarelo", label: "Amarelo", hex: "#e8c22e" },
  { re: /\bazul\b/i, id: "azul", label: "Azul", hex: "#1f4fd8" },
  { re: /\bvermelh[ao]\b/i, id: "vermelho", label: "Vermelho", hex: "#a11122" },
  { re: /\bmarrom\b/i, id: "marrom", label: "Marrom", hex: "#5c4330" },
  { re: /\bverde\b/i, id: "verde", label: "Verde", hex: "#2f5d3a" },
];

export type ProductColor = { id: string; label: string; hex: string };

export function productColor(p: Pick<CMSProduct, "title">): ProductColor | null {
  for (const c of COLOR_WORDS) if (c.re.test(p.title)) return { id: c.id, label: c.label, hex: c.hex };
  return null;
}

export function baseTitle(title: string): string {
  let t = title;
  for (const c of COLOR_WORDS) t = t.replace(c.re, " ");
  return t.replace(/\s+/g, " ").trim().toLowerCase();
}

export function colorSiblings(p: CMSProduct, all: CMSProduct[]): CMSProduct[] {
  const base = baseTitle(p.title);
  if (!base) return [];
  return all.filter((o) => o.handle !== p.handle && o.artistSlug === p.artistSlug && baseTitle(o.title) === base);
}

export function dropProducts(all: CMSProduct[]): CMSProduct[] {
  return all.filter((p) => p.isDropLive);
}

export function lowStockProducts(all: CMSProduct[]): CMSProduct[] {
  return all.filter(isLowStock);
}

export function byArtist(all: CMSProduct[], slug: CatalogArtist): CMSProduct[] {
  return all.filter((p) => p.artistSlug === slug);
}

export function byCategory(all: CMSProduct[], slug: CategorySlug): CMSProduct[] {
  return all.filter((p) => p.category === slug);
}

export function matching(all: CMSProduct[], re: RegExp): CMSProduct[] {
  return all.filter((p) => re.test(p.title) || re.test(p.handle));
}
