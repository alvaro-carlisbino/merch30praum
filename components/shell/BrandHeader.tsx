import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { ArtistSwitcher } from "./ArtistSwitcher";
import { CartButton } from "./CartButton";

interface BrandHeaderProps {
  currentArtist?: string;
  cartCount: number;
}

export function BrandHeader({ currentArtist, cartCount }: BrandHeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{
        background: "color-mix(in srgb, var(--bg) 78%, transparent)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-6 px-4 sm:px-8 h-14">
        <Link
          href="/"
          data-cursor="Home"
          className="text-base hover:text-accent transition-colors"
          aria-label="Home 30praum"
        >
          <BrandLogo />
        </Link>
        <ArtistSwitcher current={currentArtist} className="hidden md:flex" />
        <nav className="flex items-center gap-1 text-xs uppercase tracking-widest">
          <Link
            href="/loja"
            data-cursor="Catálogo completo"
            className="px-3 py-2 font-semibold transition-colors hover:text-accent"
            style={{ color: "var(--accent)" }}
          >
            Loja
          </Link>
          <Link
            href="/parcerias"
            data-cursor="Parcerias"
            className="hidden lg:inline-block px-3 py-2 opacity-70 hover:opacity-100 transition-opacity"
          >
            Parcerias
          </Link>
          <Link
            href="/about"
            data-cursor="Sobre"
            className="hidden lg:inline-block px-3 py-2 opacity-70 hover:opacity-100 transition-opacity"
          >
            Sobre
          </Link>
        </nav>
        <CartButton initialCount={cartCount} />
      </div>
    </header>
  );
}
