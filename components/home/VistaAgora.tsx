import { VistaAgoraCarousel, type VistaProduct } from "./VistaAgoraCarousel";
import { getAllProducts } from "@/lib/cms/products";
import { formatBRL } from "@/lib/shop/static-products";
import { byArtist, dropProducts, isSoldOut, matching } from "@/lib/shop/catalog";

export async function VistaAgora() {
  const all = await getAllProducts();
  const inStock = all.filter((p) => !isSoldOut(p));
  const drop = dropProducts(inStock);
  const xtranho = matching(byArtist(inStock, "matue"), /xtranho/i);
  const colapso = byArtist(inStock, "teto");
  const picks = [drop[0], xtranho[0], drop[1], colapso[0], drop[2], xtranho[1]].filter(Boolean);
  const unique = picks.filter((p, i) => picks.findIndex((o) => o.handle === p.handle) === i).slice(0, 5);
  const products: VistaProduct[] = unique.map((p) => ({
    id: p.handle,
    href: `/produto/${p.handle}`,
    image: p.image,
    title: p.title,
    price: formatBRL(p.priceBRL),
  }));
  if (products.length === 0) return null;
  return (
    <section
      aria-labelledby="vista-agora"
      className="border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 pt-20 pb-16 sm:px-8">
        <header className="mb-12 flex flex-col gap-3">
          <h2
            id="vista-agora"
            className="font-display uppercase leading-[0.92]"
            style={{ fontSize: "clamp(2.2rem, 5.4vw, 4.5rem)", letterSpacing: "-0.02em" }}
          >
            Vista agora.
          </h2>
          <p className="max-w-md text-sm text-muted sm:text-base">
            O que está em estoque hoje na loja oficial. Drop ISSO É TRAP, XTRANHO e Colapso Global.
          </p>
        </header>
        <VistaAgoraCarousel products={products} />
      </div>
    </section>
  );
}
