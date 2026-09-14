import type { CollectionConfig } from "payload";

export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  labels: { singular: "Inscrito", plural: "Newsletter · Inscritos" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "source", "createdAt"],
    description: "Emails capturados no site (home, loja e lista de espera do Plantão).",
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: "-createdAt",
  fields: [
    { name: "email", type: "email", required: true, unique: true, index: true },
    {
      name: "source",
      type: "select",
      required: true,
      defaultValue: "home",
      options: [
        { label: "Home", value: "home" },
        { label: "Loja", value: "loja" },
        { label: "Plantão · lista de espera", value: "plantao" },
        { label: "Outro", value: "other" },
      ],
    },
    { name: "consent", type: "checkbox", defaultValue: true },
  ],
};
