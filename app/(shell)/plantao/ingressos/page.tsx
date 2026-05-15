import Link from "next/link";
import { IngressosCheckout } from "@/components/plantao/IngressosCheckout";

export const metadata = {
  title: "Ingressos · Plantão 2026",
  description:
    "Compra de ingressos do Plantão Festival 2026 · 25 de abril · Marina Park · Fortaleza/CE.",
};

const PLANTAO_RED = "#ff2d5a";

export default function PlantaoIngressosPage() {
  return (
    <>
      <section className="mx-auto max-w-screen-2xl px-4 pt-16 pb-10 sm:px-8 sm:pt-20">
        <p
          className="text-[10px] uppercase tracking-[0.4em]"
          style={{ color: PLANTAO_RED }}
        >
          Plantão Festival 2026 · 25 de abril
        </p>
        <h1
          className="mt-4 font-display uppercase leading-[0.92]"
          style={{
            fontSize: "clamp(2.6rem, 6.5vw, 5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Ingressos
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fg/85 sm:text-base">
          Marina Park · Fortaleza/CE · portões abrem 16h. Venda oficial só pela
          30praum — não compre em revendedor não autorizado.
        </p>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 pb-16 sm:px-8 sm:pb-20">
        <IngressosCheckout />
      </section>

      <section
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-3 lg:gap-12">
          <article>
            <h2
              className="font-display uppercase leading-tight"
              style={{
                fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)",
                letterSpacing: "0.01em",
              }}
            >
              Meia-entrada
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-fg/80">
              <li>· Estudante: carteirinha válida (física ou digital)</li>
              <li>· Solidária: 2kg de alimento não-perecível na entrada</li>
              <li>· PCD: meia para acompanhante mediante laudo</li>
              <li>· +60 anos: meia automática com documento original</li>
            </ul>
          </article>

          <article>
            <h2
              className="font-display uppercase leading-tight"
              style={{
                fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)",
                letterSpacing: "0.01em",
              }}
            >
              +16 entra. Transferência off.
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-fg/80">
              <li>· +16 anos entra desacompanhado</li>
              <li>· &lt;16: autorização cartorária dos pais ou responsável +21</li>
              <li>· Transferência de ingresso desativada (anti-cambista)</li>
              <li>· Reembolso: até 7 dias antes do evento</li>
            </ul>
          </article>

          <article>
            <h2
              className="font-display uppercase leading-tight"
              style={{
                fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)",
                letterSpacing: "0.01em",
              }}
            >
              Suporte
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-fg/80">
              <li>
                ·{" "}
                <a
                  href="mailto:ingressos@30praum.com"
                  className="underline transition-colors hover:text-accent"
                >
                  ingressos@30praum.com
                </a>
              </li>
              <li>· @plantaofestival no Instagram</li>
              <li>· Atendimento 11h–19h (seg–sex)</li>
              <li>
                ·{" "}
                <Link
                  href="/plantao/info"
                  className="underline transition-colors hover:text-accent"
                >
                  Regras completas
                </Link>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
