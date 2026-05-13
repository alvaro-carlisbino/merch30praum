import Image from "next/image";
import Link from "next/link";
import { ARTISTS } from "@/lib/artists/registry";
import { BrandLogo } from "@/components/shell/BrandLogo";
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

const TAG_LABEL: Record<ArtistSlug, string> = {
  matue: "Matuê",
  wiu: "Wiu",
  teto: "Teto",
  brandao: "Brandão",
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
        src={artist.realPhotoUrl ?? artist.portraitImage}
        alt={artist.displayName}
        fill
        unoptimized
        sizes="(min-width: 640px) 20vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        style={{
          objectPosition: artist.photoObjectPosition,
          filter: "brightness(0.92) contrast(1.05)",
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
        className="absolute bottom-4 left-4 right-4 text-white leading-[0.85]"
        style={{
          fontFamily: "var(--font-graffiti, cursive)",
          fontSize: "clamp(1.5rem, 2.4vw, 2.4rem)",
          letterSpacing: "-0.01em",
          transform: "rotate(-3deg)",
          transformOrigin: "left bottom",
          textShadow: "0 2px 14px rgba(0,0,0,0.55)",
        }}
      >
        {TAG_LABEL[slug]}
      </span>
    </Link>
  );
}

function CenterLogoCard() {
  return (
    <div className="relative col-span-2 flex flex-col items-center sm:col-span-1">
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{
          aspectRatio: "3 / 4",
          background:
            "radial-gradient(circle at 50% 55%, #1b2540 0%, #0b1020 60%, #050810 100%)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(circle at center, black 30%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 30%, transparent 78%)",
          }}
        />
        <div className="relative flex h-full items-center justify-center text-white">
          <span style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
            <BrandLogo variant="stacked" />
          </span>
        </div>
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
