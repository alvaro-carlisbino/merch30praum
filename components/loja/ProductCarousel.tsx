"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type CarouselProduct = {
  id: string;
  href: string;
  image: string;
  title: string;
  price: string;
};

interface Props {
  title: string;
  products: CarouselProduct[];
  visible?: number;
}

export function ProductCarousel({ title, products, visible = 4 }: Props) {
  const [offset, setOffset] = useState(0);
  const total = products.length;

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(total - visible, o + 1));

  const slice = products.slice(offset, offset + visible);

  return (
    <section className="mx-auto max-w-screen-2xl px-4 pt-10 pb-12 sm:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
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

        <h2 className="font-display uppercase text-lg sm:text-xl tracking-[0.06em]">
          {title}
        </h2>

        <button
          type="button"
          onClick={next}
          aria-label="Próximo"
          disabled={offset + visible >= total}
          className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
          style={{ borderColor: "var(--border)" }}
        >
          <span aria-hidden>›</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        {slice.map((p) => (
          <Link
            key={p.id}
            href={p.href}
            data-cursor={p.title}
            className="group block"
          >
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                aspectRatio: "4 / 5",
                background: "color-mix(in srgb, var(--fg) 6%, var(--bg))",
              }}
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-3 text-center">
              <p
                className="font-display uppercase leading-tight"
                style={{
                  fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)",
                  letterSpacing: "0.03em",
                }}
              >
                {p.title}
              </p>
              <p className="mt-1 text-xs tabular-nums text-muted">{p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
