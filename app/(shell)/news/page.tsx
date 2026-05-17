import Link from "next/link";
import Image from "next/image";
import { getAllNews } from "@/lib/cms/news";
import { type NewsTag } from "@/lib/news/registry";

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

export default async function NewsPage() {
  const all = await getAllNews();
  const sorted = [...all].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const [hero, ...rest] = sorted;

  return (
    <>
      <section className="mx-auto max-w-screen-2xl px-4 pt-16 pb-10 sm:px-8 sm:pt-20">
        <h1
          className="font-display uppercase leading-[0.92]"
          style={{
            fontSize: "clamp(2.4rem, 5.8vw, 4.8rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Notícias
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fg/80 sm:text-base">
          Lançamentos, agenda do festival, parcerias, indústria. O que a
          gravadora publica como verdade oficial.
        </p>
      </section>

      {hero && (
        <section className="mx-auto max-w-screen-2xl px-4 pb-12 sm:px-8">
          <Link
            href={`/news/${hero.slug}`}
            className="group grid items-stretch gap-0 overflow-hidden rounded-3xl lg:grid-cols-[1.4fr_1fr]"
            style={{
              background: "color-mix(in srgb, var(--fg) 4%, var(--bg))",
            }}
            data-cursor="Abrir matéria"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={hero.heroImage}
                alt={hero.title}
                fill
                unoptimized
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col justify-end p-6 sm:p-10">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">
                {TAG_LABEL[hero.tags[0]]} · {formatDate(hero.publishedAt)}
              </p>
              <h2
                className="mt-4 font-display uppercase leading-[0.95]"
                style={{
                  fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)",
                  letterSpacing: "0.01em",
                }}
              >
                {hero.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-fg/80 sm:text-base">
                {hero.excerpt}
              </p>
            </div>
          </Link>
        </section>
      )}

      <section className="mx-auto max-w-screen-2xl px-4 pb-20 sm:px-8 sm:pb-24">
        <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {rest.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/news/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border"
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
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-muted">
                    {formatDate(post.publishedAt)}
                  </p>
                  <h3
                    className="font-display uppercase leading-tight"
                    style={{
                      fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-fg/70">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
