"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCartUI } from "@/lib/cart/store";
import {
  getCart,
  removeCartLine,
  updateCartLine,
} from "@/lib/cart/actions";
import type { DomainCart } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/utils/format-money";
import { CartFreeShipping } from "./CartFreeShipping";

export function CartDrawer() {
  const { isDrawerOpen, closeDrawer, setOptimisticCount } = useCartUI();
  const [cart, setCart] = useState<DomainCart | null>(null);
  const [fetchedFor, setFetchedFor] = useState<number>(0);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!isDrawerOpen) return;
    const tick = Date.now();
    let active = true;
    getCart()
      .then((c) => {
        if (active) {
          setCart(c);
          setOptimisticCount(c?.totalQuantity ?? 0);
          setFetchedFor(tick);
        }
      })
      .catch(() => {
        if (active) setFetchedFor(tick);
      });
    return () => {
      active = false;
    };
  }, [isDrawerOpen, setOptimisticCount]);

  const loading = isDrawerOpen && fetchedFor === 0;

  useEffect(() => {
    function refresh() {
      getCart().then((c) => {
        setCart(c);
        setOptimisticCount(c?.totalQuantity ?? 0);
      });
    }
    window.addEventListener("cart:updated", refresh);
    return () => window.removeEventListener("cart:updated", refresh);
  }, [setOptimisticCount]);

  function handleQuantity(lineId: string, qty: number) {
    if (qty < 1) {
      startTransition(async () => {
        const updated = await removeCartLine(lineId);
        setCart(updated);
        setOptimisticCount(updated?.totalQuantity ?? 0);
      });
      return;
    }
    startTransition(async () => {
      const updated = await updateCartLine(lineId, qty);
      setCart(updated);
      setOptimisticCount(updated?.totalQuantity ?? 0);
    });
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          key="drawer-root"
          className="fixed inset-0 z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: "var(--overlay)" }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
          />
          <motion.aside
            className="absolute right-0 top-0 h-full w-full max-w-md flex flex-col"
            style={{
              background: "var(--bg)",
              color: "var(--fg)",
              borderLeft: "1px solid var(--border)",
            }}
            variants={{
              hidden: { x: "100%" },
              visible: { x: 0 },
            }}
            transition={{ type: "tween", duration: 0.4, ease: [0.7, 0, 0.3, 1] }}
            aria-label="Carrinho"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="text-sm uppercase tracking-[0.25em] font-display">
                Seu carrinho
              </h2>
              <button
                type="button"
                onClick={closeDrawer}
                className="text-xs uppercase tracking-widest opacity-70 hover:opacity-100"
                aria-label="Fechar"
              >
                Fechar
              </button>
            </header>

            <div className="flex-1 overflow-y-auto">
              {loading && !cart && (
                <p className="px-6 py-8 text-sm text-muted">Carregando...</p>
              )}
              {!loading && (!cart || cart.lines.length === 0) && (
                <div className="px-6 py-12 text-center">
                  <p className="font-display text-2xl mb-2">Vazio por enquanto</p>
                  <p className="text-sm text-muted mb-6">
                    Escolha um universo e bota algo aqui dentro.
                  </p>
                  <button
                    type="button"
                    onClick={closeDrawer}
                    className="text-xs uppercase tracking-widest border border-border px-4 py-2 hover:border-accent"
                  >
                    Continuar
                  </button>
                </div>
              )}
              {cart && cart.lines.length > 0 && (
                <ul className="divide-y divide-border">
                  {cart.lines.map((line) => (
                    <li key={line.id} className="flex gap-4 px-6 py-4">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden border border-border">
                        {line.merchandise.image && (
                          <Image
                            src={line.merchandise.image.url}
                            alt={line.merchandise.image.altText ?? ""}
                            fill
                            sizes="80px"
                            className="object-cover"
                            unoptimized
                          />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col">
                        <Link
                          href={`/${resolveArtistFromTags(line.merchandise.product.tags) ?? ""}/${line.merchandise.product.handle}`}
                          className="text-sm font-medium hover:text-accent"
                          onClick={closeDrawer}
                        >
                          {line.merchandise.product.title}
                        </Link>
                        <p className="text-xs text-muted mt-0.5">
                          {line.merchandise.title}
                        </p>
                        <div className="flex items-center gap-3 mt-auto">
                          <div className="inline-flex items-center border border-border">
                            <button
                              type="button"
                              onClick={() => handleQuantity(line.id, line.quantity - 1)}
                              className="px-2 py-1 text-xs hover:bg-border"
                              aria-label="Diminuir"
                            >
                              −
                            </button>
                            <span className="px-3 text-xs tabular-nums">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleQuantity(line.id, line.quantity + 1)}
                              className="px-2 py-1 text-xs hover:bg-border"
                              aria-label="Aumentar"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleQuantity(line.id, 0)}
                            className="text-[10px] uppercase tracking-widest text-muted hover:text-accent"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                      <div className="text-sm tabular-nums">
                        {formatMoney(line.cost.totalAmount)}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart && cart.lines.length > 0 && (
              <footer className="border-t border-border px-6 py-5 space-y-4">
                <CartFreeShipping
                  subtotal={parseFloat(cart.cost.subtotalAmount.amount)}
                />
                <div className="flex items-baseline justify-between pt-2 border-t border-border">
                  <span className="text-xs uppercase tracking-widest text-muted">
                    Subtotal
                  </span>
                  <span className="text-lg font-display tabular-nums">
                    {formatMoney(cart.cost.subtotalAmount)}
                  </span>
                </div>
                <a
                  href={`/checkout-redirect?cartId=${encodeURIComponent(cart.id)}`}
                  className="block text-center w-full py-3 text-xs uppercase tracking-[0.3em] font-medium transition-opacity hover:opacity-90"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg)",
                  }}
                >
                  Finalizar compra
                </a>
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="block text-center text-[10px] uppercase tracking-widest text-muted hover:text-fg"
                >
                  Ver carrinho completo
                </Link>
              </footer>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function resolveArtistFromTags(tags: string[]): string | null {
  for (const tag of tags) {
    const lowered = tag.toLowerCase();
    if (lowered.startsWith("artist:")) return lowered.slice("artist:".length);
  }
  return null;
}
