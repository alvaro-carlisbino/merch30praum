"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { CartButton } from "./CartButton";

interface BrandHeaderProps {
  currentArtist?: string;
  cartCount: number;
}

const LEFT_NAV = [
  { href: "/#roster", label: "Roster" },
  { href: "/shows", label: "Shows" },
  { href: "/releases", label: "Lançamentos" },
];

const MENU_LINKS: Array<{
  href: string;
  label: string;
  sub: string;
}> = [
  { href: "/#roster", label: "Roster", sub: "4 universos, 1 casa" },
  { href: "/shows", label: "Shows", sub: "Agenda oficial" },
  { href: "/releases", label: "Lançamentos", sub: "Catálogo aberto" },
  { href: "/plantao", label: "Plantão", sub: "Festival próprio · 25 abr" },
  { href: "/loja", label: "Loja", sub: "Merch oficial" },
  { href: "/incubadora", label: "Incubadora", sub: "Canal de candidatura" },
  { href: "/parcerias", label: "Parcerias", sub: "Colabs ativas" },
  { href: "/news", label: "Notícias", sub: "Agenda editorial" },
  { href: "/imprensa", label: "Imprensa", sub: "Press kit oficial" },
  { href: "/about", label: "Sobre", sub: "A holding em 10 anos" },
];

export function BrandHeader({ cartCount }: BrandHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-40 backdrop-blur-md"
        style={{
          background: "color-mix(in srgb, var(--bg) 78%, transparent)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="mx-auto grid h-14 max-w-screen-2xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-4 sm:px-8">
          <nav className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.22em] md:flex">
            {LEFT_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cursor={item.label}
                className="opacity-85 transition-opacity hover:opacity-100"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              data-cursor="Menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="brand-menu-overlay"
              className="opacity-85 transition-opacity hover:opacity-100"
            >
              Menu
            </button>
          </nav>

          <Link
            href="/"
            data-cursor="Home"
            className="justify-self-center text-xl transition-opacity hover:opacity-80"
            aria-label="Home 30praum"
          >
            <BrandLogo />
          </Link>

          <div className="flex items-center justify-end gap-5 text-[11px] uppercase tracking-[0.22em]">
            <Link
              href="/plantao"
              data-cursor="Plantão"
              className="hidden opacity-85 transition-opacity hover:opacity-100 md:inline-block"
            >
              Plantão
            </Link>
            <Link
              href="/loja"
              data-cursor="Loja"
              className="inline-flex items-center rounded-full border px-5 py-2 transition-colors hover:bg-white hover:text-black"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
              }}
            >
              Loja
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              data-cursor="Menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="brand-menu-overlay"
              className="inline-flex items-center md:hidden"
              aria-label="Abrir menu"
            >
              <span aria-hidden className="text-2xl leading-none">≡</span>
            </button>
            {cartCount > 0 && <CartButton initialCount={cartCount} />}
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="brand-menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="fixed inset-0 z-50 flex flex-col"
          style={{
            background: "color-mix(in srgb, var(--bg) 96%, transparent)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div
            className="flex items-center justify-between border-b px-4 py-4 sm:px-8"
            style={{ borderColor: "var(--border)" }}
          >
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-xl"
              aria-label="Home"
            >
              <BrandLogo />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              data-cursor="Fechar"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border text-lg transition-colors hover:bg-white hover:text-black"
              style={{ borderColor: "var(--border)" }}
            >
              ×
            </button>
          </div>

          <nav
            aria-label="Menu principal"
            className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col justify-center gap-1 overflow-y-auto px-4 py-10 sm:gap-2 sm:px-8 sm:py-12"
          >
            {MENU_LINKS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                data-cursor={item.label}
                className="group flex items-baseline justify-between gap-6 border-b py-4 transition-colors hover:text-accent sm:py-5"
                style={{
                  borderColor: "var(--border)",
                  animation: `menu-row-in 600ms cubic-bezier(0.7,0,0.3,1) ${
                    i * 40
                  }ms both`,
                }}
              >
                <span
                  className="font-display uppercase leading-none transition-transform group-hover:translate-x-2"
                  style={{
                    fontSize: "clamp(1.8rem, 5vw, 4rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.label}
                </span>
                <span className="hidden text-right text-xs uppercase tracking-[0.28em] text-muted sm:inline">
                  {item.sub}
                </span>
              </Link>
            ))}
          </nav>

          <div
            className="border-t px-4 py-4 text-[10px] uppercase tracking-[0.3em] text-muted sm:px-8"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-3">
              <span>Fortaleza · CE · desde 2016</span>
              <a
                href="mailto:contato@30praum.com"
                className="transition-colors hover:text-accent"
              >
                contato@30praum.com
              </a>
            </div>
          </div>

          <style>{`
            @keyframes menu-row-in {
              from { opacity: 0; transform: translateY(12px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
