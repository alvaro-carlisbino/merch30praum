import { PromoBanner } from "@/components/loja/PromoBanner";
import { CatalogSidebar } from "@/components/loja/CatalogSidebar";
import { CatalogGrid, type CatalogItem } from "@/components/loja/CatalogGrid";

export const metadata = {
  title: "Catálogo · Loja 30praum",
  description: "Catálogo completo da loja 30praum — filtra por categoria, tamanho, cor e artista.",
};

const ITEMS: CatalogItem[] = [
  { id: "1", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-loja/ep-1.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "2", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-loja/ep-4.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "3", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-loja/ep-3.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "4", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-loja/ep-2.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "5", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-home/produto-face.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "6", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-loja/mv-3.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "7", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-home/produto-sabotage.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "8", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-loja/mv-4.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "9", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-home/produto-black-puffer.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "10", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-home/produto-respeito.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "11", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-loja/mv-1.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "12", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-loja/mv-2.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
  { id: "13", href: "/produto/camiseta-333-azul-eletrico", image: "/figma-home/produto-green-puffer.png", title: "Camiseta 333 Azul Elétrico", price: "R$ 189,00" },
];

export default function CatalogoPage() {
  return (
    <>
      <PromoBanner />

      <section className="mx-auto max-w-screen-2xl px-4 pt-10 pb-12 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-10">
          <div className="lg:sticky lg:top-20 lg:self-start">
            <CatalogSidebar />
          </div>

          <div className="flex flex-col gap-10">
            <CatalogGrid items={ITEMS} />

            <Pagination current={2} total={20} />
          </div>
        </div>
      </section>
    </>
  );
}

function Pagination({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-end gap-4 pb-4">
      <button
        type="button"
        aria-label="Página anterior"
        className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-white hover:text-black"
        style={{ borderColor: "var(--border)" }}
      >
        <span aria-hidden>‹</span>
      </button>
      <span className="text-sm tabular-nums">
        {current}/{total}
      </span>
      <button
        type="button"
        aria-label="Próxima página"
        className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-white hover:text-black"
        style={{ borderColor: "var(--border)" }}
      >
        <span aria-hidden>›</span>
      </button>
    </div>
  );
}
