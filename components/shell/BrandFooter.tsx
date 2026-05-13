import Link from "next/link";
import { ARTISTS } from "@/lib/artists/registry";
import { BrandLogo } from "./BrandLogo";

export function BrandFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-14 sm:px-8 sm:py-16 md:grid-cols-[1.4fr_auto_auto_auto]">
        <div>
          <BrandLogo className="text-2xl" />
          <p className="mt-5 max-w-sm text-xs leading-relaxed text-muted">
            Site oficial da holding 30praum — gravadora · festival · incubadora.
            Sede em Fortaleza desde 2016.
          </p>
        </div>

        <nav aria-label="Universos" className="space-y-2 text-sm">
          <h3 className="mb-3 text-[10px] uppercase tracking-[0.3em] text-muted">
            Universos
          </h3>
          {Object.values(ARTISTS).map((a) => (
            <Link
              key={a.slug}
              href={`/${a.slug}`}
              className="block transition-colors hover:text-accent"
            >
              {a.displayName}{" "}
              <span className="text-muted">— {a.universeName}</span>
            </Link>
          ))}
        </nav>

        <nav aria-label="Holding" className="space-y-2 text-sm">
          <h3 className="mb-3 text-[10px] uppercase tracking-[0.3em] text-muted">
            Holding
          </h3>
          <Link href="/plantao" className="block transition-colors hover:text-accent">
            Plantão Festival
          </Link>
          <Link href="/parcerias" className="block transition-colors hover:text-accent">
            Parcerias
          </Link>
          <Link href="/incubadora" className="block transition-colors hover:text-accent">
            Incubadora
          </Link>
          <Link href="/loja" className="block transition-colors hover:text-accent">
            Loja oficial
          </Link>
        </nav>

        <nav aria-label="Contato" className="space-y-2 text-sm">
          <h3 className="mb-3 text-[10px] uppercase tracking-[0.3em] text-muted">
            Contato
          </h3>
          <Link href="/about" className="block transition-colors hover:text-accent">
            Sobre a 30praum
          </Link>
          <Link href="/imprensa" className="block transition-colors hover:text-accent">
            Imprensa · Press kit
          </Link>
          <a
            href="mailto:contato@30praum.com"
            className="block transition-colors hover:text-accent"
          >
            contato@30praum.com
          </a>
          <a
            href="mailto:parcerias@30praum.com"
            className="block transition-colors hover:text-accent"
          >
            parcerias@30praum.com
          </a>
        </nav>
      </div>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-4 px-4 py-5 text-[10px] uppercase tracking-[0.3em] text-muted sm:px-8">
          <span>© 30praum {new Date().getFullYear()} · Fortaleza, CE</span>
          <span>Site Oficial</span>
        </div>
      </div>
    </footer>
  );
}
