import { getPayload } from "payload";
import config from "../payload.config";

import { ARTISTS, ARTIST_SLUGS } from "../lib/artists/registry";
import { PLANTAO_EDITIONS, CURRENT_PLANTAO } from "../lib/plantao/registry";
import { NEWS_POSTS } from "../lib/news/registry";
import { PARTNERS, PARTNER_SLUGS } from "../lib/partners/registry";
import { SHOWS } from "../lib/shows/registry";
import { ALBUMS, ALBUM_SLUGS } from "../lib/albums/registry";
import { INCUBADORA } from "../lib/incubadora/registry";
import { PRESS_CONTACTS, PRESS_KIT_ASSETS } from "../lib/press/registry";

const log = (msg: string) => console.log(`[seed] ${msg}`);

async function upsert(payload: Awaited<ReturnType<typeof getPayload>>, collection: string, slugField: string, slug: string, data: Record<string, unknown>) {
  const existing = await payload.find({
    // @ts-expect-error dynamic collection
    collection,
    where: { [slugField]: { equals: slug } },
    limit: 1,
  });
  if (existing.docs[0]) {
    await payload.update({
      // @ts-expect-error dynamic collection
      collection,
      id: existing.docs[0].id,
      data,
    });
    return "updated";
  }
  await payload.create({
    // @ts-expect-error dynamic collection
    collection,
    data,
  });
  return "created";
}

