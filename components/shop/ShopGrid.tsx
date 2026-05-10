"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { DomainProduct } from "@/lib/shopify/types";
import { ARTIST_SLUGS, ARTISTS } from "@/lib/artists/registry";
import type { ArtistSlug } from "@/lib/artists/types";
import { CATEGORIES, productCategorySlug, type CategorySlug } from "@/lib/shop/categories";
import { ProductCardBase } from "@/components/product/ProductCardBase";
import { cn } from "@/lib/utils/cn";

type ArtistFilter = ArtistSlug | "all";
type CategoryFilter = CategorySlug | "all";
type SortMode = "novidades" | "preco-asc" | "preco-desc" | "a-z";

interface ShopGridProps {
  products: DomainProduct[];
}

export function ShopGrid({ products }: ShopGridProps) {
  const [artist, setArtist] = useState<ArtistFilter>("all");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortMode>("novidades");

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      if (artist !== "all" && p.artist !== artist) return false;
      if (category !== "all" && productCategorySlug(p) !== category) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "preco-asc") {
      sorted.sort((a, b) => parseFloat(a.priceMin.amount) - parseFloat(b.priceMin.amount));
    } else if (sort === "preco-desc") {
      sorted.sort((a, b) => parseFloat(b.priceMin.amount) - parseFloat(a.priceMin.amount));
    } else if (sort === "a-z") {
      sorted.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
    }
    return sorted;
  }, [products, artist, category, sort]);

  return (
    <>
      <div
        className="sticky top-14 z-30 backdrop-blur-md py-4"
        style={{
          background: "color-mix(in srgb, var(--bg) 80%, transparent)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-col gap-3">
            <FilterRow
              label="Universo"
              options={[
                { id: "all", label: "Todos" },
                ...ARTIST_SLUGS.map((s) => ({
                  id: s,
                  label: ARTISTS[s].displayName,
                  accent: ARTISTS[s].panelAccent,
                })),
              ]}
              value={artist}
              onChange={(v) => setArtist(v as ArtistFilter)}
            />
            <FilterRow
              label="Categoria"
              options={[
                { id: "all", label: "Tudo" },
                ...CATEGORIES.map((c) => ({ id: c.slug, label: c.label })),
              ]}
              value={category}
              onChange={(v) => setCategory(v as CategoryFilter)}
            />
          </div>

          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted">
            <label htmlFor="sort">Ordenar</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="bg-transparent border border-border px-3 py-2 text-xs uppercase tracking-widest text-fg"
              style={{ borderRadius: 0 }}
            >
              <option value="novidades">Novidades</option>
              <option value="preco-asc">Preço · menor</option>
              <option value="preco-desc">Preço · maior</option>
              <option value="a-z">A — Z</option>
            </select>
            <span className="hidden sm:inline tabular-nums">
              {filtered.length} peças
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-12">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center text-sm text-muted"
            >
              Nenhuma peça com esses filtros agora. Tenta limpar e voltar.
            </motion.p>
          ) : (
            <motion.ul
              key="grid"
              layout
              className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              style={{ gap: "var(--grid-gap)" }}
            >
              {filtered.map((p) => (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <ProductCardBase
                    product={p}
                    artistSlug={p.artist ?? "matue"}
                  />
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

interface FilterRowProps {
  label: string;
  options: Array<{ id: string; label: string; accent?: string }>;
  value: string;
  onChange: (v: string) => void;
}

function FilterRow({ label, options, value, onChange }: FilterRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[10px] uppercase tracking-[0.3em] text-muted mr-2">
        {label}
      </span>
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            data-cursor={active ? undefined : `Filtrar · ${opt.label}`}
            className={cn(
              "px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] border transition-colors",
              active
                ? "border-transparent text-bg"
                : "border-border text-fg hover:border-accent",
            )}
            style={
              active
                ? { background: opt.accent ?? "var(--accent)" }
                : undefined
            }
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
