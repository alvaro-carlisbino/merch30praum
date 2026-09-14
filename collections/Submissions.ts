import type { CollectionConfig } from "payload";

export const Submissions: CollectionConfig = {
  slug: "submissions",
  labels: { singular: "Candidatura", plural: "Incubadora · Candidaturas" },
  admin: {
    useAsTitle: "artistName",
    defaultColumns: ["artistName", "genre", "origin", "status", "createdAt"],
    description: "Demos enviadas pelo formulário público da Incubadora. Painel do A&R.",
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: "-createdAt",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Candidatura",
          fields: [
            { name: "artistName", type: "text", required: true, maxLength: 80 },
            { name: "email", type: "email", required: true, index: true },
            { name: "instagram", type: "text", maxLength: 60 },
            { name: "spotifyUrl", type: "text", required: true },
            { name: "soundcloudUrl", type: "text" },
            {
              name: "genre",
              type: "select",
              required: true,
              options: [
                { label: "Trap", value: "trap" },
                { label: "Rap", value: "rap" },
                { label: "Hip-hop", value: "hiphop" },
                { label: "Funk", value: "funk" },
                { label: "Drill", value: "drill" },
                { label: "R&B", value: "rnb" },
                { label: "Outro", value: "other" },
              ],
            },
            { name: "origin", type: "text", maxLength: 60 },
            { name: "age", type: "number", min: 14, max: 99 },
            { name: "story", type: "textarea", required: true, maxLength: 500 },
          ],
        },
        {
          label: "A&R",
          fields: [
            {
              name: "status",
              type: "select",
              required: true,
              defaultValue: "new",
              options: [
                { label: "Nova", value: "new" },
                { label: "Ouvida", value: "listened" },
                { label: "Em conversa", value: "contacted" },
                { label: "Arquivada", value: "archived" },
              ],
            },
            { name: "notes", type: "textarea", admin: { description: "Notas internas. Não aparecem no site." } },
          ],
        },
      ],
    },
  ],
};
