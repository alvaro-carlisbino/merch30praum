"use client";
import Link from "next/link";
import { useState, useTransition } from "react";
import type { ShopifyVariant } from "@/lib/shopify/types";
import { addToCart } from "@/lib/cart/actions";
import { useCartUI } from "@/lib/cart/store";
import type { ProductColor } from "@/lib/shop/catalog";
import { SizeGuide } from "./SizeGuide";

export type SiblingColor = { handle: string; color: ProductColor };

interface Props {
  title: string;
  priceLabel: string;
  compareAtLabel?: string;
  variants: ShopifyVariant[];
  soldOut: boolean;
  lowStockSizes: string[];
  stockNote?: string;
  artistLabel?: string;
  currentColor: ProductColor | null;
  siblings: SiblingColor[];
  externalUrl: string;
}

const MAX_QTY = 5;

export function ProductPurchasePanel({
  title,
  priceLabel,
  compareAtLabel,
  variants,
  soldOut,
  lowStockSizes,
  stockNote,
  artistLabel,
  currentColor,
  siblings,
  externalUrl,
}: Props) {
  const singleVariant = variants.length === 1;
  const [variantId, setVariantId] = useState<string | null>(
    singleVariant && variants[0].availableForSale ? variants[0].id : null,
  );
  const [qty, setQty] = useState(1);
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<"idle" | "added" | "error">("idle");
  const { openDrawer, bumpOptimisticCount } = useCartUI();

  const selected = variants.find((v) => v.id === variantId) ?? null;
  const canBuy = Boolean(selected && selected.availableForSale) && !soldOut && !pending;
  const hasSizes = variants.length > 0 && !singleVariant;
  const noCartVariant = variants.length === 0;

  function handleAdd() {
    if (!selected) return;
    bumpOptimisticCount(qty);
    startTransition(async () => {
      try {
        await addToCart(selected.id, qty);
        setFeedback("added");
        window.dispatchEvent(new CustomEvent("cart:updated"));
        openDrawer();
        setTimeout(() => setFeedback("idle"), 2500);
      } catch (e) {
        bumpOptimisticCount(-qty);
        setFeedback("error");
        console.error(e);
      }
    });
  }

  const ctaLabel = soldOut
    ? "Esgotado"
    : pending
      ? "Adicionando..."
      : feedback === "added"
        ? "Adicionado · ver sacola"
        : !selected
          ? "Selecione o tamanho"
          : "Adicionar na sacola";

  return (
    <div
      className="rounded-3xl border p-6 sm:p-8"
      style={{
        background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
        borderColor: "var(--border)",
      }}
    >
      {artistLabel && (
        <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-muted">{artistLabel}</p>
      )}
      <h1
        className="font-display uppercase leading-tight"
        style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)", letterSpacing: "0.02em" }}
      >
        {title}
      </h1>
      <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {compareAtLabel && (
          <p className="font-display text-lg tabular-nums text-muted line-through">{compareAtLabel}</p>
        )}
        <p className="font-display tabular-nums" style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)" }}>
          {priceLabel}
        </p>
        <p className="text-xs text-muted">ou 4× sem juros · 5% off no Pix</p>
      </div>

      {(currentColor || siblings.length > 0) && (
        <fieldset className="mt-8">
          <legend className="mb-3 flex items-center justify-between gap-3 text-sm">
            <span>Cor</span>
            <span className="text-xs text-muted">{currentColor?.label ?? "Única"}</span>
          </legend>
          <div className="flex flex-wrap items-center gap-3">
            {currentColor && (
              <span
                aria-label={`${currentColor.label} (atual)`}
                className="h-9 w-9 rounded-full"
                style={{
                  background: currentColor.hex,
                  boxShadow: "0 0 0 2px var(--accent), 0 0 0 4px var(--bg)",
                }}
              />
            )}
            {siblings.map((s) => (
              <Link
                key={s.handle}
                href={`/produto/${s.handle}`}
                aria-label={`Ver em ${s.color.label}`}
                data-cursor={s.color.label}
                className="h-9 w-9 rounded-full transition-transform hover:scale-105"
                style={{ background: s.color.hex, boxShadow: "0 0 0 1px rgba(255,255,255,0.25)" }}
              />
            ))}
          </div>
        </fieldset>
      )}

      {hasSizes && (
        <fieldset className="mt-7">
          <legend className="mb-3 flex w-full items-center justify-between gap-3 text-sm">
            <span>Tamanho</span>
            <SizeGuide />
          </legend>
          <div className="flex flex-wrap items-center gap-2">
            {variants.map((v) => {
              const isActive = v.id === variantId;
              const off = !v.availableForSale;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => !off && setVariantId(v.id)}
                  disabled={off}
                  aria-pressed={isActive}
                  data-cursor={off ? `${v.title} esgotado` : `Tamanho ${v.title}`}
                  className="flex h-10 min-w-[44px] items-center justify-center rounded-full px-3 text-xs uppercase transition-colors disabled:cursor-not-allowed"
                  style={{
                    background: isActive ? "#ffffff" : "rgba(255,255,255,0.08)",
                    color: isActive ? "#0a0a0a" : off ? "rgba(255,255,255,0.35)" : "var(--fg)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    textDecoration: off ? "line-through" : "none",
                  }}
                >
                  {v.title}
                </button>
              );
            })}
          </div>
          {lowStockSizes.length > 0 && !soldOut && (
            <p className="mt-3 text-xs" style={{ color: "var(--accent)" }}>
              Últimas unidades: só {lowStockSizes.join(" e ")} em estoque.
            </p>
          )}
        </fieldset>
      )}

      {singleVariant && (
        <p className="mt-7 text-sm text-muted">Tamanho único</p>
      )}

      {!soldOut && !noCartVariant && (
        <fieldset className="mt-7">
          <legend className="mb-3 text-sm">Quantidade</legend>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-white hover:text-black"
              style={{ borderColor: "var(--border)" }}
              aria-label="Diminuir"
            >
              −
            </button>
            <span className="w-8 text-center font-display text-lg tabular-nums">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-white hover:text-black"
              style={{ borderColor: "var(--border)" }}
              aria-label="Aumentar"
            >
              +
            </button>
          </div>
        </fieldset>
      )}

      {noCartVariant ? (
        <a
          href={externalUrl}
          target="_blank"
          rel="noreferrer noopener"
          data-cursor="30praum.store"
          className="mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: "#ffffff", color: "#0a0a0a" }}
        >
          Comprar na 30praum.store
        </a>
      ) : (
        <button
          type="button"
          onClick={handleAdd}
          disabled={!canBuy}
          data-cursor={soldOut ? "Esgotado" : "Adicionar"}
          className="mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: feedback === "added" ? "#37d18a" : "#ffffff",
            color: "#0a0a0a",
          }}
        >
          {ctaLabel}
        </button>
      )}

      {feedback === "added" && (
        <Link
          href="/cart"
          className="mt-3 inline-flex w-full items-center justify-center rounded-full border px-6 py-3 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
          style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
        >
          Finalizar compra →
        </Link>
      )}
      {feedback === "error" && (
        <p className="mt-3 text-xs" style={{ color: "var(--accent)" }}>
          Não deu pra adicionar agora. Tenta de novo em instantes.
        </p>
      )}

      <ul className="mt-6 space-y-2 text-[10px] uppercase tracking-[0.22em] text-muted">
        <li>· Loja oficial 30praum</li>
        <li>· {stockNote ?? "Enviado em security bag lacrada"}</li>
        <li>· Envio em até 5 dias úteis</li>
        <li>· Trocas grátis em 30 dias</li>
      </ul>
    </div>
  );
}
