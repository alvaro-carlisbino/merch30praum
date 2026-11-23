import Image from "next/image";
import { SINGLES } from "@/lib/releases/singles";

export function SinglesRecentes({ limit }: { limit?: number }) {
  const singles = limit ? SINGLES.slice(0, limit) : SINGLES;
  return (
    <section aria-labelledby="singles-recentes" className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8 sm:py-20">
        <h2
          id="singles-recentes"
          className="font-display mb-8 uppercase leading-[0.92]"
          style={{ fontSize: "clamp(2.2rem, 5.4vw, 4.5rem)", letterSpacing: "-0.02em" }}
        >
          Acabou de sair
        </h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {singles.map((single) => (
            <li key={single.slug}>
              <a
                href={single.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Ouvir"
                aria-label={`Ouvir ${single.title}, de ${single.artists}, no Apple Music`}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-white/5">
                  <Image
                    src={single.cover}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 32vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="font-display mt-1 text-xl uppercase leading-none">{single.title}</h3>
                <p className="mt-1 text-sm leading-snug text-muted">{single.artists}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
