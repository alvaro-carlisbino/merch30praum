"use client";

import { useEffect } from "react";
import { useCartUI } from "@/lib/cart/store";

interface CartButtonProps {
  initialCount: number;
}

export function CartButton({ initialCount }: CartButtonProps) {
  const { openDrawer, optimisticCount, setOptimisticCount } = useCartUI();

  useEffect(() => {
    setOptimisticCount(initialCount);
  }, [initialCount, setOptimisticCount]);

  return (
    <button
      type="button"
      onClick={openDrawer}
      className="relative flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-widest hover:text-accent transition-colors"
    >
      <span>Carrinho</span>
      <span
        className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-border px-1.5 text-[10px] tabular-nums"
        style={{ background: "color-mix(in srgb, var(--fg) 8%, transparent)" }}
      >
        {optimisticCount}
      </span>
    </button>
  );
}
