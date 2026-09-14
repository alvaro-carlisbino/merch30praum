import Link from "next/link";
import type { CMSProduct } from "@/lib/shop/static-products";
import { ProductCard } from "./ProductCard";

interface Props {
  items: CMSProduct[];
  emptyHref?: string;
}

export function CatalogGrid({ items, emptyHref = "/catalogo" }: Props) {
  if (items.length === 0) {
    return (
      <div
        className="flex flex-col items-start gap-4 rounded-2xl border p-8 sm:p-10"
        style={{ borderColor: "var(--border)" }}
      >
        <p className="font-display text-2xl uppercase leading-none sm:text-3xl">
          Nada com esse filtro.
        </p>
        <p className="max-w-md text-sm text-muted">
          Ou a peça esgotou, ou a combinação de tamanho e artista não existe nesse drop.
        </p>
        <Link
          href={emptyHref}
          className="inline-flex items-center rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
          style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
        >
          Limpar filtros
        </Link>
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
      {items.map((p, i) => (
        <li key={p.handle}>
          <ProductCard product={p} priority={i < 3} />
        </li>
      ))}
    </ul>
  );
}
