import { ProductGallery } from "@/components/produto/ProductGallery";
import {
  ProductPurchasePanel,
  type ProductColor,
} from "@/components/produto/ProductPurchasePanel";
import { TalvezVoceGoste } from "@/components/produto/TalvezVoceGoste";
import { STATIC_PRODUCTS, formatBRL } from "@/lib/shop/static-products";
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
  artistSlug?: string;
};
const CURATED: Record<string, Product> = {
  "camiseta-sabotage": {
    id: "camiseta-sabotage",
    title: "Camiseta Sabotage",
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
const COLOR_FROM_TITLE: Array<{ match: RegExp; color: ProductColor }> = [
  { match: /preta|preto/i, color: { id: "preto", label: "Preto", hex: "#171717" } },
  { match: /off.?white|estonada/i, color: { id: "off-white", label: "Off White", hex: "#ece7dd" } },
  { match: /branca|branco/i, color: { id: "branco", label: "Branco", hex: "#f2f2f2" } },
  { match: /amarela|amarelo/i, color: { id: "amarelo", label: "Amarelo", hex: "#e8c22e" } },
  { match: /azul/i, color: { id: "azul", label: "Azul", hex: "#1f4fd8" } },
  { match: /vermelha|vermelho/i, color: { id: "vermelho", label: "Vermelho", hex: "#a11122" } },
  { match: /marrom/i, color: { id: "marrom", label: "Marrom", hex: "#5c4330" } },
];
function colorsForTitle(title: string): ProductColor[] {
  const found = COLOR_FROM_TITLE.filter((c) => c.match.test(title)).map((c) => c.color);
  if (found.length) return found;
  return [{ id: "unica", label: "Única", hex: "#171717" }];
}
function resolveProduct(id: string): Product | null {
  if (CURATED[id]) return CURATED[id];
  const p = STATIC_PRODUCTS.find((sp) => sp.handle === id);
  if (!p) return null;
  const sizes = p.sizes?.filter((s) => s.available).map((s) => s.label) ?? ["Único"];
  return {
    id: p.handle,
    title: p.title,
    price: formatBRL(p.priceBRL),
    images: [p.image, ...(p.galleryImages ?? [])],
    colors: colorsForTitle(p.title),
    sizes: sizes.length ? sizes : ["Único"],
    artistSlug: p.artistSlug,
  };
}
function relatedFor(product: Product) {
  const pool = STATIC_PRODUCTS.filter(
    (p) => p.handle !== product.id && (!product.artistSlug || p.artistSlug === product.artistSlug),
  );
  const picks = (pool.length >= 4 ? pool : STATIC_PRODUCTS.filter((p) => p.handle !== product.id)).slice(0, 4);
  if (!picks.length) {
    return [
      { id: "rel-1", href: "/produto/camiseta-sabotage", image: "/figma-produto/rel-1.png", alt: "Camiseta Sabotage" },
      { id: "rel-2", href: "/produto/camiseta-sabotage", image: "/figma-produto/rel-2.png", alt: "Camiseta 2PAC" },
      { id: "rel-3", href: "/produto/camiseta-sabotage", image: "/figma-produto/rel-3.png", alt: "Camiseta TUPAC" },
      { id: "rel-4", href: "/produto/camiseta-sabotage", image: "/figma-produto/rel-4.png", alt: "Camiseta Snoop" },
    ];
  }
  return picks.map((p) => ({
    id: p.handle,
    href: `/produto/${p.handle}`,
    image: p.image,
    alt: p.title,
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const product = resolveProduct(id);
  if (!product) return {};
  return {
    title: product.title,
    description: `${product.title} · ${product.price} · Loja oficial 30praum.`,
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const product = resolveProduct(id) ?? CURATED["camiseta-sabotage"];
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
      <TalvezVoceGoste products={relatedFor(product)} />
    </>
  );
}
