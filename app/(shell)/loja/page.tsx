import Image from "next/image";
import Link from "next/link";
import { Window } from "@/components/lanhouse/Window";
import { WindowsButton } from "@/components/lanhouse/WindowsButton";
import { FolderIcon, FolderOpenIcon } from "@/components/lanhouse/PixelIcons";
import { getCollectionByHandle } from "@/lib/shopify/client";
import { ARTISTS, ARTIST_SLUGS } from "@/lib/artists/registry";
import type { DomainProduct } from "@/lib/shopify/types";
import type { ArtistSlug } from "@/lib/artists/types";

export const metadata = {
  title: "loja/ — 30praum",
  description: "Catálogo completo do merch oficial 30praum.",
};

type EnrichedProduct = { artistSlug: ArtistSlug; product: DomainProduct };

export default async function LojaPage() {
  const collections = await Promise.all(
    ARTIST_SLUGS.map(async (slug) => {
      const col = await getCollectionByHandle(ARTISTS[slug].shopifyCollectionHandle);
      return { slug, products: col?.products ?? [] };
    }),
  );

  const allProducts: EnrichedProduct[] = collections.flatMap(({ slug, products }) =>
    products.map((product) => ({ artistSlug: slug, product })),
  );

  return (
    <Window
      id="loja-explorer"
      title="loja/ — Meu Computador"
      iconKey="myComputer"
      x={120}
      y={28}
      width={1140}
      rootOfRoute
      menubar={["Arquivo", "Editar", "Exibir", "Favoritos", "Ferramentas", "Ajuda"]}
      bodyClassName="p-0"
      statusBar={
        <>
          <span>{ARTIST_SLUGS.length} pastas, {allProducts.length} arquivos</span>
          <span>30praum · loja</span>
        </>
      }
    >
      <div className="flex items-center gap-2 border-b border-[#aca899] bg-[#ece9d8] px-2 py-1">
        <span className="font-mono text-[11px] text-black">Endereço:</span>
        <div className="flex h-[20px] flex-1 items-center gap-1 border border-[#7f7f7f] bg-white px-2 font-mono text-[11px] text-black">
          <FolderOpenIcon size={14} />
          <span>C:\30praum\loja\</span>
        </div>
        <WindowsButton className="min-w-0 h-[20px]">Ir</WindowsButton>
      </div>

      <div className="grid min-h-[520px] grid-cols-1 sm:grid-cols-[180px_1fr]">
        <aside
          className="hidden border-r border-[#aca899] p-2 sm:block"
          style={{ background: "linear-gradient(to bottom, #c1d2ee, #7fa3d6)" }}
        >
          <div className="mb-3 border border-[#fff] bg-white p-2">
            <p className="mb-1 font-bold text-[11px] text-black">Tarefas de arquivo e pasta</p>
            <ul className="space-y-1 text-[11px] text-[#0a246a] underline">
              <li><a href="#">criar nova pasta</a></li>
              <li><a href="#">publicar pasta na web</a></li>
              <li><a href="#">compartilhar pasta</a></li>
            </ul>
          </div>

          <div className="mb-3 border border-[#fff] bg-white p-2">
            <p className="mb-1 font-bold text-[11px] text-black">Outros locais</p>
            <ul className="space-y-1 text-[11px]">
              <li><Link href="/" className="text-[#0a246a] underline">Área de trabalho</Link></li>
              <li><Link href="/artistas" className="text-[#0a246a] underline">artistas\</Link></li>
              <li><Link href="/plantao" className="text-[#0a246a] underline">plantão\</Link></li>
              <li><Link href="/cart" className="text-[#0a246a] underline">sacola\</Link></li>
            </ul>
          </div>

          <div className="border border-[#fff] bg-white p-2">
            <p className="mb-1 font-bold text-[11px] text-black">Detalhes</p>
            <p className="text-[11px] text-[#333]">
              <strong>loja</strong>
              <br />pasta de arquivos
              <br />modificado em: hoje
              <br />tipo: catálogo aberto
            </p>
          </div>
        </aside>

        <section className="bg-white p-3">
          <h2 className="mb-2 font-mono text-[11px] uppercase text-[#666]">Pastas</h2>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {collections.map(({ slug, products }) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="explorer-item flex flex-col items-center gap-1 p-2 text-center"
              >
                <FolderIcon size={48} />
                <span className="font-mono text-[11px] text-black">
                  {ARTISTS[slug].displayName.toUpperCase()}\
                </span>
                <span className="font-mono text-[10px] text-[#666]">{products.length} itens</span>
              </Link>
            ))}
          </div>

          <h2 className="mb-2 font-mono text-[11px] uppercase text-[#666]">Arquivos</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {allProducts.map(({ artistSlug, product }) => {
              const price = parseFloat(product.priceMin.amount).toFixed(2).replace(".", ",");
              const ext = product.featuredImage?.url?.endsWith(".png") ? "PNG" : "JPG";
              return (
                <Link
                  key={product.id}
                  href={`/${artistSlug}/${product.handle}`}
                  className="explorer-item flex flex-col items-center gap-1 p-2 text-center"
                >
                  <div className="relative h-[88px] w-[88px] border border-[#777] bg-[#fafafa]">
                    {product.featuredImage ? (
                      <Image
                        src={product.featuredImage.url}
                        alt={product.title}
                        fill
                        sizes="88px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : null}
                  </div>
                  <span className="block max-w-[110px] truncate font-mono text-[11px] text-black">
                    {product.handle.replace(/-/g, "_")}.{ext.toLowerCase()}
                  </span>
                  <span className="font-mono text-[10px] text-[#666]">
                    {ext} · R$ {price}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </Window>
  );
}
