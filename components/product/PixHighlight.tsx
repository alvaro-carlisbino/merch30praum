import { pixPrice, installmentValue, INSTALLMENTS_MAX, PIX_DISCOUNT_PCT } from "@/lib/shop/shipping";
import { formatMoney } from "@/lib/utils/format-money";
import type { Money } from "@/lib/utils/format-money";

interface PixHighlightProps {
  price: Money;
}

export function PixHighlight({ price }: PixHighlightProps) {
  const amount = parseFloat(price.amount);
  const pix = pixPrice(amount);
  const installments = installmentValue(amount);
  const economia = amount - pix;

  return (
    <div className="grid gap-2">
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
          Pix · {Math.round(PIX_DISCOUNT_PCT * 100)}% off
        </span>
        <div className="text-right">
          <span className="block font-display text-lg tabular-nums">
            {formatMoney({ amount: pix.toFixed(2), currencyCode: price.currencyCode })}
          </span>
          <span className="block text-[10px] uppercase tracking-[0.25em] text-muted">
            economia {formatMoney({ amount: economia.toFixed(2), currencyCode: price.currencyCode })}
          </span>
        </div>
      </div>
      <p
        className="text-[10px] uppercase tracking-[0.25em] text-muted px-1"
      >
        ou {INSTALLMENTS_MAX}× de{" "}
        <span className="text-fg tabular-nums">
          {formatMoney({ amount: installments.toFixed(2), currencyCode: price.currencyCode })}
        </span>{" "}
        sem juros no cartão
      </p>
    </div>
  );
}
