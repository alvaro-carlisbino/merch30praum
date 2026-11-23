import type { ArtistSlug } from "@/lib/artists/types";
import { IMG } from "@/lib/images/paths";

export type AlbumSlug = "xtranho" | "colapso-global" | "isso-e-trap-vol-2";

export interface AlbumTrack {
  title: string;
  featured?: string;
}

export interface AlbumPageInfo {
  slug: AlbumSlug;
  title: string;
  artists: { name: string; slug: ArtistSlug }[];
  year: string;
  releaseDate: string;
  duration?: string;
  coverImage: string;
  about: string;
  accentHex: string;
  bgHex: string;
  tracks: AlbumTrack[];
  streamingLinks: { label: string; href: string }[];
  dropArtistSlug: ArtistSlug;
}

export const ALBUM_SLUGS: AlbumSlug[] = ["xtranho", "colapso-global", "isso-e-trap-vol-2"];

export const ALBUMS: Record<AlbumSlug, AlbumPageInfo> = {
  xtranho: {
    slug: "xtranho",
    title: "XTRANHO",
    artists: [{ name: "Matuê", slug: "matue" }],
    year: "2025",
    releaseDate: "2025-12-10",
    coverImage: IMG.coverXtranho,
    about:
      "Terceiro álbum do Matuê, depois de Máquina do Tempo (2020) e 333 (2024). Foi feito em quatro meses, num acampamento criativo com músicos, produtores e designers. O lançamento teve audição aberta no Vale do Anhangabaú, em São Paulo.",
    accentHex: "#1f6bff",
    bgHex: "#03050a",
    tracks: [
      { title: "REI TUÊ" },
      { title: "TALKING BOUT" },
      { title: "MEU CEMITÉRIO" },
      { title: "ÍCONE FASHION", featured: "kouth" },
      { title: "AUTOBAHN", featured: "Cashley" },
      { title: "NANANANA", featured: "N.A.N.A." },
      { title: "FACAS E MACHADOS", featured: "FAB GODAMN, okie" },
      { title: "ALTERADO", featured: "Phl Notunrboy" },
      { title: "PENSAMENTOS PERIGOSOS", featured: "LPT Zlatan" },
      { title: "XTRANHO", featured: "Brandão85" },
      { title: "BACKSTAGE", featured: "BNYX, Azul Wynter, Bryan Yepes" },
      { title: "TODAS AS LUZES" },
      { title: "OS MELHORES" },
    ],
    streamingLinks: [
      { label: "Spotify", href: "https://open.spotify.com/album/5ORsvI5ThmZw7PS1NTvZaB" },
      { label: "Apple Music", href: "https://music.apple.com/br/album/xtranho/1859250096" },
      { label: "YouTube Music", href: "https://music.youtube.com/playlist?list=PLxA687tYuMWjvXl8AjP1Is0wXdYoyC3x_" },
    ],
    dropArtistSlug: "matue",
  },
  "colapso-global": {
    slug: "colapso-global",
    title: "Colapso Global",
    artists: [
      { name: "Teto", slug: "teto" },
      { name: "Wiu", slug: "wiu" },
    ],
    year: "2026",
    releaseDate: "2026-01-27",
    duration: "33 min",
    coverImage: IMG.coverColapsoGlobal,
    about:
      "Disco a quatro mãos de Teto e Wiu. É trap na base, mas passa por house, jazz, bossa nova e funk carioca. Ficou entre as dez maiores estreias globais de álbuns no Spotify na semana de lançamento. LENTO tem produção inteira do Wiu.",
    accentHex: "#c8506a",
    bgHex: "#1a0a10",
    tracks: [
      { title: "ISSO AQUI É BRASIL", featured: "Deekapz" },
      { title: "MEDICINA" },
      { title: "REF" },
      { title: "LENTO" },
      { title: "CULPA DO FUSO", featured: "Franco, The Sir!" },
      { title: "PANELA SUJA", featured: "Mirella Costa" },
      { title: "O CARA" },
      { title: "FACECARD", featured: "Yuri Redicopa" },
      { title: "AMARGO & DOCE", featured: "Melissa Hartman" },
      { title: "MONALISA" },
      { title: "À BEIRA", featured: "Don L, Lamar" },
    ],
    streamingLinks: [
      { label: "Spotify", href: "https://open.spotify.com/album/214OaJv3XycWX4oqydN2Ic" },
      { label: "Apple Music", href: "https://music.apple.com/br/album/colapso-global/1872539052" },
    ],
    dropArtistSlug: "wiu",
  },
  "isso-e-trap-vol-2": {
    slug: "isso-e-trap-vol-2",
    title: "Isso É Trap Vol. 2",
    artists: [{ name: "Brandão85", slug: "brandao" }],
    year: "2026",
    releaseDate: "2026-04-15",
    duration: "37 min",
    coverImage: IMG.coverIssoETrap,
    about:
      "Continuação da mixtape de 2025 e terceiro projeto longo do Brandão85 pela 30praum, depois de CEO (2024) e Isso É Trap (2025). Catorze faixas, com Matuê em JAPONÊS e Desiree em ROCKSTAR. Passou de 100 milhões de plays no Spotify em menos de seis meses.",
    accentHex: "#ff3b1f",
    bgHex: "#0c0c0c",
    tracks: [
      { title: "BENÇA" },
      { title: "OK" },
      { title: "PARIS" },
      { title: "WARZONE" },
      { title: "BLUNT DE GOIABA" },
      { title: "JAQUETA BAPE" },
      { title: "MOOD" },
      { title: "MILAGRE" },
      { title: "FÓRMULAS & MIRAGENS" },
      { title: "BUG NA MATRIX" },
      { title: "JAPONÊS", featured: "Matuê" },
      { title: "ROCKSTAR", featured: "Desiree" },
      { title: "DEPOIS DO SHOW" },
      { title: "COMIGO MESMO" },
    ],
    streamingLinks: [
      { label: "Spotify", href: "https://open.spotify.com/album/5jiPp1YPjyhcWqU6jYQxlv" },
      { label: "Apple Music", href: "https://music.apple.com/br/album/1891123236" },
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
