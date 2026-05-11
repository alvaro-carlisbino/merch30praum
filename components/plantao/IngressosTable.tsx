import type { PlantaoSector } from "@/lib/plantao/registry";

const STATUS_LABEL: Record<PlantaoSector["status"], string> = {
  available: "Disponível",
  soldout: "Esgotado",
  upcoming: "Em breve",
};

function formatPrice(s: PlantaoSector) {
  if (s.priceFrom && s.priceTo && s.priceFrom !== s.priceTo) {
    return `R$ ${s.priceFrom} — R$ ${s.priceTo}`;
  }
  if (s.priceFrom) return `R$ ${s.priceFrom}`;
  return "a confirmar";
}

export function IngressosTable({ sectors, ticketsUrl }: { sectors: PlantaoSector[]; ticketsUrl: string }) {
  return (
    <div className="grid gap-3">
      {sectors.map((s) => {
        const isSold = s.status === "soldout";
        const isUpcoming = s.status === "upcoming";
        return (
          <div
            key={s.name}
            className="grid grid-cols-1 gap-4 border p-5 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center sm:gap-6"
            style={{
              borderColor: "var(--border)",
              background: isSold
                ? "color-mix(in srgb, var(--bg) 96%, transparent)"
                : "color-mix(in srgb, var(--fg) 3%, transparent)",
              opacity: isSold ? 0.55 : 1,
            }}
          >
            <div>
              <p
                className="font-display text-xl"
                style={{ color: isSold ? "var(--muted)" : "var(--fg)" }}
              >
                {s.name}
              </p>
              {s.perks && (
                <p className="mt-1 text-xs opacity-65">{s.perks}</p>
              )}
            </div>

            <div className="text-sm tabular-nums font-display">{formatPrice(s)}</div>

            <div
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{
                color: isSold ? "var(--muted)" : isUpcoming ? "var(--accent-2)" : "var(--accent)",
              }}
            >
              {STATUS_LABEL[s.status]}
            </div>

            <div>
              {isSold || isUpcoming ? (
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-50">
                  {isSold ? "—" : "Cadastre-se"}
                </span>
              ) : (
                <a
                  href={ticketsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="Comprar"
                  className="inline-flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-[0.3em] transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--accent)", color: "var(--bg)" }}
                >
                  Comprar →
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
