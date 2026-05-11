export type ArtistSlug = "matue" | "wiu" | "teto" | "brandao";

export type MotionPreset = "glitch" | "slow" | "collage" | "xerox";

export type DropStatus = "live" | "debut" | "encore" | "soldout";

export interface AlbumInfo {
  title: string;
  year: string;
  collaborator?: string;
  coverImage: string;
  tagline: string;
  highlightedTracks: string[];
}

export interface BioFact {
  label: string;
  value: string;
}

export interface ArtistSocials {
  spotify?: string; // URL completa do artista
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  appleMusic?: string;
  soundcloud?: string;
  twitter?: string;
}

export interface ArtistConfig {
  slug: ArtistSlug;
  displayName: string;
  realName: string;
  origin: string;
  bornYear: number;
  joinedYear: number;
  bioParagraphs: string[];
  facts: BioFact[];
  signatureSongs: string[];

  universeName: string;
  tagline: string;
  manifesto: string;
  shopifyCollectionHandle: string;
  motionPreset: MotionPreset;
  ambientAudio?: string;
  portraitImage: string;
  realPhotoUrl?: string;
  photoObjectPosition?: string;
  photoFilter?: string;
  heroImage: string;
  lookbookImages: [string, string, string];
  panelAccent: string;
  panelBackground: string;
  album: AlbumInfo;
  drop: {
    status: DropStatus;
    statusLabel: string;
    chapterName: string;
    availabilityNote: string;
  };
  voice: {
    epigraph: string;
    process: [string, string, string];
  };
  signatureLyric: string;

  socials?: ArtistSocials;
  /** Spotify artist or album ID for embed iframe — formato: "artist/{id}" ou "album/{id}" */
  spotifyEmbedPath?: string;
}
