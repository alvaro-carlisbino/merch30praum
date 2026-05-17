"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", labelShort: "Dashboard", icon: "▣" },
  { href: "/admin/produtos", label: "Produtos · Loja", labelShort: "Produtos", icon: "▤" },
  { href: "/admin/pedidos", label: "Pedidos", labelShort: "Pedidos", icon: "▥" },
  { href: "/admin/plantao", label: "Plantão · Ingressos", labelShort: "Plantão", icon: "▦" },
  { href: "/admin/artistas", label: "Artistas · Roster", labelShort: "Artistas", icon: "▧" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegação do admin"
      className="-mx-1 flex gap-1 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:flex-col lg:gap-2 lg:overflow-visible lg:px-3 lg:pb-0"
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
            className="group flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] transition-colors hover:bg-white/5 lg:shrink lg:gap-3 lg:px-4 lg:py-3 lg:text-sm"
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
            <span className="whitespace-nowrap lg:hidden">{item.labelShort}</span>
            <span className="hidden whitespace-nowrap lg:inline">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
