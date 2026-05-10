import Link from "next/link";
import Image from "next/image";
import { ARTIST_SLUGS, ARTISTS } from "@/lib/artists/registry";
import { getCollectionByHandle } from "@/lib/shopify/client";
import { CATEGORIES, productCategorySlug } from "@/lib/shop/categories";

export async function ShopByCategory() {
  const collections = await Promise.all(
    ARTIST_SLUGS.map((slug) =>
      getCollectionByHandle(ARTISTS[slug].shopifyCollectionHandle),
    ),
  );
  const allProducts = collections.flatMap((c) => c?.products ?? []);

  const counts = CATEGORIES.map((c) => ({
    ...c,
    count: allProducts.filter((p) => productCategorySlug(p) === c.slug).length,
  }));

  return (
    <section
      aria-labelledby="shop-category"
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20">
        <header className="mb-10 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.4em]"
              style={{ color: "var(--accent)" }}
            >
              Por categoria
            </p>
            <h2
              id="shop-category"
              className="mt-3 font-display uppercase leading-[0.92]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              O que tu veste.
            </h2>
          </div>
        </header>

        <ul className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {counts.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/loja#${cat.slug}`}
                data-cursor={`Ver ${cat.label}`}
                className="group relative block aspect-[3/4] overflow-hidden border border-border"
              >
                <Image
                  src={cat.cover}
                  alt={cat.label}
                  fill
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  unoptimized
                  style={{ filter: "brightness(0.65) contrast(1.1) saturate(0.7)" }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85) 100%)",
                  }}
                />
                <div className="relative flex h-full flex-col justify-between p-4 text-white">
                  <span
                    className="text-[10px] tabular-nums uppercase tracking-[0.3em]"
                    style={{ color: "var(--accent)" }}
                  >
                    {String(cat.count).padStart(2, "0")} peças
                  </span>
                  <div>
                    <h3
                      className="font-display uppercase leading-[0.92]"
                      style={{
                        fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {cat.label}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">
                      Comprar
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
