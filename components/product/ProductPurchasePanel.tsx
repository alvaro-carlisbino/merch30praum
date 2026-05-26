"use client";

import { useCallback, useState } from "react";
import type { DomainProduct, ShopifyVariant } from "@/lib/shopify/types";
import { VariantSelector } from "./VariantSelector";
import { AddToCartButton } from "./AddToCartButton";

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

  return (
    <div className="font-mono text-[11px] text-black">
      <div className="border border-[#aca899] bg-white p-3">
        <div className="grid grid-cols-[80px_1fr] gap-y-1">
          <span className="text-right text-[#666]">nome:</span>
          <span className="font-bold">{product.title}</span>

          <span className="text-right text-[#666]">arquivo:</span>
          <span>{product.handle}.jpg</span>

          <span className="text-right text-[#666]">tamanho:</span>
          <span>R$ {parseFloat(activePrice.amount).toFixed(2).replace(".", ",")}</span>

          <span className="text-right text-[#666]">tipo:</span>
          <span>peça oficial 30praum</span>
        </div>
      </div>

      {product.description ? (
        <div className="mt-3 border border-[#aca899] bg-white p-3">
          <p className="mb-1 text-[#666]">descrição:</p>
          <p className="text-black">{product.description}</p>
        </div>
      ) : null}

      {product.options.length > 0 ? (
        <div className="mt-3 border border-[#aca899] bg-white p-3">
          <VariantSelector
            options={product.options}
            variants={product.variants}
            onSelect={handleSelect}
          />
        </div>
      ) : null}

      <div className="mt-4">
        <AddToCartButton
          variantId={variant?.id ?? null}
          available={variant?.availableForSale ?? false}
        />
      </div>
    </div>
  );
}
