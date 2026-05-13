import { PromoBanner } from "@/components/loja/PromoBanner";
import { CollectionCard } from "@/components/loja/CollectionCard";
import { ProductCarousel, type CarouselProduct } from "@/components/loja/ProductCarousel";

export const metadata = {
  title: "Loja oficial",
  description:
    "Catálogo completo do merch oficial 30praum. Coleções OVERSIZED e FIVE PANEL, mais vendidos e promoções.",
};

const MAIS_VENDIDOS: CarouselProduct[] = [
  { id: "mv1", href: "/loja", image: "/figma-loja/mv-1.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "mv2", href: "/loja", image: "/figma-loja/mv-2.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "mv3", href: "/loja", image: "/figma-loja/mv-3.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "mv4", href: "/loja", image: "/figma-loja/mv-4.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
];

const EM_PROMOCOES: CarouselProduct[] = [
  { id: "ep1", href: "/loja", image: "/figma-loja/ep-1.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "ep2", href: "/loja", image: "/figma-loja/ep-2.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "ep3", href: "/loja", image: "/figma-loja/ep-3.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "ep4", href: "/loja", image: "/figma-loja/ep-4.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
];

export default function LojaPage() {
  return (
    <>
      <PromoBanner />

      <section
        aria-labelledby="colecoes-title"
        className="mx-auto max-w-screen-2xl px-4 pt-10 pb-6 sm:px-8"
      >
        <h2
          id="colecoes-title"
          className="mb-6 font-display uppercase leading-none"
          style={{
            fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
            letterSpacing: "0.02em",
          }}
        >
          Coleções
        </h2>
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          <CollectionCard
            href="/loja"
            image="/figma-loja/colecao-oversized-1.png"
            title="Oversized"
          />
          <CollectionCard
            href="/loja"
            image="/figma-loja/colecao-five-panel-1.png"
            title="Five Panel"
          />
        </div>
      </section>

      <ProductCarousel title="Mais Vendidos" products={MAIS_VENDIDOS} />

      <section
        aria-labelledby="exclusivos-title"
        className="mx-auto max-w-screen-2xl px-4 pt-6 pb-6 sm:px-8"
      >
        <h2
          id="exclusivos-title"
          className="mb-6 font-display uppercase leading-none"
          style={{
            fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
            letterSpacing: "0.02em",
          }}
        >
          Exclusivos
        </h2>
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          <CollectionCard
            href="/loja"
            image="/figma-loja/exclusivo-oversized.png"
            title="Oversized"
          />
          <CollectionCard
            href="/loja"
            image="/figma-loja/exclusivo-five-panel.png"
            title="Five Panel"
          />
        </div>
      </section>

      <ProductCarousel title="Em Promoções" products={EM_PROMOCOES} />
    </>
  );
}
