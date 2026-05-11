import Link from "next/link";
import Image from "next/image";
import { ALBUMS, STATUS_LABEL, type AlbumSlug } from "@/lib/albums/registry";

/**
 * Seção curatorial — picks editoriais escolhidos a dedo, não algorítmicos.
 * Inspirada em "Dungeon Favorites" da Stones Throw: capa dominante, copy
 * poética curta, status badge editorial. Apresenta o catálogo como gosto,
 * não como inventário.
 */

// 4 picks selecionados editorialmente
const PICKS: { slug: AlbumSlug; pitch: string }[] = [
  {
    slug: "xtranho",
    pitch: "Sinal alien em transmissão estável.",
  },
  {
    slug: "colapso-global",
    pitch: "Duas vozes, um colapso bonito.",
  },
  {
    slug: "isso-e-trap-vol-2",
    pitch: "Xerox da quebrada em alta densidade.",
  },
  {
    // pick especial — referência a Máquina do Tempo (Matuê 2020) como clássico
    slug: "xtranho", // re-aponta enquanto não existe Máquina do Tempo no registry
    pitch: "O começo de tudo, ainda tocando.",
  },
];

export function EleitosDaCasa() {
  const picks = PICKS.slice(0, 3); // 3 picks definitivos (sem repetir xtranho)

  return (
    <section
      className="border-t"
      style={{ borderColor: "var(--border)" }}
      aria-labelledby="eleitos-da-casa"
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24">
        <header className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end mb-12">
          <h2
            id="eleitos-da-casa"
            className="font-display leading-[0.92]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Eleitos da casa.
          </h2>
          <p className="text-sm sm:text-base text-muted leading-relaxed max-w-sm italic">
            Não é o que tocou mais. É o que importa mais.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map(({ slug, pitch }, idx) => {
            const album = ALBUMS[slug];
            if (!album) return null;
            return (
              <Link
                key={`${slug}-${idx}`}
                href={`/album/${slug}`}
                data-cursor={album.title}
                className="group block"
              >
                <div
                  className="relative aspect-square overflow-hidden"
                  style={{ background: album.bgHex }}
                >
                  <Image
                    src={album.coverImage}
                    alt={album.title}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  {album.status && (
                    <span
                      className="absolute top-3 left-3 px-2 py-1 text-[9px] uppercase tracking-[0.25em]"
                      style={{
                        background: "rgba(0,0,0,0.75)",
                        color: album.accentHex,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {STATUS_LABEL[album.status]}
                    </span>
                  )}
                </div>

                <div className="mt-4 px-1">
                  <p
                    className="text-base sm:text-lg italic leading-snug"
                    style={{ color: "var(--fg)" }}
                  >
                    "{pitch}"
                  </p>
                  <p className="mt-3 text-xs opacity-65 tabular-nums">
                    {album.title} · {album.artists.map((a) => a.name).join(" · ")} · {album.year}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12">
          <Link
            href="/releases"
            data-cursor="Catálogo"
            className="inline-flex items-center gap-2 text-sm hover:opacity-80"
            style={{ color: "var(--accent)" }}
          >
            Ver catálogo completo →
          </Link>
        </div>
      </div>
    </section>
  );
}
