import type { ShopifyProduct } from "../types";

const BRL = "BRL";

function product(args: {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: string;
  artist: string;
  imageHue: string;
  variants?: Array<{ title: string; available?: boolean }>;
  options?: Array<{ name: string; values: string[] }>;
  extraTags?: string[];
}): ShopifyProduct {
  const variants = args.variants ?? [
    { title: "P", available: true },
    { title: "M", available: true },
    { title: "G", available: true },
    { title: "GG", available: false },
  ];
  const options = args.options ?? [
    { name: "Tamanho", values: variants.map((v) => v.title) },
  ];
  const tags = [`artist:${args.artist}`, ...(args.extraTags ?? [])];
  const placeholder = makePlaceholderImage(args.imageHue, args.title);

  return {
    id: args.id,
    handle: args.handle,
    title: args.title,
    description: args.description,
    descriptionHtml: `<p>${args.description}</p>`,
    featuredImage: {
      url: placeholder,
      altText: args.title,
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: placeholder,
        altText: args.title,
        width: 1200,
        height: 1500,
      },
      {
        url: makePlaceholderImage(args.imageHue, `${args.title} ·`, true),
        altText: `${args.title} alt`,
        width: 1200,
        height: 1500,
      },
    ],
    priceRange: {
      minVariantPrice: { amount: args.price, currencyCode: BRL },
      maxVariantPrice: { amount: args.price, currencyCode: BRL },
    },
    options,
    variants: variants.map((v, i) => ({
      id: `${args.id}-variant-${i}`,
      title: v.title,
      availableForSale: v.available !== false,
      selectedOptions: [{ name: options[0].name, value: v.title }],
      price: { amount: args.price, currencyCode: BRL },
      image: null,
    })),
    tags,
  };
}

