import Image from "next/image";
import { getPastPlantao, getCurrentPlantao } from "@/lib/plantao/registry";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata = {
  title: "Edições anteriores · Plantão Festival",
  description: "Histórico do Plantão Festival — 2024, 2025 e 2026. Aftermovies, fotos e dados de cada noite.",
};

export default function PlantaoEdicoesPage() {
  const current = getCurrentPlantao();
  const past = getPastPlantao();
  const all = [current, ...past];

  return (
    <article>
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 pt-24 pb-16">
        <h1
          className="font-display uppercase leading-[0.85]"
          style={{ fontSize: "clamp(3rem, 11vw, 9rem)", letterSpacing: "-0.04em" }}
        >
          Cada noite, <br /> uma história.
        </h1>
        <p className="mt-8 max-w-2xl text-base sm:text-xl text-fg/85 leading-relaxed">
          Três edições. Mais de 50 mil pessoas presenciais. Quase um milhão online. O Plantão saiu
          de projeto independente pra referência nacional sem sair de Fortaleza.
        </p>
      </section>

      <div className="space-y-24 sm:space-y-32 pb-24">
        {all.map((ed, idx) => (
          <ScrollReveal key={ed.slug}>
            <section className="mx-auto max-w-screen-2xl px-4 sm:px-8">
              <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end mb-8">
                <div>
                  <h2
                    className="font-display uppercase leading-[0.85] plantao-neon-text"
                    style={{ fontSize: "clamp(3rem, 9vw, 7rem)", letterSpacing: "-0.03em" }}
                  >
                    {ed.title}
                  </h2>
                  <p className="mt-3 text-fg/80 max-w-xl">{ed.tagline}</p>
                  <p className="mt-2 text-xs opacity-55">
                    {ed.status === "live" ? "Edição atual" : ed.status === "upcoming" ? "Próxima edição" : "Edição encerrada"}
                  </p>
                </div>
                <dl className="grid grid-cols-3 gap-6 text-sm">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] opacity-60">Público</dt>
                    <dd className="mt-2 font-display text-2xl">
                      {ed.stats.attendees ? ed.stats.attendees.toLocaleString("pt-BR") : "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] opacity-60">Online</dt>
                    <dd className="mt-2 font-display text-2xl">
                      {ed.stats.onlineViewers ? `${(ed.stats.onlineViewers / 1000).toFixed(0)}K` : "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] opacity-60">Investimento</dt>
                    <dd className="mt-2 font-display text-2xl">{ed.stats.investment ?? "—"}</dd>
                  </div>
                </dl>
              </div>

              {/* hero */}
              <div className="relative aspect-[21/9] overflow-hidden border" style={{ borderColor: "var(--border)" }}>
                <Image
                  src={ed.heroImage}
                  alt={ed.title}
                  fill
                  unoptimized
                  className="object-cover"
                  style={{ filter: "brightness(0.7) contrast(1.1)" }}
                  sizes="100vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, transparent 60%, rgba(6,3,10,0.8) 100%)",
                  }}
                />
              </div>

              {/* Aftermovie */}
              {ed.aftermovieUrl && (
                <div className="mt-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-4">
                    Aftermovie oficial
                  </p>
                  <div
                    className="relative aspect-video overflow-hidden border"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <iframe
                      src={ed.aftermovieUrl}
                      title={`Aftermovie ${ed.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                </div>
              )}

              {/* Gallery */}
              {ed.galleryImages.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {ed.galleryImages.map((g, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] overflow-hidden border"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <Image
                        src={g}
                        alt={`${ed.title} foto ${i + 1}`}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </ScrollReveal>
        ))}
      </div>
    </article>
  );
}
