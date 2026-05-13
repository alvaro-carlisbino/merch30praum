import { getCurrentPlantao } from "@/lib/plantao/registry";
import { IngressosTable } from "@/components/plantao/IngressosTable";

export const metadata = {
  title: "Ingressos · Plantão 2026",
  description: "Setores, preços, política de meia e compra oficial via ST Ingressos.",
};

export default function PlantaoIngressosPage() {
  const current = getCurrentPlantao();

  return (
    <article>
      {/* Hero */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 pt-24 pb-16">
        <h1
          className="font-display uppercase leading-[0.85]"
          style={{ fontSize: "clamp(3rem, 11vw, 9rem)", letterSpacing: "-0.04em" }}
        >
          Ingressos · Plantão {current.year}
        </h1>
        <p className="mt-6 max-w-3xl text-base sm:text-xl text-fg/85 leading-relaxed">
          {current.tagline} · {current.venue}, {current.city} · portões {current.doorsAt}
        </p>
      </section>

      {/* Sectors */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 pb-24">
        <h2
            className="font-display uppercase leading-[0.9]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            Escolhe o seu lugar.
          </h2>
<div className="mt-10">
          <IngressosTable sectors={current.sectors} ticketsUrl={current.ticketsUrl} />
        </div>

        <p className="mt-6 text-xs text-fg/55 max-w-2xl leading-relaxed">
          Preços de acordo com lote vigente — sujeitos a alteração sem aviso prévio.
          Toda venda passa pela ST Ingressos (emissora oficial). Não compre em revendedor não autorizado.
        </p>
      </section>

      {/* Embed ST Ingressos */}
      {current.embedTicketsUrl && (
        <section
          className="border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-16">
            <h2 className="mb-6 font-display text-xl" style={{ letterSpacing: "-0.01em" }}>
              Checkout · ST Ingressos
            </h2>
            <div
              className="relative overflow-hidden border"
              style={{ borderColor: "var(--border)", height: "min(720px, 80vh)" }}
            >
              <iframe
                src={current.embedTicketsUrl}
                title="Checkout ST Ingressos"
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-4 text-xs opacity-55">
              Caso a janela não carregue, abra diretamente em{" "}
              <a
                href={current.ticketsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                stingressos.com.br →
              </a>
            </p>
          </div>
        </section>
      )}

      {/* Meia / regras */}
      <section
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20 grid gap-12 lg:grid-cols-2">
          <article>
            <h2
              className="font-display uppercase leading-[0.95]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              Meia: estudante ou solidária.
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-fg/80 leading-relaxed">
              <li>· Estudante: carteirinha válida (física ou digital)</li>
              <li>· Solidária: 2kg de alimento não-perecível na entrada</li>
              <li>· PCD: meia para acompanhante mediante laudo</li>
              <li>· Idosos: meia automática com documento original</li>
            </ul>
          </article>

          <article>
            <h2
              className="font-display uppercase leading-[0.95]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              +16 entra. <br /> Transferência off.
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-fg/80 leading-relaxed">
              <li>· +16 anos entra desacompanhado</li>
              <li>· &lt;16: autorização cartorária dos pais ou responsável +21</li>
              <li>· Transferência de ingresso desativada (anti-cambista)</li>
              <li>· Reembolso: 7 dias antes do evento, conforme regulamento</li>
            </ul>
          </article>
        </div>
      </section>
    </article>
  );
}
