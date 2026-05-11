import Link from "next/link";
import { ARTISTS } from "@/lib/artists/registry";
import { HeroBrand } from "@/components/home/HeroBrand";
import { UniversePanels } from "@/components/home/UniversePanels";
import { StatsHero } from "@/components/home/StatsHero";
import { LabelTimeline } from "@/components/home/LabelTimeline";
import { FoundersSection } from "@/components/home/FoundersSection";
import { PressQuotesWall } from "@/components/home/PressQuotesWall";
import { FeaturedDrops } from "@/components/home/FeaturedDrops";
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

      <StatsHero />

      <LabelTimeline />

      <PressQuotesWall />

      <FoundersSection />

      <NewsletterCapture />

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
        <header className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <h2
            className="font-display leading-[0.92]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Quatro almas. <br />
            Uma assinatura.
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-md">
            Cada universo tem cor própria. Cada artista tem voz. A casca é a 30praum.
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
              <div className="relative flex h-full flex-col p-6 text-white justify-end">
                <p className="text-xs opacity-65">{a.universeName}</p>
                <h3
                  className="mt-2 text-2xl"
                  style={{ letterSpacing: "-0.01em", fontWeight: 700 }}
                >
                  {a.displayName}
                </h3>
                <p className="mt-2 text-xs text-white/70">{a.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
