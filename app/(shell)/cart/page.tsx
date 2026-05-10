import Link from "next/link";
import Image from "next/image";
import { getCart } from "@/lib/cart/actions";
import { formatMoney } from "@/lib/utils/format-money";
import { CartLineControls } from "@/components/shell/CartLineControls";
import { CartFreeShipping } from "@/components/shell/CartFreeShipping";
import { pixPrice, installmentValue, INSTALLMENTS_MAX } from "@/lib/shop/shipping";

export default async function CartPage() {
  const cart = await getCart();

  if (!cart || cart.lines.length === 0) {
    return (
      <section className="mx-auto max-w-screen-md px-4 sm:px-8 py-32 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted">Carrinho</p>
        <h1 className="font-display text-4xl sm:text-6xl mt-4 leading-tight">
          Vazio por enquanto
        </h1>
        <p className="mt-4 text-muted">
          Escolha um universo e bota algo aqui dentro.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["matue", "wiu", "teto", "brandao"].map((s) => (
            <Link
              key={s}
              href={`/${s}`}
              className="px-4 py-3 text-xs uppercase tracking-widest border border-border hover:border-accent"
            >
              {s}
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-12">
      <header className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted">Carrinho</p>
        <h1 className="font-display text-4xl sm:text-5xl mt-2">
          {cart.totalQuantity} {cart.totalQuantity === 1 ? "peça" : "peças"}
        </h1>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-border">
          {cart.lines.map((line) => (
            <li key={line.id} className="flex gap-6 py-6">
              <div className="relative h-40 w-32 shrink-0 overflow-hidden border border-border">
                {line.merchandise.image && (
                  <Image
                    src={line.merchandise.image.url}
                    alt={line.merchandise.image.altText ?? ""}
                    fill
                    sizes="128px"
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>
              <div className="flex-1 flex flex-col">
                <Link
                  href={`/${resolveArtist(line.merchandise.product.tags)}/${line.merchandise.product.handle}`}
                  className="font-display text-lg hover:text-accent"
                >
                  {line.merchandise.product.title}
                </Link>
                <p className="text-xs text-muted mt-1">{line.merchandise.title}</p>
                <CartLineControls lineId={line.id} initialQuantity={line.quantity} />
              </div>
              <div className="text-sm tabular-nums">
                {formatMoney(line.cost.totalAmount)}
              </div>
            </li>
          ))}
        </ul>

        <aside className="lg:sticky lg:top-20 h-fit space-y-6 p-6 border border-border">
          <CartFreeShipping
            subtotal={parseFloat(cart.cost.subtotalAmount.amount)}
          />

          <div
            className="flex items-baseline justify-between pt-4"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <span className="text-xs uppercase tracking-widest text-muted">Subtotal</span>
            <span className="text-2xl font-display tabular-nums">
              {formatMoney(cart.cost.subtotalAmount)}
            </span>
          </div>

          <div
            className="flex items-baseline justify-between gap-3 px-3 py-2.5"
            style={{
              background: "color-mix(in srgb, var(--accent) 14%, transparent)",
              border: "1px solid color-mix(in srgb, var(--accent) 35%, transparent)",
            }}
          >
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "var(--accent)" }}
            >
              Pix · 5% off
            </span>
            <span className="font-display text-lg tabular-nums">
              {formatMoney({
                amount: pixPrice(parseFloat(cart.cost.subtotalAmount.amount)).toFixed(2),
                currencyCode: cart.cost.subtotalAmount.currencyCode,
              })}
            </span>
          </div>

          <p className="text-[10px] uppercase tracking-widest text-muted">
            ou {INSTALLMENTS_MAX}× de{" "}
            <span className="text-fg tabular-nums">
              {formatMoney({
                amount: installmentValue(parseFloat(cart.cost.subtotalAmount.amount)).toFixed(2),
                currencyCode: cart.cost.subtotalAmount.currencyCode,
              })}
            </span>{" "}
            sem juros
          </p>

          <a
            href={`/checkout-redirect?cartId=${encodeURIComponent(cart.id)}`}
            className="block text-center w-full py-4 text-xs uppercase tracking-[0.3em] font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Finalizar compra
          </a>
        </aside>
      </div>
    </section>
  );
}

function resolveArtist(tags: string[]): string {
  for (const tag of tags) {
    const lower = tag.toLowerCase();
    if (lower.startsWith("artist:")) return lower.slice("artist:".length);
  }
  return "";
}
