import Link from "next/link";
import Image from "next/image";
import { NEWS_POSTS, type NewsTag } from "@/lib/news/registry";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { WordReveal } from "@/components/motion/WordReveal";

export const metadata = {
  title: "Notícias · 30praum",
  description:
    "Lançamentos, parcerias, plantão e bastidores. A agenda editorial oficial da gravadora.",
};

const TAG_LABEL: Record<NewsTag, string> = {
  lancamento: "Lançamento",
  plantao: "Plantão",
  parceria: "Parceria",
  industria: "Indústria",
  bastidores: "Bastidores",
  incubadora: "Incubadora",
  holding: "Holding",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function NewsPage() {
  const sorted = [...NEWS_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const [hero, ...rest] = sorted;

  return (
    <article>
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 pt-24 pb-12">
        <WordReveal
          text="A 30praum por dentro."
          as="h1"
          className="font-display uppercase leading-[0.85]"
          stagger={0.08}
          wordClassName="text-[clamp(2.5rem,10vw,9rem)] tracking-[-0.04em]"
        />
        <p className="mt-8 max-w-2xl text-base sm:text-lg text-fg/80 leading-relaxed">
          Lançamentos, agenda do festival, parcerias, indústria. O que a gravadora publica como
          verdade oficial — sem reblog, sem ruído.
        </p>
      </section>

      {/* Hero post */}
      {hero && (
        <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 pb-16">
          <Link
            href={`/news/${hero.slug}`}
            className="group grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12 items-stretch border"
            style={{ borderColor: "var(--border)" }}
            data-cursor="Abrir matéria"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={hero.heroImage}
                alt={hero.title}
                fill
                unoptimized
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: "brightness(0.78) contrast(1.05)" }}
              />
            </div>
            <div className="flex flex-col justify-end p-6 sm:p-10">
              <p className="text-sm opacity-60">{formatDate(hero.publishedAt)}</p>
              <h2
                className="mt-4 font-display uppercase leading-[0.9]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
              >
                {hero.title}
              </h2>
              <p className="mt-5 text-base sm:text-lg text-fg/80 leading-relaxed">
                {hero.excerpt}
              </p>
            </div>
          </Link>
        </section>
      )}

      {/* Grid */}
      <section className="mx-auto max-w-screen-2xl px-4 sm:px-8 pb-24">
        <ScrollReveal stagger={0.08}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="group flex flex-col border overflow-hidden"
                style={{ borderColor: "var(--border)" }}
                data-cursor="Abrir"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.82) contrast(1.05)" }}
                  />
                </div>
                <div className="flex flex-col gap-3 p-6 flex-1">
                  <p className="text-xs opacity-55">{formatDate(post.publishedAt)}</p>
                  <h3
                    className="font-display text-xl sm:text-2xl leading-tight"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm text-fg/70 leading-relaxed">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </article>
  );
}
