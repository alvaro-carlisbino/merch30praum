import { ImageResponse } from "next/og";
import { OG_FONT_FAMILY, ogFonts } from "@/lib/og/fonts";
import { OG_SIZE, publicPng } from "@/lib/og/images";

export const alt = "30praum · Site oficial";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const [fonts, logo] = await Promise.all([ogFonts(), publicPng("og/logo-30praum.png", 560)]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#f5f5f5",
          padding: 64,
          fontFamily: OG_FONT_FAMILY,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(245,245,245,0.6)",
          }}
        >
          <span>Site oficial</span>
          <span>Fortaleza · desde 2016</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {logo ? (
            <img src={logo} width={420} alt="" />
          ) : (
            <span style={{ fontSize: 200, letterSpacing: 8 }}>30PRAUM</span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>Matuê · Wiu · Teto · Brandão85</span>
          <span style={{ color: "rgba(245,245,245,0.6)" }}>Gravadora · Plantão · Loja</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
