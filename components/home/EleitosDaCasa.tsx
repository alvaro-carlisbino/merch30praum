import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/effects/Reveal";
import { blurFor } from "@/lib/images/blur-data";
import { ALBUMS, type AlbumSlug } from "@/lib/albums/registry";
type Pick = {
  slug: AlbumSlug;
  cover: string;
};
const PICKS: { big: Pick; topRight: Pick; botRight: Pick } = {
  big: {
    slug: "xtranho",
    cover: "/figma-home/eleitos-xtranho.webp",
  },
  topRight: {
    slug: "colapso-global",
    cover: "/figma-home/eleitos-colapso.png",
  },
  botRight: {
    slug: "isso-e-trap-vol-2",
    cover: "/figma-home/eleitos-brandao.png",
  },
};
export function EleitosDaCasa() {
  return (
    <section
      aria-labelledby="eleitos-da-casa"
      className="border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2
              id="eleitos-da-casa"
              className="font-display uppercase leading-[0.92]"
              style={{
                fontSize: "clamp(2.2rem, 5.4vw, 4.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Discos recentes
            </h2>
            <p className="max-w-xs text-sm text-muted leading-snug sm:text-base">
              O que a 30praum lançou nos últimos doze meses.
            </p>
          </header>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 sm:[grid-template-rows:1fr_1fr]">
          <Reveal className="sm:col-start-1 sm:row-span-2">
            <BigPickCard pick={PICKS.big} />
          </Reveal>
          <Reveal delay={90}>
            <SmallPickCard pick={PICKS.topRight} />
          </Reveal>
          <Reveal delay={180}>
            <SmallPickCard pick={PICKS.botRight} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
function BigPickCard({ pick }: { pick: Pick }) {
  const album = ALBUMS[pick.slug];
  return (
    <Link
      href={`/album/${pick.slug}`}
      data-cursor={album.title}
      className="group relative block h-full overflow-hidden rounded-2xl"
      style={{
        background: album.bgHex,
        aspectRatio: "1 / 1",
      }}
    >
      <Image
        src={pick.cover}
        alt=""
        aria-hidden
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        placeholder={blurFor(pick.cover) ? "blur" : "empty"}
        blurDataURL={blurFor(pick.cover)}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <PickOverlay album={album} large />
    </Link>
  );
}
function SmallPickCard({ pick }: { pick: Pick }) {
  const album = ALBUMS[pick.slug];
  return (
    <Link
      href={`/album/${pick.slug}`}
      data-cursor={album.title}
      className="group relative block overflow-hidden rounded-2xl aspect-[16/9] sm:aspect-[2/1]"
      style={{ background: album.bgHex }}
    >
      <Image
        src={pick.cover}
        alt=""
        aria-hidden
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        placeholder={blurFor(pick.cover) ? "blur" : "empty"}
        blurDataURL={blurFor(pick.cover)}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <PickOverlay album={album} />
    </Link>
  );
}
function PickOverlay({
  album,
  large = false,
}: {
  album: (typeof ALBUMS)[AlbumSlug];
  large?: boolean;
}) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)" }}
      />
      <div className="absolute inset-x-4 bottom-4 text-white sm:inset-x-6 sm:bottom-6">
        <p
          className="font-display uppercase leading-none"
          style={{ fontSize: large ? "clamp(1.6rem, 3vw, 2.6rem)" : "clamp(1.2rem, 2vw, 1.8rem)" }}
        >
          {album.title}
        </p>
        <p className="mt-2 text-sm text-white/75">
          {album.artists.map((a) => a.name).join(" e ")}, {album.year}
        </p>
      </div>
    </>
  );
}
