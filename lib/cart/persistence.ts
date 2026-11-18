import { cookies } from "next/headers";
import { CART_COOKIE, CART_COOKIE_MAX_AGE, CART_QTY_COOKIE } from "./constants";

export async function readCartId(): Promise<string | null> {
  const store = await cookies();
  return store.get(CART_COOKIE)?.value ?? null;
}

export async function writeCartId(cartId: string): Promise<void> {
  const store = await cookies();
  store.set(CART_COOKIE, cartId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: CART_COOKIE_MAX_AGE,
    path: "/",
  });
}

// Só a quantidade de itens, sem dado sensível. Legível no navegador de propósito.
export async function writeCartQty(quantity: number): Promise<void> {
  const store = await cookies();
  if (quantity <= 0) {
    store.delete(CART_QTY_COOKIE);
    return;
  }
  store.set(CART_QTY_COOKIE, String(quantity), {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: CART_COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function clearCartId(): Promise<void> {
  const store = await cookies();
  store.delete(CART_COOKIE);
  store.delete(CART_QTY_COOKIE);
}
