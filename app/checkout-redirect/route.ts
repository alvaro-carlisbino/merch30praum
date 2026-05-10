import { NextResponse, type NextRequest } from "next/server";
import { cartGet, isShopifyLive } from "@/lib/shopify/client";
import { readCartId } from "@/lib/cart/persistence";

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
    return new NextResponse(
      `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8" /><title>Mock checkout · 30praum</title>
       <style>
         body { background: #0a0a0a; color: #f5f5f5; font-family: ui-monospace, monospace; padding: 4rem 2rem; line-height: 1.6; }
         a { color: #ffffff; text-decoration: underline; }
         code { background: #1a1a1a; padding: 0.1rem 0.4rem; }
       </style></head>
       <body>
         <h1>Checkout (modo mock)</h1>
         <p>Quando a Storefront token estiver configurada, esta rota faz <code>302 → cart.checkoutUrl</code> da Shopify.</p>
         <p>Cart simulado: <code>${cart.id}</code></p>
         <p>Total: <strong>${cart.cost.totalAmount.amount} ${cart.cost.totalAmount.currencyCode}</strong></p>
         <p>Itens: ${cart.totalQuantity}</p>
         <p><a href="/cart">← voltar ao carrinho</a></p>
       </body></html>`,
      { status: 200, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }

  return NextResponse.redirect(cart.checkoutUrl, 302);
}
