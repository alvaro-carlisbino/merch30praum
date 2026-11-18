import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getAllAlbums, getAlbum } from "@/lib/cms/albums";
import { Mural } from "@/components/mural/Mural";

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  const all = await getAllAlbums();
  return all.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const album = await getAlbum(slug);
  if (!album) return {};
  return { title: album.title, description: album.about };
}

const LINE = "rgba(255,255,255,0.12)";

export default async function AlbumPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const album = await getAlbum(slug);
  if (!album) notFound();

  const artistNames = album.artists.map((a) => a.name).join(" e ");
  const released = new Date(`${album.releaseDate}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article style={{ background: album.bgHex, color: "#f5f5f5" }}>
      <section className="mx-auto grid max-w-screen-2xl gap-10 px-4 pb-20 pt-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16 lg:pt-24">
        <div className="relative mx-auto aspect-square w-full max-w-[600px] overflow-hidden border border-white/10">
          <Image
            src={album.coverImage}
            alt={`Capa de ${album.title}`}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm text-white/60">
            {album.artists.map((a, i) => (
              <span key={a.slug}>
                {i > 0 && " e "}
                <Link href={`/${a.slug}`} className="underline-offset-4 hover:underline">
                  {a.name}
                </Link>
              </span>
            ))}
          </p>
          <h1
            className="mt-2 font-display uppercase leading-[0.9] tracking-[-0.03em]"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            {album.title}
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-white/80">{album.about}</p>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <div>
              <dt className="text-white/50">Lançamento</dt>
              <dd className="mt-1">{released}</dd>
            </div>
            <div>
              <dt className="text-white/50">Faixas</dt>
              <dd className="mt-1 tabular-nums">{album.tracks.length}</dd>
            </div>
            {album.duration && (
              <div>
                <dt className="text-white/50">Duração</dt>
                <dd className="mt-1">{album.duration}</dd>
              </div>
            )}
          </dl>
          <div className="mt-8 flex flex-wrap gap-2">
            {album.streamingLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 border px-4 py-3 text-xs transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: "rgba(255,255,255,0.25)" }}
              >
                {link.label}
                <ArrowUpRight aria-hidden size={14} strokeWidth={1.6} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="faixas"
        className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8"
        style={{ borderTop: `1px solid ${LINE}` }}
      >
        <h2 id="faixas" className="mb-8 font-display text-3xl uppercase sm:text-4xl">
          Faixas
        </h2>
        <ol>
          {album.tracks.map((track, i) => (
            <li
              key={track.title}
              className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 py-4 sm:grid-cols-[3rem_1fr_auto]"
              style={{ borderTop: `1px solid ${LINE}` }}
            >
              <span className="text-xs tabular-nums" style={{ color: album.accentHex }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg uppercase tracking-tight sm:text-2xl">
                {track.title}
              </span>
              {track.featured && (
                <span className="col-start-2 text-xs text-white/55 sm:col-start-auto">
                  com {track.featured}
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      <Mural room={`album-${album.slug}`} title={album.title} accentHex={album.accentHex} bgHex={album.bgHex} />

      <section
        className="mx-auto flex max-w-screen-2xl flex-wrap items-end justify-between gap-6 px-4 py-16 sm:px-8"
        style={{ borderTop: `1px solid ${LINE}` }}
      >
        <div>
          <h2 className="font-display text-3xl uppercase sm:text-4xl">Peças de {artistNames}</h2>
          <p className="mt-2 max-w-md text-sm text-white/65">
            Merch oficial na loja da 30praum. Todo pedido sai em security bag lacrada.
          </p>
        </div>
        <Link
          href={`/catalogo?artista=${album.dropArtistSlug}`}
          className="inline-flex items-center px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
          style={{ background: album.accentHex, color: album.bgHex }}
        >
          Ver na loja
        </Link>
      </section>
    </article>
  );
}
