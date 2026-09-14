import Image from "next/image";
import Link from "next/link";
import { blurFor } from "@/lib/images/blur-data";

interface CollectionCardProps {
  href: string;
  image: string;
  title: string;
  subtitle?: string;
  cta?: string;
  objectPosition?: string;
}

export function CollectionCard({ href, image, title, subtitle, cta = "Ver peças", objectPosition }: CollectionCardProps) {
  return (
    <Link
      href={href}
      data-cursor={title}
      className="group relative block overflow-hidden rounded-2xl"
      style={{ aspectRatio: "4 / 3", background: "#000" }}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        placeholder={blurFor(image) ? "blur" : "empty"}
        blurDataURL={blurFor(image)}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        style={{ objectPosition: objectPosition ?? "center 30%" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.72) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-3 px-6 text-center text-white">
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
        {subtitle && (
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/80">{subtitle}</p>
        )}
        <span
          className="inline-flex items-center rounded-full border bg-black/35 px-5 py-2 text-[12px] backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-black"
          style={{ borderColor: "rgba(255,255,255,0.7)" }}
        >
          {cta}
        </span>
      </div>
    </Link>
  );
}
