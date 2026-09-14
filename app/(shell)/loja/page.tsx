import Link from "next/link";
import { PromoBanner } from "@/components/loja/PromoBanner";
import { CollectionCard } from "@/components/loja/CollectionCard";
import { ProductCarousel } from "@/components/loja/ProductCarousel";
import { ProductRow } from "@/components/loja/ProductRow";
import { ProductCard } from "@/components/loja/ProductCard";
import { NewsletterCapture } from "@/components/shell/NewsletterCapture";
import { Reveal } from "@/components/effects/Reveal";
import { getAllProducts } from "@/lib/cms/products";
import { ARTISTS } from "@/lib/artists/registry";
import {
  buildCatalogHref,
  byArtist,
  byCategory,
  dropProducts,
  isSoldOut,
  lowStockProducts,
  matching,
} from "@/lib/shop/catalog";

export const metadata = {
  title: "Loja oficial",
  description:
    "Merch oficial da 30praum: drop ISSO É TRAP do Brandão85, XTRANHO e 333 do Matuê, Colapso Global de Teto e Wiu. Pedidos em security bag lacrada.",
};

const TRUST = [
  { label: "Loja oficial", detail: "Só aqui e na 30praum.store" },
  { label: "Security bag", detail: "Pedido lacrado na origem" },
  { label: "Trocas em 30 dias", detail: "Sem burocracia" },
  { label: "Pix 5% off", detail: "Ou 4× sem juros" },
];

export default async function LojaPage() {
  const all = await getAllProducts();
  const inStockFirst = (list: typeof all) =>
    [...list].sort((a, b) => Number(isSoldOut(a)) - Number(isSoldOut(b)));

  const drop = inStockFirst(dropProducts(all));
  const matue = byArtist(all, "matue");
  const xtranho = inStockFirst(matching(matue, /xtranho/i));
  const matueRest = inStockFirst(matue.filter((p) => !/xtranho/i.test(p.title)));
  const colapso = inStockFirst(byArtist(all, "teto"));
  const acessorios = inStockFirst(byCategory(all, "acessorios"));
  const lastUnits = lowStockProducts(all);
  const brandao = ARTISTS.brandao;
  const dropAvailable = drop.filter((p) => !isSoldOut(p)).length;

  const universes = [
    {
      slug: "brandao" as const,
      title: "Brandão85",
      subtitle: `ISSO É TRAP · ${byArtist(all, "brandao").length} peças`,
      image: "/figma-home/hero-brandao.jpg",
      objectPosition: "center 20%",
    },
    {
      slug: "matue" as const,
      title: "Matuê",
      subtitle: `XTRANHO · 333 · ${matue.length} peças`,
      image: "/figma-home/hero-matue.jpg",
      objectPosition: "center 25%",
    },
    {
      slug: "teto" as const,
      title: "Teto & Wiu",
      subtitle: `Colapso Global · ${colapso.length} peças`,
      image: "/figma-home/hero-teto.jpg",
      objectPosition: "center 20%",
    },
  ];

  return (
    <>
      <PromoBanner />

      <section
        aria-labelledby="drop-ativo"
        className="mx-auto max-w-screen-2xl px-4 pt-12 pb-6 sm:px-8 sm:pt-16"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
              Drop ativo · Brandão85
            </p>
            <h1
              id="drop-ativo"
              className="mt-4 font-display uppercase leading-[0.88]"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.02em" }}
            >
              Isso é
              <br />
              Trap.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-fg/80 sm:text-base">
              {brandao.voice.epigraph} O drop do Isso é Trap Vol.02 chega em
              {" "}{drop.length} peças, {dropAvailable} ainda em estoque. Cada pedido sai
              da casa em security bag lacrada.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={buildCatalogHref({ artista: "brandao", ordem: "drop" })}
                data-cursor="Ver o drop"
                className="inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
                style={{ background: "#ffffff", color: "#0a0a0a" }}
              >
                Ver o drop completo
              </Link>
              <Link
                href="/brandao"
                data-cursor="Brandão85"
                className="inline-flex items-center rounded-full border px-6 py-3 text-sm transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: "var(--border)" }}
              >
                Universo Brandão85
              </Link>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-4 sm:gap-5">
            {drop.slice(0, 4).map((p, i) => (
              <li key={p.handle}>
                <ProductCard product={p} priority={i < 2} sizes="(min-width: 1024px) 28vw, 50vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="universos-title"
        className="mx-auto max-w-screen-2xl px-4 pt-14 pb-4 sm:px-8"
      >
        <h2
          id="universos-title"
          className="mb-6 font-display uppercase leading-none"
          style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)", letterSpacing: "0.02em" }}
        >
          Por universo
        </h2>
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
          {universes.map((u) => (
            <CollectionCard
              key={u.slug}
              href={buildCatalogHref({ artista: u.slug, ordem: "drop" })}
              image={u.image}
              title={u.title}
              subtitle={u.subtitle}
              objectPosition={u.objectPosition}
            />
          ))}
        </div>
      </section>

      <Reveal>
        <ProductCarousel
          title="XTRANHO"
          subtitle="Matuê · o terceiro capítulo"
          products={xtranho}
          href={buildCatalogHref({ artista: "matue", ordem: "drop" })}
          hrefLabel="Tudo de Matuê"
        />
      </Reveal>

      <Reveal>
        <ProductRow
          title="Colapso Global"
          subtitle="Teto & Wiu · a coleção conjunta"
          products={colapso}
          cols={2}
          limit={2}
          href={buildCatalogHref({ artista: "teto", ordem: "drop" })}
          hrefLabel="Ver coleção"
        />
      </Reveal>

      <Reveal>
        <ProductRow
          title="Últimas unidades"
          subtitle="Tamanhos que restam no estoque real da loja"
          products={lastUnits}
          limit={4}
          href={buildCatalogHref({ disponivel: true, ordem: "drop" })}
          hrefLabel="Só em estoque"
        />
      </Reveal>

      <Reveal>
        <ProductCarousel
          title="333 e Portal"
          subtitle="Matuê · o capítulo do recorde"
          products={matueRest}
          href={buildCatalogHref({ artista: "matue", ordem: "drop" })}
          hrefLabel="Tudo de Matuê"
        />
      </Reveal>

      <Reveal>
        <ProductCarousel
          title="Acessórios e colecionáveis"
          subtitle="Bonés, bandanas e o boneco do Rock in Rio"
          products={acessorios}
          href={buildCatalogHref({ categoria: "acessorios", ordem: "drop" })}
          hrefLabel="Ver acessórios"
        />
      </Reveal>

      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <ul className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-6 px-4 py-10 sm:px-8 lg:grid-cols-4">
          {TRUST.map((t) => (
            <li key={t.label}>
              <p className="font-display text-lg uppercase leading-none sm:text-xl">{t.label}</p>
              <p className="mt-2 text-xs text-muted">{t.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <NewsletterCapture source="loja" />
    </>
  );
}
