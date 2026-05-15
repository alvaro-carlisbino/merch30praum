import Image from "next/image";
import { PageHeader } from "@/components/admin/PageHeader";
import { ARTISTS } from "@/lib/artists/registry";
import { fmtBRL } from "@/lib/admin/mock";

const CARD_IMAGES: Record<string, string> = {
  matue: "/figma-home/card-matue.png",
  wiu: "/figma-home/card-wiu.png",
  teto: "/figma-home/card-teto.png",
  brandao: "/figma-home/card-brandao.png",
};

const ARTIST_METRICS: Record<string, { listeners: string; albumRevenue: number; tourDates: number; tickets: number }> = {
  matue: { listeners: "12.4M", albumRevenue: 142000, tourDates: 4, tickets: 6240 },
  wiu: { listeners: "4.8M", albumRevenue: 78000, tourDates: 3, tickets: 4120 },
  teto: { listeners: "6.2M", albumRevenue: 92000, tourDates: 3, tickets: 4480 },
  brandao: { listeners: "3.1M", albumRevenue: 56000, tourDates: 2, tickets: 2840 },
};

export default function AdminArtistasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Roster oficial · 30praum"
        title="Artistas"
        subtitle="Métricas consolidadas de cada artista — streams, vendas de álbum, tour dates ativas e ingressos Plantão atribuídos."
      />

      <ul className="grid gap-4 sm:gap-5 lg:grid-cols-2">
        {Object.values(ARTISTS).map((a) => {
          const m = ARTIST_METRICS[a.slug] ?? { listeners: "—", albumRevenue: 0, tourDates: 0, tickets: 0 };
          return (
            <li key={a.slug}>
              <article
                className="grid gap-5 overflow-hidden rounded-2xl border sm:grid-cols-[160px_1fr]"
                style={{
                  borderColor: "var(--border)",
                  background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
                }}
              >
                <div
                  className="relative w-full sm:h-full"
                  style={{ aspectRatio: "3 / 4" }}
                >
                  <Image
                    src={CARD_IMAGES[a.slug] ?? "/figma-home/card-matue.png"}
                    alt={a.displayName}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-4 px-5 pb-5 pt-2 sm:py-5 sm:pl-0 sm:pr-6">
                  <header>
                    <p
                      className="text-[10px] uppercase tracking-[0.3em]"
                      style={{ color: a.panelAccent }}
                    >
                      {a.universeName}
                    </p>
                    <h2
                      className="mt-2 font-display uppercase leading-tight"
                      style={{
                        fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {a.displayName}
                    </h2>
                    <p className="mt-1 text-xs text-muted">
                      {a.realName} · {a.origin} · entrou em {a.joinedYear}
                    </p>
                  </header>

                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <Metric label="Ouvintes mensais" value={m.listeners} />
                    <Metric label="Receita álbuns" value={fmtBRL(m.albumRevenue)} />
                    <Metric label="Shows ativos" value={String(m.tourDates)} />
                    <Metric label="Ingressos Plantão" value={m.tickets.toLocaleString("pt-BR")} />
                  </dl>

                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
                      style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                    >
                      Editar perfil
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-fg/75 transition-colors hover:bg-white hover:text-black"
                      style={{ borderColor: "var(--border)" }}
                    >
                      Ver agenda
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-fg/75 transition-colors hover:bg-white hover:text-black"
                      style={{ borderColor: "var(--border)" }}
                    >
                      Contratos
                    </button>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[9px] uppercase tracking-[0.28em] text-muted">
        {label}
      </dt>
      <dd className="mt-1 font-display tabular-nums" style={{ fontSize: "1.05rem", letterSpacing: "-0.005em" }}>
        {value}
      </dd>
    </div>
  );
}
