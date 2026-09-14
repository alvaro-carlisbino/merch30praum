import { ImageResponse } from "next/og";
import { getProduct } from "@/lib/cms/products";
import { formatBRL } from "@/lib/shop/static-products";
import { ARTIST_LABEL, isSoldOut } from "@/lib/shop/catalog";
import { OG_FONT_FAMILY, ogFonts } from "@/lib/og/fonts";
import { OG_SIZE, publicPng, remotePng } from "@/lib/og/images";

export const alt = "Merch oficial 30praum";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  const [fonts, logo, photo] = await Promise.all([
    ogFonts(),
    publicPng("og/logo-30praum.png", 200),
    product
      ? product.image.startsWith("/")
        ? publicPng(product.image.slice(1), 720)
        : remotePng(product.image, 720)
      : Promise.resolve(null),
  ]);
  const title = product?.title ?? "Loja oficial 30praum";
  const price = product ? (isSoldOut(product) ? "Esgotado" : formatBRL(product.priceBRL)) : "";
  const artist = product ? ARTIST_LABEL[product.artistSlug] : "";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: OG_FONT_FAMILY,
        }}
      >
        <div
          style={{
            width: 560,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f2efe9",
          }}
        >
          {photo ? (
            <img src={photo} alt="" width={520} height={520} style={{ objectFit: "contain" }} />
          ) : (
            <span style={{ fontSize: 120, color: "#0a0a0a" }}>30</span>
          )}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 56px 48px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: "rgba(245,245,245,0.6)" }}>
              {artist ? `Merch oficial · ${artist}` : "Merch oficial"}
            </span>
            {logo && (
              <img src={logo} width={80} alt="" />
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span style={{ fontSize: 68, lineHeight: 0.95, textTransform: "uppercase", letterSpacing: 1 }}>{title}</span>
            <span style={{ fontSize: 52, color: "#ffffff" }}>{price}</span>
          </div>
          <span style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "rgba(245,245,245,0.6)" }}>
            Enviado em security bag lacrada
          </span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
