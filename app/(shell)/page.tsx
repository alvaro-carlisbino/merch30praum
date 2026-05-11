import Link from "next/link";
import Image from "next/image";
import { ARTISTS } from "@/lib/artists/registry";
import { HeroBrand } from "@/components/home/HeroBrand";
import { UniversePanels } from "@/components/home/UniversePanels";
import { StatsHero } from "@/components/home/StatsHero";
import { LabelTimeline } from "@/components/home/LabelTimeline";
import { FoundersSection } from "@/components/home/FoundersSection";
import { PressQuotesWall } from "@/components/home/PressQuotesWall";
import { FeaturedDrops } from "@/components/home/FeaturedDrops";
import { EleitosDaCasa } from "@/components/home/EleitosDaCasa";
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

      <EleitosDaCasa />

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
              data-cursor={a.displayName}
              className="group relative block aspect-[4/5] overflow-hidden border border-border"
              style={{ background: a.panelBackground }}
            >
              <Image
                src={a.realPhotoUrl ?? a.portraitImage}
                alt={a.displayName}
                fill
                unoptimized
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  objectPosition: a.photoObjectPosition,
                  filter: "brightness(0.7) contrast(1.05) saturate(0.95)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                style={{
                  background: `radial-gradient(circle at 30% 70%, ${a.panelAccent}40, transparent 65%), linear-gradient(180deg, transparent 45%, ${a.panelBackground}f5 100%)`,
                }}
              />
              <div className="relative flex h-full flex-col p-6 text-white justify-end">
                <p className="text-xs opacity-65">{a.universeName}</p>
                <h3
                  className="mt-2 text-2xl sm:text-3xl"
                  style={{ letterSpacing: "-0.01em", fontWeight: 700 }}
                >
                  {a.displayName}
                </h3>
                <p className="mt-2 text-xs text-white/75 line-clamp-2">{a.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
