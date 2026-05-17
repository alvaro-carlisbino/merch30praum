import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllNews, getNewsPost } from "@/lib/cms/news";
import { getArtist } from "@/lib/cms/artists";
import type { ArtistSlug } from "@/lib/artists/types";

export async function generateStaticParams() {
  const all = await getAllNews();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} · 30praum`,
    description: post.excerpt,
    openGraph: { images: [post.heroImage] },
  };
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) notFound();

  const dateBr = new Date(post.publishedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const relatedArtists = (
    await Promise.all((post.relatedArtists ?? []).map((s) => getArtist(s as ArtistSlug)))
  ).filter((a): a is NonNullable<typeof a> => a !== null);

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-8 py-16">
      <Link href="/news" className="inline-flex items-center gap-2 text-sm opacity-65 hover:opacity-100">
        <ArrowLeft size={14} strokeWidth={1.5} />
        Notícias
      </Link>

      <p className="mt-8 text-sm opacity-65">
        {dateBr} · {post.author}
      </p>

      <h1
        className="mt-6 font-display uppercase leading-[0.9]"
        style={{ fontSize: "clamp(2rem, 6vw, 4.75rem)", letterSpacing: "-0.03em" }}
      >
        {post.title}
      </h1>

      <p className="mt-6 text-lg sm:text-2xl text-fg/85 leading-snug font-medium">{post.excerpt}</p>

      <div
        className="mt-10 relative aspect-[16/10] overflow-hidden border"
        style={{ borderColor: "var(--border)" }}
      >
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          unoptimized
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-12 grid gap-6 text-base sm:text-lg leading-relaxed text-fg/85">
        {post.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {relatedArtists.length > 0 && (
        <div
          className="mt-16 border-t pt-10"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-sm opacity-60 mb-4">Mencionado:</p>
          <div className="flex flex-wrap gap-3">
            {relatedArtists.map((a) => (
              <Link
                key={a.slug}
                href={`/${a.slug}`}
                className="inline-flex items-center gap-2 border px-4 py-2 text-sm hover:bg-fg/5"
                style={{ borderColor: "var(--border)" }}
              >
                {a.displayName}
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
