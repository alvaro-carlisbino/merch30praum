"use client";

import { useState } from "react";

const SECTIONS = [
  "Ordenar",
  "Categorias",
  "Tamanhos",
  "Cor",
  "Gênero",
  "Preço",
  "Artista",
  "Edição",
];

export function CatalogSidebar() {
  const [open, setOpen] = useState<Set<string>>(new Set());

  function toggle(section: string) {
    setOpen((s) => {
      const next = new Set(s);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  }

  return (
    <aside
      className="rounded-2xl border p-4 sm:p-5"
      style={{
        background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
        borderColor: "var(--border)",
      }}
      aria-label="Filtros do catálogo"
    >
      <p className="mb-4 text-sm">Filtros</p>
      <ul className="space-y-1">
        {SECTIONS.map((section) => {
          const isOpen = open.has(section);
          return (
            <li key={section}>
              <button
                type="button"
                onClick={() => toggle(section)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/5"
              >
                <span>{section}</span>
                <span
                  aria-hidden
                  className="text-xs text-muted transition-transform"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  ▾
                </span>
              </button>
              {isOpen && (
                <div className="px-3 py-2 text-xs text-muted">
                  {/* opções viriam dinâmicas; placeholder */}
                  Em breve
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
