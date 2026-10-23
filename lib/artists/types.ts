export type ArtistSlug = "matue" | "wiu" | "teto" | "brandao";

export interface AlbumInfo {
  title: string;
  year: string;
  collaborator?: string;
  coverImage: string;
  tracks: string[];
}

export interface BioFact {
  label: string;
  value: string;
}

export interface ArtistSocials {
  spotify?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  appleMusic?: string;
}

export interface ArtistConfig {
  slug: ArtistSlug;
  displayName: string;
  realName: string;
  origin: string;
  joinedYear: number;
  bioParagraphs: string[];
  facts: BioFact[];
  universeName: string;
  tagline: string;
  shopifyCollectionHandle: string;
  portraitImage: string;
  panelAccent: string;
  panelBackground: string;
  album: AlbumInfo;
  socials?: ArtistSocials;
}
