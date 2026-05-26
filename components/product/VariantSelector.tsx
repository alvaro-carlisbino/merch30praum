"use client";

import { useEffect, useMemo, useState } from "react";
import type { ShopifyVariant } from "@/lib/shopify/types";

interface VariantSelectorProps {
  options: Array<{ name: string; values: string[] }>;
  variants: ShopifyVariant[];
  onSelect: (variant: ShopifyVariant | null) => void;
}

/**
 * Variantes como combobox clássico de Windows (select estilizado).
 * Sem chip torto, sem mono "switch".
 */
export function VariantSelector({ options, variants, onSelect }: VariantSelectorProps) {
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (variants.length > 0 && variants[0].selectedOptions) {
      for (const opt of variants[0].selectedOptions) initial[opt.name] = opt.value;
    }
    return initial;
  });

  const matched = useMemo(() => {
    return (
      variants.find((v) =>
        v.selectedOptions.every((o) => selected[o.name] === o.value),
      ) ?? null
    );
  }, [variants, selected]);

  useEffect(() => {
    onSelect(matched);
  }, [matched, onSelect]);

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option.name} className="flex items-center gap-2">
          <span className="w-[80px] text-right font-mono text-[11px] text-black">
            {option.name.toLowerCase()}:
          </span>
          <select
            value={selected[option.name] ?? ""}
            onChange={(e) => setSelected((s) => ({ ...s, [option.name]: e.target.value }))}
            className="win-select flex-1 font-mono text-[11px]"
          >
            {option.values.map((value) => {
              const variantForValue = variants.find(
                (v) => v.selectedOptions.find((o) => o.name === option.name)?.value === value,
              );
              const isAvailable = variantForValue?.availableForSale ?? true;
              return (
                <option key={value} value={value} disabled={!isAvailable}>
                  {value}
                  {!isAvailable ? "  (esgotado)" : ""}
                </option>
              );
            })}
          </select>
        </label>
      ))}
    </div>
  );
}
