import type { CollectionConfig } from "payload";
import {
  safeRevalidatePath as revalidatePath,
  safeRevalidateTag as revalidateTag,
} from "@/lib/cms/revalidate";
export const Artists: CollectionConfig = {
  slug: "artists",
  labels: {
    singular: "Artista",
    plural: "Artistas",
  },
  admin: {
    useAsTitle: "displayName",
    defaultColumns: ["displayName", "slug", "origin", "updatedAt"],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag("artists", "default");
        revalidateTag(`artist:${doc.slug}`, "default");
        revalidatePath("/artistas");
        revalidatePath(`/${doc.slug}`);
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateTag("artists", "default");
        revalidateTag(`artist:${doc.slug}`, "default");
        revalidatePath("/artistas");
      },
    ],
  },
  fields: [
    {
      name: "slug",
      type: "select",
      required: true,
      unique: true,
      index: true,
      options: [
        { label: "Matuê", value: "matue" },
        { label: "Wiu", value: "wiu" },
        { label: "Teto", value: "teto" },
        { label: "Brandão85", value: "brandao" },
      ],
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Identidade",
          fields: [
            { name: "displayName", type: "text", required: true },
            { name: "realName", type: "text" },
            { name: "origin", type: "text", required: true },
            { name: "joinedYear", type: "number" },
            {
              name: "bioParagraphs",
              type: "array",
              fields: [{ name: "value", type: "textarea", required: true }],
            },
            {
              name: "facts",
              type: "array",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "value", type: "text", required: true },
              ],
            },
            { name: "universeName", type: "text", required: true },
            { name: "tagline", type: "text" },
            { name: "shopifyCollectionHandle", type: "text" },
          ],
        },
        {
          label: "Álbum",
          fields: [
            {
              name: "album",
              type: "group",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "year", type: "text", required: true },
                { name: "collaborator", type: "text" },
                { name: "coverImage", type: "text", required: true },
                {
                  name: "tracks",
                  type: "array",
                  fields: [{ name: "name", type: "text", required: true }],
                },
              ],
            },
          ],
        },
        {
          label: "Visual",
          fields: [
            { name: "portraitImage", type: "text", required: true },
            { name: "panelAccent", type: "text", required: true },
            { name: "panelBackground", type: "text", required: true },
          ],
        },
        {
          label: "Redes",
          fields: [
            {
              name: "socials",
              type: "group",
              fields: [
                { name: "spotify", type: "text" },
                { name: "instagram", type: "text" },
                { name: "tiktok", type: "text" },
                { name: "youtube", type: "text" },
                { name: "appleMusic", type: "text" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
