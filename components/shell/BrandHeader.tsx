"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { CartButton } from "./CartButton";

interface BrandHeaderProps {
  currentArtist?: string;
  cartCount: number;
}

const LEFT_NAV = [
  { href: "/artistas", label: "Roster" },
  { href: "/shows", label: "Shows" },
  { href: "/releases", label: "Lançamentos" },
];

export function BrandHeader({ cartCount }: BrandHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{
        background: "color-mix(in srgb, var(--bg) 78%, transparent)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto grid h-14 max-w-screen-2xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-4 sm:px-8">
        {/* LEFT NAV */}
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
            onClick={() => setMenuOpen((v) => !v)}
            data-cursor="Menu"
            className="opacity-85 transition-opacity hover:opacity-100"
            aria-expanded={menuOpen}
            aria-controls="brand-menu-drawer"
          >
            Menu
          </button>
        </nav>

        {/* CENTER LOGO */}
        <Link
          href="/"
          data-cursor="Home"
          className="justify-self-center text-xl transition-opacity hover:opacity-80"
          aria-label="Home 30praum"
        >
          <BrandLogo />
        </Link>

        {/* RIGHT NAV + LOJA PILL */}
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
          {cartCount > 0 && (
            <CartButton initialCount={cartCount} />
          )}
        </div>
      </div>

      {/* MENU DRAWER (slide-down) */}
      {menuOpen && (
        <div
          id="brand-menu-drawer"
          className="border-t backdrop-blur-md"
          style={{
            background: "color-mix(in srgb, var(--bg) 94%, transparent)",
            borderColor: "var(--border)",
          }}
        >
          <nav className="mx-auto grid max-w-screen-2xl gap-6 px-4 py-8 text-sm sm:px-8 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/incubadora"
              onClick={() => setMenuOpen(false)}
              className="opacity-85 hover:opacity-100"
            >
              Incubadora
            </Link>
            <Link
              href="/parcerias"
              onClick={() => setMenuOpen(false)}
              className="opacity-85 hover:opacity-100"
            >
              Parcerias
            </Link>
            <Link
              href="/sabor"
              onClick={() => setMenuOpen(false)}
              className="opacity-85 hover:opacity-100"
            >
              Sabor Matuê
            </Link>
            <Link
              href="/news"
              onClick={() => setMenuOpen(false)}
              className="opacity-85 hover:opacity-100"
            >
              Notícias
            </Link>
            <Link
              href="/imprensa"
              onClick={() => setMenuOpen(false)}
              className="opacity-85 hover:opacity-100"
            >
              Imprensa · Press kit
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="opacity-85 hover:opacity-100"
            >
              Sobre a 30praum
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
