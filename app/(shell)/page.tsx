import { HomeHero } from "@/components/home/HomeHero";
import { HomeLiveChat } from "@/components/mural/HomeLiveChat";
import { ArtistsRow } from "@/components/home/ArtistsRow";
import { EleitosDaCasa } from "@/components/home/EleitosDaCasa";
import { PlantaoTeaser } from "@/components/home/PlantaoTeaser";
import { VistaAgora } from "@/components/home/VistaAgora";
import { ProximosShows } from "@/components/home/ProximosShows";
import { NewsletterCapture } from "@/components/shell/NewsletterCapture";
import { getAllProducts } from "@/lib/cms/products";
import { formatBRL } from "@/lib/shop/static-products";
import { dropProducts, isSoldOut } from "@/lib/shop/catalog";

export const metadata = {
  title: { absolute: "30praum · Site oficial" },
  description:
    "Casa de Matuê, Wiu, Teto e Brandão85. Fundada em 2016 em Fortaleza pra colocar o trap nordestino no centro do mapa.",
};

export default async function HomePage() {
  const inStock = (await getAllProducts()).filter((p) => !isSoldOut(p));
  const heroProducts = [...dropProducts(inStock), ...inStock]
    .filter((p, i, arr) => arr.findIndex((o) => o.handle === p.handle) === i)
    .slice(0, 6)
    .map((p) => ({ handle: p.handle, image: p.image, title: p.title, price: formatBRL(p.priceBRL) }));
  return (
    <>
      <HomeHero products={heroProducts} />
      <HomeLiveChat />
      <ArtistsRow />
      <EleitosDaCasa />
      <PlantaoTeaser />
      <VistaAgora />
      <ProximosShows />
      <NewsletterCapture />
    </>
  );
}
