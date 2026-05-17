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
            { name: "bornYear", type: "number" },
            { name: "joinedYear", type: "number" },
            { name: "signatureLyric", type: "textarea" },
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
            {
              name: "signatureSongs",
              type: "array",
              fields: [{ name: "name", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Universo · Drop",
          fields: [
            { name: "universeName", type: "text", required: true },
            { name: "tagline", type: "text" },
            { name: "manifesto", type: "textarea" },
            { name: "shopifyCollectionHandle", type: "text" },
            {
              name: "motionPreset",
              type: "select",
              options: [
                { label: "Glitch", value: "glitch" },
                { label: "Slow", value: "slow" },
                { label: "Collage", value: "collage" },
                { label: "Xerox", value: "xerox" },
              ],
            },
            {
              name: "drop",
              type: "group",
              fields: [
                {
                  name: "status",
                  type: "select",
                  required: true,
                  options: [
                    { label: "Drop ativo", value: "live" },
                    { label: "Estreia", value: "debut" },
                    { label: "Encore", value: "encore" },
                    { label: "Esgotado", value: "soldout" },
                  ],
                },
                { name: "statusLabel", type: "text", required: true },
                { name: "chapterName", type: "text" },
                { name: "availabilityNote", type: "text" },
              ],
            },
            {
              name: "voice",
              type: "group",
              fields: [
                { name: "epigraph", type: "textarea" },
                {
                  name: "process",
                  type: "array",
                  minRows: 3,
                  maxRows: 3,
                  fields: [{ name: "step", type: "text", required: true }],
                },
              ],
            },
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
                { name: "tagline", type: "textarea" },
                {
                  name: "highlightedTracks",
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
            { name: "realPhotoUrl", type: "text" },
            { name: "photoObjectPosition", type: "text" },
            { name: "photoFilter", type: "text" },
            { name: "heroImage", type: "text", required: true },
            {
              name: "lookbookImages",
              type: "array",
              minRows: 3,
              maxRows: 3,
              fields: [{ name: "url", type: "text", required: true }],
            },
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
                { name: "soundcloud", type: "text" },
                { name: "twitter", type: "text" },
              ],
            },
            { name: "spotifyEmbedPath", type: "text" },
          ],
        },
      ],
    },
  ],
};
