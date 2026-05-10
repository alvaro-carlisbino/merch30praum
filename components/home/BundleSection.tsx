import Image from "next/image";
import Link from "next/link";
import { ARTIST_SLUGS, ARTISTS } from "@/lib/artists/registry";
import { getCollectionByHandle } from "@/lib/shopify/client";
import { formatMoney } from "@/lib/utils/format-money";
import { pixPrice } from "@/lib/shop/shipping";

export async function BundleSection() {
  const collections = await Promise.all(
    ARTIST_SLUGS.map((slug) =>
      getCollectionByHandle(ARTISTS[slug].shopifyCollectionHandle),
    ),
  );

  const bundles = ARTIST_SLUGS.map((slug, i) => {
    const products = collections[i]?.products ?? [];
    return {
      slug,
      artist: ARTISTS[slug],
      products: products.slice(0, 3),
    };
  }).filter((b) => b.products.length === 3);

  return (
    <section
      aria-labelledby="bundles"
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20">
        <header className="mb-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.4em]"
              style={{ color: "var(--accent)" }}
            >
              Looks completos
            </p>
            <h2
              id="bundles"
              className="mt-3 font-display uppercase leading-[0.92]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Veste o capítulo.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-fg/80 leading-relaxed">
            Três peças por universo, montadas pra fechar o look. Pode comprar
            todas juntas ou separar uma de cada vez.
          </p>
        </header>

        <ul className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {bundles.map(({ artist, products }) => {
            const total = products.reduce(
              (acc, p) => acc + parseFloat(p.priceMin.amount),
              0,
            );
            return (
              <li
                key={artist.slug}
                className="group relative overflow-hidden"
                style={{
                  background: artist.panelBackground,
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${artist.panelAccent}, transparent 70%)`,
                  }}
                />

                <div className="relative p-5">
                  <p
                    className="text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: artist.panelAccent }}
                  >
                    Look {artist.displayName}
                  </p>
                  <h3
                    className="mt-2 font-display text-2xl text-white"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {artist.universeName}
                  </h3>

                  <div
                    className="mt-5 grid grid-cols-3 gap-2"
                    style={{ minHeight: "180px" }}
                  >
                    {products.map((p, i) => (
                      <div
                        key={p.id}
                        className="relative aspect-[3/4] overflow-hidden"
                        style={{
                          background:
                            "color-mix(in srgb, currentColor 8%, transparent)",
                          border: `1px solid ${artist.panelAccent}33`,
                          transform:
                            i === 1
                              ? "translateY(8px)"
                              : i === 0
                                ? "rotate(-1.5deg)"
                                : "rotate(1.5deg)",
                        }}
                      >
                        {p.featuredImage && (
                          <Image
                            src={p.featuredImage.url}
                            alt={p.featuredImage.altText ?? p.title}
                            fill
                            sizes="120px"
                            className="object-cover"
                            unoptimized
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <ol className="mt-5 space-y-1 text-[10px] uppercase tracking-[0.25em]">
                    {products.map((p, i) => (
                      <li
                        key={p.id}
                        className="flex items-baseline justify-between gap-2"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        <span>
                          0{i + 1} · {p.title}
                        </span>
                        <span className="tabular-nums opacity-70">
                          {formatMoney(p.priceMin)}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <div
                    className="mt-5 pt-4 flex items-baseline justify-between"
                    style={{
                      borderTop: `1px solid ${artist.panelAccent}55`,
                    }}
                  >
                    <div>
                      <p
                        className="text-[10px] uppercase tracking-[0.3em]"
                        style={{ color: artist.panelAccent }}
                      >
                        Look completo
                      </p>
                      <p
                        className="mt-1 font-display text-2xl text-white tabular-nums"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        {formatMoney({
                          amount: total.toFixed(2),
                          currencyCode: "BRL",
                        })}
                      </p>
                      <p
                        className="text-[10px] uppercase tracking-[0.25em]"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                      >
                        ou {formatMoney({ amount: pixPrice(total).toFixed(2), currencyCode: "BRL" })} no Pix
                      </p>
                    </div>
                    <Link
                      href={`/${artist.slug}#drop`}
                      data-cursor={`Look ${artist.displayName}`}
                      className="inline-flex items-center gap-2 px-4 py-3 text-[10px] uppercase tracking-[0.3em] transition-opacity hover:opacity-90"
                      style={{
                        background: artist.panelAccent,
                        color: artist.panelBackground,
                      }}
                    >
                      Vestir →
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
