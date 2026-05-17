import { useQuery } from "@tanstack/react-query";
import { payloadFetch, type PayloadFindResponse } from "./client";

import { ARTISTS as STATIC_ARTISTS, ARTIST_SLUGS } from "@/lib/artists/registry";
import {
  PLANTAO_EDITIONS as STATIC_PLANTAO,
  CURRENT_PLANTAO,
  type PlantaoEdition,
} from "@/lib/plantao/registry";
import { INCUBADORA as STATIC_INCUBADORA } from "@/lib/incubadora/registry";
import { PRODUCTS as STATIC_PRODUCTS, type MobileProduct } from "@/lib/shop/products";
import type { CategorySlug } from "@/lib/shop/categories";
import type { ArtistConfig, ArtistSlug } from "@/lib/artists/types";

const STALE_FIFTEEN_MIN = 1000 * 60 * 15;

interface ArtistDoc {
  slug: ArtistSlug;
  displayName: string;
  realName?: string | null;
  origin: string;
  bornYear?: number | null;
  joinedYear?: number | null;
  signatureLyric?: string | null;
  bioParagraphs?: { value: string }[] | null;
  facts?: { label: string; value: string }[] | null;
  signatureSongs?: { name: string }[] | null;
  universeName: string;
  tagline?: string | null;
  manifesto?: string | null;
  shopifyCollectionHandle?: string | null;
  motionPreset?: ArtistConfig["motionPreset"] | null;
  drop: ArtistConfig["drop"];
  voice?: { epigraph?: string | null; process?: { step: string }[] | null } | null;
  album: {
    title: string;
    year: string;
    collaborator?: string | null;
    coverImage: string;
    tagline?: string | null;
    highlightedTracks?: { name: string }[] | null;
  };
  portraitImage: string;
  realPhotoUrl?: string | null;
  photoObjectPosition?: string | null;
  photoFilter?: string | null;
  heroImage: string;
  lookbookImages?: { url: string }[] | null;
  panelAccent: string;
  panelBackground: string;
  socials?: ArtistConfig["socials"] | null;
  spotifyEmbedPath?: string | null;
}

function adaptArtist(doc: ArtistDoc): ArtistConfig {
  return {
    slug: doc.slug,
    displayName: doc.displayName,
    realName: doc.realName ?? "",
    origin: doc.origin,
    bornYear: doc.bornYear ?? 0,
    joinedYear: doc.joinedYear ?? 0,
    bioParagraphs: (doc.bioParagraphs ?? []).map((p) => p.value),
    facts: doc.facts ?? [],
    signatureSongs: (doc.signatureSongs ?? []).map((s) => s.name),
    universeName: doc.universeName,
    tagline: doc.tagline ?? "",
    manifesto: doc.manifesto ?? "",
    shopifyCollectionHandle: doc.shopifyCollectionHandle ?? "",
    motionPreset: doc.motionPreset ?? "slow",
    portraitImage: doc.portraitImage,
    realPhotoUrl: doc.realPhotoUrl ?? undefined,
    photoObjectPosition: doc.photoObjectPosition ?? undefined,
    photoFilter: doc.photoFilter ?? undefined,
    heroImage: doc.heroImage,
    lookbookImages: [
      doc.lookbookImages?.[0]?.url ?? "",
      doc.lookbookImages?.[1]?.url ?? "",
      doc.lookbookImages?.[2]?.url ?? "",
    ],
    panelAccent: doc.panelAccent,
    panelBackground: doc.panelBackground,
    album: {
      title: doc.album.title,
      year: doc.album.year,
      collaborator: doc.album.collaborator ?? undefined,
      coverImage: doc.album.coverImage,
      tagline: doc.album.tagline ?? "",
      highlightedTracks: (doc.album.highlightedTracks ?? []).map((t) => t.name),
    },
    drop: doc.drop,
    voice: {
      epigraph: doc.voice?.epigraph ?? "",
      process: [
        doc.voice?.process?.[0]?.step ?? "",
        doc.voice?.process?.[1]?.step ?? "",
        doc.voice?.process?.[2]?.step ?? "",
      ],
    },
    signatureLyric: doc.signatureLyric ?? "",
    socials: doc.socials ?? undefined,
    spotifyEmbedPath: doc.spotifyEmbedPath ?? undefined,
  };
}

interface PlantaoDoc extends Omit<PlantaoEdition, "lineup" | "sectors" | "galleryImages" | "infoFAQ" | "stats"> {
  lineup?: PlantaoEdition["lineup"];
  sectors?: PlantaoEdition["sectors"];
  galleryImages?: { url: string }[];
  infoFAQ?: PlantaoEdition["infoFAQ"];
  stats?: PlantaoEdition["stats"];
  isCurrent?: boolean;
}

function adaptPlantao(doc: PlantaoDoc): PlantaoEdition {
  return {
    slug: doc.slug,
    year: doc.year,
    title: doc.title,
    date:
      typeof doc.date === "string"
        ? doc.date.slice(0, 10)
        : new Date(doc.date as unknown as string).toISOString().slice(0, 10),
    doorsAt: doc.doorsAt,
    venue: doc.venue,
    city: doc.city,
    state: doc.state,
    status: doc.status,
    tagline: doc.tagline,
    manifesto: doc.manifesto,
    posterImage: doc.posterImage,
    heroImage: doc.heroImage,
    heroVideoUrl: doc.heroVideoUrl,
    aftermovieUrl: doc.aftermovieUrl,
    lineup: doc.lineup ?? [],
    sectors: doc.sectors ?? [],
    ticketsUrl: doc.ticketsUrl ?? "",
    embedTicketsUrl: doc.embedTicketsUrl,
    galleryImages: (doc.galleryImages ?? []).map((g) => g.url),
    stats: doc.stats ?? {},
    infoFAQ: doc.infoFAQ ?? [],
  };
}

