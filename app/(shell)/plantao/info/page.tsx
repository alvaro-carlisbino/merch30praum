import { getCurrentPlantao } from "@/lib/plantao/registry";

export const metadata = {
  title: "Info · Plantão 2026",
  description:
    "Local, regras de entrada, acessibilidade, faixa etária, política de meia e tudo o que você precisa saber antes de ir.",
};

export default function PlantaoInfoPage() {
  const current = getCurrentPlantao();

  return (
    <article>
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 pt-24 pb-16">
        <h1
          className="font-display uppercase leading-[0.85]"
          style={{ fontSize: "clamp(3rem, 11vw, 9rem)", letterSpacing: "-0.04em" }}
        >
          Antes de ir.
        </h1>
        <p className="mt-8 max-w-2xl text-base sm:text-xl text-fg/85 leading-relaxed">
          Informação oficial do Plantão {current.year}. Se algo aqui contradiz uma rede social,
          vale o que está aqui.
        </p>
      </section>

      {/* Quick facts */}
      <section
        className="border-t border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-12 grid gap-8 sm:grid-cols-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">Data</p>
            <p className="mt-2 font-display text-2xl">
              {new Date(current.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">Portões</p>
            <p className="mt-2 font-display text-2xl">{current.doorsAt}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">Local</p>
            <p className="mt-2 font-display text-2xl">{current.venue}</p>
            <p className="text-xs opacity-65">
              {current.city} · {current.state}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">Transmissão</p>
            <p className="mt-2 font-display text-2xl">YouTube</p>
            <p className="text-xs opacity-65">Canal 30praum</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20">
        <h2
            className="font-display uppercase leading-[0.9]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
          >
            Tira-dúvidas.
          </h2>
<div className="mt-12 grid gap-3">
          {current.infoFAQ.map((q, idx) => (
            <details
              key={q.question}
              className="border p-6 group"
              style={{ borderColor: "var(--border)" }}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <span className="font-display text-lg sm:text-xl leading-tight">
                  <span
                    className="mr-3 text-[11px] uppercase tracking-[0.3em] opacity-60"
                    style={{ color: "var(--accent)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {q.question}
                </span>
                <span
                  className="text-2xl opacity-60 transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-5 text-sm sm:text-base text-fg/80 leading-relaxed">{q.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA contact */}
      <section
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2
              className="font-display uppercase leading-[0.9]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
            >
              Não encontrou? <br /> Fala com a produção.
            </h2>
            <p className="mt-4 text-fg/80 max-w-md">
              Atendimento via ST Ingressos para questões de compra. Para imprensa, parcerias e
              produção do festival, escreve direto para o time da 30praum.
            </p>
          </div>
          <div className="grid gap-3 text-sm">
            <a href="mailto:plantao@30praum.com" className="opacity-80 hover:opacity-100">
              plantao@30praum.com
            </a>
            <a href="mailto:imprensa@30praum.com" className="opacity-80 hover:opacity-100">
              imprensa@30praum.com
            </a>
            <a
              href="https://stingressos.com.br/suporte"
              target="_blank"
              rel="noreferrer noopener"
              className="opacity-80 hover:opacity-100"
            >
              Suporte ST Ingressos →
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
