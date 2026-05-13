import { ProductGallery } from "@/components/produto/ProductGallery";
import {
  ProductPurchasePanel,
  type ProductColor,
} from "@/components/produto/ProductPurchasePanel";
import { TalvezVoceGoste } from "@/components/produto/TalvezVoceGoste";

interface Params {
  id: string;
}

type Product = {
  id: string;
  title: string;
  price: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
};

const PRODUCTS: Record<string, Product> = {
  "camiseta-333-azul-eletrico": {
    id: "camiseta-333-azul-eletrico",
    title: "Camiseta 333 Azul Elétrico",
    price: "R$ 189,00",
    images: [
      "/figma-produto/main.png",
      "/figma-produto/thumb-1.png",
      "/figma-produto/thumb-2.png",
      "/figma-produto/thumb-3.png",
    ],
    colors: [
      { id: "vermelho", label: "Vermelho", hex: "#a11122" },
      { id: "branco", label: "Branco", hex: "#ededed" },
      { id: "preto", label: "Preto", hex: "#171717" },
    ],
    sizes: ["XPP", "PP", "P", "M", "G", "GG"],
  },
};

const RELATED = [
  { id: "rel-1", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-produto/rel-1.png", alt: "Camiseta Sabotage" },
  { id: "rel-2", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-produto/rel-2.png", alt: "Camiseta 2PAC" },
  { id: "rel-3", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-produto/rel-3.png", alt: "Camiseta TUPAC" },
  { id: "rel-4", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-produto/rel-4.png", alt: "Camiseta Snoop" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const product = PRODUCTS[id];
  if (!product) return {};
  return {
    title: product.title,
    description: `${product.title} — ${product.price} · Loja oficial 30praum.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const product = PRODUCTS[id] ?? PRODUCTS["camiseta-333-azul-eletrico"];

  return (
    <>
      <section className="mx-auto max-w-screen-2xl px-4 pb-10 pt-10 sm:px-8 sm:pt-14">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
          <ProductGallery images={product.images} alt={product.title} />
          <ProductPurchasePanel
            title={product.title.toUpperCase()}
            price={product.price}
            colors={product.colors}
            sizes={product.sizes}
          />
        </div>
      </section>

      <TalvezVoceGoste products={RELATED} />
    </>
  );
}
