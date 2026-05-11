import Link from "next/link";
import { ARTISTS, ARTIST_SLUGS } from "@/lib/artists/registry";
import { WordReveal } from "@/components/motion/WordReveal";
import { RosterImmersive } from "@/components/artists/RosterImmersive";

export const metadata = {
  title: "Artistas · 30praum",
  description:
    "Roster oficial da 30praum — Matuê, Wiu, Teto, Brandão85. Cada artista, um universo.",
};

export default function ArtistasPage() {
  const artists = ARTIST_SLUGS.map((s) => ARTISTS[s]);

  return (
    <article>
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 pt-24 pb-12">
        <WordReveal
          text="Quatro almas. Uma assinatura."
          as="h1"
          className="font-display uppercase leading-[0.85]"
          stagger={0.08}
          wordClassName="text-[clamp(2.5rem,10vw,9rem)] tracking-[-0.04em]"
        />
        <p className="mt-8 max-w-2xl text-base sm:text-lg text-fg/80 leading-relaxed">
          Cada artista da casa tem universo próprio. Quem manda é a 30praum.
        </p>
      </section>

      <div className="border-y" style={{ borderColor: "var(--border)" }}>
        <RosterImmersive artists={artists} />
      </div>
      <p className="mx-auto max-w-screen-2xl px-4 sm:px-8 pt-6 pb-24 text-xs opacity-55">
        Passe o cursor sobre um artista para entrar no universo dele.
      </p>

      {/* Incubadora CTA */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2
              className="font-display uppercase leading-[0.9]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Quer chegar até aqui?
            </h2>
            <p className="mt-4 max-w-md text-fg/80">
              A Incubadora é o canal de candidatura. O A&R lê tudo, sem deadline e sem fila.
            </p>
          </div>
          <Link
            href="/incubadora"
            className="inline-flex items-center gap-3 px-8 py-5 text-xs uppercase tracking-[0.3em] font-medium transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Incubadora →
          </Link>
        </div>
      </section>
    </article>
  );
}
