"use client";
import Link from "next/link";
import { useState } from "react";
import type { CMSProduct } from "@/lib/shop/static-products";
import { ProductCard } from "./ProductCard";

interface Props {
  title: string;
  subtitle?: string;
  products: CMSProduct[];
  href?: string;
  hrefLabel?: string;
  visible?: number;
}

export function ProductCarousel({ title, subtitle, products, href, hrefLabel, visible = 4 }: Props) {
  const [offset, setOffset] = useState(0);
  const total = products.length;
  const maxOffset = Math.max(0, total - visible);
  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(maxOffset, o + 1));
  const slice = products.slice(offset, offset + visible);
  const canPage = total > visible;
  if (total === 0) return null;
  return (
    <section className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-8 sm:py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            className="font-display uppercase leading-none"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)", letterSpacing: "0.02em" }}
          >
            {title}
          </h2>
          {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-4">
          {href && (
            <Link
              href={href}
              data-cursor={hrefLabel ?? "Ver tudo"}
              className="text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-fg"
            >
              {hrefLabel ?? "Ver tudo"} →
            </Link>
          )}
          {canPage && (
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={prev}
                aria-label="Anterior"
                disabled={offset === 0}
                className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
                style={{ borderColor: "var(--border)" }}
              >
                <span aria-hidden>‹</span>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Próximo"
                disabled={offset >= maxOffset}
                className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
                style={{ borderColor: "var(--border)" }}
              >
                <span aria-hidden>›</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <ul className="hidden grid-cols-4 gap-5 sm:grid">
        {slice.map((p) => (
          <li key={p.handle}>
            <ProductCard product={p} sizes="(min-width: 640px) 25vw, 50vw" />
          </li>
        ))}
      </ul>
      <ul className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:hidden">
        {products.map((p) => (
          <li key={p.handle} className="w-[62vw] shrink-0 snap-start">
            <ProductCard product={p} sizes="62vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
