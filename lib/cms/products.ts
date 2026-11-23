import "server-only";
import { unstable_cache } from "next/cache";
import { getContentClient } from "@/lib/payload/client";
import { STATIC_PRODUCTS, type CMSProduct } from "@/lib/shop/static-products";
import type { ArtistSlug } from "@/lib/artists/types";
import type { CategorySlug } from "@/lib/shop/categories";
import { getAllShopifyProducts, getProductByHandle, isShopifyLive } from "@/lib/shopify/client";
import { fromShopifyOnly, mergeOneWithShopify, mergeWithShopify } from "@/lib/shop/shopify-catalog";
// Preço e estoque vêm da Shopify, então o cache é curto. O webhook de produto
// (/api/shopify/webhook) derruba a tag "products" na hora em que algo muda.
const TTL = 60 * 10;
function adapt(doc: Record<string, unknown>): CMSProduct {
  return {
    id: doc.id as string,
    handle: doc.handle as string,
    title: doc.title as string,
    shortDescription: (doc.shortDescription as string) || undefined,
    priceBRL: doc.priceBRL as number,
    compareAtPriceBRL: typeof doc.compareAtPriceBRL === "number" ? doc.compareAtPriceBRL : undefined,
    image: doc.image as string,
    galleryImages: ((doc.galleryImages as Array<Record<string, unknown>>) ?? []).map(
      (g) => g.url as string
    ),
    artistSlug: doc.artistSlug as CMSProduct["artistSlug"],
    category: doc.category as CategorySlug,
    tags: ((doc.tags as Array<Record<string, unknown>>) ?? []).map((t) => t.value as string),
    isDropLive: Boolean(doc.isDropLive),
    isSoldOut: Boolean(doc.isSoldOut),
    isPreOrder: Boolean(doc.isPreOrder),
    sizes: ((doc.sizes as Array<Record<string, unknown>>) ?? []).map((s) => ({
      label: s.label as string,
      available: Boolean(s.available),
    })),
    stockNote: (doc.stockNote as string) || undefined,
    shopifyVariantId: (doc.shopifyVariantId as string) || undefined,
    shopifyCollectionHandle: (doc.shopifyCollectionHandle as string) || undefined,
  };
}
async function getEditorialProducts(): Promise<CMSProduct[]> {
  try {
    const payload = await getContentClient();
    const res = await payload.find({
      collection: "products",
      limit: 500,
      depth: 1,
      pagination: false,
      sort: "-isDropLive",
    });
    if (!res.docs.length) return STATIC_PRODUCTS;
    return res.docs.map((d) => adapt(d as unknown as Record<string, unknown>));
  } catch {
    return STATIC_PRODUCTS;
  }
}
async function getEditorialProduct(handle: string): Promise<CMSProduct | null> {
  try {
    const payload = await getContentClient();
    const res = await payload.find({
      collection: "products",
      where: { handle: { equals: handle } },
      limit: 1,
      depth: 1,
    });
    if (res.docs[0]) return adapt(res.docs[0] as unknown as Record<string, unknown>);
  } catch {}
  return STATIC_PRODUCTS.find((p) => p.handle === handle) ?? null;
}
export const getAllProducts = unstable_cache(
  async (): Promise<CMSProduct[]> => {
    const [editorial, live] = await Promise.all([
      getEditorialProducts(),
      getAllShopifyProducts().catch((e) => {
        console.error("[shopify] catálogo indisponível, usando editorial", e);
        return [];
      }),
    ]);
    return mergeWithShopify(editorial, live);
  },
  ["products:all"],
  { tags: ["products"], revalidate: TTL }
);
export const getProduct = unstable_cache(
  async (handle: string): Promise<CMSProduct | null> => {
    const editorial = await getEditorialProduct(handle);
    if (!isShopifyLive) return editorial;
    let live;
    try {
      live = await getProductByHandle(handle);
    } catch (e) {
      console.error("[shopify] produto indisponível, usando editorial", e);
      return editorial;
    }
    if (editorial) return live ? mergeOneWithShopify(editorial, live) : { ...editorial, isSoldOut: true };
    return live ? fromShopifyOnly(live) : null;
  },
  ["products:by-handle"],
  { tags: ["products"], revalidate: TTL }
);
export const getProductsByArtist = unstable_cache(
  async (slug: ArtistSlug): Promise<CMSProduct[]> => {
    const all = await getAllProducts();
    return all.filter((p) => p.artistSlug === slug);
  },
  ["products:by-artist"],
  { tags: ["products"], revalidate: TTL }
);
export const getDropProducts = unstable_cache(
  async (): Promise<CMSProduct[]> => {
    const all = await getAllProducts();
    return all.filter((p) => p.isDropLive);
  },
  ["products:drop"],
  { tags: ["products"], revalidate: TTL }
);
