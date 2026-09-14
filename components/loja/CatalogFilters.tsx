import Link from "next/link";
import { CATEGORIES } from "@/lib/shop/categories";
import {
  ARTIST_FILTERS,
  buildCatalogHref,
  hasActiveFilters,
  type CatalogFilters as Filters,
} from "@/lib/shop/catalog";

interface Props {
  filters: Filters;
  sizes: string[];
  total: number;
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className="inline-flex shrink-0 items-center rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] transition-colors"
      style={{
        borderColor: active ? "var(--accent)" : "var(--border)",
        background: active ? "var(--accent)" : "transparent",
        color: active ? "var(--bg)" : "var(--fg)",
      }}
    >
      {children}
    </Link>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted">{title}</p>
      <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
        {children}
      </div>
    </div>
  );
}

export function CatalogFilters({ filters, sizes, total }: Props) {
  const active = hasActiveFilters(filters);
  return (
    <aside aria-label="Filtros do catálogo" className="flex flex-col gap-6">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm">
          {total} {total === 1 ? "peça" : "peças"}
        </p>
        {active && (
          <Link
            href={buildCatalogHref({ ordem: filters.ordem })}
            scroll={false}
            className="text-[11px] uppercase tracking-[0.2em] text-muted underline-offset-4 hover:underline"
          >
            Limpar
          </Link>
        )}
      </div>
      <Group title="Artista">
        {ARTIST_FILTERS.map((a) => {
          const isActive = filters.artista === a.slug;
          return (
            <Chip
              key={a.slug}
              active={isActive}
              href={buildCatalogHref({ ...filters, artista: isActive ? undefined : a.slug })}
            >
              {a.label}
            </Chip>
          );
        })}
      </Group>
      <Group title="Categoria">
        {CATEGORIES.map((c) => {
          const isActive = filters.categoria === c.slug;
          return (
            <Chip
              key={c.slug}
              active={isActive}
              href={buildCatalogHref({ ...filters, categoria: isActive ? undefined : c.slug })}
            >
              {c.label}
            </Chip>
          );
        })}
      </Group>
      <Group title="Tamanho">
        {sizes.map((s) => {
          const isActive = filters.tamanho === s;
          return (
            <Chip
              key={s}
              active={isActive}
              href={buildCatalogHref({ ...filters, tamanho: isActive ? undefined : s })}
            >
              {s}
            </Chip>
          );
        })}
      </Group>
      <Group title="Estoque">
        <Chip
          active={Boolean(filters.disponivel)}
          href={buildCatalogHref({ ...filters, disponivel: !filters.disponivel })}
        >
          Só em estoque
        </Chip>
      </Group>
    </aside>
  );
}
