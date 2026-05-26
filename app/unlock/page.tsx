import type { Metadata } from "next";
import { UnlockForm } from "./UnlockForm";

export const metadata: Metadata = {
  title: { absolute: "Acesso restrito" },
  description: "Acesso restrito.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: { title: "Acesso restrito", description: "Acesso restrito.", siteName: "", url: undefined, images: [] },
  twitter: { card: "summary", title: "Acesso restrito", description: "Acesso restrito.", creator: undefined },
  authors: [],
  keywords: [],
  alternates: { canonical: undefined },
  category: undefined,
};

export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const safeFrom = typeof from === "string" && from.startsWith("/") && !from.startsWith("//") ? from : "/";

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-16 bg-black text-white">
      <div className="w-full max-w-xl flex flex-col gap-10">
        <header className="flex flex-col gap-4 text-center">
          <p className="text-[11px] tracking-[0.4em] uppercase text-white/40">
            um hub de uma gravadora ai
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.05]"
            style={{ fontFamily: "var(--font-display, serif)" }}
          >
            Nenhuma I.A. foi ferida
            <br />
            no desenvolvimento
            <br />
            desta plataforma.
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Até porque <span className="italic">somos os melhores</span>.
          </p>
        </header>

        <UnlockForm from={safeFrom} />

        <footer className="flex flex-col items-center gap-3 text-center">
          <a
            href="https://limitless.app.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-xs tracking-[0.2em] uppercase text-white/80 transition hover:border-white hover:text-white"
          >
            limitless.app.br ↗
          </a>
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/25">feito à mão por humanos</p>
        </footer>
      </div>
    </div>
  );
}
