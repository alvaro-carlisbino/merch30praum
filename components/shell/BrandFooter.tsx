import Link from "next/link";
import { ARTISTS } from "@/lib/artists/registry";
import { BrandLogo } from "./BrandLogo";
import { WordReveal } from "@/components/motion/WordReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function BrandFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <section
        aria-labelledby="brand-manifesto"
        className="mx-auto max-w-screen-2xl px-4 sm:px-8 pt-24 pb-20"
      >
        <WordReveal
          text="Quem manda é a 30praum."
          as="h2"
          className="font-display uppercase leading-[1.0]"
          stagger={0.09}
          wordClassName="text-[clamp(3rem,11vw,9rem)] tracking-[-0.02em]"
        />

        <ScrollReveal stagger={0.12}>
          <p className="mt-10 max-w-xl text-base sm:text-lg text-fg/85 leading-relaxed">
            Quatro almas, um endereço. A casa é coletiva — gravadora, festival,
            holding, incubadora. Independência rara, visão sobre sucesso fácil.
          </p>
        </ScrollReveal>
      </section>

      {/* Wordmark gigante — assinatura visual */}
      <div
        className="border-y overflow-hidden"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-12 flex items-center justify-center"
          style={{ fontSize: "clamp(6rem, 22vw, 20rem)" }}
        >
          <BrandLogo variant="stacked" />
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 grid gap-10 md:grid-cols-[1fr_auto_auto_auto] py-12">
        <div>
          <BrandLogo className="text-2xl" />
          <p className="mt-4 max-w-sm text-xs text-muted leading-relaxed">
            Site oficial da holding 30praum — gravadora · festival · incubadora.
            Sede em Fortaleza desde 2016.
          </p>
        </div>

        <nav aria-label="Universos" className="text-sm space-y-2">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-muted mb-3">
            Universos
          </h3>
          {Object.values(ARTISTS).map((a) => (
            <Link
              key={a.slug}
              href={`/${a.slug}`}
              className="block hover:text-accent transition-colors"
            >
              {a.displayName}{" "}
              <span className="text-muted">— {a.universeName}</span>
            </Link>
          ))}
        </nav>

        <nav aria-label="Holding" className="text-sm space-y-2">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-muted mb-3">
            Holding
          </h3>
          <Link href="/plantao" className="block hover:text-accent transition-colors">
            Plantão Festival
          </Link>
          <Link href="/sabor" className="block hover:text-accent transition-colors">
            Sabor Matuê
          </Link>
          <Link href="/parcerias" className="block hover:text-accent transition-colors">
            Parcerias
          </Link>
          <Link href="/incubadora" className="block hover:text-accent transition-colors">
            Incubadora
          </Link>
          <Link href="/loja" className="block hover:text-accent transition-colors">
            Loja oficial
          </Link>
        </nav>

        <nav aria-label="Atendimento" className="text-sm space-y-2">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-muted mb-3">
            Contato
          </h3>
          <Link href="/about" className="block hover:text-accent transition-colors">
            Sobre a 30praum
          </Link>
          <Link href="/imprensa" className="block hover:text-accent transition-colors">
            Imprensa · Press kit
          </Link>
          <a
            href="mailto:contato@30praum.com"
            className="block hover:text-accent transition-colors"
          >
            contato@30praum.com
          </a>
          <a
            href="mailto:parcerias@30praum.com"
            className="block hover:text-accent transition-colors"
          >
            parcerias@30praum.com
          </a>
        </nav>
      </div>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-muted">
          <span>© 30praum {new Date().getFullYear()} · Fortaleza, CE</span>
          <span className="flex items-center gap-2">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            Site oficial
          </span>
        </div>
      </div>
    </footer>
  );
}
