"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatMoney } from "@/lib/utils/format-money";
import type { ArtistSlug } from "@/lib/artists/types";

export type VistaProduct = {
  id: string;
  handle: string;
  title: string;
  priceMin: { amount: string; currencyCode: string };
  image: string | null;
  artistSlug: ArtistSlug;
  artistDisplay: string;
};

interface Props {
  products: VistaProduct[];
}

export function VistaAgoraCarousel({ products }: Props) {
  const [center, setCenter] = useState(0);
  const total = products.length;

  function mod(n: number) {
    return ((n % total) + total) % total;
  }

  function prev() {
    setCenter((c) => mod(c - 1));
  }

  function next() {
    setCenter((c) => mod(c + 1));
  }

  const slots = [-2, -1, 0, 1, 2].map((offset) => products[mod(center + offset)]);
  const centerProduct = products[center];

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full items-center justify-center gap-3 sm:gap-5">
        {slots.map((product, i) => {
          const dist = Math.abs(i - 2);
          const isCenter = dist === 0;
          // sizes by distance from center
          const widths = ["w-[28%] sm:w-[18%]", "w-[20%] sm:w-[14%]", "w-[14%] sm:w-[10%]"] as const;
          const widthClass = widths[Math.min(dist, 2)];

          return (
            <Link
              key={`${product.id}-${i}`}
              href={`/${product.artistSlug}/${product.handle}`}
              data-cursor={product.title}
              className={`${widthClass} group relative block shrink-0`}
              style={{
                aspectRatio: "3 / 4",
                opacity: isCenter ? 1 : 0.85,
                transition:
                  "transform 500ms cubic-bezier(0.7,0,0.3,1), opacity 400ms",
              }}
              aria-current={isCenter ? "true" : undefined}
            >
              <div
                className="relative h-full w-full overflow-hidden rounded-2xl"
                style={{
                  background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
                  border: "1px solid var(--border)",
                }}
              >
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    unoptimized
                    sizes={isCenter ? "360px" : "200px"}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {centerProduct && (
        <div className="mt-8 text-center">
          <p
            className="font-display uppercase tracking-[0.04em]"
            style={{
              fontSize: "clamp(1rem, 1.4vw, 1.4rem)",
              letterSpacing: "0.04em",
            }}
          >
            {centerProduct.title}
          </p>
          <p className="mt-1 text-sm tabular-nums text-muted">
            {formatMoney(centerProduct.priceMin)}
          </p>
        </div>
      )}

      <div className="mt-10 flex items-center gap-5">
        <button
          type="button"
          onClick={prev}
          aria-label="Produto anterior"
          data-cursor="Anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-white hover:text-black"
          style={{ borderColor: "var(--border)" }}
        >
          <span aria-hidden>←</span>
        </button>

        <Link
          href="/loja"
          data-cursor="Catálogo completo"
          className="inline-flex items-center rounded-full border px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
          style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
        >
          Catálogo Completo
        </Link>

        <button
          type="button"
          onClick={next}
          aria-label="Próximo produto"
          data-cursor="Próximo"
          className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-white hover:text-black"
          style={{ borderColor: "var(--border)" }}
        >
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
