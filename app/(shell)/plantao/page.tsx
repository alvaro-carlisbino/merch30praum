import Link from "next/link";
import Image from "next/image";
import { blurFor } from "@/lib/images/blur-data";
import { getCurrentPlantao, getPastPlantao } from "@/lib/cms/plantao";
import { PlantaoCountdown } from "@/components/plantao/PlantaoCountdown";
import { NewsletterCapture } from "@/components/shell/NewsletterCapture";

const PLANTAO_RED = "#ff2d5a";
const HERO_PHOTO = "/figma-plantao/stage-2025.jpg";
const ART_2026 = "/figma-plantao/hero.jpg";
const LINEUP_GRID = "/figma-plantao/lineup-grid-2026.webp";

function longDate(iso: string) {
  return new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function compact(n: number) {
  return n >= 1_000_000 ? `${(n / 1_000_000).toFixed(n % 1_000_000 ? 1 : 0)}M` : `${Math.round(n / 1000)}K`;
}

export async function generateMetadata() {
  const current = await getCurrentPlantao();
  return {
    title: `Plantão Festival · ${current.year}`,
    description: `O festival próprio da 30praum em Fortaleza. Plantão ${current.year}: ${current.tagline}. Lista de espera aberta.`,
  };
}

export default async function PlantaoHubPage() {
  const [current, past] = await Promise.all([getCurrentPlantao(), getPastPlantao()]);
  const last = past[0] ?? null;
  const upcoming = current.status === "upcoming" || current.status === "live";
  const attendees = past.reduce((n, e) => n + (e.stats.attendees ?? 0), 0);
  const online = past.reduce((n, e) => n + (e.stats.onlineViewers ?? 0), 0);

  const stats = [
    { label: "Edições", value: String(past.length), foot: `desde ${past[past.length - 1]?.year ?? 2024}` },
    { label: "Presencial", value: compact(attendees), foot: "cumulativo · Beira-Mar" },
    { label: "Online", value: compact(online), foot: "audiência YouTube" },
    { label: "Investimento", value: last?.stats.investment ?? "R$ 5M", foot: `edição ${last?.year ?? ""}` },
  ];

  return (
    <>
      <section
        className="relative isolate flex w-full items-end overflow-hidden"
        style={{ minHeight: "min(92svh, 960px)" }}
        aria-labelledby="proxima-edicao"
      >
        <Image
          src={HERO_PHOTO}
          alt={last ? `Palco do Plantão ${last.year}` : "Plantão Festival"}
          fill
          priority
          quality={80}
          sizes="100vw"
          placeholder={blurFor(HERO_PHOTO) ? "blur" : "empty"}
          blurDataURL={blurFor(HERO_PHOTO)}
          className="-z-20 object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,3,10,0.35) 0%, rgba(6,3,10,0.1) 35%, rgba(6,3,10,0.72) 70%, rgba(6,3,10,0.98) 100%)",
          }}
        />
        <div className="mx-auto grid w-full max-w-screen-2xl gap-10 px-4 pb-14 pt-40 sm:px-8 sm:pb-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div className="flex flex-col gap-7">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/85">
              {upcoming ? "Próxima edição" : "Edição atual"} · {longDate(current.date)} · {current.city}/{current.state}
            </p>
            <h1
              id="proxima-edicao"
              className="font-display uppercase leading-[0.82] text-white plantao-neon-text"
              style={{ fontSize: "clamp(4rem, 14vw, 12rem)", letterSpacing: "-0.04em" }}
            >
              Plantão
              <br />
              <span style={{ color: PLANTAO_RED }}>{current.year}</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{current.manifesto}</p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#lista"
                data-cursor="Lista de espera"
                className="inline-flex items-center rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition-opacity hover:opacity-90"
                style={{ background: PLANTAO_RED, color: "#fff", boxShadow: `0 0 32px ${PLANTAO_RED}55` }}
              >
                Entrar na lista de espera
              </a>
              <Link
                href="/plantao/edicoes"
                data-cursor="Edições"
                className="inline-flex items-center rounded-full border-2 px-6 py-3 text-xs uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: "rgba(255,255,255,0.85)" }}
              >
                Edições anteriores
              </Link>
            </div>
          </div>
          <div className="text-white lg:justify-self-end">
            {upcoming && (
              <PlantaoCountdown
                targetDate={`${current.date}T${current.doorsAt}:00-03:00`}
                label={`Falta para o Plantão ${current.year}`}
              />
            )}
            <p className="mt-4 text-xs text-white/60">
              {current.venue === "A confirmar" ? "Local a confirmar" : current.venue} · portões {current.doorsAt}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y" style={{ borderColor: PLANTAO_RED, background: "#0a0204" }}>
        <dl className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-8 px-4 py-12 sm:px-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-white/55">{s.label}</dt>
              <dd
                className="mt-3 font-display tabular-nums"
                style={{ fontSize: "clamp(2rem, 3.4vw, 2.8rem)", letterSpacing: "-0.01em", color: PLANTAO_RED }}
              >
                {s.value}
              </dd>
              <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/55">{s.foot}</p>
            </div>
          ))}
        </dl>
      </section>

      <NewsletterCapture
        id="lista"
        source="plantao"
        variant="dark"
        title={
          <>
            Pré-venda antes
            <br />
            de todo mundo.
          </>
        }
        body={`Line-up, setores e abertura de vendas do Plantão ${current.year} saem primeiro pra quem está na lista. Venda oficial só pela 30praum.`}
        buttonLabel="Entrar na lista"
      />

      {last && (
        <section
          className="border-y"
          style={{ borderColor: PLANTAO_RED, background: "#0a0204" }}
          aria-labelledby="ultima-edicao"
        >
          <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
              <Link
                href="/plantao/edicoes#plantao-2026"
                data-cursor={`Plantão ${last.year}`}
                className="group relative block overflow-hidden rounded-3xl border-2"
                style={{ aspectRatio: "16 / 9", borderColor: PLANTAO_RED, boxShadow: `0 0 40px ${PLANTAO_RED}33` }}
              >
                <Image
                  src={ART_2026}
                  alt={`Arte oficial do Plantão ${last.year}`}
                  fill
                  quality={80}
                  placeholder={blurFor(ART_2026) ? "blur" : "empty"}
                  blurDataURL={blurFor(ART_2026)}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </Link>
              <div>
                <h2
                  id="ultima-edicao"
                  className="font-display uppercase leading-[0.92] text-white"
                  style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)", letterSpacing: "-0.01em" }}
                >
                  Plantão {last.year}.
                  <br />
                  Dez anos de casa.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">{last.manifesto}</p>
                <dl className="mt-8 grid grid-cols-3 gap-6">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-white/55">Presencial</dt>
                    <dd className="mt-2 font-display text-2xl text-white">{last.stats.attendees ? compact(last.stats.attendees) : "a definir"}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-white/55">Online</dt>
                    <dd className="mt-2 font-display text-2xl text-white">{last.stats.onlineViewers ? compact(last.stats.onlineViewers) : "a definir"}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-white/55">Nomes no palco</dt>
                    <dd className="mt-2 font-display text-2xl text-white">{last.lineup.length || "a definir"}</dd>
                  </div>
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/plantao/lineup"
                    data-cursor="Line-up"
                    className="inline-flex items-center rounded-full border-2 px-6 py-3 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
                    style={{ borderColor: PLANTAO_RED, color: PLANTAO_RED }}
                  >
                    Line-up {last.year} →
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative mt-12 w-full" style={{ aspectRatio: "2560 / 1278" }}>
              <Image
                src={LINEUP_GRID}
                alt={`Line-up Plantão ${last.year}`}
                fill
                quality={82}
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="border-b" style={{ borderColor: PLANTAO_RED, background: "#0a0204" }} aria-labelledby="historia">
          <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8 sm:py-20">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <h2
                id="historia"
                className="font-display uppercase leading-[0.92] text-white"
                style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)", letterSpacing: "-0.01em" }}
              >
                O Plantão tem história.
              </h2>
              <Link
                href="/plantao/edicoes"
                data-cursor="Todas as edições"
                className="inline-flex items-center rounded-full border-2 px-6 py-3 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: PLANTAO_RED, color: PLANTAO_RED }}
              >
                Ver todas edições →
              </Link>
            </div>
            <ul className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {past.map((ed) => (
                <PastEditionCard
                  key={ed.slug}
                  href={`/plantao/edicoes#${ed.slug}`}
                  image={ed.heroImage}
                  title={ed.title}
                  sub={ed.tagline}
                />
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

function PastEditionCard({ href, image, title, sub }: { href: string; image: string; title: string; sub: string }) {
  return (
    <li>
      <Link
        href={href}
        data-cursor={title}
        className="group relative block overflow-hidden rounded-3xl border-2"
        style={{ borderColor: PLANTAO_RED, boxShadow: `0 0 40px ${PLANTAO_RED}33` }}
      >
        <div className="relative w-full" style={{ aspectRatio: "1142 / 836" }}>
          <Image
            src={image}
            alt={title}
            fill
            quality={82}
            placeholder={blurFor(image) ? "blur" : "empty"}
            blurDataURL={blurFor(image)}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.82) 100%)" }}
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-6 sm:p-7">
            <h3
              className="font-display uppercase leading-tight text-white"
              style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)", letterSpacing: "0.01em", textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
            >
              {title}
            </h3>
            <p className="text-xs text-white/75">{sub}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
