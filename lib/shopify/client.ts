import type {
  DomainCart,
  DomainCollection,
  DomainProduct,
  ShopifyCart,
  ShopifyProduct,
} from "./types";
import { transformProduct } from "./transforms";
import { getMockCollectionByHandle } from "./mock/collections";
import { getMockProductByHandle } from "./mock/products";
import {
  mockCartCreate,
  mockCartGet,
  mockCartLinesAdd,
  mockCartLinesRemove,
  mockCartLinesUpdate,
} from "./mock/cart";

const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = "2025-01";

export const isShopifyLive = Boolean(STORE_DOMAIN && STOREFRONT_TOKEN);

interface FetchArgs<TVars = Record<string, unknown>> {
  query: string;
  variables?: TVars;
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
}

async function shopifyFetch<TData>({
  query,
  variables,
  cache,
  revalidate,
  tags,
}: FetchArgs): Promise<TData> {
  if (!isShopifyLive) {
    throw new Error("Shopify Storefront token not configured");
  }
  const endpoint = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;
  const init: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  };
  if (cache) init.cache = cache;
  if (revalidate !== undefined || tags) init.next = { revalidate, tags };

  const res = await fetch(endpoint, init);
  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status}: ${await res.text()}`);
  }
  const json = (await res.json()) as { data?: TData; errors?: unknown };
  if (json.errors) {
    throw new Error(`Shopify GraphQL: ${JSON.stringify(json.errors)}`);
  }
  return json.data as TData;
}

export async function getCollectionByHandle(
  handle: string,
): Promise<DomainCollection | null> {
  if (!isShopifyLive) {
    const c = getMockCollectionByHandle(handle);
    if (!c) return null;
    return {
      id: c.id,
      handle: c.handle,
      title: c.title,
      description: c.description,
      image: c.image,
      products: c.products.map(transformProduct),
    };
  }

  const { GET_COLLECTION_BY_HANDLE } = await import("./queries");
  type Resp = {
    collection: {
      id: string;
      handle: string;
      title: string;
      description: string;
      image: DomainCollection["image"];
      products: { edges: Array<{ node: ShopifyProduct }> };
    } | null;
  };
  const data = await shopifyFetch<Resp>({
    query: GET_COLLECTION_BY_HANDLE,
    variables: { handle, first: 50 },
    revalidate: 3600,
    tags: ["products"],
  });
  if (!data.collection) return null;
  return {
    id: data.collection.id,
    handle: data.collection.handle,
    title: data.collection.title,
    description: data.collection.description,
    image: data.collection.image,
    products: data.collection.products.edges.map((e) => transformProduct(e.node)),
  };
}

export async function getProductByHandle(
  handle: string,
): Promise<DomainProduct | null> {
  if (!isShopifyLive) {
    const p = getMockProductByHandle(handle);
    return p ? transformProduct(p) : null;
  }
  const { GET_PRODUCT_BY_HANDLE } = await import("./queries");
  type Resp = { product: ShopifyProduct | null };
  const data = await shopifyFetch<Resp>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
    revalidate: 3600,
    tags: ["products"],
  });
  return data.product ? transformProduct(data.product) : null;
}

function asDomainCart(cart: ShopifyCart): DomainCart {
  return cart;
}

export async function cartCreate(
  lines: Array<{ merchandiseId: string; quantity: number }>,
): Promise<DomainCart> {
  if (!isShopifyLive) return asDomainCart(mockCartCreate(lines));
  throw new Error("Live cartCreate not yet implemented");
}

export async function cartGet(cartId: string): Promise<DomainCart | null> {
  if (!isShopifyLive) {
    const c = mockCartGet(cartId);
    return c ? asDomainCart(c) : null;
  }
  throw new Error("Live cartGet not yet implemented");
}

export async function cartLinesAdd(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>,
): Promise<DomainCart | null> {
  if (!isShopifyLive) {
    const c = mockCartLinesAdd(cartId, lines);
    return c ? asDomainCart(c) : null;
  }
  throw new Error("Live cartLinesAdd not yet implemented");
}

export async function cartLinesUpdate(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>,
): Promise<DomainCart | null> {
  if (!isShopifyLive) {
    const c = mockCartLinesUpdate(cartId, lines);
    return c ? asDomainCart(c) : null;
  }
  throw new Error("Live cartLinesUpdate not yet implemented");
}

export async function cartLinesRemove(
  cartId: string,
  lineIds: string[],
): Promise<DomainCart | null> {
  if (!isShopifyLive) {
    const c = mockCartLinesRemove(cartId, lineIds);
    return c ? asDomainCart(c) : null;
  }
  throw new Error("Live cartLinesRemove not yet implemented");
}
