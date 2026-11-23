import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { BrandLogo } from "@/components/shell/BrandLogo";
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

export function NotFoundContent() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-24">
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
        </div>
  );
}
