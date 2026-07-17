// Gera blurDataURL (base64, 16px) pra imagens-chave de public/.
// Uso: node scripts/generate-blur.mjs  →  reescreve lib/images/blur-data.ts
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const IMAGES = [
  "/figma-home/hero-matue.jpg",
  "/figma-home/hero-wiu.jpg",
  "/figma-home/hero-teto.png",
  "/figma-home/hero-brandao.jpg",
  "/figma-home/card-matue.png",
  "/figma-home/card-wiu.png",
  "/figma-home/card-teto.png",
  "/figma-home/card-brandao.png",
  "/figma-home/card-30praum.png",
  "/figma-home/eleitos-xtranho.png",
  "/figma-home/eleitos-colapso.png",
  "/figma-home/eleitos-brandao.png",
  "/figma-home/produto-respeito.png",
  "/figma-home/produto-face.png",
  "/figma-home/produto-green-puffer.png",
  "/figma-home/produto-black-puffer.png",
  "/figma-home/produto-sabotage.png",
  "/figma-plantao/hero.png",
  "/figma-plantao/past-2024.png",
  "/figma-plantao/past-2025.png",
  "/figma-artista/matue-stage.png",
  "/figma-artista/teto-stage.png",
  "/figma-artista/wiu-stage.png",
  "/figma-artista/brandao-stage.png",
  "/figma-artista/matue-album-xtranho.png",
  "/figma-artista/colapso-global-cover.png",
  "/figma-artista/brandao-album-anjo.png",
  "/figma-loja/mv-1.png",
  "/figma-loja/mv-2.png",
  "/figma-loja/mv-3.png",
  "/figma-loja/mv-4.png",
  "/figma-loja/ep-1.png",
  "/figma-loja/ep-2.png",
  "/figma-loja/ep-3.png",
  "/figma-loja/ep-4.png",
  "/figma-loja/colecao-oversized-1.png",
  "/figma-loja/colecao-five-panel-1.png",
  "/figma-loja/exclusivo-oversized.png",
  "/figma-loja/exclusivo-five-panel.png",
  "/figma-produto/main.png",
];

const entries = [];
for (const rel of IMAGES) {
  const abs = path.join(ROOT, "public", rel);
  try {
    const buf = await sharp(abs)
      .resize(16, 16, { fit: "inside" })
      .webp({ quality: 30 })
      .toBuffer();
    entries.push([rel, `data:image/webp;base64,${buf.toString("base64")}`]);
    console.log("ok", rel);
  } catch (err) {
    console.error("skip", rel, err.message);
  }
}

const body = entries
  .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
  .join("\n");

const out = `// Gerado por scripts/generate-blur.mjs. Não editar na mão.
export const BLUR: Record<string, string> = {
${body}
};

export function blurFor(src: string): string | undefined {
  return BLUR[src];
}
`;

await writeFile(path.join(ROOT, "lib/images/blur-data.ts"), out);
console.log(`\n${entries.length} imagens → lib/images/blur-data.ts`);
