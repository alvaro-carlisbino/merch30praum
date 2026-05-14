import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { BrandLogo } from "@/components/shell/BrandLogo";
import { houseBody, houseDisplay, brandSerif } from "@/styles/fonts";

const ROUTES = [
  { label: "Artistas", href: "/#roster" },
  { label: "Shows", href: "/shows" },
  { label: "Plantão", href: "/plantao" },
  { label: "Loja", href: "/loja" },
  { label: "Lançamentos", href: "/releases" },
  { label: "Notícias", href: "/news" },
  { label: "Incubadora", href: "/incubadora" },
  { label: "Imprensa", href: "/imprensa" },
];

export const metadata = {
  title: "Página não encontrada · 30praum",
  description: "A rota que você buscou não existe.",
};

/**
 * Renderiza fora do (shell), então precisa carregar fonts e estrutura do html
 * por conta própria. Mantém a identidade da marca mesmo quando algo deu errado.
 */
export default function NotFound() {
  return (
    <html
      lang="pt-BR"
      data-theme="house"
      className={`${houseBody.variable} ${houseDisplay.variable} ${brandSerif.variable} antialiased`}
    >
      <body
        className="min-h-screen flex flex-col"
        style={{ background: "var(--bg)", color: "var(--fg)" }}
      >
        <main className="flex-1 flex items-center justify-center px-4 sm:px-8 py-24">
          <div className="w-full max-w-4xl">
            <Compass
              size={48}
              strokeWidth={1}
              className="opacity-30 mb-12"
              style={{ color: "var(--accent)" }}
            />

            <p className="text-sm opacity-55 mb-6">Erro 404</p>

            <h1
              className="font-display uppercase leading-[0.85]"
              style={{
                fontSize: "clamp(3rem, 13vw, 11rem)",
                letterSpacing: "-0.04em",
              }}
            >
              Esse caminho <br /> não existe.
            </h1>

            <p className="mt-10 max-w-xl text-base sm:text-lg text-fg/75 leading-relaxed">
              A rota que você buscou não está nesse mapa. Pode ser que tenha
              sido movida, ou que ainda esteja por vir. Volta pra base e segue
              por outro endereço.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                data-cursor="Voltar"
                className="inline-flex items-center gap-3 px-7 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
              >
                <ArrowLeft size={16} strokeWidth={1.5} />
                Voltar pra base
              </Link>
              <Link
                href="/artistas"
                data-cursor="Roster"
                className="inline-flex items-center gap-2 px-5 py-4 text-xs uppercase tracking-[0.2em] border transition-colors hover:bg-fg/5"
                style={{ borderColor: "var(--border)", color: "var(--fg)" }}
              >
                Conhecer o roster
              </Link>
            </div>

            <div
              className="mt-20 pt-10 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="text-sm opacity-65 mb-5">Endereços ativos</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                {ROUTES.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      data-cursor={r.label}
                      className="hover:opacity-80 transition-opacity inline-flex items-center gap-1.5"
                    >
                      <span aria-hidden style={{ color: "var(--accent)" }}>·</span>
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>

        <footer
          className="border-t py-6"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-8 flex items-center justify-between gap-4">
            <Link href="/" data-cursor="Home" className="text-lg">
              <BrandLogo />
            </Link>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-55">
              Fortaleza · CE
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
