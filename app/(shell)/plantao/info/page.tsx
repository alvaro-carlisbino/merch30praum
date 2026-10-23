import { redirect } from "next/navigation";
import { getCurrentPlantao } from "@/lib/cms/plantao";
import { editionDate } from "@/lib/utils/dates";
export async function generateMetadata() {
  const current = await getCurrentPlantao();
  return {
    title: `Info · Plantão ${current.year}`,
    description:
      "Local, horários e regras de entrada do Plantão Festival.",
  };
}
export default async function PlantaoInfoPage() {
  const current = await getCurrentPlantao();
  if (current.infoFAQ.length === 0) redirect("/plantao");
  return (
    <article>
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 pt-24 pb-16">
        <h1
          className="font-display uppercase leading-[0.85]"
          style={{ fontSize: "clamp(3rem, 11vw, 9rem)", letterSpacing: "-0.04em" }}
        >
          Antes de ir
        </h1>
        <p className="mt-8 max-w-2xl text-base sm:text-xl text-fg/85 leading-relaxed">
          Regras e informações publicadas pela produção do Plantão {current.year}.
        </p>
      </section>
      <section
        className="border-t border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-12 grid gap-8 sm:grid-cols-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">Data</p>
            <p className="mt-2 font-display text-2xl">
              {editionDate(current)}
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
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20">
        <h2
            className="font-display uppercase leading-[0.9]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
          >
            Perguntas frequentes
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
    </article>
  );
}
