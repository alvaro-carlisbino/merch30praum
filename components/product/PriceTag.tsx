import { formatMoney, type Money } from "@/lib/utils/format-money";
import { cn } from "@/lib/utils/cn";

interface PriceTagProps {
  min: Money;
  max?: Money;
  className?: string;
}

export function PriceTag({ min, max, className }: PriceTagProps) {
  const showRange = max && max.amount !== min.amount;
  return (
    <span className={cn("tabular-nums", className)}>
      {showRange ? (
        <>
          {formatMoney(min)} <span className="opacity-60">—</span> {formatMoney(max)}
        </>
      ) : (
        formatMoney(min)
      )}
    </span>
  );
}
