import type { CollectionConfig } from "payload";
import {
  safeRevalidatePath as revalidatePath,
  safeRevalidateTag as revalidateTag,
} from "@/lib/cms/revalidate";

export const Shows: CollectionConfig = {
  slug: "shows",
  labels: { singular: "Show", plural: "Shows · Agenda" },
  admin: {
    useAsTitle: "city",
    defaultColumns: ["date", "city", "venue", "artistSlug", "status"],
  },
  access: { read: () => true },
  hooks: {
    afterChange: [
      () => {
        revalidateTag("shows", "default");
        revalidatePath("/shows");
      },
    ],
    afterDelete: [
      () => {
        revalidateTag("shows", "default");
        revalidatePath("/shows");
      },
    ],
  },
  defaultSort: "date",
  fields: [
    {
      name: "artistSlug",
      type: "select",
      required: true,
      options: [
        { label: "Matuê", value: "matue" },
        { label: "Wiu", value: "wiu" },
        { label: "Teto", value: "teto" },
        { label: "Brandão85", value: "brandao" },
      ],
    },
    { name: "date", type: "date", required: true, index: true },
    { name: "city", type: "text", required: true },
    { name: "state", type: "text", required: true },
    { name: "venue", type: "text", required: true },
    { name: "event", type: "text" },
    { name: "ticketsUrl", type: "text" },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "upcoming",
      options: [
        { label: "Próximo", value: "upcoming" },
        { label: "Esgotado", value: "soldout" },
        { label: "Passado", value: "past" },
        { label: "A confirmar", value: "tba" },
      ],
    },
    { name: "note", type: "text" },
  ],
};
