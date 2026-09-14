import Link from "next/link";
import type { CMSProduct } from "@/lib/shop/static-products";
import { ProductCard } from "./ProductCard";

interface Props {
  title: string;
  subtitle?: string;
  products: CMSProduct[];
  href?: string;
  hrefLabel?: string;
  limit?: number;
  cols?: 2 | 3 | 4;
  id?: string;
}

const COLS: Record<NonNullable<Props["cols"]>, string> = {
  2: "grid-cols-2 lg:grid-cols-2",
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

export function ProductRow({ title, subtitle, products, href, hrefLabel, limit = 4, cols = 4, id }: Props) {
  if (products.length === 0) return null;
  const headingId = id ?? `row-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <section aria-labelledby={headingId} className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-8 sm:py-12">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            id={headingId}
            className="font-display uppercase leading-none"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)", letterSpacing: "0.02em" }}
          >
            {title}
          </h2>
          {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
        </div>
        {href && (
          <Link
            href={href}
            data-cursor={hrefLabel ?? "Ver tudo"}
            className="text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-fg"
          >
            {hrefLabel ?? "Ver tudo"} →
          </Link>
        )}
      </header>
      <ul className={`grid gap-4 sm:gap-5 ${COLS[cols]}`}>
        {products.slice(0, limit).map((p) => (
          <li key={p.handle}>
            <ProductCard product={p} sizes="(min-width: 1024px) 22vw, 50vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
