import Image from "next/image";
import Link from "next/link";
import type { DomainProduct } from "@/lib/shopify/types";
import { cn } from "@/lib/utils/cn";

interface ProductCardBaseProps {
  product: DomainProduct;
  artistSlug: string;
  className?: string;
  priority?: boolean;
}

/**
 * Item de arquivo estilo Windows Explorer.
 * Sem rounded corner, sem sticker, sem nada decorativo.
 */
export function ProductCardBase({
  product,
  artistSlug,
  className,
  priority,
}: ProductCardBaseProps) {
  return (
    <Link
      href={`/${artistSlug}/${product.handle}`}
      className={cn("explorer-item flex flex-col items-center gap-1 p-2 text-center", className)}
      style={{ viewTransitionName: `product-${product.handle}` }}
    >
      <div className="relative h-[100px] w-[100px] border border-[#777] bg-[#fafafa]">
        {product.featuredImage && (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            sizes="100px"
            className="object-cover"
            priority={priority}
            unoptimized
          />
        )}
      </div>
      <span className="block max-w-[110px] truncate font-mono text-[11px] text-black">
        {product.handle.replace(/-/g, "_")}.jpg
      </span>
      <span className="font-mono text-[10px] text-[#666]">
        R$ {parseFloat(product.priceMin.amount).toFixed(2).replace(".", ",")}
      </span>
    </Link>
  );
}
