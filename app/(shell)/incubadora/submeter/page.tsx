import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SubmissionForm } from "@/components/incubadora/SubmissionForm";
import { INCUBADORA } from "@/lib/incubadora/registry";

export const metadata = {
  title: "Submeter demo · Incubadora 30praum",
  description:
    "Formulário oficial de submissão da Incubadora 30praum. Spotify, SoundCloud, história curta.",
};

export default function SubmeterPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-8 py-20">
      <Link
        href="/incubadora"
        className="inline-flex items-center gap-2 text-sm opacity-65 hover:opacity-100"
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        Incubadora
      </Link>

      <h1
          className="mt-8 font-display uppercase leading-[0.85]"
          style={{ fontSize: "clamp(2.5rem, 9vw, 7rem)", letterSpacing: "-0.04em" }}
        >
          Manda o que <br /> você tem.
        </h1>
        <p className="mt-6 text-fg/85 leading-relaxed">
          Sem currículo, sem prova, sem deadline. Manda Spotify, conta a história em até 500
          caracteres, deixa um canal de contato e a gente escuta. Se interessar, te procuramos.
        </p>
<div className="mt-12">
        <SubmissionForm />
      </div>

      <p className="mt-12 text-xs text-fg/55 leading-relaxed">
        Contato direto fora do formulário:{" "}
        <a
          href={`mailto:${INCUBADORA.formFields.contactEmail}`}
          className="underline"
          style={{ color: "var(--accent)" }}
        >
          {INCUBADORA.formFields.contactEmail}
        </a>{" "}
        — só para questões sobre o programa, não para envio de música.
      </p>
    </article>
  );
}