export function useArtists() {
  return useQuery({
    queryKey: ["cms", "artists"],
    staleTime: STALE_FIFTEEN_MIN,
    queryFn: async () => {
      try {
        const res = await payloadFetch<PayloadFindResponse<ArtistDoc>>(
          "/artists?limit=100&depth=1"
        );
        if (!res.docs.length) throw new Error("empty");
        return res.docs.map(adaptArtist);
      } catch {
        return ARTIST_SLUGS.map((s) => STATIC_ARTISTS[s]);
      }
    },
  });
}

export function useArtist(slug: ArtistSlug) {
  return useQuery({
    queryKey: ["cms", "artist", slug],
    staleTime: STALE_FIFTEEN_MIN,
    queryFn: async () => {
      try {
        const res = await payloadFetch<PayloadFindResponse<ArtistDoc>>(
          `/artists?where[slug][equals]=${slug}&limit=1&depth=1`
        );
        if (res.docs[0]) return adaptArtist(res.docs[0]);
        throw new Error("not found");
      } catch {
        return STATIC_ARTISTS[slug] ?? null;
      }
    },
  });
}

export function useCurrentPlantao() {
  return useQuery({
    queryKey: ["cms", "plantao", "current"],
    staleTime: STALE_FIFTEEN_MIN,
    queryFn: async () => {
      try {
        const res = await payloadFetch<PayloadFindResponse<PlantaoDoc>>(
          "/plantao?where[isCurrent][equals]=true&limit=1&depth=1"
        );
        if (res.docs[0]) return adaptPlantao(res.docs[0]);
        throw new Error("not found");
      } catch {
        return STATIC_PLANTAO[CURRENT_PLANTAO];
      }
    },
  });
}

interface IncubadoraDoc {
  programName: string;
  shortTagline: string;
  manifesto?: { paragraph: string }[];
  howItWorks?: { step: string; title: string; description: string }[];
  casesOfSuccess?: typeof STATIC_INCUBADORA.casesOfSuccess;
  whatWeLookFor?: { value: string }[];
  whatWeDontLookFor?: { value: string }[];
  formFields?: { submissionUrl?: string; contactEmail: string };
}

function adaptIncubadora(doc: IncubadoraDoc): typeof STATIC_INCUBADORA {
  return {
    programName: doc.programName,
    shortTagline: doc.shortTagline,
    manifesto: (doc.manifesto ?? []).map((p) => p.paragraph),
    howItWorks: doc.howItWorks ?? [],
    casesOfSuccess: doc.casesOfSuccess ?? [],
    whatWeLookFor: (doc.whatWeLookFor ?? []).map((v) => v.value),
    whatWeDontLookFor: (doc.whatWeDontLookFor ?? []).map((v) => v.value),
    formFields: {
      submissionUrl: doc.formFields?.submissionUrl ?? "",
      contactEmail: doc.formFields?.contactEmail ?? "",
    },
  } as typeof STATIC_INCUBADORA;
}

export function useIncubadora() {
  return useQuery({
    queryKey: ["cms", "incubadora"],
    staleTime: STALE_FIFTEEN_MIN,
    queryFn: async () => {
      try {
        const doc = await payloadFetch<IncubadoraDoc>("/globals/incubadora?depth=1");
        if (doc?.programName) return adaptIncubadora(doc);
        throw new Error("empty");
      } catch {
        return STATIC_INCUBADORA;
      }
    },
  });
}

interface ProductDoc {
  id?: string;
  handle: string;
  title: string;
  shortDescription?: string | null;
  priceBRL: number;
  compareAtPriceBRL?: number | null;
  image: string;
  galleryImages?: { url: string }[] | null;
  artistSlug: ArtistSlug | "house";
  category: CategorySlug;
  tags?: { value: string }[] | null;
  isDropLive?: boolean;
  isSoldOut?: boolean;
  isPreOrder?: boolean;
  sizes?: { label: string; available: boolean }[] | null;
  stockNote?: string | null;
}

function adaptProduct(doc: ProductDoc): MobileProduct {
  return {
    id: doc.id ?? doc.handle,
    handle: doc.handle,
    title: doc.title,
    priceBRL: doc.priceBRL,
    image: doc.image,
    artistSlug: doc.artistSlug === "house" ? "matue" : doc.artistSlug,
    category: doc.category,
    isDropLive: Boolean(doc.isDropLive),
  };
}

export function useProducts() {
  return useQuery({
    queryKey: ["cms", "products"],
    staleTime: STALE_FIFTEEN_MIN,
    queryFn: async () => {
      try {
        const res = await payloadFetch<PayloadFindResponse<ProductDoc>>(
          "/products?limit=200&depth=1&sort=-isDropLive"
        );
        if (!res.docs.length) throw new Error("empty");
        return res.docs.map(adaptProduct);
      } catch {
        return STATIC_PRODUCTS;
      }
    },
  });
}
