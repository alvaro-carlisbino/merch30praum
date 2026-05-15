export type OrderStatus =
  | "pago"
  | "enviado"
  | "entregue"
  | "pendente"
  | "cancelado";

export type ProductStatus = "ativo" | "rascunho" | "esgotado";
export type TicketStatus = "ativo" | "esgotado" | "encerrado";

type Token = { bg: string; fg: string; label: string };

const ORDER: Record<OrderStatus, Token> = {
  pago: { bg: "#37d18a22", fg: "#37d18a", label: "Pago" },
  enviado: { bg: "#1f6bff22", fg: "#5b9bff", label: "Enviado" },
  entregue: { bg: "#37d18a22", fg: "#37d18a", label: "Entregue" },
  pendente: { bg: "#f5a52322", fg: "#f5a523", label: "Pendente" },
  cancelado: { bg: "#ff557722", fg: "#ff5577", label: "Cancelado" },
};

const PRODUCT: Record<ProductStatus, Token> = {
  ativo: { bg: "#37d18a22", fg: "#37d18a", label: "Ativo" },
  rascunho: { bg: "#f5a52322", fg: "#f5a523", label: "Rascunho" },
  esgotado: { bg: "#ff557722", fg: "#ff5577", label: "Esgotado" },
};

const TICKET: Record<TicketStatus, Token> = {
  ativo: { bg: "#37d18a22", fg: "#37d18a", label: "À venda" },
  esgotado: { bg: "#ff557722", fg: "#ff5577", label: "Esgotado" },
  encerrado: { bg: "color-mix(in srgb, currentColor 10%, transparent)", fg: "currentColor", label: "Encerrado" },
};

const REGISTRY = { order: ORDER, product: PRODUCT, ticket: TICKET };

export type StatusKind = keyof typeof REGISTRY;

export function statusToken(kind: StatusKind, status: string): Token {
  const set = REGISTRY[kind] as Record<string, Token>;
  return set[status] ?? { bg: "transparent", fg: "currentColor", label: status };
}
