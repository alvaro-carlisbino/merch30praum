import { StatCard } from "@/components/admin/StatCard";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusPill } from "@/components/admin/StatusPill";
import {
  ADMIN_ORDERS,
  REVENUE_BY_DAY,
  TICKET_TIERS,
  TOP_PRODUCTS_30D,
  fmtBRL,
} from "@/lib/admin/mock";
import { fmtTodayLong, fmtDayMonth } from "@/lib/admin/format";

export default function AdminDashboardPage() {
  const maxRevenue = Math.max(...REVENUE_BY_DAY.map((d) => d.value));
  const totalWeek = REVENUE_BY_DAY.reduce((s, d) => s + d.value, 0);
  const totalTickets = TICKET_TIERS.reduce((s, t) => s + t.sold, 0);
  const totalTicketCap = TICKET_TIERS.reduce((s, t) => s + t.capacity, 0);

  return (
    <>
      <PageHeader
        eyebrow={fmtTodayLong()}
        title="Bom dia, Clara."
        subtitle="Resumo dos últimos 7 dias da loja e ingressos do Plantão Festival."
      />

      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          label="Receita 7d"
          value={fmtBRL(totalWeek)}
          delta={{ value: "+18,4% vs. anterior", positive: true }}
          foot="Loja + ingressos"
        />
        <StatCard
          label="Pedidos 7d"
          value="312"
          delta={{ value: "+22 pedidos", positive: true }}
          foot="Loja oficial"
        />
        <StatCard
          label="Ingressos Plantão"
          value={`${totalTickets.toLocaleString("pt-BR")} / ${totalTicketCap.toLocaleString("pt-BR")}`}
          delta={{ value: "1.245 lote 6 ativo", positive: true }}
          foot="14ª semana"
        />
        <StatCard
          label="Conversão site"
          value="3,8%"
          delta={{ value: "+0,4 p.p.", positive: true }}
          foot="GA4 · 30 dias"
        />
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
        {/* Revenue chart */}
        <article
          className="rounded-2xl border p-5 sm:p-6"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
          }}
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
                Receita por dia · 7d
              </p>
              <p
                className="mt-2 font-display tabular-nums"
                style={{
                  fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                {fmtBRL(totalWeek)}
              </p>
            </div>
            <span className="text-xs uppercase tracking-[0.28em] text-muted">
              Loja oficial
            </span>
          </div>

          <ul className="mt-8 flex h-44 items-end gap-2 sm:gap-3">
            {REVENUE_BY_DAY.map((d) => {
              const h = (d.value / maxRevenue) * 100;
              return (
                <li
                  key={d.day}
                  className="flex flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="text-[10px] tabular-nums text-muted">
                    {(d.value / 1000).toFixed(1)}k
                  </span>
                  <div
                    className="w-full rounded-t-md transition-all"
                    style={{
                      height: `${h}%`,
                      background:
                        "linear-gradient(180deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 45%, transparent) 100%)",
                      minHeight: "8px",
                    }}
                  />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
                    {d.day}
                  </span>
                </li>
              );
            })}
          </ul>
        </article>

        {/* Top products */}
        <article
          className="rounded-2xl border p-5 sm:p-6"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
            Top produtos · 30d
          </p>
          <ul className="mt-5 space-y-3">
            {TOP_PRODUCTS_30D.map((p, i) => (
              <li
                key={p.title}
                className="flex items-center justify-between gap-3 border-b pb-3 last:border-b-0 last:pb-0"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="font-display text-sm tabular-nums text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{p.title}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-muted tabular-nums">
                      {p.qty} unidades
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-sm tabular-nums" style={{ color: "var(--accent)" }}>
                  {fmtBRL(p.revenue)}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* Recent orders */}
      <section
        className="mt-6 rounded-2xl border"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
        }}
      >
        <header className="flex flex-wrap items-end justify-between gap-3 px-5 pb-3 pt-5 sm:px-6 sm:pt-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
            Pedidos recentes
          </p>
          <a
            href="/admin/pedidos"
            className="text-xs uppercase tracking-[0.22em] transition-colors hover:text-fg"
            style={{ color: "var(--accent)" }}
          >
            Ver todos →
          </a>
        </header>
        {/* Mobile: card list */}
        <ul className="space-y-3 px-5 pb-5 md:hidden">
          {ADMIN_ORDERS.slice(0, 5).map((o) => (
            <li
              key={o.id}
              className="flex flex-col gap-2 rounded-xl border p-3.5"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] tabular-nums text-muted">{o.id}</p>
                  <p className="mt-1 truncate text-sm font-medium">{o.customer}</p>
                  <p className="mt-0.5 truncate text-xs text-fg/65">{o.product}</p>
                </div>
                <StatusPill kind="order" status={o.status} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="tabular-nums" style={{ color: "var(--accent)" }}>
                  {fmtBRL(o.total)}
                </span>
                <span className="uppercase tracking-[0.22em] text-muted">
                  {fmtDayMonth(o.date)}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Desktop: table */}
        <div className="hidden overflow-x-auto px-5 pb-5 sm:px-6 sm:pb-6 md:block">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr
                className="text-left text-[9px] uppercase tracking-[0.28em] text-muted"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <th className="py-3 pr-3 font-normal">Pedido</th>
                <th className="py-3 pr-3 font-normal">Cliente</th>
                <th className="py-3 pr-3 font-normal">Produto</th>
                <th className="py-3 pr-3 font-normal">Total</th>
                <th className="py-3 pr-3 font-normal">Status</th>
                <th className="py-3 font-normal">Data</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_ORDERS.slice(0, 5).map((o) => (
                <tr
                  key={o.id}
                  className="text-fg/85"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td className="py-3 pr-3 font-mono text-xs tabular-nums">
                    {o.id}
                  </td>
                  <td className="py-3 pr-3">{o.customer}</td>
                  <td className="py-3 pr-3 text-fg/65">{o.product}</td>
                  <td className="py-3 pr-3 tabular-nums">{fmtBRL(o.total)}</td>
                  <td className="py-3 pr-3">
                    <StatusPill kind="order" status={o.status} />
                  </td>
                  <td className="py-3 text-xs uppercase tracking-[0.22em] text-muted">
                    {new Date(o.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

