import { ARTIST_SLUGS, ARTISTS } from "@/lib/artists/registry";
import { getCollectionByHandle } from "@/lib/shopify/client";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { Marquee } from "@/components/motion/Marquee";

export const metadata = {
  title: "Loja oficial",
  description:
    "Catálogo completo do merch oficial 30praum. Matuê, Wiu, Teto e Brandão85 — pedido em security bag, envio direto da gravadora.",
};

export default async function LojaPage() {
  const collections = await Promise.all(
    ARTIST_SLUGS.map((slug) =>
      getCollectionByHandle(ARTISTS[slug].shopifyCollectionHandle),
    ),
  );
  const products = collections.flatMap((c) => c?.products ?? []);

  return (
    <article>
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 pt-20 pb-10">
        <p
          className="text-[10px] uppercase tracking-[0.4em]"
          style={{ color: "var(--accent)" }}
        >
          Catálogo oficial · 30praum.store
        </p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1.4fr_auto] lg:items-end">
          <h1
            className="font-display uppercase leading-[0.85]"
            style={{
              fontSize: "clamp(3rem, 11vw, 9rem)",
              letterSpacing: "-0.04em",
            }}
          >
            A loja
            <br />
            <span style={{ color: "var(--accent)" }}>inteira.</span>
          </h1>
          <p className="max-w-md text-sm sm:text-base text-fg/80 leading-relaxed">
            {products.length} peças oficiais — todos os universos juntos.
            Filtra por artista, por categoria, ordena por preço. Toda peça sai
            lacrada em security bag direto da casa.
          </p>
        </div>
      </section>

      <Marquee
        items={[
          "ENVIO EM ATÉ 5 DIAS",
          "TROCAS GRÁTIS · 30 DIAS",
          "PIX · 5% OFF",
          "PARCELAMENTO ATÉ 4×",
          "SECURITY BAG LACRADA",
          "LOJA OFICIAL 30PRAUM",
        ]}
        speed={55}
        separatorColor="var(--accent)"
        className="font-display tracking-[0.18em] text-base sm:text-xl py-3 border-y border-border"
      />

      <ShopGrid products={products} />
    </article>
  );
}
