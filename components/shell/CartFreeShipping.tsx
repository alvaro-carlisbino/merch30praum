"use client";

import { motion } from "motion/react";
import {
  FREE_SHIPPING_THRESHOLD_BRL,
  freeShippingDelta,
  freeShippingProgress,
} from "@/lib/shop/shipping";
import { formatMoney } from "@/lib/utils/format-money";

interface CartFreeShippingProps {
  subtotal: number;
}

export function CartFreeShipping({ subtotal }: CartFreeShippingProps) {
  const progress = freeShippingProgress(subtotal);
  const delta = freeShippingDelta(subtotal);
  const reached = delta === 0;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between text-[10px] uppercase tracking-[0.3em]">
        <span style={{ color: reached ? "var(--accent)" : "var(--muted)" }}>
          {reached ? "Frete grátis garantido" : "Frete grátis em"}
        </span>
        <span
          className="tabular-nums"
          style={{ color: reached ? "var(--accent)" : "var(--fg)" }}
        >
          {reached
            ? "✓ liberado"
            : formatMoney({ amount: String(delta), currencyCode: "BRL" })}
        </span>
      </div>
      <div
        className="relative h-1 overflow-hidden"
        style={{ background: "color-mix(in srgb, var(--fg) 8%, transparent)" }}
      >
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{ background: "var(--accent)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted">
        Acima de{" "}
        {formatMoney({
          amount: String(FREE_SHIPPING_THRESHOLD_BRL),
          currencyCode: "BRL",
        })}{" "}
        · Brasil inteiro · Security bag
      </p>
    </div>
  );
}
