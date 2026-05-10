import Link from "next/link";
import { ARTISTS } from "@/lib/artists/registry";
import { HeroBrand } from "@/components/home/HeroBrand";
import { UniversePanels } from "@/components/home/UniversePanels";
import { BigBrandMarquee } from "@/components/home/BigBrandMarquee";
import { StatsHero } from "@/components/home/StatsHero";
import { ManifestoWall } from "@/components/home/ManifestoWall";
import { LabelTimeline } from "@/components/home/LabelTimeline";
import { FoundersSection } from "@/components/home/FoundersSection";
import { PressQuotesWall } from "@/components/home/PressQuotesWall";
import { ChallengerWall } from "@/components/home/ChallengerWall";
import { FeaturedDrops } from "@/components/home/FeaturedDrops";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { BundleSection } from "@/components/home/BundleSection";
import { NewsletterCapture } from "@/components/shell/NewsletterCapture";

export const metadata = {
  title: "30praum — Merch oficial",
  description:
    "Quatro universos cinematográficos, uma só assinatura. Matuê, Wiu, Teto e Brandão85 — quem manda é a 30praum.",
};

export default function HomePage() {
  return (
    <>
      <HeroBrand />

      <section id="universos">
        <UniversePanels />
      </section>

      <FeaturedDrops />

      <BigBrandMarquee />

      <ShopByCategory />

      <BundleSection />

      <StatsHero />

      <PressQuotesWall />

      <ManifestoWall />

      <LabelTimeline />

      <FoundersSection />

      <ChallengerWall />

      <NewsletterCapture />

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
        <header className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
              Manifesto · 30praum
            </p>
            <h2
              className="font-display mt-4 leading-[0.92]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Quatro almas. <br />
              Uma assinatura.
            </h2>
          </div>
          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-md">
            Esse merch não é roupa. É linguagem. Cada peça aqui carrega o que o
            artista tava sentindo quando soltou o som — e quem manda nessa moeda
            é a 30praum.
          </p>
        </header>

        <div className="mt-16 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {Object.values(ARTISTS).map((a) => (
            <Link
              key={a.slug}
              href={`/${a.slug}`}
              data-cursor={`Entrar · ${a.displayName}`}
              className="group relative block aspect-[4/5] overflow-hidden border border-border"
              style={{ background: a.panelBackground }}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-30 transition-opacity group-hover:opacity-70"
                style={{
                  background: `radial-gradient(circle at 50% 60%, ${a.panelAccent}, transparent 70%)`,
                }}
              />
              <div className="relative flex h-full flex-col p-6 text-white">
                <span
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: a.panelAccent }}
                >
                  {a.drop.statusLabel}
                </span>
                <div className="mt-auto">
                  <p
                    className="text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {a.universeName}
                  </p>
                  <h3
                    className="mt-2 text-2xl"
                    style={{ letterSpacing: "-0.01em", fontWeight: 700 }}
                  >
                    {a.displayName}
                  </h3>
                  <p className="mt-2 text-xs text-white/70">{a.tagline}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        aria-label="Autenticidade"
        className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
              Origem garantida
            </p>
            <h2
              className="mt-4 font-display leading-[0.95]"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Aqui é o único endereço.
              <br />
              <span style={{ color: "var(--accent)" }}>30praum.store.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base text-fg/80 leading-relaxed">
              Cada pedido sai lacrado em security bag, com etiqueta da gravadora
              e nota fiscal. Se você comprou em outro lugar, não é nosso.
              Falsificação também rouba a história — não cai nessa.
            </p>
          </div>
          <ul className="grid gap-3 text-sm">
            {[
              ["01", "Loja oficial 30praum"],
              ["02", "Security bag lacrada"],
              ["03", "Pix · Cartão · Shop Pay"],
              ["04", "Origem rastreável"],
            ].map(([n, label]) => (
              <li
                key={n}
                className="flex items-center gap-4 px-4 py-3"
                style={{
                  border: "1px solid var(--border)",
                  background: "color-mix(in srgb, var(--fg) 4%, transparent)",
                }}
              >
                <span
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: "var(--accent)" }}
                >
                  {n}
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
