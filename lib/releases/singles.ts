import type { ArtistSlug } from "@/lib/artists/types";

export type Single = {
  slug: string;
  title: string;
  artists: string;
  artistSlug: ArtistSlug;
  releaseDate: string;
  cover: string;
  href: string;
};

// Datas e links do catálogo oficial do Apple Music, conferidos em 23/11/2026.
export const SINGLES: Single[] = [
  { slug: "cada-passo", title: "Cada Passo", artists: "Kevn_Black, Teto e Alee", artistSlug: "teto", releaseDate: "2026-11-21", cover: "/singles/cada-passo.webp", href: "https://music.apple.com/br/album/cada-passo-single/6834531236" },
  { slug: "qual-foi", title: "QUAL FOI?!", artists: "Brandão85", artistSlug: "brandao", releaseDate: "2026-11-19", cover: "/singles/qual-foi.webp", href: "https://music.apple.com/br/album/qual-foi-single/6831702232" },
  { slug: "deixa-o-sol-entrar", title: "Deixa o Sol Entrar", artists: "IZA e Teto", artistSlug: "teto", releaseDate: "2026-11-19", cover: "/singles/deixa-o-sol-entrar.webp", href: "https://music.apple.com/br/album/deixa-o-sol-entrar-single/6832750736" },
  { slug: "odeio-te-amar", title: "ODEIO TE AMAR", artists: "Lou Garcia e Wiu", artistSlug: "wiu", releaseDate: "2026-11-13", cover: "/singles/odeio-te-amar.webp", href: "https://music.apple.com/br/album/odeio-te-amar-single/6831772565" },
  { slug: "ainda-sou-o-mesmo", title: "AINDA SOU O MESMO?", artists: "Brandão85", artistSlug: "brandao", releaseDate: "2026-11-12", cover: "/singles/ainda-sou-o-mesmo.webp", href: "https://music.apple.com/br/album/ainda-sou-o-mesmo-single/6828992452" },
  { slug: "high", title: "HIGH", artists: "Brandão85", artistSlug: "brandao", releaseDate: "2026-11-05", cover: "/singles/high.webp", href: "https://music.apple.com/br/album/high-single/6823657615" },
  { slug: "piranguera", title: "Piranguera", artists: "Wiu", artistSlug: "wiu", releaseDate: "2026-11-03", cover: "/singles/piranguera.webp", href: "https://music.apple.com/br/album/piranguera-single/6823735759" },
  { slug: "mundo-fashion", title: "Mundo Fashion", artists: "Tz da Coronel e Matuê", artistSlug: "matue", releaseDate: "2026-10-21", cover: "/singles/mundo-fashion.webp", href: "https://music.apple.com/br/album/mundo-fashion-single/6812900136" },
  { slug: "dg", title: "D&G", artists: "Brandão85", artistSlug: "brandao", releaseDate: "2026-10-01", cover: "/singles/dg.webp", href: "https://music.apple.com/br/album/d-g-single/6817394450" },
];
