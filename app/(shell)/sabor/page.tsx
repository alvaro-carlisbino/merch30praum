import Image from "next/image";
import Link from "next/link";
import { SABOR_MATUE } from "@/lib/sabor/registry";
import { IMG } from "@/lib/images/unsplash";

export const metadata = {
  title: "Sabor Matuê · holding 30praum",
  description:
    "A primeira frente FMCG da holding 30praum. Linha de geladinhos premium em parceria com fábrica cearense — lançamento verão 26/27.",
};

const STATUS_LABEL = {
  "coming-soon": "Em breve",
  available: "Disponível",
  limited: "Edição limitada",
} as const;

export default function SaborPage() {
  return (
    <>
      <section
        className="relative w-full overflow-hidden"
        style={{
          height: "min(70svh, 720px)",
          minHeight: "560px",
          background: "var(--bg)",
        }}
      >
        <Image
          src={IMG.saborHero}
          alt=""
          aria-hidden
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: "center 40%",
            filter: "brightness(0.55) contrast(1.05) saturate(0.92)",
          }}
          unoptimized
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.92) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex h-full max-w-screen-2xl flex-col justify-end px-4 pb-12 sm:px-8 sm:pb-16">
          <h1
            className="font-display uppercase leading-[0.92] text-white"
            style={{
              fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Sabor Matuê
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-snug text-white/85 sm:text-base">
            {SABOR_MATUE.tagline}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-8 sm:py-16">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Stat label="Lançamento" value={`Verão ${SABOR_MATUE.launchYear - 1}/${String(SABOR_MATUE.launchYear).slice(-2)}`} />
          <Stat label="Origem" value={SABOR_MATUE.origin} />
          <Stat label="SKUs" value="5 sabores +1 ltd." />
          <Stat label="Categoria" value="FMCG · Premium" />
        </dl>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 pb-16 sm:px-8 sm:pb-20">
        <h2
          className="font-display uppercase leading-[0.92] max-w-3xl"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            letterSpacing: "-0.02em",
          }}
        >
          O EP virou meme. Virou estampa. Agora vira sabor.
        </h2>
        <div className="mt-8 grid max-w-3xl gap-5 text-sm leading-relaxed text-fg/85 sm:text-base">
          {SABOR_MATUE.manifesto.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section
        id="sabores"
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2
              className="font-display uppercase leading-[0.92]"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Cada faixa, um geladinho.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-fg/75 sm:text-base">
              Cada sabor referencia uma música. Embalagem desenhada faixa a
              faixa. Ingredientes da Serra de Baturité ao litoral do Ceará.
            </p>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {SABOR_MATUE.productLine.map((s) => (
              <li key={s.slug}>
                <article
                  className="group flex flex-col overflow-hidden rounded-2xl"
                  style={{
                    background: `linear-gradient(180deg, ${s.color}22, color-mix(in srgb, var(--fg) 6%, var(--bg)) 70%)`,
                  }}
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.7) 100%)",
                      }}
                    />
                    {s.status === "limited" && (
                      <span
                        className="absolute right-3 top-3 inline-flex items-center rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.28em]"
                        style={{
                          background: "rgba(0,0,0,0.72)",
                          color: s.accent,
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        {STATUS_LABEL[s.status]}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 p-5">
                    <h3
                      className="font-display uppercase leading-tight"
                      style={{
                        fontSize: "clamp(1.3rem, 1.8vw, 1.7rem)",
                        letterSpacing: "0.01em",
                        color: s.accent,
                      }}
                    >
                      {s.name}
                    </h3>
                    <p className="text-sm font-medium text-fg/85">{s.tagline}</p>
                    <p className="text-sm text-fg/65 leading-relaxed">
                      {s.description}
                    </p>
                    {s.inspirationTrack && (
                      <p
                        className="mt-2 border-t pt-3 text-xs italic text-muted"
                        style={{ borderColor: "var(--border)" }}
                      >
                        Faixa — {s.inspirationTrack}
                      </p>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8 sm:py-20">
          <h2
            className="font-display uppercase leading-[0.92]"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Três fases — Norte → Brasil → LATAM.
          </h2>

          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              SABOR_MATUE.distribution.phase1,
              SABOR_MATUE.distribution.phase2,
              SABOR_MATUE.distribution.phase3,
            ].map((phase, idx) => (
              <li key={phase.label}>
                <article
                  className="rounded-2xl border p-7"
                  style={{
                    borderColor: "var(--border)",
                    background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
                  }}
                >
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
                      letterSpacing: "0.01em",
                      color: "var(--accent)",
                    }}
                  >
                    Fase {idx + 1}
                  </h3>
                  <p
                    className="mt-3 font-display text-lg"
                    style={{ letterSpacing: "0.01em" }}
                  >
                    {phase.label}
                  </p>
                  <p className="mt-1 text-sm text-fg/80">{phase.region}</p>
                  <ul className="mt-5 space-y-1.5 text-sm">
                    {phase.channels.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-2 text-fg/70"
                      >
                        <span aria-hidden style={{ color: "var(--accent)" }}>
                          ·
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto grid max-w-screen-2xl gap-8 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-end">
          <h2
            className="font-display uppercase leading-[0.92]"
            style={{
              fontSize: "clamp(1.6rem, 3.6vw, 2.6rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Sem aditivo. Sem corante artificial.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-fg/85 sm:text-base">
            {SABOR_MATUE.partnerNote}
          </p>
        </div>
      </section>

      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto grid max-w-screen-2xl gap-6 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2
              className="font-display uppercase leading-[0.92]"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Quer um antes?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-fg/80 sm:text-base">
              Cadastra teu email e a gente avisa primeiro quando os primeiros
              sabores ficarem disponíveis em pop-up no Plantão e na loja
              oficial.
            </p>
          </div>
          <Link
            href="https://instagram.com/sabormatue"
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="@sabormatue"
            className="inline-flex items-center rounded-full border px-6 py-3 text-sm transition-colors hover:bg-white hover:text-black"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
            }}
          >
            @sabormatue →
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.3em] text-muted">
        {label}
      </dt>
      <dd
        className="mt-2 font-display"
        style={{
          fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
          letterSpacing: "0.01em",
        }}
      >
        {value}
      </dd>
    </div>
  );
}
