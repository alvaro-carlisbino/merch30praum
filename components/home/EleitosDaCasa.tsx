import Image from "next/image";
import Link from "next/link";
import { ALBUMS, STATUS_LABEL, type AlbumSlug, type AlbumStatus } from "@/lib/albums/registry";

type Pick = {
  slug: AlbumSlug;
  status: AlbumStatus;
  pitch: string;
  cover: string;
};

const PICKS: { big: Pick; topRight: Pick; botRight: Pick } = {
  big: {
    slug: "xtranho",
    status: "em-alta",
    pitch: "Sinal alien em transmissão estável.",
    cover: "/figma-home/eleitos-xtranho.png",
  },
  topRight: {
    slug: "colapso-global",
    status: "tour-ativa",
    pitch: "Duas vozes, um colapso bonito.",
    cover: "/figma-home/eleitos-colapso.png",
  },
  botRight: {
    slug: "isso-e-trap-vol-2",
    status: "estreia",
    pitch: "Xerox da quebrada em alta densidade.",
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
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2
            id="eleitos-da-casa"
            className="font-display uppercase leading-[0.92]"
            style={{
              fontSize: "clamp(2.2rem, 5.4vw, 4.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Eleitos da casa.
          </h2>
          <p className="max-w-xs text-sm text-muted leading-snug sm:text-base">
            Não é o que tocou mais. É o que importa mais.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 sm:[grid-template-rows:minmax(0,1fr)_minmax(0,1fr)]">
          {/* Card grande — esquerda, 2 rows */}
          <BigPickCard pick={PICKS.big} />

          {/* Top-right */}
          <SmallPickCard pick={PICKS.topRight} />

          {/* Bot-right */}
          <SmallPickCard pick={PICKS.botRight} />
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
      className="group relative overflow-hidden rounded-2xl sm:col-start-1 sm:row-span-2"
      style={{ background: album.bgHex, aspectRatio: "1 / 1" }}
    >
      <Image
        src={pick.cover}
        alt=""
        aria-hidden
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <PickOverlay album={album} status={pick.status} pitch={pick.pitch} large />
    </Link>
  );
}

function SmallPickCard({ pick }: { pick: Pick }) {
  const album = ALBUMS[pick.slug];
  return (
    <Link
      href={`/album/${pick.slug}`}
      data-cursor={album.title}
      className="group relative overflow-hidden rounded-2xl"
      style={{ background: album.bgHex, aspectRatio: "16 / 9" }}
    >
      <Image
        src={pick.cover}
        alt=""
        aria-hidden
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <PickOverlay album={album} status={pick.status} pitch={pick.pitch} />
    </Link>
  );
}

function PickOverlay({
  album,
  status,
  pitch,
  large = false,
}: {
  album: (typeof ALBUMS)[AlbumSlug];
  status: AlbumStatus;
  pitch: string;
  large?: boolean;
}) {
  return (
    <>
      <span
        className="absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.28em]"
        style={{
          background: "rgba(0,0,0,0.72)",
          color: album.accentHex,
          backdropFilter: "blur(10px)",
        }}
      >
        {STATUS_LABEL[status]}
      </span>

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.78) 100%)",
        }}
      />

      <div
        className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6"
        style={{ color: "white" }}
      >
        <p
          className="leading-snug"
          style={{
            fontSize: large
              ? "clamp(1.05rem, 1.8vw, 1.55rem)"
              : "clamp(0.95rem, 1.4vw, 1.25rem)",
            fontStyle: "italic",
            letterSpacing: "-0.005em",
          }}
        >
          &ldquo;{pitch}&rdquo;
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-white/75">
          {album.title} · {album.artists.map((a) => a.name).join(" · ")} ·{" "}
          {album.year}
        </p>
      </div>
    </>
  );
}
