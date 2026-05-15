import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { TICKET_TIERS, fmtBRL, fmtPct } from "@/lib/admin/mock";

export default function AdminPlantaoPage() {
  const totalSold = TICKET_TIERS.reduce((s, t) => s + t.sold, 0);
  const totalCap = TICKET_TIERS.reduce((s, t) => s + t.capacity, 0);
  const totalRev = TICKET_TIERS.reduce((s, t) => s + t.sold * t.price, 0);
  const ativos = TICKET_TIERS.filter((t) => t.status === "ativo").length;

  return (
    <>
      <PageHeader
        eyebrow="Plantão Festival 2026 · 25 de Abril"
        title="Ingressos"
        subtitle="Venda em tempo real por lote e categoria. 14 semanas até o festival."
        action={
          <button
            type="button"
            className="inline-flex items-center rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            + Abrir novo lote
          </button>
        }
      />

      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          label="Ingressos vendidos"
          value={totalSold.toLocaleString("pt-BR")}
          delta={{ value: "+412 esta semana", positive: true }}
          foot={`de ${totalCap.toLocaleString("pt-BR")}`}
        />
        <StatCard
          label="Capacidade ocupada"
          value={fmtPct(totalSold, totalCap)}
          foot="Geral"
        />
        <StatCard
          label="Receita acumulada"
          value={fmtBRL(totalRev)}
          delta={{ value: "+8,2%", positive: true }}
          foot="Bruto · sem taxas"
        />
        <StatCard
          label="Lotes ativos"
          value={String(ativos)}
          foot={`de ${TICKET_TIERS.length} totais`}
        />
      </section>

      <section
        className="mt-8 rounded-2xl border"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
        }}
      >
        <header className="border-b px-5 py-4 sm:px-6" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm">Vendas por lote</p>
          <p className="mt-1 text-xs text-muted">
            Atualizado em tempo real pela integração com Sympla.
          </p>
        </header>

        <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
          {TICKET_TIERS.map((t) => {
            const pct = (t.sold / t.capacity) * 100;
            return (
              <li
                key={t.id}
                className="grid gap-3 px-5 py-4 sm:grid-cols-[1.5fr_1fr_2fr_auto] sm:items-center sm:gap-6 sm:px-6"
                style={{ borderColor: "var(--border)" }}
              >
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                    {fmtBRL(t.price)} · {t.capacity.toLocaleString("pt-BR")} unidades
                  </p>
                </div>

                <p className="tabular-nums text-sm">
                  <span style={{ color: "var(--accent)" }}>
                    {t.sold.toLocaleString("pt-BR")}
                  </span>
                  <span className="text-muted">
                    {" / "}
                    {t.capacity.toLocaleString("pt-BR")}
                  </span>
                </p>

                <div
                  className="relative h-2 w-full overflow-hidden rounded-full"
                  style={{ background: "color-mix(in srgb, var(--fg) 10%, transparent)" }}
                  aria-hidden
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      background:
                        t.status === "esgotado"
                          ? "#ff5577"
                          : "linear-gradient(90deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 65%, transparent) 100%)",
                    }}
                  />
                </div>

                <TicketStatusPill status={t.status} />
              </li>
            );
          })}
        </ul>
      </section>

      {/* Bottom: per-day chart placeholder */}
      <section
        className="mt-6 grid gap-4 lg:grid-cols-2"
      >
        <article
          className="rounded-2xl border p-5 sm:p-6"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
            Distribuição por região · top 5
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { state: "Ceará · CE", pct: 64.2, count: 7480 },
              { state: "São Paulo · SP", pct: 12.8, count: 1494 },
              { state: "Pernambuco · PE", pct: 6.4, count: 746 },
              { state: "Rio de Janeiro · RJ", pct: 5.9, count: 689 },
              { state: "Demais estados", pct: 10.7, count: 1248 },
            ].map((r) => (
              <li
                key={r.state}
                className="flex items-center justify-between gap-3"
              >
                <span className="text-fg/85">{r.state}</span>
                <span className="flex items-center gap-3">
                  <span className="text-xs tabular-nums text-muted">{r.count.toLocaleString("pt-BR")}</span>
                  <span
                    className="inline-flex h-1 w-32 overflow-hidden rounded-full"
                    style={{ background: "color-mix(in srgb, var(--fg) 10%, transparent)" }}
                  >
                    <span
                      className="h-full"
                      style={{
                        width: `${r.pct}%`,
                        background: "var(--accent)",
                      }}
                    />
                  </span>
                  <span className="w-12 text-right tabular-nums text-sm">{r.pct}%</span>
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article
          className="rounded-2xl border p-5 sm:p-6"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
            Operação · próximas 24h
          </p>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="border-b pb-3" style={{ borderColor: "var(--border)" }}>
              <p className="font-medium">Reunião com Sympla · suporte ao público</p>
              <p className="mt-1 text-xs text-muted">Hoje 16:00 · revisar fila de chargeback</p>
            </li>
            <li className="border-b pb-3" style={{ borderColor: "var(--border)" }}>
              <p className="font-medium">Aprovação line-up final</p>
              <p className="mt-1 text-xs text-muted">Amanhã 10:00 · Clara + Matuê + booking</p>
            </li>
            <li>
              <p className="font-medium">Push notification — Lote 6 esgotando</p>
              <p className="mt-1 text-xs text-muted">Quinta 18:00 · alvo 12k inscritos newsletter</p>
            </li>
          </ul>
        </article>
      </section>
    </>
  );
}

function TicketStatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    ativo: { bg: "#37d18a22", color: "#37d18a", label: "Ativo" },
    esgotado: { bg: "#ff557722", color: "#ff5577", label: "Esgotado" },
    encerrado: { bg: "#88888822", color: "#888", label: "Encerrado" },
  };
  const cfg = map[status] ?? map.ativo;
  return (
    <span
      className="inline-flex shrink-0 items-center justify-self-end rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}
