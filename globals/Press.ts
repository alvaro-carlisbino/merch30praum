import type { GlobalConfig } from "payload";
import {
  safeRevalidatePath as revalidatePath,
  safeRevalidateTag as revalidateTag,
} from "@/lib/cms/revalidate";

export const Press: GlobalConfig = {
  slug: "press",
  label: "Imprensa · Press Kit",
  access: { read: () => true },
  hooks: {
    afterChange: [
      () => {
        revalidateTag("press", "default");
        revalidatePath("/imprensa");
      },
    ],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Contatos",
          fields: [
            {
              name: "contacts",
              type: "group",
              fields: (["ar", "booking", "imprensa", "parcerias", "geral"] as const).map((key) => ({
                name: key,
                type: "group" as const,
                fields: [
                  { name: "label", type: "text" as const, required: true },
                  { name: "email", type: "text" as const, required: true },
                ],
              })),
            },
          ],
        },
        {
          label: "Assets",
          fields: [
            {
              name: "assets",
              type: "array",
              fields: [
                { name: "slug", type: "text", required: true },
                { name: "title", type: "text", required: true },
                {
                  name: "type",
                  type: "select",
                  required: true,
                  options: [
                    { label: "Logo", value: "logo" },
                    { label: "Foto", value: "photo" },
                    { label: "Bio", value: "bio" },
                    { label: "Documento", value: "document" },
                  ],
                },
                { name: "description", type: "textarea", required: true },
                { name: "format", type: "text", required: true },
                { name: "downloadUrl", type: "text", required: true },
                {
                  name: "relatedArtist",
                  type: "select",
                  options: [
                    { label: "Matuê", value: "matue" },
                    { label: "Wiu", value: "wiu" },
                    { label: "Teto", value: "teto" },
                    { label: "Brandão85", value: "brandao" },
                  ],
                },
                { name: "thumbnail", type: "text", required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
