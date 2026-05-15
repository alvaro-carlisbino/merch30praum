"use client";

import Link from "next/link";
import { useState } from "react";

export type ProductColor = { id: string; label: string; hex: string };
export type ProductSize = string;

interface Props {
  title: string;
  price: string;
  colors: ProductColor[];
  sizes: ProductSize[];
}

export function ProductPurchasePanel({ title, price, colors, sizes }: Props) {
  const [colorId, setColorId] = useState(colors[0]?.id);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (!size) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 4000);
  }

  const colorLabel = colors.find((c) => c.id === colorId)?.label;

  return (
    <div
      className="rounded-3xl border p-6 sm:p-8"
      style={{
        background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
        borderColor: "var(--border)",
      }}
    >
      <h1
        className="font-display uppercase leading-tight"
        style={{
          fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </h1>

      <div className="mt-6 flex items-baseline gap-3">
        <p
          className="font-display tabular-nums"
          style={{
            fontSize: "clamp(1.5rem, 2vw, 2rem)",
          }}
        >
          {price}
        </p>
        <p className="text-xs text-muted">
          ou 4× sem juros · 5% off no PIX
        </p>
      </div>

      <fieldset className="mt-8">
        <legend className="mb-3 flex items-center justify-between gap-3 text-sm">
          <span>Cores</span>
          <span className="text-xs text-muted">
            {colorLabel}
          </span>
        </legend>
        <div className="flex flex-wrap items-center gap-3">
          {colors.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setColorId(c.id)}
              aria-label={c.label}
              aria-pressed={colorId === c.id}
              data-cursor={c.label}
              className="h-9 w-9 rounded-full transition-all"
              style={{
                background: c.hex,
                boxShadow:
                  colorId === c.id
                    ? "0 0 0 2px var(--accent), 0 0 0 4px var(--bg)"
                    : "0 0 0 1px rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <legend className="mb-3 flex items-center justify-between gap-3 text-sm">
          <span>Tamanhos</span>
          <button type="button" className="text-xs underline text-muted">
            Guia de medidas
          </button>
        </legend>
        <div className="flex flex-wrap items-center gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              data-cursor={`Tamanho ${s}`}
              className="flex h-10 min-w-[44px] items-center justify-center rounded-full px-2 text-xs uppercase transition-colors"
              style={{
                background: size === s ? "#ffffff" : "rgba(255,255,255,0.08)",
                color: size === s ? "#0a0a0a" : "var(--fg)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

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
          <span className="font-display tabular-nums text-lg w-8 text-center">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(5, q + 1))}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-white hover:text-black"
            style={{ borderColor: "var(--border)" }}
            aria-label="Aumentar"
          >
            +
          </button>
        </div>
      </fieldset>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!size}
        data-cursor="Adicionar"
        className="mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: added ? "#37d18a" : "#ffffff",
          color: added ? "#0a0a0a" : "#0a0a0a",
        }}
      >
        {added ? "✓ Adicionado · ver sacola" : !size ? "Selecione o tamanho" : "Adicionar na sacola"}
      </button>

      {added && (
        <Link
          href="/cart"
          className="mt-3 inline-flex w-full items-center justify-center rounded-full border px-6 py-3 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
          style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
        >
          Finalizar compra →
        </Link>
      )}

      <ul className="mt-6 space-y-2 text-[10px] uppercase tracking-[0.22em] text-muted">
        <li>· Envio em até 5 dias úteis</li>
        <li>· Trocas grátis em 30 dias</li>
        <li>· Security bag lacrada direto da casa</li>
        <li>· Parcelamento até 4× sem juros</li>
      </ul>
    </div>
  );
}
