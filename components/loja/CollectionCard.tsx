import Image from "next/image";
import Link from "next/link";

interface CollectionCardProps {
  href: string;
  image: string;
  title: string;
}

export function CollectionCard({ href, image, title }: CollectionCardProps) {
  return (
    <Link
      href={href}
      data-cursor={title}
      className="group relative block overflow-hidden rounded-2xl"
      style={{ aspectRatio: "4 / 3" }}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.62) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-4 px-6 text-white">
        <h3
          className="font-display uppercase leading-none"
          style={{
            fontSize: "clamp(1.8rem, 3.4vw, 3rem)",
            letterSpacing: "0.02em",
            textShadow: "0 4px 18px rgba(0,0,0,0.45)",
          }}
        >
          {title}
        </h3>
        <span
          className="inline-flex items-center rounded-full border bg-black/35 px-5 py-2 text-[12px] backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-black"
          style={{ borderColor: "rgba(255,255,255,0.7)" }}
        >
          Comprar Agora
        </span>
      </div>
    </Link>
  );
}
