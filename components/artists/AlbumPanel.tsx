import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ExternalLink = { label: string; href: string };

interface Props {
  cover: string;
  albumTitle: string;
  albumHref?: string;
  stats: { label: string; value: string }[];
  listenLinks: ExternalLink[];
  socials: ExternalLink[];
}

export function AlbumPanel({ cover, albumTitle, albumHref, stats, listenLinks, socials }: Props) {
  return (
    <section
      aria-labelledby="album-panel"
      className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-8 sm:py-12"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-white">
          <Image
            src={cover}
            alt={`Capa de ${albumTitle}`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col justify-between gap-10">
          <div>
            <p className="text-xs text-muted">Último disco</p>
            <h2
              id="album-panel"
              className="mt-2 font-display uppercase leading-none"
              style={{ fontSize: "clamp(2rem, 4.6vw, 3.8rem)", letterSpacing: "0.02em" }}
            >
              {albumTitle}
            </h2>
            <dl className="mt-8 grid grid-cols-2 gap-y-5 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs text-muted">{s.label}</dt>
                  <dd className="mt-1 text-base">{s.value}</dd>
                </div>
              ))}
            </dl>
            <PillRow links={listenLinks} />
            {albumHref && (
              <Link
                href={albumHref}
                className="mt-6 inline-block text-sm underline underline-offset-4 hover:text-accent"
              >
                Faixas e participações
              </Link>
            )}
          </div>
          <div>
            <p className="text-xs text-muted">Redes</p>
            <PillRow links={socials} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PillRow({ links }: { links: ExternalLink[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs transition-colors hover:bg-white hover:text-black"
          style={{ borderColor: "var(--border)" }}
        >
          {l.label}
          <ArrowUpRight aria-hidden size={14} strokeWidth={1.6} />
        </a>
      ))}
    </div>
  );
}
