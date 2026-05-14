"use client";

import Image from "next/image";
import Link from "next/link";
import { ARTISTS } from "@/lib/artists/registry";
import { BrandLogo } from "@/components/shell/BrandLogo";
import type { ArtistSlug } from "@/lib/artists/types";

const ORDER: ArtistSlug[] = ["teto", "wiu", "matue", "brandao"];

type CardConfig = {
  photo: string;
  name: string;
  nameAspect: string;
  nameWidth: string;
};

// Tamanhos calibrados pra altura visual semelhante. SVGs com aspect mais wide
// (Teto/Brandão) recebem mais width pra ficar visualmente proporcional aos
// quadrados (Matuê/Wiu).
const CARDS: Record<ArtistSlug, CardConfig> = {
  matue: {
    photo: "/figma-home/card-matue.png",
    name: "/figma-home/name-matue.svg",
    nameAspect: "1000 / 1000",
    nameWidth: "55%",
  },
  wiu: {
    photo: "/figma-home/card-wiu.png",
    name: "/figma-home/name-wiu.svg",
    nameAspect: "1000 / 1000",
    nameWidth: "42%",
  },
  teto: {
    photo: "/figma-home/card-teto.png",
    name: "/figma-home/name-teto.svg",
    nameAspect: "1000 / 1000",
    nameWidth: "55%",
  },
  brandao: {
    photo: "/figma-home/card-brandao.png",
    name: "/figma-home/name-brandao.svg",
    nameAspect: "1292 / 430",
    nameWidth: "75%",
  },
};

export function ArtistsRow() {
  const left = ORDER.slice(0, 2);
  const right = ORDER.slice(2);

  return (
    <section
      id="roster"
      aria-label="Artistas da 30praum"
      className="relative scroll-mt-20 px-4 py-12 sm:px-8 sm:py-16"
    >
      <div className="mx-auto grid max-w-screen-2xl grid-cols-2 items-end gap-3 sm:gap-4 sm:[grid-template-columns:1.18fr_0.9fr_1fr_0.9fr_1.18fr]">
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
        aspectRatio: "5 / 8",
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
      className="relative col-span-2 overflow-hidden rounded-2xl aspect-[16/9] sm:col-span-1 sm:aspect-[5/8]"
      style={{ background: "#000" }}
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
