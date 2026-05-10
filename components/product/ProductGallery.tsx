"use client";

import Image from "next/image";
import { useState } from "react";
import type { ShopifyImage } from "@/lib/shopify/types";
import { cn } from "@/lib/utils/cn";

interface ProductGalleryProps {
  images: ShopifyImage[];
  productHandle: string;
}

export function ProductGallery({ images, productHandle }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const main = images[active];
  if (!main) return null;

  return (
    <div className="grid gap-4 lg:grid-cols-[120px_1fr] lg:gap-6">
      {images.length > 1 && (
        <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-[4/5] w-20 shrink-0 overflow-hidden border transition-opacity",
                i === active ? "opacity-100" : "opacity-50 hover:opacity-90",
              )}
              style={{ borderColor: i === active ? "var(--accent)" : "var(--border)" }}
              aria-label={`Imagem ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.altText ?? ""}
                fill
                sizes="80px"
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
      <div
        className="relative order-1 aspect-[4/5] w-full overflow-hidden lg:order-2"
        style={{
          background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
          border: "1px solid var(--border)",
          viewTransitionName: `product-${productHandle}`,
        }}
      >
        <Image
          src={main.url}
          alt={main.altText ?? ""}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
