"use server";
import { revalidateTag } from "next/cache";
import {
  cartCreate,
  cartGet,
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate,
} from "@/lib/shopify/client";
import { clearCartId, readCartId, writeCartId, writeCartQty } from "./persistence";
import type { DomainCart } from "@/lib/shopify/types";
const CART_TAG = "cart";

// Mantém o cookie de quantidade igual ao carrinho real. Só funciona dentro de
// Server Functions; quando chamado durante a renderização (página /cart), o
// Next não deixa gravar cookie e o erro é ignorado.
async function syncQty(cart: DomainCart | null): Promise<void> {
  try {
    await writeCartQty(cart?.totalQuantity ?? 0);
  } catch {}
}

export async function getCart(): Promise<DomainCart | null> {
  const id = await readCartId();
  if (!id) return null;
  const cart = await cartGet(id);
  if (!cart) {
    try {
      await clearCartId();
    } catch {}
    return null;
  }
  await syncQty(cart);
  return cart;
}
export async function addToCart(
  merchandiseId: string,
  quantity: number = 1,
): Promise<DomainCart> {
  const existingId = await readCartId();
  let cart: DomainCart | null = null;
  if (existingId) {
    cart = await cartGet(existingId);
    if (!cart) await clearCartId();
  }
  if (!cart) {
    cart = await cartCreate([{ merchandiseId, quantity }]);
    await writeCartId(cart.id);
  } else {
    cart = await cartLinesAdd(cart.id, [{ merchandiseId, quantity }]);
    if (!cart) throw new Error("cart: add line failed");
  }
  await syncQty(cart);
  revalidateTag(CART_TAG, "default");
  return cart;
}
export async function updateCartLine(
  lineId: string,
  quantity: number,
): Promise<DomainCart | null> {
  const id = await readCartId();
  if (!id) return null;
  const cart = await cartLinesUpdate(id, [{ id: lineId, quantity }]);
  await syncQty(cart);
  revalidateTag(CART_TAG, "default");
  return cart;
}
export async function removeCartLine(lineId: string): Promise<DomainCart | null> {
  const id = await readCartId();
  if (!id) return null;
  const cart = await cartLinesRemove(id, [lineId]);
  await syncQty(cart);
  revalidateTag(CART_TAG, "default");
  return cart;
}
