import type { DomainProduct } from "@/lib/shopify/types";

export type CategorySlug =
  | "camisetas"
  | "moletons"
  | "jaquetas"
  | "calcas"
  | "acessorios";

export interface CategoryDef {
  slug: CategorySlug;
  label: string;
  matchTags: string[];
  cover: string;
}

export const CATEGORIES: CategoryDef[] = [
  { slug: "camisetas", label: "Camisetas", matchTags: ["camiseta"], cover: "/assets/covers/xtranho.jpg" },
  { slug: "moletons", label: "Moletons", matchTags: ["moletom"], cover: "/assets/colapso_global.jpeg" },
  { slug: "jaquetas", label: "Jaquetas", matchTags: ["jaqueta"], cover: "/assets/wiki/matue_atlantida_2026.jpg" },
  { slug: "calcas", label: "Calças", matchTags: ["calca"], cover: "/assets/wiki/teto.jpg" },
  { slug: "acessorios", label: "Acessórios", matchTags: ["acessorio", "colecionavel"], cover: "/assets/isso_e_trap_vol2.jpeg" },
];

export function productCategorySlug(p: DomainProduct): CategorySlug | null {
  const tags = p.tags.map((t) => t.toLowerCase());
  for (const cat of CATEGORIES) {
    if (cat.matchTags.some((t) => tags.includes(t))) return cat.slug;
  }
  return null;
}
