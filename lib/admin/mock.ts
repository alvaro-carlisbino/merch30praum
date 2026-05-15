import { daysAgo } from "./format";

export type AdminProduct = {
  id: string;
  title: string;
  artist: string;
  price: number;
  stock: number;
  status: "ativo" | "rascunho" | "esgotado";
  collection: "Oversized" | "Five Panel" | "Drops" | "Promoção";
  image: string;
};

export const ADMIN_PRODUCTS: AdminProduct[] = [
  { id: "p1", title: "Camiseta 333 Azul Elétrico", artist: "Matuê", price: 189, stock: 124, status: "ativo", collection: "Drops", image: "/figma-loja/mv-3.png" },
  { id: "p2", title: "Camiseta Sabotage Off-White", artist: "Brandão85", price: 189, stock: 72, status: "ativo", collection: "Oversized", image: "/figma-home/produto-sabotage.png" },
  { id: "p3", title: "Camiseta Game Face", artist: "Wiu", price: 189, stock: 45, status: "ativo", collection: "Drops", image: "/figma-home/produto-face.png" },
  { id: "p4", title: "Puffer Black 333", artist: "Matuê", price: 489, stock: 18, status: "ativo", collection: "Drops", image: "/figma-home/produto-black-puffer.png" },
  { id: "p5", title: "Camiseta Respeito é Pra Quem Tem", artist: "Teto", price: 189, stock: 0, status: "esgotado", collection: "Drops", image: "/figma-home/produto-respeito.png" },
  { id: "p6", title: "Camiseta TUPAC Brown", artist: "Brandão85", price: 189, stock: 31, status: "ativo", collection: "Promoção", image: "/figma-loja/ep-3.png" },
  { id: "p7", title: "Camiseta 2PAC Black", artist: "Matuê", price: 189, stock: 56, status: "ativo", collection: "Promoção", image: "/figma-loja/ep-2.png" },
  { id: "p8", title: "Jaqueta Azul Elétrico", artist: "Wiu", price: 599, stock: 8, status: "ativo", collection: "Drops", image: "/figma-loja/mv-4.png" },
  { id: "p9", title: "Five Panel Five Stars", artist: "Brandão85", price: 159, stock: 92, status: "rascunho", collection: "Five Panel", image: "/figma-loja/colecao-five-panel-1.png" },
  { id: "p10", title: "Oversized Stage Light", artist: "Teto", price: 209, stock: 64, status: "rascunho", collection: "Oversized", image: "/figma-loja/colecao-oversized-1.png" },
];

export type AdminOrder = {
  id: string;
  customer: string;
  email: string;
  product: string;
  qty: number;
  total: number;
  status: "pago" | "enviado" | "entregue" | "pendente" | "cancelado";
  date: string;
  payment: "pix" | "credito" | "boleto";
};

export const ADMIN_ORDERS: AdminOrder[] = [
  { id: "#30P-1842", customer: "Lucas Tavares",        email: "lukinhaaa+30p@gmail.com",       product: "Camiseta 333 Azul Elétrico",      qty: 1, total: 189, status: "pago",      date: daysAgo(0), payment: "pix" },
  { id: "#30P-1841", customer: "Duda Albuquerque",     email: "duda.alb@icloud.com",            product: "Puffer Black 333",                qty: 1, total: 489, status: "enviado",   date: daysAgo(0), payment: "credito" },
  { id: "#30P-1840", customer: "Thiago Marçal",        email: "thmarcal@outlook.com.br",        product: "Camiseta Sabotage Off-White",     qty: 2, total: 378, status: "pago",      date: daysAgo(1), payment: "pix" },
  { id: "#30P-1839", customer: "Aninha Bezerra",       email: "aninha.bz@uol.com.br",           product: "Camiseta TUPAC Brown",            qty: 1, total: 189, status: "entregue",  date: daysAgo(1), payment: "pix" },
  { id: "#30P-1838", customer: "Beatriz Costa",        email: "biacostarj@gmail.com",           product: "Jaqueta Azul Elétrico",           qty: 1, total: 599, status: "pago",      date: daysAgo(2), payment: "credito" },
  { id: "#30P-1837", customer: "Gabi de Holanda",      email: "gabi.holanda@proton.me",         product: "Camiseta Game Face",              qty: 1, total: 189, status: "pendente",  date: daysAgo(2), payment: "boleto" },
  { id: "#30P-1836", customer: "Larissa Mendes",       email: "lari.m@hotmail.com",             product: "Camiseta 2PAC Black",             qty: 3, total: 567, status: "entregue",  date: daysAgo(3), payment: "pix" },
  { id: "#30P-1835", customer: "Rafa Lima",            email: "rafalima@protonmail.com",        product: "Camiseta Respeito é Pra Quem Tem", qty: 1, total: 189, status: "cancelado", date: daysAgo(3), payment: "credito" },
  { id: "#30P-1834", customer: "Camila Rocha",         email: "camih.rocha@gmail.com",          product: "Camiseta 333 Azul Elétrico",      qty: 2, total: 378, status: "entregue",  date: daysAgo(4), payment: "pix" },
  { id: "#30P-1833", customer: "Diego Sanches",        email: "diegosanches.13@gmail.com",      product: "Puffer Black 333",                qty: 1, total: 489, status: "entregue",  date: daysAgo(4), payment: "credito" },
];

