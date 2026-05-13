import Image from "next/image";
import Link from "next/link";

export type CatalogItem = {
  id: string;
  href: string;
  image: string;
  title: string;
  price: string;
};

interface Props {
  items: CatalogItem[];
}

export function CatalogGrid({ items }: Props) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
      {items.map((p) => (
        <li key={p.id}>
          <Link
            href={p.href}
            data-cursor={p.title}
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
                alt={p.title}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-3 text-center">
              <p
                className="font-display uppercase leading-tight"
                style={{
                  fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)",
                  letterSpacing: "0.03em",
                }}
              >
                {p.title}
              </p>
              <p className="mt-1 text-xs tabular-nums text-muted">{p.price}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
