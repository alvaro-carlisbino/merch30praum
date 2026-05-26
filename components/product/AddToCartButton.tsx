"use client";

import { useState, useTransition } from "react";
import { addToCart } from "@/lib/cart/actions";
import { useCartUI } from "@/lib/cart/store";
import { cn } from "@/lib/utils/cn";

interface AddToCartButtonProps {
  variantId: string | null;
  available: boolean;
  className?: string;
}

/**
 * Botão clássico de Windows. Sem rotate, sem accent, sem motion.
 */
export function AddToCartButton({ variantId, available, className }: AddToCartButtonProps) {
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<"idle" | "added">("idle");
  const { openDrawer, bumpOptimisticCount } = useCartUI();

  const disabled = !variantId || !available || pending;

  function handleClick() {
    if (!variantId) return;
    bumpOptimisticCount(1);
    startTransition(async () => {
      try {
        await addToCart(variantId, 1);
        setFeedback("added");
        window.dispatchEvent(new CustomEvent("cart:updated"));
        openDrawer();
        setTimeout(() => setFeedback("idle"), 1500);
      } catch (e) {
        bumpOptimisticCount(-1);
        console.error(e);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn("win-btn win-btn-primary w-full h-[28px]", className)}
    >
      {!available
        ? "esgotado"
        : pending
          ? "adicionando..."
          : feedback === "added"
            ? "adicionado"
            : "&Adicionar à sacola"}
    </button>
  );
}