export type TicketTier = {
  id: string;
  name: string;
  price: number;
  sold: number;
  capacity: number;
  status: "ativo" | "esgotado" | "encerrado";
};

export const TICKET_TIERS: TicketTier[] = [
  { id: "t1", name: "Front · Lote 1", price: 90,  sold: 2000, capacity: 2000, status: "esgotado" },
  { id: "t2", name: "Front · Lote 2", price: 110, sold: 2000, capacity: 2000, status: "esgotado" },
  { id: "t3", name: "Front · Lote 3", price: 130, sold: 2000, capacity: 2000, status: "esgotado" },
  { id: "t4", name: "Front · Lote 4", price: 140, sold: 1800, capacity: 1800, status: "esgotado" },
  { id: "t5", name: "Front · Lote 5", price: 145, sold: 1700, capacity: 1700, status: "esgotado" },
  { id: "t6", name: "Front · Lote 6", price: 150, sold: 1245, capacity: 2000, status: "ativo" },
  { id: "t7", name: "Front Boladão · Lote 6", price: 295, sold: 1500, capacity: 1500, status: "esgotado" },
  { id: "t8", name: "VIP · Lote 6", price: 655, sold: 412,  capacity: 800,  status: "ativo" },
];

export type Customer = {
  id: string;
  name: string;
  email: string;
  city: string;
  orders: number;
  ltv: number;
};

export const TOP_CUSTOMERS: Customer[] = [
  { id: "c1", name: "Camila Rocha",     email: "camih.rocha@gmail.com",   city: "Fortaleza · CE",      orders: 8, ltv: 2840 },
  { id: "c2", name: "Thiago Marçal",    email: "thmarcal@outlook.com.br", city: "São Paulo · SP",      orders: 6, ltv: 2120 },
  { id: "c3", name: "Diego Sanches",    email: "diegosanches.13@gmail.com", city: "Rio de Janeiro · RJ", orders: 5, ltv: 1830 },
  { id: "c4", name: "Beatriz Costa",    email: "biacostarj@gmail.com",    city: "Recife · PE",         orders: 4, ltv: 1620 },
  { id: "c5", name: "Larissa Mendes",   email: "lari.m@hotmail.com",      city: "Belo Horizonte · MG", orders: 4, ltv: 1340 },
];

export function fmtBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value);
}

export function fmtPct(num: number, total: number) {
  return ((num / total) * 100).toFixed(1) + "%";
}

export const REVENUE_BY_DAY: { day: string; value: number }[] = [
  { day: "Seg", value: 12400 },
  { day: "Ter", value: 18600 },
  { day: "Qua", value: 22100 },
  { day: "Qui", value: 16800 },
  { day: "Sex", value: 28400 },
  { day: "Sáb", value: 34900 },
  { day: "Dom", value: 19200 },
];

export const TOP_PRODUCTS_30D: { title: string; qty: number; revenue: number }[] = [
  { title: "Camiseta 333 Azul Elétrico", qty: 412, revenue: 77868 },
  { title: "Camiseta Sabotage Off-White", qty: 287, revenue: 54243 },
  { title: "Puffer Black 333", qty: 156, revenue: 76284 },
  { title: "Jaqueta Azul Elétrico", qty: 98, revenue: 58702 },
  { title: "Camiseta TUPAC Brown", qty: 142, revenue: 26838 },
];
