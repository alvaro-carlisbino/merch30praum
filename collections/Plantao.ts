import type { CollectionConfig } from "payload";
import {
  safeRevalidatePath as revalidatePath,
  safeRevalidateTag as revalidateTag,
} from "@/lib/cms/revalidate";

export const Plantao: CollectionConfig = {
  slug: "plantao",
  labels: { singular: "Edição do Plantão", plural: "Plantão · Edições" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "year", "date", "status", "updatedAt"],
  },
  access: { read: () => true },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag("plantao", "default");
        revalidateTag(`plantao:${doc.slug}`, "default");
        revalidatePath("/plantao");
        revalidatePath("/plantao/lineup");
        revalidatePath("/plantao/ingressos");
        revalidatePath("/plantao/info");
        revalidatePath("/plantao/edicoes");
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateTag("plantao", "default");
        revalidateTag(`plantao:${doc.slug}`, "default");
        revalidatePath("/plantao");
      },
    ],
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "isCurrent",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Marca esta edição como a vigente" },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Identidade",
          fields: [
            { name: "year", type: "number", required: true },
            { name: "title", type: "text", required: true },
            { name: "date", type: "date", required: true, admin: { date: { pickerAppearance: "dayOnly" } } },
            { name: "doorsAt", type: "text", required: true },
            { name: "venue", type: "text", required: true },
            { name: "city", type: "text", required: true },
            { name: "state", type: "text", required: true },
            {
              name: "status",
              type: "select",
              required: true,
              options: [
                { label: "Próxima edição", value: "upcoming" },
                { label: "Ao vivo", value: "live" },
                { label: "Passada", value: "past" },
              ],
            },
            { name: "tagline", type: "text", required: true },
            { name: "manifesto", type: "textarea", required: true },
          ],
        },
        {
          label: "Visual",
          fields: [
            { name: "posterImage", type: "text", required: true },
            { name: "heroImage", type: "text", required: true },
            { name: "heroVideoUrl", type: "text" },
            { name: "aftermovieUrl", type: "text" },
            {
              name: "galleryImages",
              type: "array",
              fields: [{ name: "url", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Lineup",
          fields: [
            {
              name: "lineup",
              type: "array",
              fields: [
                { name: "displayName", type: "text", required: true },
                {
                  name: "artistSlug",
                  type: "select",
                  options: [
                    { label: "Matuê", value: "matue" },
                    { label: "Wiu", value: "wiu" },
                    { label: "Teto", value: "teto" },
                    { label: "Brandão85", value: "brandao" },
                  ],
                },
                { name: "highlightLabel", type: "text" },
                { name: "imageUrl", type: "text", required: true },
                { name: "isHeadliner", type: "checkbox", defaultValue: false },
                { name: "isSpecial", type: "checkbox", defaultValue: false },
              ],
            },
          ],
        },
        {
          label: "Ingressos",
          fields: [
            {
              name: "sectors",
              type: "array",
              fields: [
                { name: "name", type: "text", required: true },
                { name: "priceFrom", type: "number" },
                { name: "priceTo", type: "number" },
                {
                  name: "status",
                  type: "select",
                  required: true,
                  options: [
                    { label: "Disponível", value: "available" },
                    { label: "Esgotado", value: "soldout" },
                    { label: "Em breve", value: "upcoming" },
                  ],
                },
                { name: "perks", type: "text" },
              ],
            },
            { name: "ticketsUrl", type: "text" },
            { name: "embedTicketsUrl", type: "text" },
          ],
        },
        {
          label: "Stats & FAQ",
          fields: [
            {
              name: "stats",
              type: "group",
              fields: [
                { name: "attendees", type: "number" },
                { name: "onlineViewers", type: "number" },
                { name: "investment", type: "text" },
                { name: "hoursOfShow", type: "number" },
              ],
            },
            {
              name: "infoFAQ",
              type: "array",
              fields: [
                { name: "question", type: "text", required: true },
                { name: "answer", type: "textarea", required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
