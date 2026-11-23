import { notFound } from "next/navigation";
import { ARTIST_SLUGS, ARTISTS, isArtistSlug } from "@/lib/artists/registry";
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
    title: `${cfg.universeName} · ${cfg.displayName}`,
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
  return <div data-theme={artist}>{children}</div>;
}
