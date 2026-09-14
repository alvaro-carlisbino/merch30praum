import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductGallery } from "@/components/produto/ProductGallery";
import { ProductPurchasePanel, type SiblingColor } from "@/components/produto/ProductPurchasePanel";
import { ProductRow } from "@/components/loja/ProductRow";
import { ArtistNote } from "@/components/produto/ArtistNote";
import { getAllProducts, getProduct } from "@/lib/cms/products";
import { getProductByHandle } from "@/lib/shopify/client";
import { STATIC_PRODUCTS, formatBRL, type CMSProduct } from "@/lib/shop/static-products";
import {
  ARTIST_DROP,
  ARTIST_LABEL,
  availableSizes,
  buildCatalogHref,
  colorSiblings,
  isLowStock,
  isSoldOut,
  productColor,
} from "@/lib/shop/catalog";
import { ARTISTS, isArtistSlug } from "@/lib/artists/registry";

interface Params {
  id: string;
}

const STORE_URL = "https://30praum.store/products";

export function generateStaticParams() {
  return STATIC_PRODUCTS.map((p) => ({ id: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return {};
  const status = isSoldOut(product) ? "Esgotado" : formatBRL(product.priceBRL);
  return {
    title: product.title,
    description: `${product.title} · ${status} · Merch oficial ${ARTIST_LABEL[product.artistSlug]} · Enviado em security bag lacrada.`,
  };
}

function toCms(handle: string, fallback: Awaited<ReturnType<typeof getProductByHandle>>): CMSProduct | null {
  if (!fallback) return null;
  return {
    handle,
    title: fallback.title,
    priceBRL: Number(fallback.priceMin.amount),
    image: fallback.featuredImage?.url ?? fallback.images[0]?.url ?? "",
    galleryImages: fallback.images.slice(1).map((i) => i.url),
    artistSlug: fallback.artist ?? "house",
    category: "camisetas",
    sizes: fallback.variants.map((v) => ({ label: v.title, available: v.availableForSale })),
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const [cmsProduct, domain, all] = await Promise.all([
    getProduct(id),
    getProductByHandle(id),
    getAllProducts(),
  ]);
  const product = cmsProduct ?? toCms(id, domain);
  if (!product) notFound();

  const images = [product.image, ...(product.galleryImages ?? [])].filter(Boolean);
  const uniqueImages = images.filter((src, i) => images.indexOf(src) === i);
  const variants = domain?.variants ?? [];
  const soldOut = isSoldOut(product);
  const lowStockSizes = isLowStock(product) ? availableSizes(product) : [];
  const artist = isArtistSlug(product.artistSlug) ? ARTISTS[product.artistSlug] : null;
  const dropLabel = ARTIST_DROP[product.artistSlug];
  const artistLabel = artist ? `${ARTIST_LABEL[product.artistSlug]} · ${dropLabel}` : "30praum";

  const siblings: SiblingColor[] = colorSiblings(product, all)
    .map((s) => ({ handle: s.handle, color: productColor(s) }))
    .filter((s): s is SiblingColor => Boolean(s.color));

  const related = all
    .filter((p) => p.handle !== product.handle && p.artistSlug === product.artistSlug)
    .sort((a, b) => Number(isSoldOut(a)) - Number(isSoldOut(b)))
    .slice(0, 4);
  const relatedPool = related.length >= 2 ? related : all.filter((p) => p.handle !== product.handle).slice(0, 4);

  const catalogHref = buildCatalogHref({ artista: product.artistSlug, ordem: "drop" });

  return (
    <>
      <section className="mx-auto max-w-screen-2xl px-4 pb-10 pt-6 sm:px-8 sm:pt-10">
        <nav aria-label="Caminho" className="mb-6 text-[10px] uppercase tracking-[0.25em] text-muted">
          <Link href="/loja" className="transition-colors hover:text-fg">Loja</Link>
          <span className="mx-2">/</span>
          <Link href={catalogHref} className="transition-colors hover:text-fg">
            {ARTIST_LABEL[product.artistSlug]}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-fg">{product.title}</span>
        </nav>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
          <ProductGallery images={uniqueImages} alt={product.title} />
          <ProductPurchasePanel
            title={product.title.toUpperCase()}
            priceLabel={formatBRL(product.priceBRL)}
            compareAtLabel={
              product.compareAtPriceBRL && product.compareAtPriceBRL > product.priceBRL
                ? formatBRL(product.compareAtPriceBRL)
                : undefined
            }
            variants={variants}
            soldOut={soldOut}
            lowStockSizes={lowStockSizes}
            stockNote={product.stockNote}
            artistLabel={artistLabel}
            currentColor={productColor(product)}
            siblings={siblings}
            externalUrl={`${STORE_URL}/${product.handle}`}
          />
        </div>
      </section>
      {artist && <ArtistNote artist={artist} dropLabel={dropLabel} />}
      <ProductRow
        title={artist ? `Mais de ${artist.displayName}` : "Mais da casa"}
        products={relatedPool}
        href={catalogHref}
        hrefLabel={`Tudo de ${ARTIST_LABEL[product.artistSlug]}`}
      />
    </>
  );
}
