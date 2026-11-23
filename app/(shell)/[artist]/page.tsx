import { notFound } from "next/navigation";
import { ARTISTS, isArtistSlug } from "@/lib/artists/registry";
import type { ArtistSlug } from "@/lib/artists/types";
import { ArtistPageHero } from "@/components/artists/ArtistPageHero";
import { SobreEle } from "@/components/artists/SobreEle";
import { AlbumPanel } from "@/components/artists/AlbumPanel";
import { Tracklist } from "@/components/artists/Tracklist";
import { ALBUMS, type AlbumSlug } from "@/lib/albums/registry";
interface Params {
  artist: string;
}
type ArtistPageAssets = {
  heroBg: string;
  heroBgPosition?: string;
  heroBgPositionMobile?: string;
  nameBig: string;
  nameBigAspect: string;
  stagePhoto: string;
  albumCover: string;
  intro: string;
  albumSlug: AlbumSlug;
};
const ASSETS: Record<ArtistSlug, ArtistPageAssets> = {
  matue: {
    heroBg: "/figma-home/hero-matue-v2.jpg",
    heroBgPositionMobile: "75% 30%",
    nameBig: "/figma-home/name-matue.svg",
    nameBigAspect: "1000 / 1000",
    stagePhoto: "/figma-artista/matue-stage-v2.webp",
    albumCover: "/figma-artista/matue-album-xtranho-v2.png",
    intro:
      "Cofundou a 30praum em 2016, em Fortaleza. Lançou XTRANHO em dezembro de 2025.",
    albumSlug: "xtranho",
  },
  teto: {
    heroBg: "/figma-home/hero-teto-v2.jpg",
    heroBgPositionMobile: "center 20%",
    nameBig: "/figma-home/name-teto.svg",
    nameBigAspect: "1000 / 320",
    stagePhoto: "/figma-artista/teto-stage-v2.webp",
    albumCover: "/figma-artista/colapso-global-cover-v2.webp",
    intro:
      "De Jacobina, na Bahia. Lançou Colapso Global com Wiu em janeiro de 2026.",
    albumSlug: "colapso-global",
  },
  wiu: {
    heroBg: "/figma-home/hero-wiu-v2.jpg",
    heroBgPosition: "70% 38%",
    heroBgPositionMobile: "30% 25%",
    nameBig: "/figma-home/name-wiu.svg",
    nameBigAspect: "1292 / 430",
    stagePhoto: "/figma-artista/wiu-stage-v2.webp",
    albumCover: "/figma-artista/colapso-global-cover-v2.webp",
    intro:
      "Começou produzindo beat e passou pro microfone. Lançou Colapso Global com Teto em janeiro de 2026.",
    albumSlug: "colapso-global",
  },
  brandao: {
    heroBg: "/figma-home/hero-brandao.jpg",
    heroBgPositionMobile: "center 20%",
    nameBig: "/figma-home/name-brandao.svg",
    nameBigAspect: "1000 / 340",
    stagePhoto: "/figma-artista/brandao-stage.webp",
    albumCover: "/figma-artista/brandao-album-anjo-v2.webp",
    intro:
      "Da Caponga, no Ceará. Assinou com a 30praum em 2024. Isso É Trap Vol. 2 saiu em abril de 2026.",
    albumSlug: "isso-e-trap-vol-2",
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
  const album = ALBUMS[a.albumSlug];
  const socials = cfg.socials ?? {};
  const listenLinks = album.streamingLinks;
  const socialLinks = [
    { label: "Instagram", href: socials.instagram },
    { label: "TikTok", href: socials.tiktok },
    { label: "YouTube", href: socials.youtube },
    { label: "Spotify", href: socials.spotify },
    { label: "Apple Music", href: socials.appleMusic },
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));
  const stats = [
    {
      label: "Lançamento",
      value: new Date(`${album.releaseDate}T12:00:00`).toLocaleDateString("pt-BR"),
    },
    { label: "Faixas", value: String(cfg.album.tracks.length) },
  ];
  if (album.duration) stats.push({ label: "Duração", value: album.duration });
  return (
    <>
      <ArtistPageHero
        bgImage={a.heroBg}
        bgPosition={a.heroBgPosition}
        bgPositionMobile={a.heroBgPositionMobile}
        nameImage={a.nameBig}
        nameAspect={a.nameBigAspect}
        name={cfg.displayName}
        intro={a.intro}
      />
      <SobreEle
        paragraphs={cfg.bioParagraphs}
        sidePhoto={a.stagePhoto}
        sidePhotoAlt={`${cfg.displayName} no palco`}
        facts={cfg.facts}
      />
      <AlbumPanel
        cover={a.albumCover}
        albumTitle={cfg.album.title}
        albumHref={`/album/${album.slug}`}
        stats={stats}
        listenLinks={listenLinks}
        socials={socialLinks}
      />
      <Tracklist title={cfg.album.title} tracks={cfg.album.tracks} />
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
