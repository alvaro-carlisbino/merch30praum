import Image from "next/image";

interface Props {
  bgImage: string;
  nameImage: string;
  nameAspect: string;
  quote: string;
  quoteAttribution: string;
}

export function ArtistPageHero({
  bgImage,
  nameImage,
  nameAspect,
  quote,
  quoteAttribution,
}: Props) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "min(86svh, 880px)",
        minHeight: "640px",
        background: "var(--bg)",
      }}
      aria-label="Hero do artista"
    >
      <Image
        src={bgImage}
        alt=""
        aria-hidden
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 25%" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-screen-2xl flex-col justify-start px-4 pt-16 sm:px-8 sm:pt-20">
        <div
          className="relative"
          style={{
            width: "min(56vw, 540px)",
            aspectRatio: nameAspect,
          }}
        >
          <Image
            src={nameImage}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 640px) 540px, 56vw"
            className="object-contain object-left"
            style={{ filter: "drop-shadow(0 4px 30px rgba(0,0,0,0.5))" }}
          />
        </div>

        <blockquote className="mt-8 max-w-md text-white">
          <p
            className="italic leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)" }}
          >
            “{quote}”
          </p>
          <footer className="mt-2 text-xs italic text-white/70">
            {quoteAttribution}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
