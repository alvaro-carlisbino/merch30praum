"use client";

import { useState, useTransition } from "react";
import { removeCartLine, updateCartLine } from "@/lib/cart/actions";
import { useCartUI } from "@/lib/cart/store";

interface CartLineControlsProps {
  lineId: string;
  initialQuantity: number;
}

export function CartLineControls({ lineId, initialQuantity }: CartLineControlsProps) {
  const [qty, setQty] = useState(initialQuantity);
  const [pending, startTransition] = useTransition();
  const { setOptimisticCount } = useCartUI();

  function update(next: number) {
    if (next < 1) {
      startTransition(async () => {
        const cart = await removeCartLine(lineId);
        setOptimisticCount(cart?.totalQuantity ?? 0);
        window.dispatchEvent(new CustomEvent("cart:updated"));
        window.location.reload();
      });
      return;
    }
    setQty(next);
    startTransition(async () => {
      const cart = await updateCartLine(lineId, next);
      setOptimisticCount(cart?.totalQuantity ?? 0);
      window.dispatchEvent(new CustomEvent("cart:updated"));
      window.location.reload();
    });
  }

  return (
    <div className="mt-auto flex items-center gap-4">
      <div className="inline-flex items-center border border-border">
        <button
          type="button"
          onClick={() => update(qty - 1)}
          disabled={pending}
          className="px-3 py-2 text-sm hover:bg-border disabled:opacity-50"
          aria-label="Diminuir"
        >
          −
        </button>
        <span className="px-4 text-sm tabular-nums">{qty}</span>
        <button
          type="button"
          onClick={() => update(qty + 1)}
          disabled={pending}
          className="px-3 py-2 text-sm hover:bg-border disabled:opacity-50"
          aria-label="Aumentar"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={() => update(0)}
        disabled={pending}
        className="text-[10px] uppercase tracking-widest text-muted hover:text-accent disabled:opacity-50"
      >
        Remover
      </button>
    </div>
  );
}
