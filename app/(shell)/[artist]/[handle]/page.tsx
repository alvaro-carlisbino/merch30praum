import { notFound, redirect } from "next/navigation";
import { isArtistSlug } from "@/lib/artists/registry";
import { STATIC_PRODUCTS } from "@/lib/shop/static-products";

interface Params {
  artist: string;
  handle: string;
}

export function generateStaticParams() {
  return STATIC_PRODUCTS.filter((p) => p.artistSlug !== "house").map((p) => ({
    artist: p.artistSlug,
    handle: p.handle,
  }));
}

export default async function LegacyProductRoute({ params }: { params: Promise<Params> }) {
  const { artist, handle } = await params;
  if (!isArtistSlug(artist)) notFound();
  redirect(`/produto/${handle}`);
}
