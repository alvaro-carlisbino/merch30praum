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
}

export const CATEGORIES: CategoryDef[] = [
  { slug: "camisetas", label: "Camisetas", matchTags: ["camiseta"] },
  { slug: "moletons", label: "Moletons", matchTags: ["moletom"] },
  { slug: "jaquetas", label: "Jaquetas", matchTags: ["jaqueta"] },
  { slug: "calcas", label: "Calças", matchTags: ["calca"] },
  { slug: "acessorios", label: "Acessórios", matchTags: ["acessorio", "colecionavel"] },
];
