import { ARTIST_SLUGS, ARTISTS } from "@/lib/artists/registry";
import { getCollectionByHandle } from "@/lib/shopify/client";
import { VistaAgoraCarousel, type VistaProduct } from "./VistaAgoraCarousel";

export async function VistaAgora() {
  const collections = await Promise.all(
    ARTIST_SLUGS.map((slug) =>
      getCollectionByHandle(ARTISTS[slug].shopifyCollectionHandle),
    ),
  );

  const products: VistaProduct[] = ARTIST_SLUGS.flatMap((slug, i) => {
    const items = collections[i]?.products ?? [];
    return items.slice(0, 2).map((p) => ({
      id: p.id,
      handle: p.handle,
      title: p.title,
      priceMin: p.priceMin,
      image: p.featuredImage?.url ?? null,
      artistSlug: slug,
      artistDisplay: ARTISTS[slug].displayName,
    }));
  }).slice(0, 8);

  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby="vista-agora"
      className="border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 pt-20 pb-16 sm:px-8">
        <header className="mb-12 flex flex-col gap-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-muted">
            Destaques · drops ativos
          </p>
          <h2
            id="vista-agora"
            className="font-display uppercase leading-[0.92]"
            style={{
              fontSize: "clamp(2.2rem, 5.4vw, 4.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Vista agora.
          </h2>
        </header>

        <VistaAgoraCarousel products={products} />
      </div>
    </section>
  );
}
