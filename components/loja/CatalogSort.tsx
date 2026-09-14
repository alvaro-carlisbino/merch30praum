"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { SORT_OPTIONS, type SortKey } from "@/lib/shop/catalog";

export function CatalogSort({ value }: { value: SortKey }) {
  const router = useRouter();
  const params = useSearchParams();
  function onChange(next: string) {
    const q = new URLSearchParams(params.toString());
    if (next === "drop") q.delete("ordem");
    else q.set("ordem", next);
    const s = q.toString();
    router.replace(s ? `/catalogo?${s}` : "/catalogo", { scroll: false });
  }
  return (
    <label className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted">
      Ordenar
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full border bg-transparent px-4 py-2 text-[11px] uppercase tracking-[0.18em] outline-none"
        style={{ borderColor: "var(--border)", color: "var(--fg)" }}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value} style={{ color: "#0a0a0a" }}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
