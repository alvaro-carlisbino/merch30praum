import { ImageResponse } from "next/og";
import { getCurrentPlantao } from "@/lib/cms/plantao";
import { OG_FONT_FAMILY, ogFonts } from "@/lib/og/fonts";
import { OG_SIZE, publicPhoto, publicPng } from "@/lib/og/images";
import { PLANTAO_OG_HERO } from "@/lib/og/assets";

export const alt = "Plantão Festival · 30praum";
export const size = OG_SIZE;
export const contentType = "image/png";

const RED = "#ff2d5a";

export default async function Image() {
  const [fonts, bg, logo, current] = await Promise.all([
    ogFonts(),
    publicPhoto(PLANTAO_OG_HERO, 1200),
    publicPng("og/logo-30praum.png", 160),
    getCurrentPlantao(),
  ]);
  const upcoming = current.status === "upcoming";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0a0204",
          color: "#ffffff",
          fontFamily: OG_FONT_FAMILY,
        }}
      >
        {bg && (
          <img src={bg} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,2,4,0.1) 30%, rgba(10,2,4,0.92) 100%)",
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
            color: "rgba(255,255,255,0.8)",
          }}
        >
          <span>Festival próprio</span>
          {logo && (
            <img src={logo} width={72} alt="" />
          )}
        </div>
        <div style={{ position: "absolute", left: 56, bottom: 44, display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 150, lineHeight: 0.9, letterSpacing: -2 }}>
            PLANTÃO <span style={{ color: RED, marginLeft: 18 }}>{current.year}</span>
          </span>
          <span style={{ marginTop: 14, fontSize: 30, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>
            {upcoming ? "Lista de espera aberta" : current.tagline} · {current.city}/{current.state}
          </span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
