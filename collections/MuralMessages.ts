import type { CollectionConfig } from "payload";

// Recados do mural de lançamento. O público escreve pela rota /api/mural,
// que aplica a moderação automática; aqui a equipe oculta ou apaga.
export const MuralMessages: CollectionConfig = {
  slug: "mural-messages",
  labels: { singular: "Recado", plural: "Mural · Recados" },
  admin: {
    useAsTitle: "body",
    defaultColumns: ["nickname", "body", "room", "status", "reports", "createdAt"],
    description:
      "Recados deixados pelos fãs nos murais de lançamento. Mude para Oculto para tirar do ar na hora. Três denúncias de pessoas diferentes ocultam sozinhas.",
    listSearchableFields: ["body", "nickname"],
  },
  access: {
    create: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: "-createdAt",
  fields: [
    { name: "room", type: "text", required: true, index: true, admin: { description: "Ex.: album-xtranho" } },
    { name: "nickname", type: "text", required: true, maxLength: 24 },
    { name: "body", type: "textarea", required: true, maxLength: 280 },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "visible",
      index: true,
      options: [
        { label: "Visível", value: "visible" },
        { label: "Oculto", value: "hidden" },
      ],
    },
    { name: "reports", type: "number", defaultValue: 0, admin: { readOnly: true } },
    {
      name: "reportedBy",
      type: "json",
      admin: { hidden: true },
    },
    {
      name: "fingerprint",
      type: "text",
      index: true,
      admin: { readOnly: true, description: "Hash anônimo de quem escreveu. Serve para limitar spam." },
    },
  ],
};

// Quem está com o mural aberto. Só serve para o contador "online agora".
export const MuralPresence: CollectionConfig = {
  slug: "mural-presence",
  admin: { hidden: true },
  access: {
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "key", type: "text", required: true, unique: true, index: true },
    { name: "room", type: "text", required: true, index: true },
    { name: "seenAt", type: "date", required: true, index: true },
  ],
};
