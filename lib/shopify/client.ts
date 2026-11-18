import type {
  DomainCart,
  DomainCollection,
  DomainProduct,
  ShopifyCart,
  ShopifyCartLine,
  ShopifyImage,
  ShopifyMoney,
  ShopifyProduct,
  ShopifyVariant,
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
import {
  CART_CREATE,
  CART_GET,
  CART_LINES_ADD,
  CART_LINES_REMOVE,
  CART_LINES_UPDATE,
  GET_ALL_PRODUCTS,
  GET_COLLECTION_BY_HANDLE,
  GET_PRODUCT_BY_HANDLE,
} from "./queries";

const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
// Shopify lança uma versão por trimestre e mantém cada uma por 12 meses.
// Trocar até out/2027.
const API_VERSION = "2026-10";
// Com o webhook de produto ligado o cache cai na hora; isto é só a rede de segurança.
const PRODUCT_REVALIDATE = 600;
const PRODUCTS_TAG = "products";

export const isShopifyLive = Boolean(STORE_DOMAIN && STOREFRONT_TOKEN);

interface FetchArgs {
  query: string;
  variables?: Record<string, unknown>;
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
    throw new Error("shopify: token missing");
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
    throw new Error(`shopify ${res.status}: ${await res.text()}`);
  }
  const json = (await res.json()) as { data?: TData; errors?: unknown };
  if (json.errors) {
    throw new Error(`shopify gql: ${JSON.stringify(json.errors)}`);
  }
  return json.data as TData;
}

// ---------------------------------------------------------------------------
// Formato cru do GraphQL (connections com edges) e conversão para o domínio.

type Edges<T> = { edges: Array<{ node: T }> };

interface RawProduct {
  id: string;
  handle: string;
  title: string;
  tags: string[];
  productType: string;
  availableForSale: boolean;
  description: string;
  descriptionHtml: string;
  featuredImage: ShopifyImage | null;
  priceRange: { minVariantPrice: ShopifyMoney; maxVariantPrice: ShopifyMoney };
  compareAtPriceRange?: { minVariantPrice: ShopifyMoney } | null;
  options: Array<{ name: string; optionValues: Array<{ name: string }> }>;
  variants: Edges<ShopifyVariant>;
  images: Edges<ShopifyImage>;
}

function normalizeProduct(raw: RawProduct): ShopifyProduct {
  const compareAt = raw.compareAtPriceRange?.minVariantPrice ?? null;
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    descriptionHtml: raw.descriptionHtml,
    featuredImage: raw.featuredImage,
    priceRange: raw.priceRange,
    options: raw.options.map((o) => ({ name: o.name, values: o.optionValues.map((v) => v.name) })),
    variants: raw.variants.edges.map((e) => e.node),
    images: raw.images.edges.map((e) => e.node),
    tags: raw.tags,
    productType: raw.productType,
    availableForSale: raw.availableForSale,
    // A Shopify devolve 0.0 quando não há preço "de".
    compareAtPriceMin: compareAt && Number(compareAt.amount) > 0 ? compareAt : null,
  };
}

interface RawCartLine extends Omit<ShopifyCartLine, "merchandise"> {
  merchandise: ShopifyCartLine["merchandise"] & {
    product: ShopifyCartLine["merchandise"]["product"] & { featuredImage?: ShopifyImage | null };
  };
}

interface RawCart extends Omit<ShopifyCart, "lines"> {
  lines: Edges<RawCartLine>;
}

function normalizeCart(raw: RawCart): DomainCart {
  return {
    ...raw,
    lines: raw.lines.edges.map(({ node }) => ({
      ...node,
      merchandise: {
        ...node.merchandise,
        image: node.merchandise.image ?? node.merchandise.product.featuredImage ?? null,
      },
    })),
  };
}

type UserErrors = Array<{ field: string[] | null; message: string }>;

function unwrapCart(payload: { cart: RawCart | null; userErrors: UserErrors }): DomainCart | null {
  if (payload.userErrors.length) {
    throw new Error(`shopify cart: ${payload.userErrors.map((e) => e.message).join("; ")}`);
  }
  return payload.cart ? normalizeCart(payload.cart) : null;
}

// Cookie criado enquanto o site rodava com o mock. Não existe na Shopify.
function isMockCartId(cartId: string): boolean {
  return cartId.startsWith("gid://mock/");
}

