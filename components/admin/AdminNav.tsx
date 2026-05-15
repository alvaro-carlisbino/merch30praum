"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "▣" },
  { href: "/admin/produtos", label: "Produtos · Loja", icon: "▤" },
  { href: "/admin/pedidos", label: "Pedidos", icon: "▥" },
  { href: "/admin/plantao", label: "Plantão · Ingressos", icon: "▦" },
  { href: "/admin/artistas", label: "Artistas · Roster", icon: "▧" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegação do admin"
      className="flex gap-2 overflow-x-auto px-4 pb-4 lg:flex-col lg:overflow-visible lg:px-3 lg:pb-0"
    >
      {NAV.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/admin/dashboard" &&
            pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            data-cursor={item.label}
            className="group flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors hover:bg-white/5 lg:shrink"
            style={{
              background: active
                ? "color-mix(in srgb, var(--accent) 14%, transparent)"
                : "transparent",
              color: active ? "var(--accent)" : "var(--fg)",
              opacity: active ? 1 : 0.78,
            }}
          >
            <span aria-hidden className="text-base leading-none">
              {item.icon}
            </span>
            <span className="whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
