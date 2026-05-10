import { notFound } from "next/navigation";
import { ARTISTS, isArtistSlug } from "@/lib/artists/registry";
import { getCollectionByHandle } from "@/lib/shopify/client";
import { ProductCardBase } from "@/components/product/ProductCardBase";
import { ArtistHero } from "@/components/artists/ArtistHero";
import { ArtistBio } from "@/components/artists/ArtistBio";
import { AlbumShowcase } from "@/components/artists/AlbumShowcase";
import { Lookbook } from "@/components/artists/Lookbook";
import { CrossUniverses } from "@/components/product/CrossUniverses";

interface Params {
  artist: string;
}

export default async function ArtistLanding({
  params,
}: {
  params: Promise<Params>;
}) {
  const { artist } = await params;
  if (!isArtistSlug(artist)) notFound();
  const cfg = ARTISTS[artist];
  const collection = await getCollectionByHandle(cfg.shopifyCollectionHandle);
  const products = collection?.products ?? [];

  return (
    <div>
      <ArtistHero artist={cfg} />

      <ArtistBio artist={cfg} />

      <AlbumShowcase artist={cfg} />

      <Lookbook artist={cfg} />

      <section
        id="drop"
        className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <header className="mb-10 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
              Drop · {cfg.drop.chapterName}
            </p>
            <h2
              className="mt-3 font-display leading-[0.92]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Vista o universo {cfg.displayName}.
            </h2>
          </div>
          <span className="text-xs text-muted tabular-nums">
            {products.length} peças
          </span>
        </header>

        {products.length === 0 ? (
          <p className="text-sm text-muted">Sem peças disponíveis no momento.</p>
        ) : (
          <ul
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{ gap: "var(--grid-gap)" }}
          >
            {products.map((p, i) => (
              <li key={p.id}>
                <ProductCardBase
                  product={p}
                  artistSlug={cfg.slug}
                  priority={i < 4}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <CrossUniverses current={cfg.slug} />
    </div>
  );
}