// ---------------------------------------------------------------------------
// Catálogo

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
  type Resp = {
    collection: {
      id: string;
      handle: string;
      title: string;
      description: string;
      image: DomainCollection["image"];
      products: Edges<RawProduct>;
    } | null;
  };
  const data = await shopifyFetch<Resp>({
    query: GET_COLLECTION_BY_HANDLE,
    variables: { handle, first: 100 },
    revalidate: PRODUCT_REVALIDATE,
    tags: [PRODUCTS_TAG],
  });
  if (!data.collection) return null;
  return {
    id: data.collection.id,
    handle: data.collection.handle,
    title: data.collection.title,
    description: data.collection.description,
    image: data.collection.image,
    products: data.collection.products.edges.map((e) => transformProduct(normalizeProduct(e.node))),
  };
}

export async function getProductByHandle(
  handle: string,
): Promise<DomainProduct | null> {
  if (!isShopifyLive) {
    const p = getMockProductByHandle(handle);
    return p ? transformProduct(p) : null;
  }
  type Resp = { product: RawProduct | null };
  const data = await shopifyFetch<Resp>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
    revalidate: PRODUCT_REVALIDATE,
    tags: [PRODUCTS_TAG],
  });
  return data.product ? transformProduct(normalizeProduct(data.product)) : null;
}

// Todos os produtos publicados no canal Headless. Vazio quando a loja não está ligada.
export async function getAllShopifyProducts(): Promise<DomainProduct[]> {
  if (!isShopifyLive) return [];
  type Resp = {
    products: Edges<RawProduct> & {
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
    };
  };
  const out: DomainProduct[] = [];
  let after: string | null = null;
  // Limite de páginas para nunca entrar em laço infinito.
  for (let page = 0; page < 20; page++) {
    const data: Resp = await shopifyFetch<Resp>({
      query: GET_ALL_PRODUCTS,
      variables: { first: 100, after },
      revalidate: PRODUCT_REVALIDATE,
      tags: [PRODUCTS_TAG],
    });
    out.push(...data.products.edges.map((e) => transformProduct(normalizeProduct(e.node))));
    if (!data.products.pageInfo.hasNextPage) break;
    after = data.products.pageInfo.endCursor;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Carrinho (nunca em cache: cada visitante tem o seu)

type CartLineInput = { merchandiseId: string; quantity: number };

export async function cartCreate(lines: CartLineInput[]): Promise<DomainCart> {
  if (!isShopifyLive) return mockCartCreate(lines);
  type Resp = { cartCreate: { cart: RawCart | null; userErrors: UserErrors } };
  const data = await shopifyFetch<Resp>({
    query: CART_CREATE,
    variables: { input: { lines, buyerIdentity: { countryCode: "BR" } } },
    cache: "no-store",
  });
  const cart = unwrapCart(data.cartCreate);
  if (!cart) throw new Error("shopify cart: create returned no cart");
  return cart;
}

export async function cartGet(cartId: string): Promise<DomainCart | null> {
  if (!isShopifyLive) return mockCartGet(cartId);
  if (isMockCartId(cartId)) return null;
  type Resp = { cart: RawCart | null };
  const data = await shopifyFetch<Resp>({
    query: CART_GET,
    variables: { cartId },
    cache: "no-store",
  });
  return data.cart ? normalizeCart(data.cart) : null;
}

export async function cartLinesAdd(
  cartId: string,
  lines: CartLineInput[],
): Promise<DomainCart | null> {
  if (!isShopifyLive) return mockCartLinesAdd(cartId, lines);
  if (isMockCartId(cartId)) return null;
  type Resp = { cartLinesAdd: { cart: RawCart | null; userErrors: UserErrors } };
  const data = await shopifyFetch<Resp>({
    query: CART_LINES_ADD,
    variables: { cartId, lines },
    cache: "no-store",
  });
  return unwrapCart(data.cartLinesAdd);
}

export async function cartLinesUpdate(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>,
): Promise<DomainCart | null> {
  if (!isShopifyLive) return mockCartLinesUpdate(cartId, lines);
  if (isMockCartId(cartId)) return null;
  type Resp = { cartLinesUpdate: { cart: RawCart | null; userErrors: UserErrors } };
  const data = await shopifyFetch<Resp>({
    query: CART_LINES_UPDATE,
    variables: { cartId, lines },
    cache: "no-store",
  });
  return unwrapCart(data.cartLinesUpdate);
}

export async function cartLinesRemove(
  cartId: string,
  lineIds: string[],
): Promise<DomainCart | null> {
  if (!isShopifyLive) return mockCartLinesRemove(cartId, lineIds);
  if (isMockCartId(cartId)) return null;
  type Resp = { cartLinesRemove: { cart: RawCart | null; userErrors: UserErrors } };
  const data = await shopifyFetch<Resp>({
    query: CART_LINES_REMOVE,
    variables: { cartId, lineIds },
    cache: "no-store",
  });
  return unwrapCart(data.cartLinesRemove);
}
