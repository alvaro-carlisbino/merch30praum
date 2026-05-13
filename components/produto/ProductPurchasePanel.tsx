"use client";

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

  return (
    <div
      className="rounded-3xl border p-8 sm:p-10"
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

      <p
        className="mt-8 font-display"
        style={{
          fontSize: "clamp(1.25rem, 1.6vw, 1.6rem)",
          letterSpacing: "0.01em",
        }}
      >
        {price}
      </p>

      <fieldset className="mt-8">
        <legend className="mb-3 text-sm">Cores</legend>
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

      <fieldset className="mt-8">
        <legend className="mb-3 text-sm">Tamanhos</legend>
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

      <button
        type="button"
        data-cursor="Adicionar"
        className="mt-10 inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-medium transition-opacity hover:opacity-90"
        style={{ background: "#ffffff", color: "#0a0a0a" }}
      >
        Adicionar na sacola
      </button>
    </div>
  );
}
