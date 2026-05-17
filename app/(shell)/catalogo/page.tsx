import { PromoBanner } from "@/components/loja/PromoBanner";
import { CatalogSidebar } from "@/components/loja/CatalogSidebar";
import { CatalogGrid, type CatalogItem } from "@/components/loja/CatalogGrid";
import { getAllProducts } from "@/lib/cms/products";
import { formatBRL } from "@/lib/shop/static-products";

export const metadata = {
  title: "Catálogo · Loja 30praum",
  description: "Catálogo completo da loja 30praum — filtra por categoria, tamanho, cor e artista.",
};

export default async function CatalogoPage() {
  const products = await getAllProducts();
  const items: CatalogItem[] = products.map((p, i) => ({
    id: p.id ?? p.handle ?? String(i),
    href: `/produto/${p.handle}`,
    image: p.image,
    title: p.title,
    price: formatBRL(p.priceBRL),
  }));

  return (
    <>
      <PromoBanner />

      <section className="mx-auto max-w-screen-2xl px-4 pt-10 pb-12 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-10">
          <div className="lg:sticky lg:top-20 lg:self-start">
            <CatalogSidebar />
          </div>

          <div className="flex flex-col gap-10">
            <CatalogGrid items={items} />

            <Pagination current={1} total={Math.max(1, Math.ceil(items.length / 12))} />
          </div>
        </div>
      </section>
    </>
  );
}

function Pagination({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-end gap-4 pb-4">
      <button
        type="button"
        aria-label="Página anterior"
        className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-white hover:text-black"
        style={{ borderColor: "var(--border)" }}
      >
        <span aria-hidden>‹</span>
      </button>
      <span className="text-sm tabular-nums">
        {current}/{total}
      </span>
      <button
        type="button"
        aria-label="Próxima página"
        className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-white hover:text-black"
        style={{ borderColor: "var(--border)" }}
      >
        <span aria-hidden>›</span>
      </button>
    </div>
  );
}
