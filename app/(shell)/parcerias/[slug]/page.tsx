import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { getAllPartners, getPartner } from "@/lib/cms/partners";
import { getArtist } from "@/lib/cms/artists";
import type { ArtistSlug } from "@/lib/artists/types";

export async function generateStaticParams() {
  const all = await getAllPartners();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const partner = await getPartner(slug);
  if (!partner) return {};
  return {
    title: `${partner.name} × 30praum`,
    description: partner.shortPitch,
    openGraph: { images: [partner.heroImage] },
  };
}

const STATUS_LABEL = {
  active: "Parceria ativa",
  past: "Histórica",
  upcoming: "Em desenvolvimento",
} as const;

export default async function PartnerCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partner = await getPartner(slug);
  if (!partner) notFound();

  const artists = (
    await Promise.all((partner.artistsInvolved ?? []).map((s) => getArtist(s as ArtistSlug)))
  ).filter((a): a is NonNullable<typeof a> => a !== null);

  return (
    <article style={{ background: partner.bgColor, color: "#f5f5f5" }}>
      {/* HERO */}
      <section className="relative isolate min-h-[90svh] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage: `url(${partner.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.5) contrast(1.1)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(circle at 20% 20%, ${partner.brandColor}33, transparent 60%), linear-gradient(180deg, transparent 30%, ${partner.bgColor}f8 100%)`,
          }}
        />
        <div className="relative mx-auto flex max-w-screen-2xl flex-col justify-end px-4 sm:px-8 pt-32 pb-16 min-h-[90svh]">
          <Link
            href="/parcerias"
            className="inline-flex items-center gap-2 text-sm opacity-65 hover:opacity-100 w-fit"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Parcerias
          </Link>

          <h1
            className="mt-10 font-display uppercase leading-[0.82] whitespace-pre-line"
            style={{
              fontSize: "clamp(3rem, 12vw, 11rem)",
              letterSpacing: "-0.04em",
            }}
          >
            {partner.headline}
          </h1>

          <p className="mt-8 max-w-2xl text-lg sm:text-2xl text-white/85 leading-snug">
            {partner.shortPitch}
          </p>

          <p
            className="mt-6 text-sm"
            style={{ color: partner.brandColor }}
          >
            {STATUS_LABEL[partner.status]} · {partner.category} · {partner.years}
          </p>

          {partner.internalLink && (
            <Link
              href={partner.internalLink}
              className="mt-12 inline-flex items-center gap-3 px-7 py-4 text-xs uppercase tracking-[0.2em] font-medium w-fit transition-transform hover:-translate-y-0.5"
              style={{ background: partner.brandColor, color: partner.bgColor }}
            >
              Entrar no microsite
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          )}
        </div>
      </section>

      {/* Story */}
      <section
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-24 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <h2
              className="font-display uppercase leading-[0.9]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Como nasceu.
            </h2>
            <p className="mt-8 text-base sm:text-lg text-white/85 leading-relaxed max-w-prose">
              {partner.story}
            </p>
            <blockquote
              className="mt-12 border-l-2 pl-5 max-w-md italic text-white/75 text-lg"
              style={{ borderColor: partner.brandColor }}
            >
              "{partner.quote}"
            </blockquote>
<div className="grid gap-3 content-start">
            {artists.length > 0 && (
              <div
                className="border p-6"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                <p className="text-sm opacity-65 mb-4">Artistas envolvidos</p>
                <ul className="space-y-3">
                  {artists.map((a) => (
                    <li key={a!.slug}>
                      <Link
                        href={`/${a!.slug}`}
                        className="inline-flex items-center gap-2 font-display text-2xl hover:opacity-80 transition-opacity"
                        style={{ color: partner.brandColor, letterSpacing: "-0.01em" }}
                      >
                        {a!.displayName}
                        <ArrowRight size={20} strokeWidth={1.5} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className="border p-6"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              <p className="text-sm opacity-65 mb-2">Site oficial</p>
              <a
                href={partner.externalLink}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 break-all"
                style={{ color: partner.brandColor }}
              >
                {partner.externalLink.replace(/^https?:\/\//, "")}
                <ExternalLink size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {partner.galleryImages.length > 0 && (
        <section
          className="border-t"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20">
            <div className="mt-8 grid gap-2 grid-cols-2 lg:grid-cols-4">
              {partner.galleryImages.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden border"
                  style={{ borderColor: "rgba(255,255,255,0.15)" }}
                >
                  <Image
                    src={src}
                    alt={`${partner.name} ${i + 1}`}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Outros parceiros */}
      <section
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-20">
          <h2
            className="font-display uppercase leading-[0.9]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            A holding tem mais.
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(await getAllPartners())
              .filter((p) => p.slug !== partner.slug && p.status !== "past")
              .slice(0, 6)
              .map((p) => {
                const s = p.slug;
                return (
                  <Link
                    key={s}
                    href={`/parcerias/${s}`}
                    className="border p-6 transition-colors hover:bg-white/5 group"
                    style={{ borderColor: "rgba(255,255,255,0.15)" }}
                  >
                    <p
                      className="inline-flex items-center gap-2 font-display text-2xl group-hover:opacity-80 transition-opacity"
                      style={{ letterSpacing: "-0.01em", color: p.brandColor }}
                    >
                      {p.name}
                      <ArrowRight size={18} strokeWidth={1.5} />
                    </p>
                    <p className="mt-3 text-sm text-white/65 line-clamp-2">{p.shortPitch}</p>
                    <p className="mt-3 text-xs opacity-50">{p.category}</p>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </article>
  );
}
