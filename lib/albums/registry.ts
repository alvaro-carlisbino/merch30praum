import type { ArtistSlug } from "@/lib/artists/types";

export type AlbumSlug = "xtranho" | "colapso-global" | "isso-e-trap-vol-2";

export interface AlbumPageInfo {
  slug: AlbumSlug;
  title: string;
  artists: { name: string; slug: ArtistSlug }[];
  year: string;
  releaseDate: string;
  totalTracks: number;
  duration: string;
  coverImage: string;
  manifesto: string;
  tagline: string;
  accentHex: string;
  bgHex: string;
  tracks: { title: string; duration: string; featured?: string }[];
  streamingLinks: { label: string; href: string }[];
  dropArtistSlug: ArtistSlug;
}

export const ALBUM_SLUGS: AlbumSlug[] = [
  "xtranho",
  "colapso-global",
  "isso-e-trap-vol-2",
];

export const ALBUMS: Record<AlbumSlug, AlbumPageInfo> = {
  xtranho: {
    slug: "xtranho",
    title: "XTRANHO",
    artists: [{ name: "Matuê", slug: "matue" }],
    year: "2025",
    releaseDate: "2025-12-10",
    totalTracks: 13,
    duration: "36 min",
    coverImage: "/assets/covers/xtranho.jpg",
    manifesto:
      "XTRANHO é o terceiro capítulo do Matuê — depois de Máquina do Tempo (2020) e 333 (2024). Aqui o sinal não vem de fora: ele se estabiliza. Trap underground com sonoridade inédita no mainstream brasileiro, gravado entre Fortaleza, São Paulo e Los Angeles.",
    tagline: "Sinal estável da terra de quem nunca foi daqui.",
    accentHex: "#1f6bff",
    bgHex: "#03050a",
    tracks: [
      { title: "REI TUÊ", duration: "2:44" },
      { title: "TALKING BOUT", duration: "2:38" },
      { title: "MEU CEMITÉRIO", duration: "3:02" },
      { title: "ÍCONE FASHION", duration: "2:55" },
      { title: "AUTOBAHN", duration: "3:11", featured: "Cashley" },
      { title: "NANANANA", duration: "3:24", featured: "OS NANA" },
      { title: "FACAS e MACHADOS", duration: "3:08", featured: "FAB GODAMN, Okie" },
      { title: "ALTERADO", duration: "2:42" },
    ],
    streamingLinks: [
      { label: "Spotify", href: "https://open.spotify.com/album/5ORsvI5ThmZw7PS1NTvZaB" },
      { label: "Apple Music", href: "https://music.apple.com/br/album/xtranho/1859250096" },
      { label: "YouTube Music", href: "https://music.youtube.com/" },
    ],
    dropArtistSlug: "matue",
  },

  "colapso-global": {
    slug: "colapso-global",
    title: "Colapso Global",
    artists: [
      { name: "Wiu", slug: "wiu" },
      { name: "Teto", slug: "teto" },
    ],
    year: "2026",
    releaseDate: "2026-01-27",
    totalTracks: 11,
    duration: "33 min",
    coverImage: "/assets/colapso_global.jpeg",
    manifesto:
      "Wiu e Teto se encontram pra um disco a duas mãos que mistura house, jazz, bossa nova, funk carioca e trap no mesmo espaço. Manifesto sonoro de liberdade criativa — o trap saindo da caixinha sem perder o peso.",
    tagline: "Quando o mundo cai, ainda dá pra dançar uma última.",
    accentHex: "#c8506a",
    bgHex: "#1a0a10",
    tracks: [
      { title: "Isso Aqui É Brasil", duration: "3:20", featured: "Deekapz" },
      { title: "Medicina", duration: "3:12" },
      { title: "Ref", duration: "2:48" },
      { title: "Lento", duration: "3:02" },
      { title: "Culpa do Fuso", duration: "3:18", featured: "Franco, The Sir!" },
      { title: "Panela Suja", duration: "2:56", featured: "Mirella Costa" },
      { title: "O Cara", duration: "2:44" },
      { title: "Facecard", duration: "3:08", featured: "Yuri Redicopa" },
      { title: "Amargo & Doce", duration: "3:21", featured: "Melissa Hartman" },
      { title: "Monalisa", duration: "2:51" },
      { title: "À Beira", duration: "3:09", featured: "Don L" },
    ],
    streamingLinks: [
      { label: "Spotify", href: "https://open.spotify.com/" },
      { label: "Apple Music", href: "https://music.apple.com/br/album/colapso-global/1872539052" },
      { label: "YouTube Music", href: "https://music.youtube.com/" },
    ],
    dropArtistSlug: "wiu",
  },

  "isso-e-trap-vol-2": {
    slug: "isso-e-trap-vol-2",
    title: "Isso é Trap Vol. 02",
    artists: [{ name: "Brandão85", slug: "brandao" }],
    year: "2026",
    releaseDate: "2026-04-16",
    totalTracks: 14,
    duration: "41 min",
    coverImage: "/assets/isso_e_trap_vol2.jpeg",
    manifesto:
      "Vol. 02 é a confirmação. Mixtape lançada pela 30praum continuando a sequência de Isso É Trap (Hash Produções, 2022). WARZONE e JAPONÊS já tinham viralizado antes do disco sair. Da Caponga pro mundo, sem perder o xerox.",
    tagline: "Cresci copiando. Agora os outros copiam errado.",
    accentHex: "#ff3b1f",
    bgHex: "#0c0c0c",
    tracks: [
      { title: "INTRO", duration: "1:42" },
      { title: "WARZONE", duration: "3:01" },
      { title: "JAPONÊS", duration: "2:55" },
      { title: "ROCKSTAR", duration: "2:47" },
      { title: "85", duration: "3:18" },
      { title: "QUEBRADA", duration: "3:21" },
      { title: "PABLO RELOAD", duration: "3:09" },
      { title: "CEP CAPONGA", duration: "2:51" },
      { title: "MUSTANG II", duration: "3:33" },
      { title: "SERTÃO", duration: "3:18" },
      { title: "ESCULACHO 2", duration: "2:46" },
      { title: "OUTRO 85", duration: "2:33" },
    ],
    streamingLinks: [
      { label: "Spotify", href: "https://open.spotify.com/album/5jiPp1YPjyhcWqU6jYQxlv" },
      { label: "Apple Music", href: "https://music.apple.com/" },
      { label: "YouTube Music", href: "https://music.youtube.com/" },
    ],
    dropArtistSlug: "brandao",
  },
};

export function getAlbum(slug: string): AlbumPageInfo | undefined {
  return ALBUMS[slug as AlbumSlug];
}

export function isAlbumSlug(slug: string): slug is AlbumSlug {
  return slug in ALBUMS;
}
