import { HomeHero } from "@/components/home/HomeHero";
import { ArtistsRow } from "@/components/home/ArtistsRow";
import { EleitosDaCasa } from "@/components/home/EleitosDaCasa";
import { PlantaoTeaser } from "@/components/home/PlantaoTeaser";
import { VistaAgora } from "@/components/home/VistaAgora";
import { ProximosShows } from "@/components/home/ProximosShows";
import { NewsletterCapture } from "@/components/shell/NewsletterCapture";

export const metadata = {
  title: { absolute: "30praum · Site oficial" },
  description:
    "Casa de Matuê, Wiu, Teto e Brandão85. Fundada em 2016 em Fortaleza pra colocar o trap nordestino no centro do mapa.",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ArtistsRow />
      <EleitosDaCasa />
      <PlantaoTeaser />
      <VistaAgora />
      <ProximosShows />
      <NewsletterCapture />
    </>
  );
}
