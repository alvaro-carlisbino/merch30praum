import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALBUM_SLUGS, ALBUMS, isAlbumSlug } from "@/lib/albums/registry";
import { ARTISTS } from "@/lib/artists/registry";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { Marquee } from "@/components/motion/Marquee";
import { PhysicalMedia } from "@/components/ui/PhysicalMedia";

interface Params {
  slug: string;
}

export function generateStaticParams() {
  return ALBUM_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  if (!isAlbumSlug(slug)) return {};
  const album = ALBUMS[slug];
  return { title: album.title, description: album.tagline };
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  if (!isAlbumSlug(slug)) notFound();
  const album = ALBUMS[slug];
  const dropArtist = ARTISTS[album.dropArtistSlug];

  return (
    <article style={{ background: album.bgHex, color: "#f5f5f5" }}>
      <section
        className="relative min-h-[100vh] overflow-hidden"
        style={{
          background: `radial-gradient(circle at 25% 25%, ${album.accentHex}33, transparent 55%), ${album.bgHex}`,
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, transparent 60%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-8 pt-20 pb-24 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 lg:items-center">
          <ScrollReveal stagger={0.1}>
            <p
              className="text-[10px] uppercase tracking-[0.4em]"
              style={{ color: album.accentHex }}
            >
              Álbum oficial · 30praum
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-white/55">
              {album.artists.map((a) => a.name).join(" × ")}
            </p>
          </ScrollReveal>

          <div />

          <div>
            <WordReveal
              text={album.title}
              as="h1"
              className="font-display uppercase leading-[0.85]"
              wordClassName="text-[clamp(3.5rem,12vw,12rem)] tracking-[-0.04em]"
            />

            <ScrollReveal stagger={0.12}>
              <p
                className="mt-8 max-w-xl font-display italic"
                style={{
                  fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)",
                  lineHeight: 1.35,
                }}
              >
                “{album.tagline}”
              </p>

              <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.3em] text-white/70">
                <div>
                  <dt>Lançamento</dt>
                  <dd className="mt-1 text-white">
                    {new Date(album.releaseDate).toLocaleDateString("pt-BR")}
                  </dd>
                </div>
                <div>
                  <dt>Faixas</dt>
                  <dd className="mt-1 text-white tabular-nums">{album.totalTracks}</dd>
                </div>
                <div>
                  <dt>Duração</dt>
                  <dd className="mt-1 text-white">{album.duration}</dd>
                </div>
                <div>
                  <dt>Ano</dt>
                  <dd className="mt-1 text-white tabular-nums">{album.year}</dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap gap-2">
                {album.streamingLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="px-4 py-3 text-[10px] uppercase tracking-[0.3em] border transition-colors hover:bg-white hover:text-black"
                    style={{ borderColor: "rgba(255,255,255,0.25)" }}
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:order-first lg:col-start-1 lg:row-start-2 lg:row-span-2">
            <div className="relative aspect-square w-full max-w-[640px] mx-auto">
              <PhysicalMedia
                src={album.coverImage}
                alt={`Capa ${album.title}`}
              />
            </div>
          </div>
        </div>
      </section>

      <Marquee
        items={album.tracks.map((t) => t.title.toUpperCase())}
        speed={60}
        className="font-display py-5 tracking-[0.2em] text-2xl sm:text-4xl border-y"
        separatorColor={album.accentHex}
      />

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20 grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/55">
            Manifesto
          </p>
          <h2
            className="mt-3 font-display leading-[0.95]"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.02em",
              color: album.accentHex,
            }}
          >
            {album.year}
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger={0.15}>
          <p
            className="font-display leading-snug"
            style={{ fontSize: "clamp(1.3rem, 2vw, 1.9rem)" }}
          >
            {album.manifesto}
          </p>
        </ScrollReveal>
      </section>

      <section
        className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
      >
        <header className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/55">
              Tracklist
            </p>
            <h2
              className="mt-3 font-display leading-[0.95]"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {album.totalTracks} faixas
            </h2>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/55 tabular-nums">
            {album.duration}
          </span>
        </header>

        <ol className="divide-y" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          {album.tracks.map((track, i) => (
            <li
              key={`${i}-${track.title}`}
              className="grid grid-cols-[3rem_1fr_auto_5rem] items-center py-4 gap-4"
              style={{ borderTop: i === 0 ? "1px solid rgba(255,255,255,0.12)" : undefined }}
            >
              <span
                className="text-[10px] tabular-nums uppercase tracking-[0.3em]"
                style={{ color: album.accentHex }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg sm:text-2xl uppercase tracking-tight">
                {track.title}
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/55">
                {track.featured ? `feat. ${track.featured}` : ""}
              </span>
              <span className="text-xs tabular-nums text-white/70 text-right">
                {track.duration}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20"
        style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
      >
        <ScrollReveal stagger={0.12}>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/55">
            Drop relacionado
          </p>
          <h2
            className="mt-3 font-display leading-[0.92]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Vista o universo {dropArtist.displayName}.
          </h2>
          <p className="mt-4 max-w-xl text-white/75">
            {dropArtist.drop.chapterName} · {dropArtist.drop.availabilityNote}
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Link
            href={`/${dropArtist.slug}`}
            className="group relative block aspect-[4/5] overflow-hidden"
            style={{ background: dropArtist.panelBackground }}
          >
            <Image
              src={dropArtist.portraitImage}
              alt=""
              fill
              sizes="33vw"
              className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-[1.04]"
              unoptimized
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 50%, ${album.bgHex} 100%)`,
              }}
            />
            <div className="relative flex h-full flex-col justify-end p-6">
              <p
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ color: dropArtist.panelAccent }}
              >
                {dropArtist.drop.statusLabel}
              </p>
              <p
                className="mt-2 font-display text-2xl"
                style={{ letterSpacing: "-0.01em" }}
              >
                Hub {dropArtist.displayName}
              </p>
            </div>
          </Link>

          <Link
            href={`/${dropArtist.slug}#drop`}
            className="group relative block aspect-[4/5] overflow-hidden p-6 flex flex-col justify-between"
            style={{
              background: album.accentHex,
              color: album.bgHex,
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-70">
              Comprar
            </p>
            <div>
              <p
                className="font-display text-2xl sm:text-3xl"
                style={{ letterSpacing: "-0.01em" }}
              >
                Drop oficial {album.title}
              </p>
              <p className="mt-2 text-sm">Peças carimbadas · enviado em security bag</p>
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em]">Ver peças →</span>
          </Link>

          <Link
            href="/"
            className="group relative block aspect-[4/5] overflow-hidden p-6 flex flex-col justify-between"
            style={{
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/55">
              Mais álbuns
            </p>
            <div>
              <p
                className="font-display text-2xl sm:text-3xl"
                style={{ letterSpacing: "-0.01em" }}
              >
                Voltar ao hub
              </p>
              <p className="mt-2 text-sm text-white/65">
                Outros 3 universos da casa
              </p>
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em]">30praum.store →</span>
          </Link>
        </div>
      </section>
    </article>
  );
}
