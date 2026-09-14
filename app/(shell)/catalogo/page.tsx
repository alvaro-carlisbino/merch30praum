import { Suspense } from "react";
import { PromoBanner } from "@/components/loja/PromoBanner";
import { CatalogFilters } from "@/components/loja/CatalogFilters";
import { CatalogGrid } from "@/components/loja/CatalogGrid";
import { CatalogSort } from "@/components/loja/CatalogSort";
import { getAllProducts } from "@/lib/cms/products";
import {
  ARTIST_DROP,
  ARTIST_LABEL,
  allSizes,
  applyCatalogFilters,
  parseCatalogFilters,
} from "@/lib/shop/catalog";
import { CATEGORIES } from "@/lib/shop/categories";

export const metadata = {
  title: "Catálogo",
  description:
    "Catálogo completo da loja oficial 30praum. Filtra por artista, categoria, tamanho e estoque.",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const [sp, products] = await Promise.all([searchParams, getAllProducts()]);
  const filters = parseCatalogFilters(sp);
  const items = applyCatalogFilters(products, filters);
  const sizes = allSizes(products);

  const heading = filters.artista
    ? ARTIST_LABEL[filters.artista]
    : filters.categoria
      ? CATEGORIES.find((c) => c.slug === filters.categoria)?.label ?? "Catálogo"
      : "Catálogo";
  const sub = filters.artista ? ARTIST_DROP[filters.artista] : "Loja oficial · tudo que está no ar";

  return (
    <>
      <PromoBanner />
      <section className="mx-auto max-w-screen-2xl px-4 pt-10 pb-12 sm:px-8">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1
              className="font-display uppercase leading-[0.92]"
              style={{ fontSize: "clamp(2rem, 4.6vw, 3.6rem)", letterSpacing: "-0.02em" }}
            >
              {heading}
            </h1>
            <p className="mt-2 text-sm text-muted">{sub}</p>
          </div>
          <Suspense fallback={null}>
            <CatalogSort value={filters.ordem} />
          </Suspense>
        </header>
        <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
          <div className="lg:sticky lg:top-20 lg:self-start">
            <CatalogFilters filters={filters} sizes={sizes} total={items.length} />
          </div>
          <CatalogGrid items={items} />
        </div>
      </section>
    </>
  );
}
