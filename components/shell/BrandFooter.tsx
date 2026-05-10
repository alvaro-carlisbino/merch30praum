import Link from "next/link";
import { ARTISTS } from "@/lib/artists/registry";
import { BrandLogo } from "./BrandLogo";
import { Marquee } from "@/components/motion/Marquee";
import { WordReveal } from "@/components/motion/WordReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function BrandFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <section
        aria-labelledby="brand-manifesto"
        className="mx-auto max-w-screen-2xl px-4 sm:px-8 pt-24 pb-20"
      >
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted mb-6">
            Manifesto
          </p>
        </ScrollReveal>

        <WordReveal
          text="Quem manda é a 30praum."
          as="h2"
          className="font-display uppercase leading-[1.0]"
          stagger={0.09}
          wordClassName="text-[clamp(3rem,11vw,9rem)] tracking-[-0.02em]"
        />

        <ScrollReveal stagger={0.12}>
          <p className="mt-10 max-w-xl text-base sm:text-lg text-fg/85 leading-relaxed">
            Quatro almas, um endereço. O merch que tá aqui não é mascote — é
            extensão da música. Cada peça sai lacrada, cada peça responde à
            voz do artista, cada peça lembra que essa casa é coletiva.
          </p>
          <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted">
            Loja oficial · Security bag lacrada · Origem rastreável
          </p>
        </ScrollReveal>
      </section>

      <Marquee
        items={[
          "30PRAUM · MERCH OFICIAL",
          "MATUÊ — XTRANHO",
          "WIU × TETO — COLAPSO GLOBAL 2026",
          "BRANDÃO85 — ISSO É TRAP VOL.02",
          "PARCERIAS · RAW · RENNER · KENNER",
        ]}
        speed={50}
        className="font-display py-6 border-y border-border tracking-[0.18em] text-3xl sm:text-5xl"
        separatorColor="var(--accent)"
      />

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 grid gap-10 md:grid-cols-[1fr_auto_auto_auto] py-12">
        <div>
          <BrandLogo className="text-2xl" />
          <p className="mt-4 max-w-sm text-xs text-muted leading-relaxed">
            Loja oficial. Pedido em security bag lacrada. Origem garantida da
            gravadora — desconfie de qualquer outro endereço.
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

        <nav aria-label="Álbuns" className="text-sm space-y-2">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-muted mb-3">
            Álbuns
          </h3>
          <Link href="/album/xtranho" className="block hover:text-accent transition-colors">
            XTRANHO <span className="text-muted">2025</span>
          </Link>
          <Link href="/album/colapso-global" className="block hover:text-accent transition-colors">
            Colapso Global <span className="text-muted">2026</span>
          </Link>
          <Link href="/album/isso-e-trap-vol-2" className="block hover:text-accent transition-colors">
            Isso é Trap Vol.02 <span className="text-muted">2026</span>
          </Link>
          <Link href="/parcerias" className="block hover:text-accent transition-colors">
            Parcerias →
          </Link>
        </nav>

        <nav aria-label="Atendimento" className="text-sm space-y-2">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-muted mb-3">
            Atendimento
          </h3>
          <Link href="/about" className="block hover:text-accent transition-colors">
            Sobre a 30praum
          </Link>
          <a
            href="mailto:contato@30praum.com"
            className="block hover:text-accent transition-colors"
          >
            Contato
          </a>
          <span className="block text-muted">Trocas e devoluções</span>
          <span className="block text-muted">Política de privacidade</span>
        </nav>
      </div>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-muted">
          <span>© 30praum {new Date().getFullYear()}</span>
          <span className="flex items-center gap-2">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            Site oficial · 30praum.store
          </span>
        </div>
      </div>
    </footer>
  );
}
