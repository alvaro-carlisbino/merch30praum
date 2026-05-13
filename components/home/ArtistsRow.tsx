import Image from "next/image";
import Link from "next/link";
import { ARTISTS } from "@/lib/artists/registry";
import type { ArtistSlug } from "@/lib/artists/types";

const ORDER: ArtistSlug[] = ["teto", "wiu", "matue", "brandao"];

export function ArtistsRow() {
  // ordem visual: TETO · WIU · [logo card] · MATUÊ · BRANDÃO
  const left = ORDER.slice(0, 2);
  const right = ORDER.slice(2);

  return (
    <section
      aria-label="Artistas da 30praum"
      className="relative px-4 py-12 sm:px-8 sm:py-16"
    >
      <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
        {left.map((slug) => (
          <ArtistCard key={slug} slug={slug} />
        ))}

        <CenterLogoCard />

        {right.map((slug) => (
          <ArtistCard key={slug} slug={slug} />
        ))}
      </div>
    </section>
  );
}

type TagStyle = {
  label: string;
  font: string;
  color: string;
  rotate: string;
  size: string;
};

const TAG: Record<ArtistSlug, TagStyle & { photo: string; objectPosition: string }> = {
  matue: {
    label: "Matuê",
    font: "var(--font-tag-matue, cursive)",
    color: "#ffffff",
    rotate: "-3deg",
    size: "clamp(1.4rem, 2.2vw, 2.2rem)",
    photo: "/figma-home/card-matue.png",
    objectPosition: "center center",
  },
  wiu: {
    label: "Wiu",
    font: "var(--font-tag-wiu, serif)",
    color: "#ff2d1f",
    rotate: "0deg",
    size: "clamp(1.8rem, 2.8vw, 2.8rem)",
    photo: "/figma-home/card-wiu.png",
    objectPosition: "center center",
  },
  teto: {
    label: "Teto",
    font: "var(--font-tag-teto, cursive)",
    color: "#ffffff",
    rotate: "-3deg",
    size: "clamp(1.4rem, 2.2vw, 2.2rem)",
    photo: "/figma-home/card-teto.png",
    objectPosition: "center center",
  },
  brandao: {
    label: "Brandão",
    font: "var(--font-tag-brandao, cursive)",
    color: "#ffffff",
    rotate: "-2deg",
    size: "clamp(1.9rem, 3vw, 3rem)",
    photo: "/figma-home/card-brandao.png",
    objectPosition: "center center",
  },
};

function ArtistCard({ slug }: { slug: ArtistSlug }) {
  const artist = ARTISTS[slug];
  return (
    <Link
      href={`/${slug}`}
      data-cursor={artist.displayName}
      className="group relative block overflow-hidden rounded-2xl"
      style={{
        aspectRatio: "3 / 4",
        background: artist.panelBackground,
      }}
    >
      <Image
        src={TAG[slug].photo}
        alt={artist.displayName}
        fill
        sizes="(min-width: 640px) 20vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        style={{
          objectPosition: TAG[slug].objectPosition,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.72) 100%)",
        }}
      />
      <span
        className="absolute bottom-4 left-4 right-4 leading-[0.85]"
        style={{
          fontFamily: TAG[slug].font,
          color: TAG[slug].color,
          fontSize: TAG[slug].size,
          letterSpacing: "-0.01em",
          transform: `rotate(${TAG[slug].rotate})`,
          transformOrigin: "left bottom",
          textShadow: "0 2px 14px rgba(0,0,0,0.6)",
        }}
      >
        {TAG[slug].label}
      </span>
    </Link>
  );
}

function CenterLogoCard() {
  return (
    <div className="relative col-span-2 flex flex-col items-center sm:col-span-1">
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ aspectRatio: "3 / 4", background: "#000" }}
      >
        <Image
          src="/figma-home/card-30praum.png"
          alt="30 PRAUM"
          fill
          sizes="(min-width: 640px) 20vw, 100vw"
          className="object-cover"
        />
      </div>

      <Link
        href="/about"
        data-cursor="Descubra mais"
        className="mt-4 inline-flex items-center rounded-full border px-5 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
        style={{
          borderColor: "var(--accent)",
          color: "var(--accent)",
        }}
      >
        Descubra mais
      </Link>
    </div>
  );
}
