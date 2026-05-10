"use server";

import { revalidateTag } from "next/cache";
import {
  cartCreate,
  cartGet,
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate,
} from "@/lib/shopify/client";
import { clearCartId, readCartId, writeCartId } from "./persistence";
import type { DomainCart } from "@/lib/shopify/types";

const CART_TAG = "cart";

export async function getCart(): Promise<DomainCart | null> {
  const id = await readCartId();
  if (!id) return null;
  const cart = await cartGet(id);
  if (!cart) {
    try {
      await clearCartId();
    } catch {
      // Best-effort cleanup. Server Components can't modify cookies —
      // the stale id will be replaced on the next mutation (addToCart).
    }
    return null;
  }
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
    if (!cart) throw new Error("Failed to add line to cart");
  }

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
  revalidateTag(CART_TAG, "default");
  return cart;
}

export async function removeCartLine(lineId: string): Promise<DomainCart | null> {
  const id = await readCartId();
  if (!id) return null;
  const cart = await cartLinesRemove(id, [lineId]);
  revalidateTag(CART_TAG, "default");
  return cart;
}
