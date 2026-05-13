import Image from "next/image";

export type ArtistFact = { label: string; value: string };

interface Props {
  facts: ArtistFact[];
  description: string;
  sidePhoto: string;
  sidePhotoAlt: string;
}

export function SobreEle({ facts, description, sidePhoto, sidePhotoAlt }: Props) {
  return (
    <section
      aria-labelledby="sobre-ele"
      className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-8 sm:py-16"
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
        <div
          className="rounded-3xl border p-8 sm:p-10"
          style={{
            background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
            borderColor: "var(--border)",
          }}
        >
          <h2
            id="sobre-ele"
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 3.8vw, 3rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Sobre Ele
          </h2>

          <dl className="mt-8 space-y-3 text-sm">
            {facts.map((f) => (
              <div
                key={f.label}
                className="grid grid-cols-[140px_1fr] gap-4 border-b pb-3"
                style={{ borderColor: "var(--border)" }}
              >
                <dt className="text-[11px] uppercase tracking-[0.18em] text-muted">
                  {f.label}
                </dt>
                <dd className="leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 max-w-prose text-sm leading-relaxed text-fg/85">
            {description}
          </p>
        </div>

        <div
          className="relative overflow-hidden rounded-3xl"
          style={{ aspectRatio: "4 / 5", background: "var(--bg)" }}
        >
          <Image
            src={sidePhoto}
            alt={sidePhotoAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
          />
        </div>
      </div>
    </section>
  );
}
