import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

async function toDataUri(buf: Buffer, width: number, quality = 80): Promise<string> {
  const out = await sharp(buf).resize({ width, withoutEnlargement: true }).jpeg({ quality }).toBuffer();
  return `data:image/jpeg;base64,${out.toString("base64")}`;
}

async function toPngDataUri(buf: Buffer, width: number): Promise<string> {
  const out = await sharp(buf).resize({ width, withoutEnlargement: true }).png().toBuffer();
  return `data:image/png;base64,${out.toString("base64")}`;
}

/** Imagem de public/ redimensionada e embutida como JPEG (fundos e fotos). */
export async function publicPhoto(relPath: string, width = 1200): Promise<string | null> {
  try {
    const buf = await readFile(join(process.cwd(), "public", relPath));
    return await toDataUri(buf, width);
  } catch {
    return null;
  }
}

/** Imagem de public/ com transparência preservada (logos e letterings). */
export async function publicPng(relPath: string, width = 600): Promise<string | null> {
  try {
    const buf = await readFile(join(process.cwd(), "public", relPath));
    return await toPngDataUri(buf, width);
  } catch {
    return null;
  }
}

/** Foto remota (CDN Shopify) redimensionada e embutida, com transparência preservada. */
export async function remotePng(url: string, width = 600): Promise<string | null> {
  try {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    return await toPngDataUri(buf, width);
  } catch {
    return null;
  }
}

export const OG_SIZE = { width: 1200, height: 630 } as const;
