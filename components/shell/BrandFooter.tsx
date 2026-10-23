import Link from "next/link";
import { ARTISTS } from "@/lib/artists/registry";
import { CONTACT } from "@/lib/contact";
import { OFFICIAL_STORE, STORE_POLICY } from "@/lib/shop/official-store";
import { BrandLogo } from "./BrandLogo";

const linkClass = "block transition-colors hover:text-accent";

export function BrandFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-14 sm:px-8 sm:py-16 md:grid-cols-[1.4fr_auto_auto_auto]">
        <div>
          <BrandLogo className="text-2xl" />
          <p className="mt-5 max-w-sm text-xs leading-relaxed text-muted">
            Gravadora independente de Fortaleza, fundada em 2016 por Matuê e Clara Mendes.
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-fg/80">
            Merch oficial só neste site e na 30praum.store. Pedidos saem em security bag lacrada.
            Perfil vendendo por fora não é a gente.
          </p>
        </div>
        <nav aria-label="Artistas" className="space-y-2 text-sm">
          <h3 className="mb-3 text-xs text-muted">Artistas</h3>
          {Object.values(ARTISTS).map((a) => (
            <Link key={a.slug} href={`/${a.slug}`} className={linkClass}>
              {a.displayName}
            </Link>
          ))}
        </nav>
        <nav aria-label="30praum" className="space-y-2 text-sm">
          <h3 className="mb-3 text-xs text-muted">30praum</h3>
          <Link href="/about" className={linkClass}>Sobre</Link>
          <Link href="/plantao" className={linkClass}>Plantão</Link>
          <Link href="/shows" className={linkClass}>Shows</Link>
          <Link href="/parcerias" className={linkClass}>Parcerias</Link>
          <Link href="/incubadora" className={linkClass}>Incubadora</Link>
          <Link href="/imprensa" className={linkClass}>Imprensa</Link>
        </nav>
        <nav aria-label="Loja" className="space-y-2 text-sm">
          <h3 className="mb-3 text-xs text-muted">Loja</h3>
          <Link href="/loja" className={linkClass}>Loja oficial</Link>
          <a href={`${OFFICIAL_STORE}/policies/refund-policy`} target="_blank" rel="noreferrer" className={linkClass}>
            Trocas e devoluções
          </a>
          <a href={`${OFFICIAL_STORE}/policies/shipping-policy`} target="_blank" rel="noreferrer" className={linkClass}>
            Envio
          </a>
          <a href={`mailto:${STORE_POLICY.support}`} className={linkClass}>
            Atendimento da loja
          </a>
          <a href={`mailto:${CONTACT.geral}`} className={linkClass}>
            {CONTACT.geral}
          </a>
        </nav>
      </div>
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-4 px-4 py-5 text-xs text-muted sm:px-8">
          <span>© {new Date().getFullYear()} 30praum · Fortaleza, CE</span>
          <span>Loja operada por ODTX Confecções e Comércio Ltda.</span>
        </div>
      </div>
    </footer>
  );
}
