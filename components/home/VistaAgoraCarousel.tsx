"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type VistaProduct = {
  id: string;
  href: string;
  image: string;
  title: string;
  price: string;
};

interface Props {
  products: VistaProduct[];
}

export function VistaAgoraCarousel({ products }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [centerIdx, setCenterIdx] = useState(Math.floor(products.length / 2));

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const onScroll = () => {
      const rect = root.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      let best = 0;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const c = r.left + r.width / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setCenterIdx(best);
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => root.removeEventListener("scroll", onScroll);
  }, [products.length]);

  useEffect(() => {
    // ao montar, centralizar o item do meio
    const root = scrollRef.current;
    const el = itemRefs.current[Math.floor(products.length / 2)];
    if (!root || !el) return;
    const offset =
      el.offsetLeft + el.offsetWidth / 2 - root.offsetWidth / 2;
    root.scrollTo({ left: offset, behavior: "instant" as ScrollBehavior });
  }, [products.length]);

  const centerProduct = products[centerIdx];

  return (
    <div className="flex flex-col items-center">
      <div
        ref={scrollRef}
        className="hide-scrollbar flex w-full snap-x snap-mandatory items-center gap-4 overflow-x-auto px-[20%] py-8 sm:gap-6 sm:px-[30%]"
        style={{ scrollPaddingInline: "30%" }}
      >
        {products.map((product, i) => {
          const isCenter = i === centerIdx;
          return (
            <Link
              key={product.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              href={product.href}
              data-cursor={product.title}
              className="group relative block shrink-0 snap-center"
              style={{
                width: "min(40vw, 320px)",
                aspectRatio: "3 / 4",
                transform: isCenter ? "scale(1.15)" : "scale(0.85)",
                opacity: isCenter ? 1 : 0.55,
                transition:
                  "transform 500ms cubic-bezier(0.7,0,0.3,1), opacity 500ms",
                zIndex: isCenter ? 10 : 1,
              }}
              aria-current={isCenter ? "true" : undefined}
            >
              <div
                className="relative h-full w-full overflow-hidden rounded-2xl"
                style={{
                  background: "color-mix(in srgb, var(--fg) 6%, var(--bg))",
                }}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes={isCenter ? "360px" : "260px"}
                  className="object-cover"
                />
              </div>
            </Link>
          );
        })}
      </div>

      {centerProduct && (
        <div className="mt-2 text-center">
          <p
            className="font-display uppercase"
            style={{
              fontSize: "clamp(1rem, 1.4vw, 1.4rem)",
              letterSpacing: "0.04em",
            }}
          >
            {centerProduct.title}
          </p>
          <p className="mt-1 text-sm tabular-nums text-muted">{centerProduct.price}</p>
        </div>
      )}

      <Link
        href="/loja"
        data-cursor="Catálogo completo"
        className="mt-8 inline-flex items-center rounded-full border px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
        style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
      >
        Catálogo Completo
      </Link>
    </div>
  );
}
