import { NextResponse, type NextRequest } from "next/server";
import { cartGet, isShopifyLive } from "@/lib/shopify/client";
import { readCartId } from "@/lib/cart/persistence";
import { officialCartUrl } from "@/lib/shop/official-store";
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const requestedId = url.searchParams.get("cartId");
  const cookieId = await readCartId();
  const cartId = requestedId || cookieId;
  if (!cartId) {
    return NextResponse.redirect(new URL("/cart", req.url), 302);
  }
  const cart = await cartGet(cartId);
  if (!cart) {
    return NextResponse.redirect(new URL("/cart", req.url), 302);
  }
  if (!isShopifyLive) {
    const url = officialCartUrl(
      cart.lines.map((line) => ({
        handle: line.merchandise.product.handle,
        size: line.merchandise.title,
        quantity: line.quantity,
      })),
    );
    return NextResponse.redirect(url ?? new URL("/cart", req.url), 302);
  }
  return NextResponse.redirect(cart.checkoutUrl, 302);
}
