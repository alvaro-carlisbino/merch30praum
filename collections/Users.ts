import type { CollectionConfig } from "payload";
export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    hidden: ({ user }) => !user,
  },
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    cookies: {
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    },
  },
  access: {
    create: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    admin: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "chatName",
      type: "text",
      maxLength: 40,
      label: "Nome no chat",
      admin: { description: "Como aparece no chat do site quando você está logado. Vazio usa o nome." },
    },
    {
      name: "chatBadge",
      type: "select",
      defaultValue: "staff",
      label: "Selo no chat",
      options: [
        { label: "Equipe 30praum", value: "staff" },
        { label: "Artista", value: "artist" },
      ],
    },
  ],
};
