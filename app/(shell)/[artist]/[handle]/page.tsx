import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTISTS, isArtistSlug } from "@/lib/artists/registry";
import {
  getCollectionByHandle,
  getProductByHandle,
} from "@/lib/shopify/client";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductCardBase } from "@/components/product/ProductCardBase";
import { ArtistVoice } from "@/components/product/ArtistVoice";
import { Window } from "@/components/lanhouse/Window";
import { ImageIcon, FolderOpenIcon } from "@/components/lanhouse/PixelIcons";

interface Params {
  artist: string;
  handle: string;
}

export async function generateStaticParams() {
  const params: Array<{ artist: string; handle: string }> = [];
  for (const slug of Object.keys(ARTISTS)) {
    const cfg = ARTISTS[slug as keyof typeof ARTISTS];
    const collection = await getCollectionByHandle(cfg.shopifyCollectionHandle);
    for (const product of collection?.products ?? []) {
      params.push({ artist: slug, handle: product.handle });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return {};
  return { title: product.title, description: product.description };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { artist, handle } = await params;
  if (!isArtistSlug(artist)) notFound();
  const cfg = ARTISTS[artist];
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  const collection = await getCollectionByHandle(cfg.shopifyCollectionHandle);
  const related = (collection?.products ?? [])
    .filter((p) => p.handle !== handle)
    .slice(0, 4);

  return (
    <article className="mx-auto max-w-[1100px] px-3 py-6 sm:px-6 sm:py-10">
      <Window
        title={`${product.handle}.jpg — Visualizador de Imagem`}
        icon={<ImageIcon size={14} />}
        menubar={["Arquivo", "Editar", "Exibir", "Ferramentas", "Ajuda"]}
        bodyClassName="p-0"
        statusBar={
          <>
            <span>
              C:\30praum\loja\{cfg.slug}\{product.handle}.jpg
            </span>
            <span>{(product.images?.length ?? 1)} imagens</span>
          </>
        }
      >
        {/* address bar */}
        <div className="flex items-center gap-2 border-b border-[#aca899] bg-[#ece9d8] px-2 py-1">
          <span className="font-mono text-[11px] text-black">Endereço:</span>
          <div className="flex h-[20px] flex-1 items-center gap-1 border border-[#7f7f7f] bg-white px-2 font-mono text-[11px] text-black">
            <FolderOpenIcon size={14} />
            <Link href="/loja" className="text-[#0a246a] underline">C:\30praum\loja\</Link>
            <Link href={`/${cfg.slug}`} className="text-[#0a246a] underline">{cfg.slug}\</Link>
            <span>{product.handle}.jpg</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="border-r border-[#aca899] bg-[#0a0a0a] p-4">
            <ProductGallery images={product.images} productHandle={product.handle} />
          </div>
          <div className="bg-[#ece9d8] p-4">
            <ProductPurchasePanel product={product} />
          </div>
        </div>
      </Window>

      <ArtistVoice artist={cfg} />

      {related.length > 0 ? (
        <section className="mt-6 border border-[#aca899] bg-white p-4">
          <header className="mb-3 flex items-center justify-between gap-2 border-b border-[#aca899] pb-2 font-mono text-[11px] uppercase text-black">
            <span>mais arquivos em {cfg.slug}\</span>
            <Link href={`/${cfg.slug}`} className="text-[#0a246a] underline normal-case">
              abrir pasta →
            </Link>
          </header>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCardBase product={p} artistSlug={cfg.slug} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
