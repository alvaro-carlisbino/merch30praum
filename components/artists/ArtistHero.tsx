import dynamic from "next/dynamic";
import type { ArtistConfig } from "@/lib/artists/types";

const HEROES = {
  matue: dynamic(() => import("./matue/Hero").then((m) => m.MatueHero)),
  wiu: dynamic(() => import("./wiu/Hero").then((m) => m.WiuHero)),
  teto: dynamic(() => import("./teto/Hero").then((m) => m.TetoHero)),
  brandao: dynamic(() => import("./brandao/Hero").then((m) => m.BrandaoHero)),
};

export function ArtistHero({ artist }: { artist: ArtistConfig }) {
  const Component = HEROES[artist.slug];
  return <Component artist={artist} />;
}
