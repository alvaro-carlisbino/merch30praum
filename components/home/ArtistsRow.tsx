"use client";

import Image from "next/image";
import Link from "next/link";
import { ARTISTS } from "@/lib/artists/registry";
import { BrandLogo } from "@/components/shell/BrandLogo";
import { useActiveArtist } from "@/lib/home/active-artist";
import type { ArtistSlug } from "@/lib/artists/types";

const ORDER: ArtistSlug[] = ["teto", "wiu", "matue", "brandao"];

type CardConfig = {
  photo: string;
  name: string;
  nameAspect: string;
  nameWidth: string;
  borderColor: string;
};

const CARDS: Record<ArtistSlug, CardConfig> = {
  matue: {
    photo: "/figma-home/card-matue.png",
    name: "/figma-home/name-matue-medium.png",
    nameAspect: "362 / 182",
    nameWidth: "62%",
    borderColor: "#ffffff",
  },
  wiu: {
    photo: "/figma-home/card-wiu.png",
    name: "/figma-home/name-wiu-medium.png",
    nameAspect: "362 / 260",
    nameWidth: "38%",
    borderColor: "#ffffff",
  },
  teto: {
    photo: "/figma-home/card-teto.png",
    name: "/figma-home/name-teto-big.png",
    nameAspect: "362 / 116",
    nameWidth: "90%",
    borderColor: "#ffffff",
  },
  brandao: {
    photo: "/figma-home/card-brandao.png",
    name: "/figma-home/name-brandao-big.png",
    nameAspect: "362 / 122",
    nameWidth: "95%",
    borderColor: "#ffffff",
  },
};

export function ArtistsRow() {
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
  const active = useActiveArtist((s) => s.active === slug);

  return (
    <Link
      href={`/${slug}`}
      data-cursor={artist.displayName}
      className="group relative block overflow-hidden rounded-2xl"
      style={{
        aspectRatio: "5 / 8",
        background: artist.panelBackground,
        transform: active ? "scale(1.12)" : "scale(1)",
        transformOrigin: "center",
        zIndex: active ? 10 : 1,
        boxShadow: active
          ? `0 0 0 3px ${cfg.borderColor}, 0 24px 60px rgba(0,0,0,0.55)`
          : "none",
        transition:
          "transform 600ms cubic-bezier(0.7,0,0.3,1), box-shadow 500ms cubic-bezier(0.7,0,0.3,1)",
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
      style={{ aspectRatio: "5 / 8", background: "#000" }}
    >
      <Image
        src="/figma-home/card-30praum.png"
        alt=""
        aria-hidden
        fill
        sizes="(min-width: 640px) 20vw, 100vw"
        className="object-cover opacity-55"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-white">
        <span style={{ fontSize: "clamp(2.5rem, 5vw, 4.2rem)" }}>
          <BrandLogo variant="stacked" />
        </span>
      </div>

      <div className="absolute inset-x-3 bottom-5 flex justify-center sm:inset-x-4 sm:bottom-7">
        <Link
          href="/about"
          data-cursor="Descubra mais"
          className="inline-flex w-full items-center justify-center rounded-full border bg-black/35 px-4 py-3 text-[13px] backdrop-blur-sm transition-colors hover:bg-white hover:text-black sm:py-3.5 sm:text-[14px]"
          style={{
            borderColor: "rgba(255,255,255,0.85)",
            color: "#ffffff",
          }}
        >
          Descubra mais
        </Link>
      </div>
    </div>
  );
}
