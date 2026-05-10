import type { ShopifyCart, ShopifyCartLine } from "../types";
import { MOCK_PRODUCTS } from "./products";

const BRL = "BRL";
const carts = new Map<string, ShopifyCart>();

function recompute(cart: ShopifyCart): ShopifyCart {
  const subtotal = cart.lines.reduce(
    (acc, line) => acc + parseFloat(line.cost.totalAmount.amount),
    0,
  );
  const totalQty = cart.lines.reduce((acc, l) => acc + l.quantity, 0);
  return {
    ...cart,
    totalQuantity: totalQty,
    cost: {
      subtotalAmount: { amount: subtotal.toFixed(2), currencyCode: BRL },
      totalAmount: { amount: subtotal.toFixed(2), currencyCode: BRL },
      totalTaxAmount: null,
    },
  };
}

function buildLine(merchandiseId: string, quantity: number): ShopifyCartLine | null {
  for (const product of MOCK_PRODUCTS) {
    const variant = product.variants.find((v) => v.id === merchandiseId);
    if (!variant) continue;
    const unit = parseFloat(variant.price.amount);
    return {
      id: `gid://mock/CartLine/${merchandiseId}-${Date.now()}`,
      quantity,
      merchandise: {
        id: variant.id,
        title: variant.title,
        selectedOptions: variant.selectedOptions,
        image: variant.image ?? product.featuredImage ?? null,
        product: {
          id: product.id,
          handle: product.handle,
          title: product.title,
          tags: product.tags,
        },
      },
      cost: {
        amountPerQuantity: variant.price,
        totalAmount: {
          amount: (unit * quantity).toFixed(2),
          currencyCode: BRL,
        },
      },
    };
  }
  return null;
}

export function mockCartCreate(
  lines: Array<{ merchandiseId: string; quantity: number }>,
): ShopifyCart {
  const id = `gid://mock/Cart/${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const cart: ShopifyCart = {
    id,
    checkoutUrl: `https://30praum.myshopify.com/cart/c/${id.split("/").pop()}?mock=1`,
    totalQuantity: 0,
    cost: {
      subtotalAmount: { amount: "0.00", currencyCode: BRL },
      totalAmount: { amount: "0.00", currencyCode: BRL },
      totalTaxAmount: null,
    },
    lines: [],
  };
  carts.set(id, cart);
  if (lines.length) return mockCartLinesAdd(id, lines)!;
  return cart;
}

export function mockCartGet(cartId: string): ShopifyCart | null {
  return carts.get(cartId) ?? null;
}

export function mockCartLinesAdd(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>,
): ShopifyCart | null {
  const cart = carts.get(cartId);
  if (!cart) return null;
  for (const input of lines) {
    const existing = cart.lines.find(
      (l) => l.merchandise.id === input.merchandiseId,
    );
    if (existing) {
      existing.quantity += input.quantity;
      const unit = parseFloat(existing.cost.amountPerQuantity.amount);
      existing.cost.totalAmount = {
        amount: (unit * existing.quantity).toFixed(2),
        currencyCode: BRL,
      };
    } else {
      const line = buildLine(input.merchandiseId, input.quantity);
      if (line) cart.lines.push(line);
    }
  }
  const updated = recompute(cart);
  carts.set(cartId, updated);
  return updated;
}

export function mockCartLinesUpdate(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>,
): ShopifyCart | null {
  const cart = carts.get(cartId);
  if (!cart) return null;
  for (const input of lines) {
    const line = cart.lines.find((l) => l.id === input.id);
    if (line) {
      line.quantity = input.quantity;
      const unit = parseFloat(line.cost.amountPerQuantity.amount);
      line.cost.totalAmount = {
        amount: (unit * line.quantity).toFixed(2),
        currencyCode: BRL,
      };
    }
  }
  const updated = recompute(cart);
  carts.set(cartId, updated);
  return updated;
}

export function mockCartLinesRemove(
  cartId: string,
  lineIds: string[],
): ShopifyCart | null {
  const cart = carts.get(cartId);
  if (!cart) return null;
  cart.lines = cart.lines.filter((l) => !lineIds.includes(l.id));
  const updated = recompute(cart);
  carts.set(cartId, updated);
  return updated;
}
