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
    heroBg: "/figma-home/hero-matue.jpg",
    nameBig: "/figma-home/name-matue.svg",
    nameBigAspect: "1000 / 1000",
    nameMedium: "/figma-home/name-matue.svg",
    nameMediumAspect: "1000 / 700",
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
  teto: {
    heroBg: "/figma-home/hero-teto.png",
    nameBig: "/figma-home/name-teto.svg",
    nameBigAspect: "1000 / 320",
    nameMedium: "/figma-home/name-teto.svg",
    nameMediumAspect: "1000 / 320",
    stagePhoto: "/figma-artista/teto-stage.png",
    albumCover: "/figma-artista/colapso-global-cover.png",
    quote: {
      text: "Não é fim. É trilha.",
      attribution: "Teto · Colapso Global · 2026",
    },
    motto: "Somos os melhores",
    description:
      "Nasceu em Jacobina, Bahia. Começou compondo aos doze e até hoje grava no quarto. Fez fama no YouTube e no TikTok antes de qualquer selo bater na porta. Estreou em 2018 com Fico Famoso e Say Yes, dividiu Vampira com Matuê e Wiu em 2022, e desde então virou pilar do trap brasileiro. Colapso Global (2026) com Wiu mistura house, jazz, bossa e funk carioca no mesmo disco.",
    estreia: "2020",
    marcos: "Vampira (c/ Matuê, Wiu) · Colapso Global · Carnaval Olinda 2025",
    albumStats: {
      lancamento: "27/01/2026",
      duracao: "33min",
      ouvintes: "92M",
    },
  },
  wiu: {
    heroBg: "/figma-home/hero-wiu.jpg",
    nameBig: "/figma-home/name-wiu.svg",
    nameBigAspect: "1292 / 430",
    nameMedium: "/figma-home/name-wiu.svg",
    nameMediumAspect: "1292 / 430",
    stagePhoto: "/figma-artista/wiu-stage.png",
    albumCover: "/figma-artista/colapso-global-cover.png",
    quote: {
      text: "Se a saudade matasse, eu já tinha morrido bonito.",
      attribution: "Wiu · Manual de Como Amar Errado · 2022",
    },
    motto: "Somos os melhores",
    description:
      "Cearense, contemporâneo de Matuê. Antes de ser artista da 30praum era beatmaker — produziu seis das sete faixas de Máquina do Tempo (2020) e ajudou a desenhar o som do selo. Estreou cantando em 2019 com Sucrilhos. Viralizou Felina e Vampira em 2022, fechou o ano com Manual de Como Amar Errado e se autodeclarou 'último romântico' do trap. Em 2026, dividiu o palco e a tracklist com Teto em Colapso Global.",
    estreia: "2019",
    marcos: "Manual de Como Amar Errado · Colapso Global · Felina · Vampira",
    albumStats: {
      lancamento: "27/01/2026",
      duracao: "33min",
      ouvintes: "78M",
    },
  },
  brandao: {
    heroBg: "/figma-home/hero-brandao.jpg",
    nameBig: "/figma-home/name-brandao.svg",
    nameBigAspect: "1000 / 340",
    nameMedium: "/figma-home/name-brandao.svg",
    nameMediumAspect: "1000 / 340",
    stagePhoto: "/figma-artista/brandao-stage.png",
    albumCover: "/figma-artista/brandao-album-anjo.png",
    quote: {
      text: "Cresci copiando. Agora os outros copiam errado.",
      attribution: "Brandão85 · 85 · 2026",
    },
    motto: "Da quebrada pro mundo — sem perder o xerox.",
    description:
      "Cearense da Caponga, Brandão85 entrou oficialmente na 30PRAUM em setembro de 2024 depois de saída amigável da Hash Produções. Cocriou faixas do 333 do Matuê (Crack com Mussilon, Isso é Sério) e estreou solo no selo com CEO (2024). Isso é Trap Vol.2 é a confirmação — WARZONE e JAPONÊS chegaram virais antes do disco sair.",
    estreia: "Setembro 2024",
    marcos: "Hash 2018–2024 · Isso é Trap Vol. 02",
    albumStats: {
      lancamento: "15/04/2026",
      duracao: "37min 46s",
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
