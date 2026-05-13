import Link from "next/link";
import { ARTISTS } from "@/lib/artists/registry";

export const metadata = {
  title: "Sobre",
  description:
    "30praum: gravadora cearense fundada em 2016 por Matuê e Clara Mendes. Casa de Matuê, Wiu, Teto e Brandão85.",
};

export default function AboutPage() {
  return (
    <article>
      <section className="relative mx-auto max-w-screen-2xl px-4 pt-16 pb-12 sm:px-8 sm:pt-20">
        <h1
          className="font-display uppercase leading-[0.92]"
          style={{
            fontSize: "clamp(2.4rem, 5.8vw, 4.8rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Sobre a 30praum
        </h1>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="space-y-6">
            <p
              className="font-display leading-[1.3]"
              style={{
                fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
                letterSpacing: "-0.01em",
              }}
            >
              30praum é gravadora cearense fundada em 2016 por Matuê e Clara
              Mendes — uma alemã que veio aprender português em Fortaleza, ficou
              e virou CEO. A missão sempre foi a mesma: descentralizar o trap
              brasileiro do eixo Rio-SP e colocar o Nordeste no centro do mapa.
            </p>
            <p className="text-base sm:text-lg text-fg/85 leading-relaxed">
              Hoje a casa tem cerca de 50 funcionários divididos entre a sede em
              Fortaleza e o escritório de apoio em São Paulo. Quatro almas
              integram o roster principal — Matuê, Wiu, Teto e Brandão85. Três
              álbuns abertos: XTRANHO (2025), Colapso Global (2026) e Isso é
              Trap Vol.02 (2026).
            </p>
            <p className="text-base sm:text-lg text-fg/85 leading-relaxed">
              Em 2024, o álbum 333 do Matuê bateu o recorde de maior estreia do
              Spotify Brasil e ultrapassou 950 milhões de reproduções. No mesmo
              ano, o Plantão Festival — palco próprio em Fortaleza — reuniu 30
              mil pessoas em dois dias. Em 2026, a gravadora completa 10 anos.
            </p>
          </div>

          <aside className="space-y-4">
            {[
              ["Fundação", "2016 · Fortaleza, CE"],
              ["Founders", "Matuê · Clara Mendes"],
              ["Time", "~50 funcionários · Fortaleza + SP"],
              ["Distribuição", "Independente · distribuidora própria 2026"],
              ["Festival próprio", "Plantão · 30k pessoas · Marina Park"],
              ["Roster principal", "Matuê · Wiu · Teto · Brandão85"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[auto_1fr] gap-4 items-baseline pb-3"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <dt className="text-[10px] uppercase tracking-[0.3em] text-muted">
                  {label}
                </dt>
                <dd className="text-sm">{value}</dd>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section
        className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
          Roster principal
        </p>
        <h2
          className="mt-3 font-display leading-[0.95]"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            letterSpacing: "-0.02em",
          }}
        >
          As quatro almas da casa.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.values(ARTISTS).map((a) => (
            <Link
              key={a.slug}
              href={`/${a.slug}`}
              data-cursor={`Ver · ${a.displayName}`}
              className="group block rounded-2xl p-6 transition-transform hover:scale-[1.02]"
              style={{
                background: a.panelBackground,
                color: "#fff",
              }}
            >
              <p
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ color: a.panelAccent }}
              >
                {a.universeName}
              </p>
              <p
                className="mt-3 font-display"
                style={{ fontSize: "1.75rem", letterSpacing: "0.01em" }}
              >
                {a.displayName}
              </p>
              <p className="mt-2 text-xs text-white/65">
                {a.realName} · {a.origin}
              </p>
              <p className="mt-3 text-xs text-white/55">
                Entrou em {a.joinedYear}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
