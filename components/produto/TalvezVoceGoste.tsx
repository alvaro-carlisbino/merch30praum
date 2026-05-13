import Image from "next/image";
import Link from "next/link";

type RelatedProduct = {
  id: string;
  href: string;
  image: string;
  alt: string;
};

interface Props {
  products: RelatedProduct[];
}

export function TalvezVoceGoste({ products }: Props) {
  return (
    <section
      aria-labelledby="talvez-voce-goste"
      className="mx-auto max-w-screen-2xl px-4 pb-16 pt-10 sm:px-8 sm:pt-16"
    >
      <h2
        id="talvez-voce-goste"
        className="mb-8 text-center font-display uppercase leading-none sm:mb-10"
        style={{
          fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
          letterSpacing: "0.04em",
        }}
      >
        Talvez Você Goste
      </h2>

      <div className="relative overflow-x-auto">
        <ul className="flex gap-4 px-1 sm:gap-5">
          {products.map((p) => (
            <li
              key={p.id}
              className="shrink-0"
              style={{ width: "min(22%, 280px)", minWidth: 200 }}
            >
              <Link
                href={p.href}
                data-cursor={p.alt}
                className="group block"
              >
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{
                    aspectRatio: "4 / 5",
                    background: "color-mix(in srgb, var(--fg) 6%, var(--bg))",
                  }}
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="280px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
