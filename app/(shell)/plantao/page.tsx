import Link from "next/link";
import Image from "next/image";
import { blurFor } from "@/lib/images/blur-data";
import { getCurrentPlantao, getPastPlantao } from "@/lib/cms/plantao";
import { PlantaoCountdown } from "@/components/plantao/PlantaoCountdown";
import { LineupPoster } from "@/components/plantao/LineupPoster";
import { LineupGrid } from "@/components/plantao/LineupGrid";
import { NewsletterCapture } from "@/components/shell/NewsletterCapture";
import { Reveal } from "@/components/effects/Reveal";

const RED = "#ff2d5a";
const INK = "#080205";
const HERO = "/figma-plantao/stage-2024.jpg";
const POSTER_2026 = "/figma-plantao/hero.jpg";

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
    { value: String(past.length), label: "Edições", foot: `desde ${past[past.length - 1]?.year ?? 2024}` },
    { value: compact(attendees), label: "Presencial", foot: "acumulado na Beira-Mar" },
    { value: compact(online), label: "Online", foot: "audiência no YouTube" },
    { value: "10h", label: "De palco", foot: `na edição ${last?.year ?? ""}` },
  ];

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section
        className="relative isolate flex items-end overflow-hidden"
        style={{ minHeight: "min(96svh, 1000px)", background: INK }}
        aria-labelledby="plantao-title"
      >
        <Image
          src={HERO}
          alt=""
          aria-hidden
          fill
          priority
          quality={82}
          sizes="100vw"
          placeholder={blurFor(HERO) ? "blur" : "empty"}
          blurDataURL={blurFor(HERO)}
          className="-z-20 object-cover"
          style={{ objectPosition: "center 62%" }}
        />
        {/* topo e base escurecidos para header e transição; meio preservado para a foto respirar */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(180deg, rgba(8,2,5,0.78) 0%, rgba(8,2,5,0.12) 18%, rgba(8,2,5,0.1) 46%, rgba(8,2,5,0.72) 80%, ${INK} 100%)`,
          }}
        />
        {/* poça escura atrás do bloco de texto, sem cobrir o palco */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: "radial-gradient(85% 65% at 16% 82%, rgba(8,2,5,0.92) 0%, rgba(8,2,5,0.55) 45%, transparent 72%)" }}
        />

        <div className="mx-auto w-full max-w-screen-2xl px-4 pb-12 pt-32 sm:px-8 sm:pb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/70 sm:text-[11px]">
            {longDate(current.date)} · {current.city}/{current.state} · festival próprio da 30praum
          </p>

          <h1
            id="plantao-title"
            className="font-display uppercase leading-[0.78] text-white"
            /* margem em em: o espaço para o til do Ã escala junto com o corpo do título */
            style={{ fontSize: "clamp(3.6rem, 16vw, 14rem)", letterSpacing: "-0.045em", marginTop: "0.16em" }}
          >
            Plantão
          </h1>

          <p
            className="font-display leading-[0.78] tabular-nums"
            style={{ fontSize: "clamp(3.6rem, 16vw, 14rem)", letterSpacing: "-0.05em", color: RED }}
          >
            {current.year}
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end">
            <div>
              <p className="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{current.manifesto}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#lista"
                  data-cursor="Lista de espera"
                  className="inline-flex items-center rounded-full px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] transition-transform hover:-translate-y-0.5"
                  style={{ background: RED, color: "#fff", boxShadow: `0 10px 40px ${RED}55` }}
                >
                  Entrar na lista de espera
                </a>
                <a
                  href="#lineup"
                  data-cursor="Line-up"
                  className="inline-flex items-center rounded-full border px-7 py-4 text-xs uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-black"
                  style={{ borderColor: "rgba(255,255,255,0.4)" }}
                >
                  Quem já passou por aqui
                </a>
              </div>
            </div>
            {upcoming && (
              <div className="lg:justify-self-end">
                <PlantaoCountdown
                  targetDate={`${current.date}T${current.doorsAt}:00-03:00`}
                  label="Contagem para os portões"
                  tone="accent"
                />
                <p className="mt-4 text-xs text-white/50">
                  {current.venue === "A confirmar" ? "Local a confirmar" : current.venue} · portões {current.doorsAt}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- NÚMEROS ---------- */}
      <section style={{ background: INK }} aria-label="Números do festival">
        <div className="mx-auto max-w-screen-2xl border-t px-4 sm:px-8" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dd
                  className="font-display leading-[0.85] tabular-nums text-white"
                  style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
                >
                  {s.value}
                </dd>
                <dt className="mt-3 text-[11px] uppercase tracking-[0.28em]" style={{ color: RED }}>
                  {s.label}
                </dt>
                <p className="mt-1 text-xs text-white/45">{s.foot}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- LINE-UP ---------- */}
      {last && last.lineup.length > 0 && (
        <section id="lineup" className="scroll-mt-16" style={{ background: INK }} aria-labelledby="lineup-title">
          <div className="mx-auto max-w-screen-2xl border-t px-4 py-20 sm:px-8 sm:py-28" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            <Reveal>
              <header className="mb-14 text-center">
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">
                  Line-up da edição {last.year} · {last.lineup.length} nomes
                </p>
                <h2
                  id="lineup-title"
                  className="mt-4 font-display uppercase leading-[0.88] text-white"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)", letterSpacing: "-0.02em" }}
                >
                  Uma noite. A cena inteira.
                </h2>
              </header>
            </Reveal>

            <Reveal delay={80}>
              <LineupPoster lineup={last.lineup} accent={RED} />
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-16 sm:mt-20">
                <LineupGrid lineup={last.lineup} accent={RED} />
              </div>
            </Reveal>

            <div className="mt-12 flex justify-center">
              <Link
                href="/plantao/lineup"
                data-cursor="Line-up completo"
                className="inline-flex items-center rounded-full border px-7 py-4 text-xs uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: "rgba(255,255,255,0.35)" }}
              >
                Percorrer o line-up {last.year} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ---------- LISTA DE ESPERA ---------- */}
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
        body={`Line-up, setores e abertura de vendas do Plantão ${current.year} saem primeiro pra quem está na lista. Venda oficial só pela 30praum: ingresso anunciado fora daqui é golpe.`}
        buttonLabel="Entrar na lista"
      />

      {/* ---------- EDIÇÃO ANTERIOR ---------- */}
      {last && (
        <section style={{ background: INK }} aria-labelledby="ultima-edicao">
          <div className="mx-auto max-w-screen-2xl px-4 py-20 sm:px-8 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
              <Reveal>
                <Link
                  href="/plantao/edicoes#plantao-2026"
                  data-cursor={`Plantão ${last.year}`}
                  className="group relative block overflow-hidden rounded-3xl"
                  style={{ aspectRatio: "16 / 10" }}
                >
                  <Image
                    src={POSTER_2026}
                    alt={`Arte oficial do Plantão ${last.year}`}
                    fill
                    quality={82}
                    placeholder={blurFor(POSTER_2026) ? "blur" : "empty"}
                    blurDataURL={blurFor(POSTER_2026)}
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </Link>
              </Reveal>
              <Reveal delay={80}>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: RED }}>
                    Última edição · {longDate(last.date)}
                  </p>
                  <h2
                    id="ultima-edicao"
                    className="mt-4 font-display uppercase leading-[0.86] text-white"
                    style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.025em" }}
                  >
                    Dez anos
                    <br />
                    numa noite só.
                  </h2>
                  <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">{last.manifesto}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/plantao/edicoes"
                      data-cursor="Edições"
                      className="inline-flex items-center rounded-full border px-6 py-3 text-xs uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-black"
                      style={{ borderColor: "rgba(255,255,255,0.35)" }}
                    >
                      Todas as edições →
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ---------- HISTÓRICO ---------- */}
      {past.length > 0 && (
        <section style={{ background: INK }} aria-labelledby="historia">
          <div className="mx-auto max-w-screen-2xl border-t px-4 py-20 sm:px-8 sm:py-24" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            <Reveal>
              <h2
                id="historia"
                className="mb-12 font-display uppercase leading-[0.9] text-white"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
              >
                O Plantão tem história.
              </h2>
            </Reveal>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((ed, i) => (
                <Reveal key={ed.slug} delay={i * 70}>
                  <li>
                    <Link
                      href={`/plantao/edicoes#${ed.slug}`}
                      data-cursor={ed.title}
                      className="group relative block overflow-hidden rounded-2xl"
                    >
                      <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
                        <Image
                          src={ed.heroImage}
                          alt={ed.title}
                          fill
                          quality={80}
                          placeholder={blurFor(ed.heroImage) ? "blur" : "empty"}
                          blurDataURL={blurFor(ed.heroImage)}
                          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(180deg, transparent 40%, rgba(8,2,5,0.94) 100%)" }}
                        />
                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                          <p className="font-display uppercase leading-none text-white" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}>
                            {ed.title}
                          </p>
                          <p className="mt-2 text-xs leading-snug text-white/70">{ed.tagline}</p>
                          {ed.stats.attendees && (
                            <p className="mt-3 text-[10px] uppercase tracking-[0.28em]" style={{ color: RED }}>
                              {compact(ed.stats.attendees)} pessoas
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
