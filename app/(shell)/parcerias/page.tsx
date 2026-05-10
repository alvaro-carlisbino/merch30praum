import Image from "next/image";
import Link from "next/link";
import { PARTNERS, PARTNER_SLUGS } from "@/lib/partners/registry";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { Marquee } from "@/components/motion/Marquee";

export const metadata = {
  title: "Parcerias",
  description:
    "30praum × RAW · Renner · Kenner — colaborações oficiais que carimbaram a marca em três continentes da cultura.",
};

export default function ParceriasPage() {
  return (
    <article>
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 pt-24 pb-16">
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
            Colaborações oficiais
          </p>
        </ScrollReveal>

        <WordReveal
          text="Parcerias 30praum."
          as="h1"
          className="mt-6 font-display uppercase leading-[0.85]"
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

      <Marquee
        items={[
          "RAW × 30PRAUM",
          "RENNER × 30PRAUM",
          "KENNER × MATUÊ",
          "PARCERIAS OFICIAIS",
          "30PRAUM CARIMBA",
        ]}
        speed={55}
        className="font-display py-5 border-y border-border tracking-[0.2em] text-3xl sm:text-5xl"
        separatorColor="var(--accent)"
      />

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20 grid gap-12">
        {PARTNER_SLUGS.map((slug, idx) => {
          const partner = PARTNERS[slug];
          const reverse = idx % 2 === 1;
          return (
            <ScrollReveal key={slug} stagger={0.12}>
              <article
                className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-stretch p-6 sm:p-10`}
                style={{
                  background: partner.bgColor,
                  color: "#f5f5f5",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div className={reverse ? "lg:order-last" : ""}>
                  <p
                    className="text-[10px] uppercase tracking-[0.4em]"
                    style={{ color: partner.brandColor }}
                  >
                    {String(idx + 1).padStart(2, "0")} · {partner.category}
                  </p>
                  <h2
                    className="mt-6 font-display uppercase leading-[0.85] whitespace-pre-line"
                    style={{
                      fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {partner.headline}
                  </h2>
                  <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-white/55">
                    {partner.years}
                  </p>

                  <p className="mt-8 max-w-md text-sm sm:text-base text-white/85 leading-relaxed">
                    {partner.story}
                  </p>

                  <blockquote
                    className="mt-8 border-l-2 pl-4 max-w-md italic text-white/70 text-sm"
                    style={{ borderColor: partner.brandColor }}
                  >
                    “{partner.quote}”
                  </blockquote>
                </div>

                <div className="flex flex-col justify-between gap-6">
                  <div
                    className="aspect-square w-full overflow-hidden relative"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${partner.brandColor}55, transparent 70%), ${partner.bgColor}`,
                    }}
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center p-12"
                      style={{ color: partner.brandColor }}
                    >
                      {partner.logoPath ? (
                        <div
                          className="relative"
                          style={{ width: "60%", height: "40%" }}
                        >
                          <Image
                            src={partner.logoPath}
                            alt={`Logo ${partner.name}`}
                            fill
                            sizes="(min-width: 1024px) 25vw, 60vw"
                            style={{
                              objectFit: "contain",
                              filter:
                                partner.slug === "sony"
                                  ? "invert(1) brightness(1.4)"
                                  : "brightness(0) invert(1) opacity(0.95)",
                            }}
                            unoptimized
                          />
                        </div>
                      ) : (
                        <span
                          className="font-display"
                          style={{
                            fontSize: "clamp(4rem, 10vw, 8rem)",
                            letterSpacing: "-0.03em",
                            opacity: 0.85,
                          }}
                        >
                          {partner.name}
                        </span>
                      )}
                    </div>
                    <div
                      aria-hidden
                      className="absolute inset-0 mix-blend-overlay opacity-30"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
                          `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`,
                        )}")`,
                      }}
                    />
                  </div>

                  <div
                    className="grid gap-2 p-5"
                    style={{ border: "1px solid rgba(255,255,255,0.18)" }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/55">
                      Lançamento em destaque
                    </p>
                    <p
                      className="font-display text-xl sm:text-2xl"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {partner.release.name}
                    </p>
                    <p className="text-xs text-white/70">
                      {partner.release.format} · {partner.release.year}
                    </p>
                    <a
                      href={partner.externalLink}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] hover:opacity-80"
                      style={{ color: partner.brandColor }}
                    >
                      Conhecer marca →
                    </a>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>

      <section
        className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <ScrollReveal stagger={0.15}>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
            Para parceiros
          </p>
          <h2
            className="mt-4 font-display leading-[0.95]"
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
            className="mt-8 inline-flex items-center gap-3 px-6 py-4 text-xs uppercase tracking-[0.3em] font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            parcerias@30praum.com →
          </Link>
        </ScrollReveal>
      </section>
    </article>
  );
}
