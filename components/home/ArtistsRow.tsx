import Image from "next/image";
import Link from "next/link";
import { ARTISTS } from "@/lib/artists/registry";
import type { ArtistSlug } from "@/lib/artists/types";

const ORDER: ArtistSlug[] = ["teto", "wiu", "matue", "brandao"];

type CardConfig = {
  photo: string;
  name: string;
  nameAspect: string;
  nameWidth: string;
};

const CARDS: Record<ArtistSlug, CardConfig> = {
  matue: {
    photo: "/figma-home/card-matue.png",
    name: "/figma-home/name-matue-small.png",
    nameAspect: "215 / 215",
    nameWidth: "min(48%, 110px)",
  },
  wiu: {
    photo: "/figma-home/card-wiu.png",
    name: "/figma-home/name-wiu-small.png",
    nameAspect: "185 / 185",
    nameWidth: "min(38%, 90px)",
  },
  teto: {
    photo: "/figma-home/card-teto.png",
    name: "/figma-home/name-teto-small.png",
    nameAspect: "165 / 53",
    nameWidth: "min(50%, 120px)",
  },
  brandao: {
    photo: "/figma-home/card-brandao.png",
    name: "/figma-home/name-brandao-small.png",
    nameAspect: "190 / 64",
    nameWidth: "min(60%, 150px)",
  },
};

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

function ArtistCard({ slug }: { slug: ArtistSlug }) {
  const artist = ARTISTS[slug];
  const cfg = CARDS[slug];
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
        src={cfg.photo}
        alt={artist.displayName}
        fill
        sizes="(min-width: 640px) 20vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div
        className="absolute bottom-4 left-4"
        style={{
          width: cfg.nameWidth,
          aspectRatio: cfg.nameAspect,
        }}
      >
        <Image
          src={cfg.name}
          alt={artist.displayName}
          fill
          sizes="150px"
          className="object-contain object-left-bottom"
          style={{ filter: "drop-shadow(0 2px 14px rgba(0,0,0,0.6))" }}
        />
      </div>
    </Link>
  );
}

function CenterLogoCard() {
  return (
    <div
      className="relative col-span-2 overflow-hidden rounded-2xl sm:col-span-1"
      style={{ aspectRatio: "3 / 4", background: "#000" }}
    >
      <Image
        src="/figma-home/card-30praum.png"
        alt="30 PRAUM"
        fill
        sizes="(min-width: 640px) 20vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-x-0 bottom-5 flex justify-center">
        <Link
          href="/about"
          data-cursor="Descubra mais"
          className="inline-flex items-center rounded-full border bg-black/40 px-5 py-2 text-[11px] uppercase tracking-[0.22em] backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
          style={{
            borderColor: "rgba(255,255,255,0.6)",
            color: "#ffffff",
          }}
        >
          Descubra mais
        </Link>
      </div>
    </div>
  );
}
