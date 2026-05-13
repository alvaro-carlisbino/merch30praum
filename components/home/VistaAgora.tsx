import { VistaAgoraCarousel, type VistaProduct } from "./VistaAgoraCarousel";

const PRODUCTS: VistaProduct[] = [
  {
    id: "sabotage",
    href: "/loja",
    image: "/figma-home/produto-sabotage.png",
    title: "Camiseta Sabotage",
    price: "R$ 189,00",
  },
  {
    id: "face",
    href: "/loja",
    image: "/figma-home/produto-face.png",
    title: "Camiseta Game Face",
    price: "R$ 189,00",
  },
  {
    id: "azul-eletrico",
    href: "/loja",
    image: "/figma-home/produto-green-puffer.png",
    title: "Camiseta 333 Azul Elétrico",
    price: "R$ 189,00",
  },
  {
    id: "black-puffer",
    href: "/loja",
    image: "/figma-home/produto-black-puffer.png",
    title: "Puffer Black 333",
    price: "R$ 489,00",
  },
  {
    id: "respeito",
    href: "/loja",
    image: "/figma-home/produto-respeito.png",
    title: "Camiseta Respeito",
    price: "R$ 189,00",
  },
];

export function VistaAgora() {
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

        <VistaAgoraCarousel products={PRODUCTS} />
      </div>
    </section>
  );
}
