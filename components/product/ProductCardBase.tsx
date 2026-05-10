import Image from "next/image";
import Link from "next/link";
import type { DomainProduct } from "@/lib/shopify/types";
import { PriceTag } from "./PriceTag";
import { cn } from "@/lib/utils/cn";

interface ProductCardBaseProps {
  product: DomainProduct;
  artistSlug: string;
  className?: string;
  priority?: boolean;
}

export function ProductCardBase({
  product,
  artistSlug,
  className,
  priority,
}: ProductCardBaseProps) {
  return (
    <Link
      href={`/${artistSlug}/${product.handle}`}
      data-cursor="Ver peça"
      className={cn(
        "group relative block overflow-hidden",
        "transition-[transform,opacity] duration-[var(--motion-duration)] ease-[var(--motion-easing)]",
        className,
      )}
      style={{ viewTransitionName: `product-${product.handle}` }}
    >
      <div
        className="relative aspect-[4/5] overflow-hidden"
        style={{
          background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
          border: "1px solid var(--border)",
        }}
      >
        {product.featuredImage && (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[var(--motion-easing)] group-hover:scale-[1.04]"
            priority={priority}
            unoptimized
          />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(180deg, transparent 50%, color-mix(in srgb, var(--bg) 70%, transparent) 100%)",
          }}
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <h3 className="text-sm font-display leading-tight">{product.title}</h3>
        <PriceTag min={product.priceMin} max={product.priceMax} className="text-sm" />
      </div>
    </Link>
  );
}
