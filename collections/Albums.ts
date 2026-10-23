import type { CollectionConfig } from "payload";
import {
  safeRevalidatePath as revalidatePath,
  safeRevalidateTag as revalidateTag,
} from "@/lib/cms/revalidate";
export const Albums: CollectionConfig = {
  slug: "albums",
  labels: { singular: "Álbum", plural: "Álbuns · Releases" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "year", "dropArtistSlug", "updatedAt"],
  },
  access: { read: () => true },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag("albums", "default");
        revalidateTag(`album:${doc.slug}`, "default");
        revalidatePath("/releases");
        revalidatePath(`/album/${doc.slug}`);
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateTag("albums", "default");
        revalidateTag(`album:${doc.slug}`, "default");
        revalidatePath("/releases");
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
            { name: "title", type: "text", required: true },
            {
              name: "artists",
              type: "array",
              required: true,
              fields: [
                { name: "name", type: "text", required: true },
                {
                  name: "slug",
                  type: "select",
                  required: true,
                  options: [
                    { label: "Matuê", value: "matue" },
                    { label: "Wiu", value: "wiu" },
                    { label: "Teto", value: "teto" },
                    { label: "Brandão85", value: "brandao" },
                  ],
                },
              ],
            },
            { name: "year", type: "text", required: true },
            { name: "releaseDate", type: "date", required: true },
            { name: "duration", type: "text" },
            { name: "about", type: "textarea", required: true },
            {
              name: "dropArtistSlug",
              type: "select",
              required: true,
              options: [
                { label: "Matuê", value: "matue" },
                { label: "Wiu", value: "wiu" },
                { label: "Teto", value: "teto" },
                { label: "Brandão85", value: "brandao" },
              ],
            },
          ],
        },
        {
          label: "Visual",
          fields: [
            { name: "coverImage", type: "text", required: true },
            { name: "accentHex", type: "text", required: true },
            { name: "bgHex", type: "text", required: true },
          ],
        },
        {
          label: "Tracklist",
          fields: [
            {
              name: "tracks",
              type: "array",
              required: true,
              fields: [
                { name: "title", type: "text", required: true },
                { name: "featured", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Streaming",
          fields: [
            {
              name: "streamingLinks",
              type: "array",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "href", type: "text", required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
