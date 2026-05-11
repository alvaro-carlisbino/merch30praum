import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PARTNERS, PARTNER_SLUGS } from "@/lib/partners/registry";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { WordReveal } from "@/components/motion/WordReveal";

export const metadata = {
  title: "Parcerias",
  description:
    "30praum × RAW · Renner · Kenner — colaborações oficiais que carimbaram a marca em três continentes da cultura.",
};

export default function ParceriasPage() {
  return (
    <article>
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 pt-24 pb-16">
        <WordReveal
          text="Parcerias."
          as="h1"
          className="font-display uppercase leading-[0.85]"
          stagger={0.08}
          wordClassName="text-[clamp(3rem,12vw,11rem)] tracking-[-0.03em]"
        />

        <ScrollReveal stagger={0.15}>
          <p className="mt-8 max-w-2xl text-base sm:text-lg text-fg/85 leading-relaxed">
            A 30praum não fica em uma só vitrine. Da bandeja de RAW ao shopping
            da Renner e à sandália Kenner, a gravadora carimba marca em
            territórios onde a cultura mora. Cada colab vira um capítulo — não
            um licenciamento.
          </p>
        </ScrollReveal>
      </section>

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20 grid gap-6">
        {PARTNER_SLUGS.map((slug, idx) => {
          const partner = PARTNERS[slug];
          const reverse = idx % 2 === 1;
          const href = partner.internalLink ?? `/parcerias/${partner.slug}`;
          return (
            <ScrollReveal key={slug}>
              <Link
                href={href}
                data-cursor={partner.name}
                className="group relative grid lg:grid-cols-2 items-stretch overflow-hidden border"
                style={{
                  background: partner.bgColor,
                  color: "#f5f5f5",
                  borderColor: "rgba(255,255,255,0.12)",
                }}
              >
                {/* Texto */}
                <div className={`flex flex-col gap-6 p-6 sm:p-10 lg:p-14 ${reverse ? "lg:order-last" : ""}`}>
                  <h2
                    className="font-display uppercase leading-[0.85] whitespace-pre-line"
                    style={{
                      fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {partner.headline}
                  </h2>

                  <p className="max-w-md text-sm sm:text-base text-white/85 leading-relaxed">
                    {partner.shortPitch}
                  </p>

                  <p className="text-sm" style={{ color: partner.brandColor }}>
                    {partner.category} · {partner.years}
                  </p>

                  <span
                    className="mt-auto inline-flex items-center gap-2 text-sm group-hover:translate-x-1 transition-transform"
                    style={{ color: partner.brandColor }}
                  >
                    Abrir case
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </span>
                </div>

                {/* Imagem (foto real, sem SVG noise) */}
                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[28rem] overflow-hidden">
                  <Image
                    src={partner.heroImage}
                    alt={partner.name}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.7) contrast(1.05)" }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(${reverse ? "270deg" : "90deg"}, ${partner.bgColor}f0 0%, transparent 60%)`,
                    }}
                  />
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>

      <section
        className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <ScrollReveal stagger={0.15}>
          <h2
            className="font-display leading-[0.95]"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Sua marca também pode entrar nesse capítulo.
          </h2>
          <p className="mt-6 max-w-xl text-fg/80 leading-relaxed">
            Coleções cápsula, drops conjuntos, edições limitadas. Se a sua marca
            entende o que é cultura, manda um e-mail e a gente conversa.
          </p>
          <Link
            href="mailto:parcerias@30praum.com"
            className="mt-8 inline-flex items-center gap-3 px-6 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            parcerias@30praum.com
            <ExternalLink size={16} strokeWidth={1.5} />
          </Link>
        </ScrollReveal>
      </section>
    </article>
  );
}
