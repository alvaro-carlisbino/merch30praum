import Image from "next/image";
import Link from "next/link";
import { getCurrentPlantao } from "@/lib/cms/plantao";
import { blurFor } from "@/lib/images/blur-data";
import { Reveal } from "@/components/effects/Reveal";

const PHOTO = "/figma-plantao/stage-2025.jpg";
const RED = "#ff2d5a";

function daysUntil(iso: string) {
  const target = new Date(`${iso}T12:00:00-03:00`).getTime();
  return Math.max(0, Math.ceil((target - new Date().getTime()) / 86_400_000));
}

function longDate(iso: string) {
  return new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export async function PlantaoTeaser() {
  const current = await getCurrentPlantao();
  const upcoming = current.status === "upcoming" || current.status === "live";
  const days = daysUntil(current.date);
  return (
    <section aria-labelledby="plantao-teaser" className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <Link
            href="/plantao"
            data-cursor="Plantão"
            className="group relative isolate block overflow-hidden rounded-3xl"
            style={{ minHeight: "min(70svh, 640px)" }}
          >
            <Image
              src={PHOTO}
              alt="Palco do Plantão Festival"
              fill
              sizes="100vw"
              placeholder={blurFor(PHOTO) ? "blur" : "empty"}
              blurDataURL={blurFor(PHOTO)}
              className="-z-20 object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
              style={{ objectPosition: "center 40%" }}
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{ background: "linear-gradient(180deg, rgba(6,3,10,0.15) 0%, rgba(6,3,10,0.55) 55%, rgba(6,3,10,0.95) 100%)" }}
            />
            <div className="flex h-full min-h-[inherit] flex-col justify-end gap-5 p-6 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/80">
                  Festival próprio · {longDate(current.date)} · {current.city}
                </p>
                <h2
                  id="plantao-teaser"
                  className="mt-3 font-display uppercase leading-[0.85] text-white"
                  style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)", letterSpacing: "-0.03em" }}
                >
                  Plantão <span style={{ color: RED }}>{current.year}</span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
                  {upcoming
                    ? `Faltam ${days} dias. Line-up, setores e pré-venda saem primeiro pra quem está na lista de espera.`
                    : current.tagline}
                </p>
              </div>
              <span
                className="inline-flex w-fit items-center rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors group-hover:bg-white group-hover:text-black"
                style={{ background: RED }}
              >
                {upcoming ? "Entrar na lista de espera" : "Ver o festival"}
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
