export interface Money {
  amount: string;
  currencyCode: string;
}

export function formatMoney(money: Money | { amount: number; currencyCode: string }): string {
  const amount =
    typeof money.amount === "string" ? parseFloat(money.amount) : money.amount;
  const currency = money.currencyCode || "BRL";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
