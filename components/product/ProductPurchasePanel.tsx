"use client";

import { useCallback, useState } from "react";
import type { DomainProduct, ShopifyVariant } from "@/lib/shopify/types";
import { PriceTag } from "./PriceTag";
import { VariantSelector } from "./VariantSelector";
import { AddToCartButton } from "./AddToCartButton";
import { PixHighlight } from "./PixHighlight";
import { PdpTrustRow } from "./PdpTrustRow";
import { SizeGuide } from "./SizeGuide";

interface ProductPurchasePanelProps {
  product: DomainProduct;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [variant, setVariant] = useState<ShopifyVariant | null>(
    product.variants[0] ?? null,
  );

  const handleSelect = useCallback((v: ShopifyVariant | null) => {
    setVariant(v);
  }, []);

  const activePrice = variant?.price ?? product.priceMin;
  const hasSize = product.options.some((o) =>
    o.name.toLowerCase().includes("tamanho"),
  );

  return (
    <div className="space-y-7">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl leading-tight">
          {product.title}
        </h1>
        <PriceTag
          min={activePrice}
          max={product.priceMax}
          className="mt-3 text-xl"
        />
      </div>

      <PixHighlight price={activePrice} />

      {product.description && (
        <p className="text-sm text-muted leading-relaxed max-w-prose">
          {product.description}
        </p>
      )}

      {product.options.length > 0 && (
        <div className="space-y-3">
          <VariantSelector
            options={product.options}
            variants={product.variants}
            onSelect={handleSelect}
          />
          {hasSize && <SizeGuide />}
        </div>
      )}

      <AddToCartButton
        variantId={variant?.id ?? null}
        available={variant?.availableForSale ?? false}
      />

      <PdpTrustRow />
    </div>
  );
}
