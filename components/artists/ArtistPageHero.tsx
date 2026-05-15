import Image from "next/image";

interface Props {
  bgImage: string;
  bgPosition?: string;
  bgPositionMobile?: string;
  nameImage: string;
  nameAspect: string;
  quote: string;
  quoteAttribution: string;
}

export function ArtistPageHero({
  bgImage,
  bgPosition,
  bgPositionMobile,
  nameImage,
  nameAspect,
  quote,
  quoteAttribution,
}: Props) {
  const desktopPos = bgPosition ?? "center 25%";
  const mobilePos = bgPositionMobile ?? desktopPos;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={
        {
          height: "min(86svh, 880px)",
          minHeight: "560px",
          background: "var(--bg)",
          ["--hero-pos-mobile" as string]: mobilePos,
          ["--hero-pos-desktop" as string]: desktopPos,
        } as React.CSSProperties
      }
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
        className="hero-cover-image object-cover"
        style={{ objectPosition: "var(--hero-pos-mobile)" }}
      />
      <style>{`
        @media (min-width: 640px) {
          .hero-cover-image { object-position: var(--hero-pos-desktop) !important; }
        }
      `}</style>
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
            width: "min(70vw, 540px)",
            aspectRatio: nameAspect,
          }}
        >
          <Image
            src={nameImage}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 640px) 540px, 70vw"
            className="object-contain object-left"
            style={{ filter: "drop-shadow(0 4px 30px rgba(0,0,0,0.5))" }}
          />
        </div>

        <blockquote className="mt-6 max-w-md text-white sm:mt-8">
          <p
            className="italic leading-relaxed"
            style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.15rem)" }}
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
