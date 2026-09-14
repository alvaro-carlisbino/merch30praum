import Link from "next/link";
import { IngressosCheckout } from "@/components/plantao/IngressosCheckout";
import { NewsletterCapture } from "@/components/shell/NewsletterCapture";
import { getCurrentPlantao, getPastPlantao } from "@/lib/cms/plantao";

const PLANTAO_RED = "#ff2d5a";

function longDate(iso: string) {
  return new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

function brl(n: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(n);
}

const SECTOR_STATUS: Record<string, string> = {
  available: "Vendido",
  soldout: "Esgotou",
  upcoming: "Não abriu",
};

export async function generateMetadata() {
  const current = await getCurrentPlantao();
  return {
    title: `Ingressos · Plantão ${current.year}`,
    description: `Ingressos do Plantão Festival ${current.year} em Fortaleza. Venda oficial só pela 30praum.`,
  };
}

export default async function PlantaoIngressosPage() {
  const [current, past] = await Promise.all([getCurrentPlantao(), getPastPlantao()]);
  const last = past[0] ?? null;
  const salesOpen = current.sectors.length > 0 && Boolean(current.ticketsUrl);
  const dateLabel = `${longDate(current.date)} · ${current.venue} · ${current.city}/${current.state}`;

  return (
    <>
      <section className="mx-auto max-w-screen-2xl px-4 pt-16 pb-10 sm:px-8 sm:pt-20">
        <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: PLANTAO_RED }}>
          Plantão Festival {current.year} · {longDate(current.date)}
        </p>
        <h1
          className="mt-4 font-display uppercase leading-[0.92]"
          style={{ fontSize: "clamp(2.6rem, 6.5vw, 5rem)", letterSpacing: "-0.02em" }}
        >
          {salesOpen ? "Ingressos" : "Vendas ainda não abriram."}
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fg/85 sm:text-base">
          {salesOpen
            ? `${current.venue} · ${current.city}/${current.state} · portões abrem ${current.doorsAt}. Venda oficial só pela 30praum. Não compre em revendedor não autorizado.`
            : `Quem está na lista de espera recebe setores, preços e o link da pré-venda antes de qualquer outro lugar. Venda oficial só pela 30praum: qualquer ingresso do Plantão ${current.year} vendido hoje é golpe.`}
        </p>
      </section>

      {salesOpen ? (
        <section className="mx-auto max-w-screen-2xl px-4 pb-16 sm:px-8 sm:pb-20">
          <IngressosCheckout editionTitle={current.title} dateLabel={dateLabel} year={current.year} />
        </section>
      ) : (
        <NewsletterCapture
          id="lista"
          source="plantao"
          variant="dark"
          title={
            <>
              Pré-venda antes
              <br />
              de todo mundo.
            </>
          }
          body={`Line-up, setores e abertura de vendas do Plantão ${current.year} saem primeiro pra quem está na lista.`}
          buttonLabel="Entrar na lista"
        />
      )}

      {!salesOpen && last && last.sectors.length > 0 && (
        <section className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8 sm:py-20" aria-labelledby="setores-ref">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2
              id="setores-ref"
              className="font-display uppercase leading-tight"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "0.01em" }}
            >
              Como foi em {last.year}
            </h2>
            <p className="text-sm text-muted">Referência de setores e faixas de preço da última edição.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {last.sectors.map((sec) => (
              <li
                key={sec.name}
                className="rounded-2xl border p-5"
                style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--fg) 3%, var(--bg))" }}
              >
                <p className="font-display text-xl uppercase leading-tight">{sec.name}</p>
                <p className="mt-2 font-display text-2xl tabular-nums" style={{ color: PLANTAO_RED }}>
                  {sec.priceFrom ? brl(sec.priceFrom) : "a definir"}
                  {sec.priceTo ? <span className="text-base text-muted"> a {brl(sec.priceTo)}</span> : null}
                </p>
                {sec.perks && <p className="mt-2 text-xs text-muted">{sec.perks}</p>}
                <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted">{SECTOR_STATUS[sec.status] ?? sec.status}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
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