function makePlaceholderImage(hueHex: string, label: string, alt = false): string {
  const bg = hueHex;
  const labelClean = label.replace(/[<>&]/g, "");
  const pattern = alt ? "rotate(8)" : "rotate(-4)";
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 1500'>
    <rect width='1200' height='1500' fill='${bg}'/>
    <g transform='translate(600 750) ${pattern}'>
      <rect x='-420' y='-520' width='840' height='1040' fill='none' stroke='rgba(255,255,255,0.18)' stroke-width='2'/>
      <text x='0' y='0' fill='rgba(255,255,255,0.85)' font-family='monospace' font-size='44' text-anchor='middle' dominant-baseline='middle'>${labelClean}</text>
      <text x='0' y='80' fill='rgba(255,255,255,0.45)' font-family='monospace' font-size='20' text-anchor='middle'>30PRAUM</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const MOCK_PRODUCTS: ShopifyProduct[] = [
  // ---------------------- MATUÊ ----------------------
  product({
    id: "gid://mock/Product/matue-jacket-xtranho",
    handle: "x-jacket-xtranho",
    title: "X-Jacket XTRANHO",
    description: "Bomber técnico, forro reflexivo, bordado 333 no peito.",
    price: "599.00",
    artist: "matue",
    imageHue: "#03050a",
    extraTags: ["jaqueta", "drop:333"],
  }),
  product({
    id: "gid://mock/Product/matue-tee-333",
    handle: "tee-333-azul",
    title: "Camiseta 333 Azul Elétrico",
    description: "Algodão pesado, gola reforçada, estampa metálica 333.",
    price: "189.00",
    artist: "matue",
    imageHue: "#0a1a4a",
    extraTags: ["camiseta", "drop:333"],
  }),
  product({
    id: "gid://mock/Product/matue-cap-alien",
    handle: "bone-alien-prata",
    title: "Boné Alien Prata",
    description: "Ripstop, aba curva, patch alien em prata escovada.",
    price: "229.00",
    artist: "matue",
    imageHue: "#1a2030",
    options: [{ name: "Tamanho", values: ["Único"] }],
    variants: [{ title: "Único", available: true }],
    extraTags: ["acessorio"],
  }),
  product({
    id: "gid://mock/Product/matue-hoodie-xtranho",
    handle: "moletom-xtranho",
    title: "Moletom XTRANHO Preto",
    description: "Felpa pesada, grafismo glitch nas costas.",
    price: "399.00",
    artist: "matue",
    imageHue: "#050810",
    extraTags: ["moletom"],
  }),

  // ---------------------- WIU ----------------------
  product({
    id: "gid://mock/Product/wiu-tee-romantico",
    handle: "tee-ultimo-romantico",
    title: "Camiseta Último Romântico",
    description: "Algodão off-white, lettering serif vinho no peito.",
    price: "169.00",
    artist: "wiu",
    imageHue: "#1a0a10",
    extraTags: ["camiseta"],
  }),
  product({
    id: "gid://mock/Product/wiu-hoodie-rosa",
    handle: "moletom-rosa-empoeirado",
    title: "Moletom Rosa Empoeirado",
    description: "Felpa, capuz forrado, bordado discreto manuscrito.",
    price: "389.00",
    artist: "wiu",
    imageHue: "#3a1a22",
    extraTags: ["moletom"],
  }),
  product({
    id: "gid://mock/Product/wiu-tee-amar-errado",
    handle: "tee-amar-errado",
    title: "Camiseta Manual de Como Amar Errado",
    description: "Algodão burgundy, estampa serif italic frente e costas.",
    price: "179.00",
    artist: "wiu",
    imageHue: "#2a0810",
    extraTags: ["camiseta"],
  }),
  product({
    id: "gid://mock/Product/wiu-vinyl-card",
    handle: "vinyl-card-wiu",
    title: "Vinyl Card Edição Romântica",
    description: "Cartão colecionável formato bolacha de vinil + soneto inédito.",
    price: "59.00",
    artist: "wiu",
    imageHue: "#150509",
    options: [{ name: "Edição", values: ["Vermelha", "Off-white"] }],
    variants: [
      { title: "Vermelha", available: true },
      { title: "Off-white", available: true },
    ],
    extraTags: ["colecionavel"],
  }),

  // ---------------------- TETO ----------------------
  product({
    id: "gid://mock/Product/teto-tee-colapso",
    handle: "tee-colapso-global",
    title: "Camiseta Colapso Global",
    description: "Algodão areia, estampa em colagem fotográfica.",
    price: "189.00",
    artist: "teto",
    imageHue: "#14110d",
    extraTags: ["camiseta", "drop:colapso"],
  }),
  product({
    id: "gid://mock/Product/teto-jacket-kraft",
    handle: "jaqueta-kraft",
    title: "Jaqueta Kraft Reverso",
    description: "Sarja marrom envelhecida, bolsos cargo, etiquetas serigrafadas.",
    price: "549.00",
    artist: "teto",
    imageHue: "#2a1d10",
    extraTags: ["jaqueta"],
  }),
  product({
    id: "gid://mock/Product/teto-pants-cargo",
    handle: "calca-cargo-grafite",
    title: "Calça Cargo Grafite",
    description: "Sarja pesada, bolsos laterais, bainha reforçada.",
    price: "459.00",
    artist: "teto",
    imageHue: "#1a1815",
    extraTags: ["calca"],
  }),
  product({
    id: "gid://mock/Product/teto-tee-kraft",
    handle: "tee-kraft-stamp",
    title: "Camiseta Kraft Stamp",
    description: "Algodão bege, carimbo manual em cada peça (numerada).",
    price: "199.00",
    artist: "teto",
    imageHue: "#3a2a18",
    extraTags: ["camiseta", "edicao-numerada"],
  }),

  // ---------------------- BRANDÃO 85 ----------------------
  product({
    id: "gid://mock/Product/brandao-tee-isso-e-trap",
    handle: "tee-isso-e-trap",
    title: "Camiseta ISSO É TRAP",
    description: "Algodão preto, estampa xerox condensed, etiqueta 85.",
    price: "169.00",
    artist: "brandao",
    imageHue: "#0c0c0c",
    extraTags: ["camiseta"],
  }),
  product({
    id: "gid://mock/Product/brandao-hoodie-ceo",
    handle: "moletom-ceo",
    title: "Moletom CEO",
    description: "Felpa pesada, capuz duplo, estampa fotocópia áspera.",
    price: "419.00",
    artist: "brandao",
    imageHue: "#141414",
    extraTags: ["moletom"],
  }),
  product({
    id: "gid://mock/Product/brandao-tee-fortaleza",
    handle: "tee-fortaleza",
    title: "Camiseta Fortaleza",
    description: "Algodão branco, estampa vermelha, lettering condensed.",
    price: "169.00",
    artist: "brandao",
    imageHue: "#2a0a0a",
    extraTags: ["camiseta"],
  }),
  product({
    id: "gid://mock/Product/brandao-cap-85",
    handle: "bone-85",
    title: "Boné 85",
    description: "Trucker preto, patch bordado vermelho 85.",
    price: "199.00",
    artist: "brandao",
    imageHue: "#0a0a0a",
    options: [{ name: "Tamanho", values: ["Único"] }],
    variants: [{ title: "Único", available: true }],
    extraTags: ["acessorio"],
  }),
];

export function getMockProductsByArtist(slug: string): ShopifyProduct[] {
  return MOCK_PRODUCTS.filter((p) =>
    p.tags.some((t) => t.toLowerCase() === `artist:${slug}`),
  );
}

export function getMockProductByHandle(handle: string): ShopifyProduct | null {
  return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
}
