import Image from "next/image";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { ADMIN_PRODUCTS, fmtBRL } from "@/lib/admin/mock";

export default function AdminProdutosPage() {
  const total = ADMIN_PRODUCTS.length;
  const ativos = ADMIN_PRODUCTS.filter((p) => p.status === "ativo").length;
  const rascunhos = ADMIN_PRODUCTS.filter((p) => p.status === "rascunho").length;
  const esgotados = ADMIN_PRODUCTS.filter((p) => p.status === "esgotado").length;

  return (
    <>
      <PageHeader
        eyebrow="Loja oficial · 30praum.store"
        title="Produtos"
        subtitle="Catálogo conectado ao Shopify. Sync em tempo real com 30praum.store."
        action={
          <button
            type="button"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            + Novo produto
          </button>
        }
      />

      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Total" value={String(total)} foot="No catálogo" />
        <StatCard label="Ativos" value={String(ativos)} foot="Vendendo" />
        <StatCard label="Rascunhos" value={String(rascunhos)} foot="Pré-drop" />
        <StatCard label="Esgotados" value={String(esgotados)} foot="Sem estoque" />
      </section>

      <section
        className="mt-8 rounded-2xl border"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
        }}
      >
        <header className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 sm:px-6" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm">Todos os produtos</p>
          <div className="flex flex-wrap gap-2">
            {(["Todos", "Drops", "Oversized", "Five Panel", "Promoção"] as const).map((f, i) => (
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

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr
                className="text-left text-[9px] uppercase tracking-[0.28em] text-muted"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <th className="px-5 py-3 font-normal sm:px-6">Produto</th>
                <th className="py-3 pr-4 font-normal">Artista</th>
                <th className="py-3 pr-4 font-normal">Coleção</th>
                <th className="py-3 pr-4 font-normal">Preço</th>
                <th className="py-3 pr-4 font-normal">Estoque</th>
                <th className="py-3 pr-6 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_PRODUCTS.map((p) => (
                <tr
                  key={p.id}
                  className="text-fg/85 hover:bg-white/[0.03]"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg"
                        style={{
                          background:
                            "color-mix(in srgb, var(--fg) 6%, var(--bg))",
                        }}
                      >
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{p.title}</p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                          SKU 30P-{p.id.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-fg/75">{p.artist}</td>
                  <td className="py-4 pr-4 text-fg/75">{p.collection}</td>
                  <td className="py-4 pr-4 tabular-nums">{fmtBRL(p.price)}</td>
                  <td className="py-4 pr-4 tabular-nums">
                    <span
                      style={{
                        color:
                          p.stock === 0
                            ? "#ff5577"
                            : p.stock < 20
                              ? "#f5a523"
                              : "var(--fg)",
                      }}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="py-4 pr-6">
                    <ProductStatusPill status={p.status} />
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

function ProductStatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    ativo: { bg: "#37d18a22", color: "#37d18a", label: "Ativo" },
    rascunho: { bg: "#f5a52322", color: "#f5a523", label: "Rascunho" },
    esgotado: { bg: "#ff557722", color: "#ff5577", label: "Esgotado" },
  };
  const cfg = map[status] ?? map.ativo;
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}
