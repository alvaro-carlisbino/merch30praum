import type { CollectionConfig } from "payload";
import {
  safeRevalidatePath as revalidatePath,
  safeRevalidateTag as revalidateTag,
} from "@/lib/cms/revalidate";

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Produto", plural: "Produtos · Loja" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "handle", "priceBRL", "artistSlug", "category", "isDropLive", "updatedAt"],
  },
  access: { read: () => true },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag("products", "default");
        revalidateTag(`product:${doc.handle}`, "default");
        revalidatePath("/loja");
        revalidatePath("/catalogo");
        if (doc.handle) revalidatePath(`/produto/${doc.handle}`);
      },
    ],
    afterDelete: [
      () => {
        revalidateTag("products", "default");
        revalidatePath("/loja");
        revalidatePath("/catalogo");
      },
    ],
  },
  defaultSort: "-isDropLive",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Produto",
          fields: [
            { name: "handle", type: "text", required: true, unique: true, index: true, admin: { description: "URL slug — ex: xtranho-tee-preto" } },
            { name: "title", type: "text", required: true },
            { name: "shortDescription", type: "textarea" },
            { name: "priceBRL", type: "number", required: true, min: 0 },
            { name: "compareAtPriceBRL", type: "number", min: 0, admin: { description: "Preço riscado (opcional)" } },
            {
              name: "artistSlug",
              type: "select",
              required: true,
              options: [
                { label: "Matuê", value: "matue" },
                { label: "Wiu", value: "wiu" },
                { label: "Teto", value: "teto" },
                { label: "Brandão85", value: "brandao" },
                { label: "Cross-roster", value: "house" },
              ],
            },
            {
              name: "category",
              type: "select",
              required: true,
              options: [
                { label: "Camisetas", value: "camisetas" },
                { label: "Moletons", value: "moletons" },
                { label: "Jaquetas", value: "jaquetas" },
                { label: "Calças", value: "calcas" },
                { label: "Acessórios", value: "acessorios" },
              ],
            },
            {
              name: "tags",
              type: "array",
              fields: [{ name: "value", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Mídia",
          fields: [
            { name: "image", type: "text", required: true, admin: { description: "URL principal do produto" } },
            {
              name: "galleryImages",
              type: "array",
              fields: [{ name: "url", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Estoque · Status",
          fields: [
            { name: "isDropLive", type: "checkbox", defaultValue: false, admin: { description: "Marcar quando o produto faz parte do drop ativo" } },
            { name: "isSoldOut", type: "checkbox", defaultValue: false },
            { name: "isPreOrder", type: "checkbox", defaultValue: false },
            {
              name: "sizes",
              type: "array",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "available", type: "checkbox", defaultValue: true },
              ],
            },
            { name: "stockNote", type: "text", admin: { description: "Ex: 'Reposição limitada · enviado em security bag'" } },
          ],
        },
        {
          label: "Shopify",
          fields: [
            { name: "shopifyVariantId", type: "text", admin: { description: "Para quando integrar Shopify Storefront real" } },
            { name: "shopifyCollectionHandle", type: "text" },
          ],
        },
      ],
    },
  ],
};
