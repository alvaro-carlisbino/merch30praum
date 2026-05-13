import Link from "next/link";
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

export function BrandHeader({ cartCount }: BrandHeaderProps) {
  return (
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
          {cartCount > 0 && (
            <CartButton initialCount={cartCount} />
          )}
        </div>
      </div>
    </header>
  );
}
