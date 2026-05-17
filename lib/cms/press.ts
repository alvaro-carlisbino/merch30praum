import "server-only";
import { unstable_cache } from "next/cache";
import { getPayloadClient } from "@/lib/payload/client";
import {
  PRESS_CONTACTS as STATIC_CONTACTS,
  PRESS_KIT_ASSETS as STATIC_ASSETS,
  type PressAsset,
  type PressAssetType,
} from "@/lib/press/registry";

const TTL = 60 * 60 * 4;

interface PressGlobal {
  contacts: typeof STATIC_CONTACTS;
  assets: PressAsset[];
}

type ContactEntry = { label: string; email: string };

function readContact(raw: unknown): ContactEntry {
  const v = (raw ?? {}) as Record<string, unknown>;
  return { label: (v.label as string) ?? "", email: (v.email as string) ?? "" };
}

function adapt(doc: Record<string, unknown>): PressGlobal {
  const c = (doc.contacts as Record<string, unknown>) ?? {};
  return {
    contacts: {
      ar: readContact(c.ar),
      booking: readContact(c.booking),
      imprensa: readContact(c.imprensa),
      parcerias: readContact(c.parcerias),
      geral: readContact(c.geral),
    },
    assets: ((doc.assets as Array<Record<string, unknown>>) ?? []).map((a) => ({
      slug: a.slug as string,
      title: a.title as string,
      type: a.type as PressAssetType,
      description: a.description as string,
      format: a.format as string,
      downloadUrl: a.downloadUrl as string,
      relatedArtist: (a.relatedArtist as string) || undefined,
      thumbnail: a.thumbnail as string,
    })),
  };
}

export const getPressKit = unstable_cache(
  async (): Promise<PressGlobal> => {
    try {
      const payload = await getPayloadClient();
      const doc = await payload.findGlobal({ slug: "press", depth: 1 });
      const obj = doc as unknown as Record<string, unknown>;
      if (obj && obj.contacts) return adapt(obj);
    } catch {}
    return { contacts: STATIC_CONTACTS, assets: STATIC_ASSETS };
  },
  ["press:global"],
  { tags: ["press"], revalidate: TTL }
);

export const getPressAssetsByType = unstable_cache(
  async (type: PressAssetType): Promise<PressAsset[]> => {
    const kit = await getPressKit();
    return kit.assets.filter((a) => a.type === type);
  },
  ["press:by-type"],
  { tags: ["press"], revalidate: TTL }
);

export const getPressAssetsByArtist = unstable_cache(
  async (slug: string): Promise<PressAsset[]> => {
    const kit = await getPressKit();
    return kit.assets.filter((a) => a.relatedArtist === slug);
  },
  ["press:by-artist"],
  { tags: ["press"], revalidate: TTL }
);
