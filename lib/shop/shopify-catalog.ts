import type { ArtistSlug } from "@/lib/artists/types";
import type { DomainProduct } from "@/lib/shopify/types";
import { CATEGORIES, productCategorySlug, type CategorySlug } from "./categories";
import type { CMSProduct } from "./static-products";

// Junta o catálogo editorial (Payload ou estático) com o estado real da Shopify.
// Do editorial vem o que é curadoria: fotos tratadas, artista, categoria, drop.
// Da Shopify vem o que muda sozinho: preço, preço "de", tamanhos e estoque.

// Shopify chama de "Default Title" a variante de produto sem opção.
const DEFAULT_VARIANT = "Default Title";

const ARTIST_HINTS: Array<{ re: RegExp; slug: ArtistSlug }> = [
  { re: /matu[eê]/i, slug: "matue" },
  { re: /brand[aã]o/i, slug: "brandao" },
  { re: /\bteto\b/i, slug: "teto" },
  { re: /\bwiu\b/i, slug: "teto" },
];

function inferArtist(p: DomainProduct): ArtistSlug | "house" {
  if (p.artist) return p.artist === "wiu" ? "teto" : p.artist;
  const haystack = `${p.handle} ${p.title} ${p.tags.join(" ")}`;
  return ARTIST_HINTS.find((h) => h.re.test(haystack))?.slug ?? "house";
}

const CATEGORY_HINTS: Array<{ re: RegExp; slug: CategorySlug }> = [
  { re: /moletom|hoodie|blusa/i, slug: "moletons" },
  { re: /jaqueta|corta[\s-]?vento/i, slug: "jaquetas" },
  { re: /cal[cç]a|bermuda|short/i, slug: "calcas" },
  { re: /camiseta|regata|t-?shirt|camisa/i, slug: "camisetas" },
];

function inferCategory(p: DomainProduct): CategorySlug {
  const byTag = productCategorySlug(p);
  if (byTag) return byTag;
  const haystack = `${p.productType} ${p.title}`;
  return CATEGORY_HINTS.find((h) => h.re.test(haystack))?.slug ?? CATEGORIES[4].slug;
}

function liveSizes(p: DomainProduct): CMSProduct["sizes"] {
  const real = p.variants.filter((v) => v.title !== DEFAULT_VARIANT);
  if (real.length <= 1) return undefined;
  return real.map((v) => ({ label: v.title, available: v.availableForSale }));
}

function liveFields(p: DomainProduct): Partial<CMSProduct> {
  const price = Number(p.priceMin.amount);
  const compareAt = p.compareAtPriceMin ? Number(p.compareAtPriceMin.amount) : undefined;
  const single = p.variants.length === 1 ? p.variants[0] : null;
  return {
    priceBRL: price,
    compareAtPriceBRL: compareAt && compareAt > price ? compareAt : undefined,
    sizes: liveSizes(p),
    isSoldOut: !p.availableForSale,
    shopifyVariantId: single?.id,
  };
}

function fromShopifyOnly(p: DomainProduct): CMSProduct {
  const [cover, ...gallery] = [p.featuredImage, ...p.images]
    .filter((i): i is NonNullable<typeof i> => Boolean(i))
    .map((i) => i.url)
    .filter((url, i, all) => all.indexOf(url) === i);
  return {
    handle: p.handle,
    title: p.title,
    image: cover ?? "",
    galleryImages: gallery,
    artistSlug: inferArtist(p),
    category: inferCategory(p),
    tags: p.tags,
    // Produto que acabou de entrar na loja conta como drop até alguém curar no CMS.
    isDropLive: true,
    ...liveFields(p),
  } as CMSProduct;
}

export function mergeWithShopify(editorial: CMSProduct[], live: DomainProduct[]): CMSProduct[] {
  // Sem resposta da Shopify (token ausente ou API fora), fica o editorial como está.
  if (!live.length) return editorial;
  const byHandle = new Map(live.map((p) => [p.handle, p]));
  const merged = editorial.map((item) => {
    const p = byHandle.get(item.handle);
    // Saiu da loja: continua visível no site, mas não dá pra comprar.
    if (!p) return { ...item, isSoldOut: true };
    return { ...item, ...liveFields(p) };
  });
  const known = new Set(editorial.map((p) => p.handle));
  const fresh = live.filter((p) => !known.has(p.handle) && p.featuredImage).map(fromShopifyOnly);
  return [...fresh, ...merged];
}

export function mergeOneWithShopify(item: CMSProduct, live: DomainProduct | null): CMSProduct {
  if (!live) return item;
  return { ...item, ...liveFields(live) };
}

export { fromShopifyOnly };
