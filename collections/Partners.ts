import type { CollectionConfig } from "payload";
import {
  safeRevalidatePath as revalidatePath,
  safeRevalidateTag as revalidateTag,
} from "@/lib/cms/revalidate";

export const Partners: CollectionConfig = {
  slug: "partners",
  labels: { singular: "Parceiro", plural: "Parcerias" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "status", "years", "updatedAt"],
  },
  access: { read: () => true },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag("partners", "default");
        revalidateTag(`partner:${doc.slug}`, "default");
        revalidatePath("/parcerias");
        revalidatePath(`/parcerias/${doc.slug}`);
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateTag("partners", "default");
        revalidateTag(`partner:${doc.slug}`, "default");
        revalidatePath("/parcerias");
      },
    ],
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      type: "tabs",
      tabs: [
        {
          label: "Identidade",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "category", type: "text", required: true },
            { name: "years", type: "text", required: true },
            {
              name: "status",
              type: "select",
              required: true,
              options: [
                { label: "Ativa", value: "active" },
                { label: "Passada", value: "past" },
                { label: "Próxima", value: "upcoming" },
              ],
            },
            { name: "headline", type: "text", required: true },
            { name: "shortPitch", type: "textarea", required: true },
            { name: "story", type: "textarea", required: true },
            { name: "quote", type: "textarea" },
          ],
        },
        {
          label: "Release",
          fields: [
            {
              name: "release",
              type: "group",
              fields: [
                { name: "name", type: "text", required: true },
                { name: "format", type: "text", required: true },
                { name: "year", type: "text", required: true },
              ],
            },
            { name: "externalLink", type: "text", required: true },
            { name: "internalLink", type: "text" },
          ],
        },
        {
          label: "Visual",
          fields: [
            { name: "brandColor", type: "text", required: true },
            { name: "bgColor", type: "text", required: true },
            { name: "logoPath", type: "text" },
            { name: "heroImage", type: "text", required: true },
            {
              name: "galleryImages",
              type: "array",
              fields: [{ name: "url", type: "text", required: true }],
            },
            {
              name: "artistsInvolved",
              type: "select",
              hasMany: true,
              options: [
                { label: "Matuê", value: "matue" },
                { label: "Wiu", value: "wiu" },
                { label: "Teto", value: "teto" },
                { label: "Brandão85", value: "brandao" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
