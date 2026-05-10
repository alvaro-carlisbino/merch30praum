import { notFound } from "next/navigation";
import { ARTIST_SLUGS, ARTISTS, isArtistSlug } from "@/lib/artists/registry";
import {
  matueDisplay,
  wiuDisplay,
  tetoDisplay,
  brandaoDisplay,
} from "@/styles/fonts";
import type { ArtistSlug } from "@/lib/artists/types";

const FONT_VARIABLE: Record<ArtistSlug, string> = {
  matue: matueDisplay.variable,
  wiu: wiuDisplay.variable,
  teto: tetoDisplay.variable,
  brandao: brandaoDisplay.variable,
};

export function generateStaticParams() {
  return ARTIST_SLUGS.map((slug) => ({ artist: slug }));
}

interface Params {
  artist: string;
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { artist } = await params;
  if (!isArtistSlug(artist)) return {};
  const cfg = ARTISTS[artist];
  return {
    title: `${cfg.universeName} — ${cfg.displayName}`,
    description: cfg.tagline,
  };
}

export default async function ArtistLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const { artist } = await params;
  if (!isArtistSlug(artist)) notFound();
  const fontVar = FONT_VARIABLE[artist];

  return (
    <div data-theme={artist} className={fontVar}>
      {children}
    </div>
  );
}
