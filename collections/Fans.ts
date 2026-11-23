import type { CollectionConfig } from "payload";

const staffOnly = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

// Conta do fã no chat. A identidade vem da conta de cliente da Shopify; o
// site só cria e atualiza estes registros pelas rotas de login e cadastro.
export const Fans: CollectionConfig = {
  slug: "fans",
  labels: { singular: "Fã", plural: "Chat · Fãs" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["nickname", "email", "firstName", "city", "state", "lastLoginAt"],
    listSearchableFields: ["email", "nickname", "firstName", "lastName"],
    description: "Contas que entraram no chat pela Shopify. Para derrubar todas as sessões de um fã, aumente a versão de sessão.",
  },
  access: { create: () => false, read: staffOnly, update: staffOnly, delete: staffOnly },
  defaultSort: "-createdAt",
  fields: [
    { name: "shopifyCustomerId", type: "text", required: true, unique: true, index: true, admin: { readOnly: true } },
    { name: "email", type: "email", required: true, index: true, admin: { readOnly: true } },
    { name: "nickname", type: "text", maxLength: 24, label: "Apelido no chat" },
    { name: "nicknameKey", type: "text", unique: true, index: true, admin: { hidden: true } },
    { name: "firstName", type: "text", label: "Nome" },
    { name: "lastName", type: "text", label: "Sobrenome" },
    { name: "phone", type: "text", label: "Celular" },
    { name: "birthDate", type: "date", label: "Data de nascimento", admin: { date: { pickerAppearance: "dayOnly" } } },
    { name: "city", type: "text", label: "Cidade" },
    { name: "state", type: "text", maxLength: 2, label: "UF" },
    { name: "acceptedTermsAt", type: "date", label: "Aceitou as regras em", admin: { readOnly: true } },
    { name: "termsVersion", type: "text", admin: { readOnly: true } },
    { name: "lastLoginAt", type: "date", admin: { readOnly: true } },
    { name: "lastMessageAt", type: "date", admin: { readOnly: true } },
    { name: "sessionVersion", type: "number", required: true, defaultValue: 1, label: "Versão de sessão" },
  ],
};
