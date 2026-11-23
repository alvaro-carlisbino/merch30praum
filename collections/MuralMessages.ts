import type { CollectionConfig, GlobalConfig } from "payload";

const staffOnly = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

// Recados do chat. O público escreve pela rota /api/mural, que aplica a
// moderação automática; aqui a equipe oculta, apaga e vê denúncias.
export const MuralMessages: CollectionConfig = {
  slug: "mural-messages",
  labels: { singular: "Recado", plural: "Chat · Recados" },
  admin: {
    useAsTitle: "body",
    defaultColumns: ["nickname", "body", "room", "status", "reports", "createdAt"],
    description:
      "Tudo que os fãs escrevem no chat. Mude para Oculto para tirar do ar na hora. Três denúncias de pessoas diferentes ocultam sozinhas. Recados mais velhos que o prazo de retenção são apagados automaticamente.",
    listSearchableFields: ["body", "nickname"],
  },
  access: { create: staffOnly, read: staffOnly, update: staffOnly, delete: staffOnly },
  defaultSort: "-createdAt",
  fields: [
    { name: "room", type: "text", required: true, index: true, admin: { description: "geral, album-xtranho..." } },
    { name: "nickname", type: "text", required: true, maxLength: 40 },
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
    {
      name: "authorType",
      type: "select",
      defaultValue: "fan",
      options: [
        { label: "Fã", value: "fan" },
        { label: "Equipe 30praum", value: "staff" },
        { label: "Artista", value: "artist" },
      ],
    },
    {
      name: "shadow",
      type: "checkbox",
      defaultValue: false,
      index: true,
      admin: { description: "Escrito por alguém banido: só a própria pessoa vê." },
    },
    { name: "fan", type: "relationship", relationTo: "fans", index: true, label: "Conta do fã", admin: { readOnly: true } },
    { name: "reports", type: "number", defaultValue: 0, admin: { readOnly: true } },
    { name: "reportedBy", type: "json", admin: { readOnly: true, description: "Motivos das denúncias." } },
    {
      name: "fingerprint",
      type: "text",
      index: true,
      admin: { readOnly: true, description: "Identificador interno de quem escreveu." },
    },
  ],
};

export const MuralBans: CollectionConfig = {
  slug: "mural-bans",
  labels: { singular: "Banimento", plural: "Chat · Banimentos" },
  admin: {
    useAsTitle: "nickname",
    defaultColumns: ["nickname", "reason", "until", "createdAt"],
    description:
      "Quem está banido continua vendo o chat e acha que está escrevendo, mas ninguém mais vê os recados. Apague o registro para desbanir.",
  },
  access: { create: staffOnly, read: staffOnly, update: staffOnly, delete: staffOnly },
  defaultSort: "-createdAt",
  fields: [
    { name: "fingerprint", type: "text", required: true, index: true, admin: { readOnly: true } },
    { name: "nickname", type: "text" },
    { name: "reason", type: "text" },
    { name: "until", type: "date", required: true, index: true },
    { name: "bannedBy", type: "text", admin: { readOnly: true } },
  ],
};

// Quem está com o chat aberto. Só serve para o contador "online agora".
export const MuralPresence: CollectionConfig = {
  slug: "mural-presence",
  admin: { hidden: true },
  access: { create: () => false, read: staffOnly, update: () => false, delete: staffOnly },
  fields: [
    { name: "key", type: "text", required: true, unique: true, index: true },
    { name: "room", type: "text", required: true, index: true },
    { name: "seenAt", type: "date", required: true, index: true },
  ],
};

// Reações rápidas (🔥 🐐 ...). Vivem 10 minutos e somem.
export const MuralReactions: CollectionConfig = {
  slug: "mural-reactions",
  admin: { hidden: true },
  access: { create: () => false, read: staffOnly, update: () => false, delete: staffOnly },
  fields: [
    { name: "room", type: "text", required: true, index: true },
    { name: "emoji", type: "text", required: true },
    { name: "fingerprint", type: "text", index: true },
  ],
};

export const MuralConfig: GlobalConfig = {
  slug: "mural-config",
  label: "Chat · Configuração",
  admin: {
    description: "Liga e desliga o chat, ajusta a moderação e fixa um recado no topo.",
  },
  access: { read: staffOnly, update: staffOnly },
  fields: [
    {
      name: "enabled",
      type: "checkbox",
      defaultValue: true,
      label: "Chat ligado",
      admin: { description: "Desmarque para fechar o chat no site inteiro na hora (emergência, ataque, raid)." },
    },
    {
      name: "slowModeSeconds",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 120,
      label: "Intervalo mínimo entre recados (segundos)",
      admin: { description: "Aumente durante lançamentos para o chat não virar enxurrada." },
    },
    {
      name: "retentionDays",
      type: "number",
      defaultValue: 14,
      min: 1,
      max: 365,
      label: "Apagar recados depois de (dias)",
    },
    {
      name: "blockedWords",
      type: "textarea",
      label: "Palavras bloqueadas extras",
      admin: { description: "Uma por linha. Somam com a lista padrão (ódio, conteúdo sexual, golpe)." },
    },
    {
      type: "group",
      name: "pinned",
      label: "Recado fixado no chat geral",
      fields: [
        { name: "text", type: "text", maxLength: 140 },
        { name: "href", type: "text", admin: { description: "Link opcional, ex.: /album/xtranho" } },
      ],
    },
  ],
};
