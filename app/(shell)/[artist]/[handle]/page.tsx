import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTISTS, isArtistSlug } from "@/lib/artists/registry";
import {
  getCollectionByHandle,
  getProductByHandle,
} from "@/lib/shopify/client";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductCardBase } from "@/components/product/ProductCardBase";
import { ArtistVoice } from "@/components/product/ArtistVoice";
import { CrossUniverses } from "@/components/product/CrossUniverses";

interface Params {
  artist: string;
  handle: string;
}

export async function generateStaticParams() {
  const params: Array<{ artist: string; handle: string }> = [];
  for (const slug of Object.keys(ARTISTS)) {
    const cfg = ARTISTS[slug as keyof typeof ARTISTS];
    const collection = await getCollectionByHandle(cfg.shopifyCollectionHandle);
    for (const product of collection?.products ?? []) {
      params.push({ artist: slug, handle: product.handle });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return {};
  return { title: product.title, description: product.description };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { artist, handle } = await params;
  if (!isArtistSlug(artist)) notFound();
  const cfg = ARTISTS[artist];
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  const collection = await getCollectionByHandle(cfg.shopifyCollectionHandle);
  const related = (collection?.products ?? [])
    .filter((p) => p.handle !== handle)
    .slice(0, 4);

  return (
    <article>
      <nav
        aria-label="Caminho"
        className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-4 text-[10px] uppercase tracking-[0.25em] text-muted"
      >
        <Link href="/" className="hover:text-accent">30praum</Link>
        <span className="mx-2">/</span>
        <Link href={`/${cfg.slug}`} className="hover:text-accent">
          {cfg.universeName}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-fg">{product.title}</span>
      </nav>

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 grid gap-10 lg:grid-cols-2 lg:gap-16 pb-16">
        <ProductGallery images={product.images} productHandle={product.handle} />
        <ProductPurchasePanel product={product} />
      </section>

      <ArtistVoice artist={cfg} />

      {related.length > 0 && (
        <section
          className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-16"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <header className="mb-8 flex items-end justify-between gap-4">
            <h2
              className="font-display leading-[0.95]"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Mais do universo {cfg.displayName}
            </h2>
            <Link
              href={`/${cfg.slug}`}
              className="text-[10px] uppercase tracking-[0.3em] hover:text-accent"
            >
              Ver tudo →
            </Link>
          </header>
          <ul
            className="grid grid-cols-2 lg:grid-cols-4"
            style={{ gap: "var(--grid-gap)" }}
          >
            {related.map((p) => (
              <li key={p.id}>
                <ProductCardBase product={p} artistSlug={cfg.slug} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <CrossUniverses current={cfg.slug} />
    </article>
  );
}
