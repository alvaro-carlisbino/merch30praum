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
        <ArtistSwitcher current={currentArtist} className="hidden xl:flex" />
        <nav className="flex items-center gap-1 text-[11px] uppercase tracking-[0.2em]">
          <Link
            href="/artistas"
            data-cursor="Roster"
            className="hidden md:inline-block px-3 py-2 opacity-80 hover:opacity-100 transition-opacity"
          >
            Artistas
          </Link>
          <Link
            href="/shows"
            data-cursor="Shows"
            className="hidden md:inline-block px-3 py-2 opacity-80 hover:opacity-100 transition-opacity"
          >
            Shows
          </Link>
          <Link
            href="/plantao"
            data-cursor="Plantão"
            className="hidden md:inline-block px-3 py-2 opacity-80 hover:opacity-100 transition-opacity"
          >
            Plantão
          </Link>
          <Link
            href="/releases"
            data-cursor="Lançamentos"
            className="hidden lg:inline-block px-3 py-2 opacity-80 hover:opacity-100 transition-opacity"
          >
            Releases
          </Link>
          <Link
            href="/news"
            data-cursor="Notícias"
            className="hidden lg:inline-block px-3 py-2 opacity-80 hover:opacity-100 transition-opacity"
          >
            Notícias
          </Link>
          <Link
            href="/parcerias"
            data-cursor="Parcerias"
            className="hidden xl:inline-block px-3 py-2 opacity-80 hover:opacity-100 transition-opacity"
          >
            Parcerias
          </Link>
          <Link
            href="/incubadora"
            data-cursor="Incubadora"
            className="hidden xl:inline-block px-3 py-2 opacity-80 hover:opacity-100 transition-opacity"
          >
            Incubadora
          </Link>
          <Link
            href="/loja"
            data-cursor="Loja"
            className="px-3 py-2 font-semibold transition-colors hover:text-accent"
            style={{ color: "var(--accent)" }}
          >
            Loja
          </Link>
        </nav>
        <CartButton initialCount={cartCount} />
      </div>
    </header>
  );
}
