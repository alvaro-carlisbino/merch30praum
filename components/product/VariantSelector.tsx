"use client";

import { useEffect, useMemo, useState } from "react";
import type { ShopifyVariant } from "@/lib/shopify/types";
import { cn } from "@/lib/utils/cn";

interface VariantSelectorProps {
  options: Array<{ name: string; values: string[] }>;
  variants: ShopifyVariant[];
  onSelect: (variant: ShopifyVariant | null) => void;
}

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

  function pick(name: string, value: string) {
    setSelected((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="space-y-5">
      {options.map((option) => (
        <div key={option.name}>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted">
              {option.name}
            </span>
            <span className="text-xs">{selected[option.name]}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isActive = selected[option.name] === value;
              const variantForValue = variants.find(
                (v) =>
                  v.selectedOptions.find((o) => o.name === option.name)?.value === value,
              );
              const isAvailable = variantForValue?.availableForSale ?? true;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => pick(option.name, value)}
                  disabled={!isAvailable}
                  className={cn(
                    "px-4 py-2 text-xs uppercase tracking-widest border transition-colors",
                    isActive ? "border-transparent" : "border-border hover:border-accent",
                    !isAvailable && "opacity-40 line-through cursor-not-allowed",
                  )}
                  style={
                    isActive
                      ? { background: "var(--accent)", color: "var(--bg)" }
                      : undefined
                  }
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
