import Image from "next/image";
import Link from "next/link";
import { PARTNERS, PARTNER_SLUGS } from "@/lib/partners/registry";

export const metadata = {
  title: "Parcerias",
  description:
    "30praum × RAW · Renner · Kenner — colaborações oficiais que carimbaram a marca em três continentes da cultura.",
};

export default function ParceriasPage() {
  return (
    <>
      <section className="mx-auto max-w-screen-2xl px-4 pt-16 pb-10 sm:px-8 sm:pt-20">
        <h1
          className="font-display uppercase leading-[0.92]"
          style={{
            fontSize: "clamp(2.4rem, 5.8vw, 4.8rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Parcerias
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fg/80 sm:text-base">
          A 30praum não fica em uma só vitrine. Da bandeja de RAW ao shopping da
          Renner e à sandália Kenner — cada colab vira um capítulo, não um
          licenciamento.
        </p>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 pb-20 sm:px-8 sm:pb-24">
        <ul className="grid gap-6 sm:gap-8">
          {PARTNER_SLUGS.map((slug, idx) => {
            const partner = PARTNERS[slug];
            const reverse = idx % 2 === 1;
            const href = partner.internalLink ?? `/parcerias/${partner.slug}`;
            return (
              <li key={slug}>
                <Link
                  href={href}
                  data-cursor={partner.name}
                  className="group grid overflow-hidden rounded-3xl lg:grid-cols-2"
                  style={{
                    background: partner.bgColor,
                    color: "#f5f5f5",
                  }}
                >
                  <div
                    className={`flex flex-col gap-5 p-6 sm:p-10 lg:p-12 ${
                      reverse ? "lg:order-last" : ""
                    }`}
                  >
                    <h2
                      className="font-display uppercase leading-[0.9] whitespace-pre-line"
                      style={{
                        fontSize: "clamp(2rem, 5vw, 4rem)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {partner.headline}
                    </h2>
                    <p className="max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
                      {partner.shortPitch}
                    </p>
                    <p className="text-xs" style={{ color: partner.brandColor }}>
                      {partner.category} · {partner.years}
                    </p>
                    <span
                      className="mt-auto inline-flex items-center gap-2 text-sm transition-transform group-hover:translate-x-1"
                      style={{ color: partner.brandColor }}
                    >
                      Abrir case →
                    </span>
                  </div>

                  <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[24rem]">
                    <Image
                      src={partner.heroImage}
                      alt={partner.name}
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      style={{ filter: "brightness(0.78) contrast(1.05)" }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `linear-gradient(${
                          reverse ? "270deg" : "90deg"
                        }, ${partner.bgColor}f0 0%, transparent 60%)`,
                      }}
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8 sm:py-20">
          <h2
            className="font-display uppercase leading-[0.92]"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Sua marca também pode entrar nesse capítulo.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-fg/80 sm:text-base">
            Coleções cápsula, drops conjuntos, edições limitadas. Se a sua marca
            entende o que é cultura, manda um e-mail e a gente conversa.
          </p>
          <Link
            href="mailto:parcerias@30praum.com"
            data-cursor="Email parcerias"
            className="mt-8 inline-flex items-center rounded-full border px-6 py-3 text-sm transition-colors hover:bg-white hover:text-black"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
            }}
          >
            parcerias@30praum.com
          </Link>
        </div>
      </section>
    </>
  );
}
