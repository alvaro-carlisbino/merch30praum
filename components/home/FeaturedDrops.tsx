import Link from "next/link";
import Image from "next/image";
import { ARTIST_SLUGS, ARTISTS } from "@/lib/artists/registry";
import { getCollectionByHandle } from "@/lib/shopify/client";
import { formatMoney } from "@/lib/utils/format-money";

export async function FeaturedDrops() {
  const collections = await Promise.all(
    ARTIST_SLUGS.map((slug) =>
      getCollectionByHandle(ARTISTS[slug].shopifyCollectionHandle),
    ),
  );

  const featured = ARTIST_SLUGS.flatMap((slug, i) => {
    const products = collections[i]?.products ?? [];
    return products.slice(0, 2).map((p) => ({ artistSlug: slug, product: p }));
  }).slice(0, 8);

  return (
    <section
      aria-labelledby="featured-drops"
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 pt-16 pb-6">
        <header className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.4em]"
              style={{ color: "var(--accent)" }}
            >
              Destaques · drops ativos
            </p>
            <h2
              id="featured-drops"
              className="mt-3 font-display uppercase leading-[0.92]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Vista agora.
            </h2>
          </div>
          <Link
            href="/loja"
            data-cursor="Catálogo completo"
            className="inline-flex items-center gap-3 px-5 py-3 text-[10px] uppercase tracking-[0.3em] font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Catálogo completo
            <span aria-hidden>→</span>
          </Link>
        </header>
      </div>

      <div className="overflow-x-auto pb-12">
        <ul
          className="mx-auto flex gap-3 px-4 sm:px-8 max-w-screen-2xl"
          style={{ width: "max-content", minWidth: "100%" }}
        >
          {featured.map(({ artistSlug, product }) => {
            const artist = ARTISTS[artistSlug];
            return (
              <li
                key={product.id}
                className="shrink-0 w-[260px] sm:w-[300px]"
              >
                <Link
                  href={`/${artistSlug}/${product.handle}`}
                  data-cursor="Ver peça"
                  className="group block"
                >
                  <div
                    className="relative aspect-[4/5] overflow-hidden"
                    style={{
                      background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {product.featuredImage && (
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText ?? product.title}
                        fill
                        sizes="300px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        unoptimized
                      />
                    )}
                    <span
                      className="absolute top-3 left-3 px-2 py-1 text-[9px] uppercase tracking-[0.3em] backdrop-blur-sm"
                      style={{
                        background: artist.panelBackground,
                        color: artist.panelAccent,
                        border: `1px solid ${artist.panelAccent}55`,
                      }}
                    >
                      {artist.displayName}
                    </span>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <h3 className="text-sm font-display leading-tight">
                      {product.title}
                    </h3>
                    <span className="text-sm tabular-nums">
                      {formatMoney(product.priceMin)}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
