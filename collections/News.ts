import type { CollectionConfig } from "payload";
import {
  safeRevalidatePath as revalidatePath,
  safeRevalidateTag as revalidateTag,
} from "@/lib/cms/revalidate";

export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "Notícia", plural: "News · Notícias" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "author", "updatedAt"],
  },
  access: { read: () => true },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag("news", "default");
        revalidateTag(`news:${doc.slug}`, "default");
        revalidatePath("/news");
        revalidatePath(`/news/${doc.slug}`);
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateTag("news", "default");
        revalidateTag(`news:${doc.slug}`, "default");
        revalidatePath("/news");
      },
    ],
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "title", type: "text", required: true },
    { name: "excerpt", type: "textarea", required: true },
    { name: "heroImage", type: "text", required: true },
    { name: "publishedAt", type: "date", required: true },
    { name: "author", type: "text", required: true },
    {
      name: "tags",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        { label: "Lançamento", value: "lancamento" },
        { label: "Plantão", value: "plantao" },
        { label: "Parceria", value: "parceria" },
        { label: "Indústria", value: "industria" },
        { label: "Bastidores", value: "bastidores" },
        { label: "Incubadora", value: "incubadora" },
        { label: "Holding", value: "holding" },
      ],
    },
    {
      name: "body",
      type: "array",
      required: true,
      fields: [{ name: "paragraph", type: "textarea", required: true }],
    },
    {
      name: "relatedArtists",
      type: "select",
      hasMany: true,
      options: [
        { label: "Matuê", value: "matue" },
        { label: "Wiu", value: "wiu" },
        { label: "Teto", value: "teto" },
        { label: "Brandão85", value: "brandao" },
      ],
    },
    {
      name: "relatedReleases",
      type: "array",
      fields: [{ name: "slug", type: "text", required: true }],
    },
  ],
};
