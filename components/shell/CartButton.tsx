"use client";
import { useEffect } from "react";
import { useCartUI } from "@/lib/cart/store";
import { CART_QTY_COOKIE } from "@/lib/cart/constants";

// Lê a quantidade do cookie no navegador, sem chamar o servidor.
function readQtyCookie(): number {
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CART_QTY_COOKIE}=`));
  const n = match ? Number(match.split("=")[1]) : 0;
  return Number.isFinite(n) ? n : 0;
}

export function CartButton() {
  const { openDrawer, optimisticCount, setOptimisticCount } = useCartUI();
  useEffect(() => {
    setOptimisticCount(readQtyCookie());
  }, [setOptimisticCount]);
  if (optimisticCount <= 0) return null;
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
