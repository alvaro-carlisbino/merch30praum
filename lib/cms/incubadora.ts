import "server-only";
import { unstable_cache } from "next/cache";
import { getPayloadClient } from "@/lib/payload/client";
import { INCUBADORA as STATIC_INCUBADORA } from "@/lib/incubadora/registry";

const TTL = 60 * 60 * 4;

type Incubadora = typeof STATIC_INCUBADORA;

function adapt(doc: Record<string, unknown>): Incubadora {
  return {
    programName: doc.programName as string,
    shortTagline: doc.shortTagline as string,
    manifesto: ((doc.manifesto as Array<Record<string, unknown>>) ?? []).map(
      (p) => p.paragraph as string
    ),
    howItWorks: ((doc.howItWorks as Array<Record<string, unknown>>) ?? []).map((h) => ({
      step: h.step as string,
      title: h.title as string,
      description: h.description as string,
    })),
    casesOfSuccess: ((doc.casesOfSuccess as Array<Record<string, unknown>>) ?? []).map((c) => ({
      artistSlug: c.artistSlug as string,
      displayName: c.displayName as string,
      joinedYear: c.joinedYear as number,
      excerpt: c.excerpt as string,
      image: c.image as string,
    })),
    whatWeLookFor: ((doc.whatWeLookFor as Array<Record<string, unknown>>) ?? []).map(
      (v) => v.value as string
    ),
    whatWeDontLookFor: ((doc.whatWeDontLookFor as Array<Record<string, unknown>>) ?? []).map(
      (v) => v.value as string
    ),
    formFields: {
      submissionUrl: ((doc.formFields as Record<string, unknown>)?.submissionUrl as string) || "",
      contactEmail: (doc.formFields as Record<string, unknown>)?.contactEmail as string,
    },
  } as Incubadora;
}

export const getIncubadora = unstable_cache(
  async (): Promise<Incubadora> => {
    try {
      const payload = await getPayloadClient();
      const doc = (await payload.findGlobal({ slug: "incubadora", depth: 1 })) as unknown as Record<string, unknown> | null;
      if (doc && doc.programName) {
        return adapt(doc);
      }
    } catch {}
    return STATIC_INCUBADORA;
  },
  ["incubadora:global"],
  { tags: ["incubadora"], revalidate: TTL }
);