async function main() {
  log("inicializando Payload...");
  const payload = await getPayload({ config });

  log(`semeando ${ARTIST_SLUGS.length} artistas...`);
  for (const slug of ARTIST_SLUGS) {
    const a = ARTISTS[slug];
    const r = await upsert(payload, "artists", "slug", slug, {
      slug: a.slug,
      displayName: a.displayName,
      realName: a.realName,
      origin: a.origin,
      bornYear: a.bornYear,
      joinedYear: a.joinedYear,
      signatureLyric: a.signatureLyric,
      bioParagraphs: a.bioParagraphs.map((value) => ({ value })),
      facts: a.facts,
      signatureSongs: a.signatureSongs.map((name) => ({ name })),
      universeName: a.universeName,
      tagline: a.tagline,
      manifesto: a.manifesto,
      shopifyCollectionHandle: a.shopifyCollectionHandle,
      motionPreset: a.motionPreset,
      drop: a.drop,
      voice: {
        epigraph: a.voice.epigraph,
        process: a.voice.process.map((step) => ({ step })),
      },
      album: {
        title: a.album.title,
        year: a.album.year,
        collaborator: a.album.collaborator,
        coverImage: a.album.coverImage,
        tagline: a.album.tagline,
        highlightedTracks: a.album.highlightedTracks.map((name) => ({ name })),
      },
      portraitImage: a.portraitImage,
      realPhotoUrl: a.realPhotoUrl,
      photoObjectPosition: a.photoObjectPosition,
      photoFilter: a.photoFilter,
      heroImage: a.heroImage,
      lookbookImages: a.lookbookImages.map((url) => ({ url })),
      panelAccent: a.panelAccent,
      panelBackground: a.panelBackground,
      socials: a.socials,
      spotifyEmbedPath: a.spotifyEmbedPath,
    });
    log(`  ${slug}: ${r}`);
  }

  log(`semeando ${Object.keys(PLANTAO_EDITIONS).length} edições do Plantão...`);
  for (const slug of Object.keys(PLANTAO_EDITIONS) as Array<keyof typeof PLANTAO_EDITIONS>) {
    const e = PLANTAO_EDITIONS[slug];
    const r = await upsert(payload, "plantao", "slug", slug, {
      slug: e.slug,
      isCurrent: e.slug === CURRENT_PLANTAO,
      year: e.year,
      title: e.title,
      date: e.date,
      doorsAt: e.doorsAt,
      venue: e.venue,
      city: e.city,
      state: e.state,
      status: e.status,
      tagline: e.tagline,
      manifesto: e.manifesto,
      posterImage: e.posterImage,
      heroImage: e.heroImage,
      heroVideoUrl: e.heroVideoUrl,
      aftermovieUrl: e.aftermovieUrl,
      galleryImages: e.galleryImages.map((url) => ({ url })),
      lineup: e.lineup,
      sectors: e.sectors,
      ticketsUrl: e.ticketsUrl,
      embedTicketsUrl: e.embedTicketsUrl,
      stats: e.stats,
      infoFAQ: e.infoFAQ,
    });
    log(`  ${slug}: ${r}`);
  }

  log(`semeando ${NEWS_POSTS.length} posts de news...`);
  for (const n of NEWS_POSTS) {
    const r = await upsert(payload, "news", "slug", n.slug, {
      slug: n.slug,
      title: n.title,
      excerpt: n.excerpt,
      heroImage: n.heroImage,
      publishedAt: n.publishedAt,
      author: n.author,
      tags: n.tags,
      body: n.body.map((paragraph) => ({ paragraph })),
      relatedArtists: n.relatedArtists,
      relatedReleases: n.relatedReleases?.map((slug) => ({ slug })),
    });
    log(`  ${n.slug}: ${r}`);
  }

  log(`semeando ${PARTNER_SLUGS.length} parcerias...`);
  for (const slug of PARTNER_SLUGS) {
    const p = PARTNERS[slug];
    const r = await upsert(payload, "partners", "slug", slug, {
      slug: p.slug,
      name: p.name,
      category: p.category,
      years: p.years,
      status: p.status,
      brandColor: p.brandColor,
      bgColor: p.bgColor,
      headline: p.headline,
      shortPitch: p.shortPitch,
      story: p.story,
      quote: p.quote,
      release: p.release,
      externalLink: p.externalLink,
      internalLink: p.internalLink,
      logoPath: p.logoPath,
      heroImage: p.heroImage,
      galleryImages: p.galleryImages.map((url) => ({ url })),
      artistsInvolved: p.artistsInvolved,
    });
    log(`  ${slug}: ${r}`);
  }

  log(`semeando ${SHOWS.length} shows...`);
  for (const s of SHOWS) {
    const existing = await payload.find({
      collection: "shows",
      where: {
        and: [
          { artistSlug: { equals: s.artistSlug } },
          { date: { equals: s.date } },
          { city: { equals: s.city } },
        ],
      },
      limit: 1,
    });
    const data = {
      artistSlug: s.artistSlug,
      date: s.date,
      city: s.city,
      state: s.state,
      venue: s.venue,
      event: s.event,
      ticketsUrl: s.ticketsUrl,
      status: s.status,
      note: s.note,
    };
    if (existing.docs[0]) {
      await payload.update({ collection: "shows", id: existing.docs[0].id, data });
    } else {
      await payload.create({ collection: "shows", data });
    }
  }
  log(`  ${SHOWS.length} shows OK`);

  log(`semeando ${ALBUM_SLUGS.length} álbuns...`);
  for (const slug of ALBUM_SLUGS) {
    const a = ALBUMS[slug];
    const r = await upsert(payload, "albums", "slug", slug, {
      slug: a.slug,
      title: a.title,
      artists: a.artists,
      year: a.year,
      releaseDate: a.releaseDate,
      totalTracks: a.totalTracks,
      duration: a.duration,
      coverImage: a.coverImage,
      manifesto: a.manifesto,
      tagline: a.tagline,
      editorialPitch: a.editorialPitch,
      status: a.status,
      accentHex: a.accentHex,
      bgHex: a.bgHex,
      tracks: a.tracks,
      streamingLinks: a.streamingLinks,
      dropArtistSlug: a.dropArtistSlug,
    });
    log(`  ${slug}: ${r}`);
  }

  log("semeando Incubadora (global)...");
  await payload.updateGlobal({
    slug: "incubadora",
    data: {
      programName: INCUBADORA.programName,
      shortTagline: INCUBADORA.shortTagline,
      manifesto: INCUBADORA.manifesto.map((paragraph) => ({ paragraph })),
      howItWorks: INCUBADORA.howItWorks,
      casesOfSuccess: INCUBADORA.casesOfSuccess as never,
      whatWeLookFor: INCUBADORA.whatWeLookFor.map((value) => ({ value })),
      whatWeDontLookFor: INCUBADORA.whatWeDontLookFor.map((value) => ({ value })),
      formFields: INCUBADORA.formFields,
    },
  });
  log("  ok");

  log("semeando Press Kit (global)...");
  await payload.updateGlobal({
    slug: "press",
    data: {
      contacts: PRESS_CONTACTS,
      assets: PRESS_KIT_ASSETS as never,
    },
  });
  log("  ok");

  log("seed completo.");
  process.exit(0);
}

main().catch((err) => {
  console.error("[seed] erro:", err);
  process.exit(1);
});
