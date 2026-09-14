import { ImageResponse } from "next/og";
import { ARTISTS, isArtistSlug } from "@/lib/artists/registry";
import type { ArtistSlug } from "@/lib/artists/types";
import { OG_FONT_FAMILY, ogFonts } from "@/lib/og/fonts";
import { OG_SIZE, publicPhoto, publicPng } from "@/lib/og/images";
import { ARTIST_OG_HERO, ARTIST_OG_NAME } from "@/lib/og/assets";

export const alt = "Universo do artista · 30praum";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ artist: string }> }) {
  const { artist } = await params;
  const slug: ArtistSlug = isArtistSlug(artist) ? artist : "matue";
  const cfg = ARTISTS[slug];
  const [fonts, bg, name, logo] = await Promise.all([
    ogFonts(),
    publicPhoto(ARTIST_OG_HERO[slug], 1200),
    publicPng(ARTIST_OG_NAME[slug], 640),
    publicPng("og/logo-30praum.png", 160),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: cfg.panelBackground,
          color: "#ffffff",
          fontFamily: OG_FONT_FAMILY,
        }}
      >
        {bg && (
          <img
            src={bg}
            alt=""
            width={1200}
            height={630}
            style={{ position: "absolute", inset: 0, objectFit: "cover", objectPosition: "center 25%" }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.85) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 48,
            right: 56,
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.75)",
          }}
        >
          <span>Site oficial</span>
          {logo && (
            <img src={logo} width={72} alt="" />
          )}
        </div>
        <div
          style={{
            position: "absolute",
            left: 56,
            bottom: 48,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {name ? (
            <img src={name} width={520} alt="" />
          ) : (
            <span style={{ fontSize: 140, lineHeight: 1 }}>{cfg.displayName}</span>
          )}
          <span style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>
            {cfg.tagline}
          </span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
