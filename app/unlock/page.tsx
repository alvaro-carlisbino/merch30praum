import type { Metadata } from "next";
import { UnlockForm } from "./UnlockForm";

export const metadata: Metadata = {
  title: "Acesso restrito",
  robots: { index: false, follow: false },
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
          <p className="text-[11px] tracking-[0.4em] uppercase text-white/40">30praum · acesso</p>
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
            <span className="block mt-1 text-white/35 text-xs sm:text-sm">
              (com licença, Matuê.)
            </span>
          </p>
        </header>

        <UnlockForm from={safeFrom} />

        <div className="flex flex-col gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 text-center">
            prova
          </span>
          <iframe
            data-testid="embed-iframe"
            src="https://open.spotify.com/embed/track/35df5zF0HOKz9bfNjOA7tZ?utm_source=generator"
            width="100%"
            height={152}
            frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ borderRadius: 12 }}
            title="Somos os Melhores — Matuê"
          />
        </div>

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
