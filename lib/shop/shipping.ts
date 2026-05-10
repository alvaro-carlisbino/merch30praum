export const FREE_SHIPPING_THRESHOLD_BRL = 299;
export const PIX_DISCOUNT_PCT = 0.05;
export const INSTALLMENTS_MAX = 4;

export function freeShippingDelta(subtotal: number): number {
  return Math.max(0, FREE_SHIPPING_THRESHOLD_BRL - subtotal);
}

export function freeShippingProgress(subtotal: number): number {
  return Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD_BRL);
}

export function pixPrice(subtotal: number): number {
  return subtotal * (1 - PIX_DISCOUNT_PCT);
}

export function installmentValue(total: number): number {
  return total / INSTALLMENTS_MAX;
}
