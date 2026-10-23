import { ArrowUpRight } from "lucide-react";
import { NewsletterCapture } from "@/components/shell/NewsletterCapture";
import { getCurrentPlantao } from "@/lib/cms/plantao";
import { editionDate } from "@/lib/utils/dates";

const PLANTAO_RED = "#ff2d5a";

export async function generateMetadata() {
  const current = await getCurrentPlantao();
  return {
    title: `Ingressos · Plantão ${current.year}`,
    description: `Ingressos do Plantão Festival ${current.year}, em Fortaleza.`,
  };
}

export default async function PlantaoIngressosPage() {
  const current = await getCurrentPlantao();
  const salesOpen = Boolean(current.ticketsUrl) && current.status !== "past";

  return (
    <>
      <section className="mx-auto max-w-screen-2xl px-4 pb-14 pt-16 sm:px-8 sm:pt-20">
        <p className="text-sm" style={{ color: PLANTAO_RED }}>
          Plantão {current.year} · {editionDate(current)}
        </p>
        <h1
          className="mt-4 font-display uppercase leading-[0.92]"
          style={{ fontSize: "clamp(2.6rem, 6.5vw, 5rem)", letterSpacing: "-0.02em" }}
        >
          {salesOpen ? "Ingressos" : "Vendas ainda não abriram"}
        </h1>
        {salesOpen ? (
          <>
            <p className="mt-6 max-w-2xl leading-relaxed text-fg/85">
              {current.venue}, {current.city}/{current.state}. A venda é feita pela bilheteria
              oficial do festival. Compre só pelo link abaixo ou pelos perfis oficiais da 30praum.
            </p>
            <a
              href={current.ticketsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white"
              style={{ background: PLANTAO_RED }}
            >
              Comprar na bilheteria oficial
              <ArrowUpRight aria-hidden size={16} />
            </a>
          </>
        ) : (
          <p className="mt-6 max-w-2xl leading-relaxed text-fg/85">
            Assim que a venda abrir, o link oficial aparece aqui e nos perfis da 30praum. Se alguém
            oferecer ingresso antes disso, não compre. Em 2026 a venda foi feita pela ST Ingressos.
          </p>
        )}
      </section>

      {!salesOpen && (
        <NewsletterCapture
          id="lista"
          source="plantao"
          variant="dark"
          title={
            <>
              Avisamos quando
              <br />
              abrir.
            </>
          }
          body={`Data, line-up e abertura das vendas do Plantão ${current.year} chegam por e-mail pra quem está na lista.`}
          buttonLabel="Entrar na lista"
        />
      )}
    </>
  );
}
