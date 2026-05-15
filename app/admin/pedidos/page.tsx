import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { StatusPill } from "@/components/admin/StatusPill";
import { ADMIN_ORDERS, TOP_CUSTOMERS, fmtBRL } from "@/lib/admin/mock";

const FILTERS = ["Todos", "Pago", "Enviado", "Entregue", "Pendente", "Cancelado"];

export default function AdminPedidosPage() {
  const totalRev = ADMIN_ORDERS.reduce((s, o) => s + o.total, 0);
  const pagos = ADMIN_ORDERS.filter((o) => o.status === "pago").length;
  const enviados = ADMIN_ORDERS.filter((o) => o.status === "enviado").length;
  const ltv = TOP_CUSTOMERS.reduce((s, c) => s + c.ltv, 0) / TOP_CUSTOMERS.length;

  return (
    <>
      <PageHeader
        eyebrow="Loja oficial · últimos 7 dias"
        title="Pedidos"
        subtitle="Histórico completo de pedidos, status de entrega e LTV por cliente."
      />

      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          label="Total 7d"
          value={fmtBRL(totalRev)}
          delta={{ value: "+18,4%", positive: true }}
          foot="Loja oficial"
        />
        <StatCard
          label="Pedidos pagos"
          value={String(pagos)}
          foot="Aguardando envio"
        />
        <StatCard
          label="Enviados"
          value={String(enviados)}
          foot="Em trânsito"
        />
        <StatCard
          label="LTV médio"
          value={fmtBRL(ltv)}
          delta={{ value: "+12% vs. mês", positive: true }}
          foot="Top 5 clientes"
        />
      </section>

      <section
        className="mt-8 rounded-2xl border"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
        }}
      >
        <header className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 sm:px-6" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm">Pedidos recentes</p>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f, i) => (
              <button
                key={f}
                type="button"
                className="inline-flex items-center rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
                style={{
                  borderColor: i === 0 ? "var(--accent)" : "var(--border)",
                  color: i === 0 ? "var(--accent)" : "var(--fg)",
                  opacity: i === 0 ? 1 : 0.75,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </header>
        {/* Mobile: card list */}
        <ul className="space-y-3 px-4 py-4 md:hidden">
          {ADMIN_ORDERS.map((o) => (
            <li
              key={o.id}
              className="flex flex-col gap-2 rounded-xl border p-3.5"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] tabular-nums text-muted">{o.id}</p>
                  <p className="mt-1 truncate text-sm font-medium">{o.customer}</p>
                  <p className="mt-0.5 truncate text-[10px] tabular-nums text-muted">{o.email}</p>
                </div>
                <StatusPill kind="order" status={o.status} />
              </div>
              <p className="truncate text-xs text-fg/75">{o.product} · {o.qty}x</p>
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="uppercase tracking-[0.18em] text-muted">
                  {o.payment === "pix" && "PIX"}
                  {o.payment === "credito" && "Crédito"}
                  {o.payment === "boleto" && "Boleto"}
                </span>
                <span className="tabular-nums" style={{ color: "var(--accent)" }}>
                  {fmtBRL(o.total)}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Desktop: table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr
                className="text-left text-[9px] uppercase tracking-[0.28em] text-muted"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <th className="px-5 py-3 font-normal sm:px-6">Pedido</th>
                <th className="py-3 pr-4 font-normal">Cliente</th>
                <th className="py-3 pr-4 font-normal">Produto</th>
                <th className="py-3 pr-4 font-normal">Qtd</th>
                <th className="py-3 pr-4 font-normal">Pagamento</th>
                <th className="py-3 pr-4 font-normal">Total</th>
                <th className="py-3 pr-6 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_ORDERS.map((o) => (
                <tr
                  key={o.id}
                  className="text-fg/85 hover:bg-white/[0.03]"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td className="px-5 py-3.5 font-mono text-xs tabular-nums sm:px-6">
                    {o.id}
                  </td>
                  <td className="py-3.5 pr-4">
                    <p className="font-medium">{o.customer}</p>
                    <p className="text-[10px] tabular-nums text-muted">{o.email}</p>
                  </td>
                  <td className="py-3.5 pr-4 text-fg/75">{o.product}</td>
                  <td className="py-3.5 pr-4 tabular-nums">{o.qty}</td>
                  <td className="py-3.5 pr-4 text-xs uppercase tracking-[0.18em] text-muted">
                    {o.payment === "pix" && "PIX"}
                    {o.payment === "credito" && "Crédito"}
                    {o.payment === "boleto" && "Boleto"}
                  </td>
                  <td className="py-3.5 pr-4 tabular-nums">{fmtBRL(o.total)}</td>
                  <td className="py-3.5 pr-6">
                    <StatusPill kind="order" status={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        className="mt-6 rounded-2xl border p-5 sm:p-6"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
          Top 5 clientes · LTV
        </p>
        <ul className="mt-5 space-y-3">
          {TOP_CUSTOMERS.map((c, i) => (
            <li
              key={c.id}
              className="flex items-center justify-between gap-3 border-b pb-3 last:border-b-0 last:pb-0"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="font-display text-sm tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{c.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                    {c.city} · {c.orders} pedidos
                  </p>
                </div>
              </div>
              <span className="shrink-0 text-sm tabular-nums" style={{ color: "var(--accent)" }}>
                {fmtBRL(c.ltv)}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

