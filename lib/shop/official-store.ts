import variantIds from "./store-variants.json";

// IDs de variante da 30praum.store (products/<handle>.json). Atualizar quando entrar produto novo.
const VARIANT_IDS: Record<string, Record<string, number>> = variantIds;

export const OFFICIAL_STORE = "https://30praum.store";

export const STORE_POLICY = {
  shipping: "Envio em até 7 dias úteis após o pagamento",
  exchange: "Troca em até 7 dias corridos após a entrega, com frete reverso pelos Correios",
  support: "30praum@fashionlog.com.br",
};

export function storeVariantIds(handle: string): Record<string, number> {
  return VARIANT_IDS[handle] ?? {};
}

export function officialCartUrl(items: { handle: string; size: string; quantity: number }[]) {
  const parts = items.flatMap((item) => {
    const id = VARIANT_IDS[item.handle]?.[item.size];
    return id ? [`${id}:${item.quantity}`] : [];
  });
  return parts.length ? `${OFFICIAL_STORE}/cart/${parts.join(",")}` : null;
}
