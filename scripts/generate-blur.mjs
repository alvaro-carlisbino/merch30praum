// Gera blurDataURL (base64, 16px) pra imagens-chave de public/.
// Uso: node scripts/generate-blur.mjs  →  reescreve lib/images/blur-data.ts
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const IMAGES = [
  "/figma-home/hero-matue.jpg",
  "/figma-home/hero-wiu.jpg",
  "/figma-home/hero-teto.jpg",
  "/figma-home/hero-brandao.jpg",
  "/figma-home/card-matue.png",
  "/figma-home/card-wiu.png",
  "/figma-home/card-teto.png",
  "/figma-home/card-brandao.png",
  "/figma-home/card-30praum.png",
  "/figma-home/eleitos-xtranho.webp",
  "/figma-home/eleitos-colapso.png",
  "/figma-home/eleitos-brandao.png",
  "/figma-plantao/hero.jpg",
  "/figma-plantao/past-2024.webp",
  "/figma-plantao/past-2025.webp",
  "/figma-plantao/poster-vertical.webp",
  "/figma-artista/matue-stage.webp",
  "/figma-artista/teto-stage.webp",
  "/figma-artista/wiu-stage.webp",
  "/figma-artista/brandao-stage.webp",
  "/figma-artista/matue-album-xtranho.png",
  "/figma-artista/colapso-global-cover.webp",
  "/figma-artista/brandao-album-anjo.webp",
  "/products/bandana-isso-e-trap-preta-merch-brandao-oficial/1.webp",
  "/products/regata-canelada-preta-merch-brandao-oficial/1.webp",
  "/products/blusa-de-moletom-com-ziper-preta-merch-brandao-oficial/1.webp",
  "/products/camiseta-preta-merch-brandao-oficial/1.webp",
  "/products/bandana-merch-brandao/1.webp",
  "/products/regata-canelada-merch-brandao/1.webp",
  "/products/moletom-com-ziper-merch-brandao/1.webp",
  "/products/camiseta-merch-brandao/1.webp",
  "/products/camiseta-manga-longa-preta-merch-brandao-oficial/1.webp",
  "/products/camiseta-off-white-merch-brandao-oficial/1.webp",
  "/products/camiseta-manga-longa-preta-merch-brandao-oficial-1/1.webp",
  "/products/bone-xtranho-preto/1.webp",
  "/products/bone-xtranho-branco/1.webp",
  "/products/protetor-bucal-xtranho-preto/1.webp",
  "/products/moletom-com-ziper-xtranho-preto/1.webp",
  "/products/regata-xtranho-estonada/1.webp",
  "/products/camiseta-xtranho-preta/1.webp",
  "/products/camiseta-xtranho-off-white/1.webp",
  "/products/camiseta-isso-e-brasil-teto-wiu-merch-oficial/1.webp",
  "/products/camiseta-colapso-global-teto-wiu-merch-oficial/1.webp",
  "/products/boneco-matue-rock-in-rio/1.webp",
  "/products/camiseta-portal-off-white/1.webp",
  "/products/bone-trucker-333/1.webp",
  "/products/camiseta-portal-preta/1.webp",
  "/products/hoodie-333-off-white/1.webp",
  "/products/camiseta-o-som-off-white/1.webp",
  "/products/camiseta-o-som-preta/1.webp",
  "/products/baby-tee-333/1.webp",
  "/figma-plantao/stage-2025.jpg",
  "/figma-plantao/stage-2024.jpg",
  "/figma-plantao/crowd-2026.jpg",
  "/figma-plantao/fire-2026.jpg",
  "/figma-plantao/art-left.jpg",
  "/figma-plantao/art-right.jpg",
  "/lineup/tz-da-coronel.jpg",
  "/lineup/ajuliacosta.jpg",
  "/lineup/2026/matue.webp",
  "/lineup/2026/teto.webp",
  "/lineup/2026/wiu.webp",
  "/lineup/2026/brandao.webp",
  "/lineup/2026/tz.webp",
  "/lineup/2026/ajulia.webp",
  "/lineup/2026/alee.webp",
  "/lineup/2026/ryu.webp",
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
