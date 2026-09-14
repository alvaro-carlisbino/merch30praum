import Image from "next/image";
import Link from "next/link";
import { formatBRL, type CMSProduct } from "@/lib/shop/static-products";
import { isSoldOut, productBadge } from "@/lib/shop/catalog";
import { blurFor } from "@/lib/images/blur-data";

interface Props {
  product: CMSProduct;
  priority?: boolean;
  sizes?: string;
  showArtist?: boolean;
}

export const PRODUCT_TILE = "#ffffff";

export function ProductCard({ product, priority, sizes, showArtist }: Props) {
  const badge = productBadge(product);
  const soldOut = isSoldOut(product);
  const hover = product.galleryImages?.[0];
  const hasCompare =
    typeof product.compareAtPriceBRL === "number" && product.compareAtPriceBRL > product.priceBRL;
  const imgSizes = sizes ?? "(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 50vw";
  return (
    <Link
      href={`/produto/${product.handle}`}
      data-cursor={product.title}
      className="group block"
      aria-label={`${product.title} · ${formatBRL(product.priceBRL)}${soldOut ? " · esgotado" : ""}`}
    >
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: "4 / 5", background: PRODUCT_TILE }}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          priority={priority}
          sizes={imgSizes}
          placeholder={blurFor(product.image) ? "blur" : "empty"}
          blurDataURL={blurFor(product.image)}
          className={`object-cover transition-all duration-700 ${hover ? "group-hover:opacity-0" : "group-hover:scale-[1.03]"}`}
          style={{ filter: soldOut ? "grayscale(1) opacity(0.7)" : undefined }}
        />
        {hover && (
          <Image
            src={hover}
            alt=""
            aria-hidden
            fill
            sizes={imgSizes}
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{ filter: soldOut ? "grayscale(1) opacity(0.7)" : undefined }}
          />
        )}
        {badge && (
          <span
            className="absolute left-3 top-3 inline-flex items-center rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.24em]"
            style={{
              background: "rgba(10,10,10,0.85)",
              color: badge.tone === "accent" ? "#ffffff" : "rgba(255,255,255,0.7)",
              backdropFilter: "blur(10px)",
            }}
          >
            {badge.label}
          </span>
        )}
      </div>
      <div className="mt-3 text-center">
        <p
          className="font-display uppercase leading-tight"
          style={{ fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)", letterSpacing: "0.03em" }}
        >
          {product.title}
        </p>
        <p className="mt-1 text-xs tabular-nums text-muted">
          {hasCompare && (
            <span className="mr-2 line-through opacity-60">
              {formatBRL(product.compareAtPriceBRL!)}
            </span>
          )}
          {formatBRL(product.priceBRL)}
          {showArtist && product.artistSlug !== "house" && (
            <span className="opacity-60"> · {product.artistSlug === "teto" ? "Teto & Wiu" : product.artistSlug === "brandao" ? "Brandão85" : "Matuê"}</span>
          )}
        </p>
      </div>
    </Link>
  );
}
