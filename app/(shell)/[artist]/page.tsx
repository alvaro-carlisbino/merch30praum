import { notFound } from "next/navigation";
import { ARTISTS, isArtistSlug } from "@/lib/artists/registry";
import type { ArtistSlug } from "@/lib/artists/types";
import { ArtistPageHero } from "@/components/artists/ArtistPageHero";
import { SobreEle } from "@/components/artists/SobreEle";
import { AlbumPanel } from "@/components/artists/AlbumPanel";
import { Tracklist } from "@/components/artists/Tracklist";

interface Params {
  artist: string;
}

type ArtistPageAssets = {
  heroBg: string;
  nameBig: string;
  nameBigAspect: string;
  nameMedium: string;
  nameMediumAspect: string;
  stagePhoto: string;
  albumCover: string;
  quote: { text: string; attribution: string };
  motto: string;
  description: string;
  estreia: string;
  marcos: string;
  albumStats: { lancamento: string; duracao: string; ouvintes: string };
};

const ASSETS: Partial<Record<ArtistSlug, ArtistPageAssets>> = {
  matue: {
    heroBg: "/figma-artista/matue-hero.jpg",
    nameBig: "/figma-artista/matue-name-big.png",
    nameBigAspect: "461 / 461",
    nameMedium: "/figma-artista/matue-name-medium.png",
    nameMediumAspect: "362 / 182",
    stagePhoto: "/figma-artista/matue-stage.png",
    albumCover: "/figma-artista/matue-album-xtranho.png",
    quote: {
      text: "Todo mundo quer ser estrela, mas não tem lugar no Sol.",
      attribution: "Matuê · Kenny G · 2020",
    },
    motto: "Somos os melhores",
    description:
      "Co-fundador da 30PRAUM e um dos principais responsáveis pela popularização do trap no Brasil. Com forte influência da cultura urbana vivida entre o Brasil e a Califórnia, consolidou sua identidade através de estética inovadora, visão criativa e grandes sucessos como Kenny G.",
    estreia: "2016 (cofundador)",
    marcos: "Recorde Spotify BR · Rock in Rio 2024",
    albumStats: {
      lancamento: "10/12/2025",
      duracao: "34min 26s",
      ouvintes: "125M",
    },
  },
};

export default async function ArtistLanding({
  params,
}: {
  params: Promise<Params>;
}) {
  const { artist } = await params;
  if (!isArtistSlug(artist)) notFound();
  const cfg = ARTISTS[artist];
  const a = ASSETS[artist];

  if (!a) {
    // Pra outros artistas, ainda sem o Figma — fallback simples
    return (
      <section className="mx-auto max-w-screen-2xl px-4 py-24 sm:px-8">
        <h1 className="font-display text-4xl uppercase">{cfg.displayName}</h1>
        <p className="mt-6 max-w-prose text-fg/80">{cfg.bioParagraphs[0]}</p>
        <p className="mt-8 text-sm text-muted">
          Página em redesign — assets do Figma chegam em breve.
        </p>
      </section>
    );
  }

  const tracks = cfg.album.highlightedTracks.slice(0, 5).map((t) => ({ title: t }));

  return (
    <>
      <ArtistPageHero
        bgImage={a.heroBg}
        nameImage={a.nameBig}
        nameAspect={a.nameBigAspect}
        quote={a.quote.text}
        quoteAttribution={a.quote.attribution}
      />

      <SobreEle
        description={a.description}
        sidePhoto={a.stagePhoto}
        sidePhotoAlt={`${cfg.displayName} em performance`}
        facts={[
          { label: "Nome", value: cfg.realName },
          { label: "Origem", value: cfg.origin },
          { label: "Estreia 30 Praum", value: a.estreia },
          {
            label: "Discografia",
            value: cfg.facts.find((f) => f.label === "Discografia")?.value ?? "",
          },
          { label: "Marcos", value: a.marcos },
        ]}
      />

      <AlbumPanel
        cover={a.albumCover}
        albumTitle={cfg.album.title}
        albumTagline={cfg.album.tagline}
        stats={[
          { label: "Lançamento", value: a.albumStats.lancamento },
          { label: "Faixas", value: String(cfg.album.highlightedTracks.length || 13) },
          { label: "Duração", value: a.albumStats.duracao },
          { label: "Ouvintes", value: a.albumStats.ouvintes },
        ]}
        streamingLinks={[
          { label: "Spotify", href: cfg.socials?.spotify ?? "#", icon: "spotify" },
          { label: "YouTube Music", href: cfg.socials?.youtube ?? "#", icon: "youtube" },
          { label: "Apple Music", href: cfg.socials?.appleMusic ?? "#", icon: "apple" },
          { label: "Deezer", href: "#", icon: "deezer" },
        ]}
        artistNameImage={a.nameMedium}
        artistNameAspect={a.nameMediumAspect}
        artistMotto={a.motto}
        socials={[
          { label: "Spotify", href: cfg.socials?.spotify ?? "#", icon: "spotify" },
          { label: "YouTube", href: cfg.socials?.youtube ?? "#", icon: "youtube" },
          { label: "Instagram", href: cfg.socials?.instagram ?? "#", icon: "instagram" },
          { label: "TikTok", href: cfg.socials?.tiktok ?? "#", icon: "tiktok" },
        ]}
      />

      <Tracklist tracks={tracks} />
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(ARTISTS).map((slug) => ({ artist: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { artist } = await params;
  if (!isArtistSlug(artist)) return {};
  const cfg = ARTISTS[artist];
  return {
    title: cfg.displayName,
    description: cfg.tagline,
  };
}
