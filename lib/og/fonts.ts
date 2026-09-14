import "server-only";

type OgFont = { name: string; data: ArrayBuffer; style: "normal"; weight: 400 };

let cache: Promise<ArrayBuffer | null> | null = null;

async function fetchBebas(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Bebas+Neue", {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; og-image)" },
      cache: "force-cache",
    }).then((r) => (r.ok ? r.text() : ""));
    const match = css.match(/src:\s*url\(([^)]+\.(?:ttf|otf|woff))\)/i);
    if (!match) return null;
    const res = await fetch(match[1], { cache: "force-cache" });
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export async function ogFonts(): Promise<OgFont[] | undefined> {
  if (!cache) cache = fetchBebas();
  const data = await cache;
  return data ? [{ name: "Bebas Neue", data, style: "normal", weight: 400 }] : undefined;
}

export const OG_FONT_FAMILY = '"Bebas Neue", "Arial Narrow", sans-serif';
