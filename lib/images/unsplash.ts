const U = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;
const UCROP = (id: string, w: number, h: number, q = 80) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&q=${q}&auto=format&fit=crop`;
export const IMG = {
  founderMatue: "https://upload.wikimedia.org/wikipedia/commons/d/df/Matu%C3%AA.jpg",
  founderClara: "https://billboard.com.br/wp-content/uploads/2023/11/clara-mendes-1024x677.jpg",
  heroFortaleza: "/assets/fortaleza/fortaleza_skyline.jpg", 
  heroPraia: "/assets/fortaleza/praia_meireles.jpg",
  matuePortrait:
    "https://upload.wikimedia.org/wikipedia/commons/d/df/Matu%C3%AA.jpg",
  matueHero:
    "https://upload.wikimedia.org/wikipedia/commons/d/df/Matu%C3%AA.jpg",
  matueAlt:
    "https://upload.wikimedia.org/wikipedia/commons/3/3d/Doode_Teto_e_Matue_%28cropped%29.jpg",
  wiuPortrait: "https://billboard.com.br/wp-content/uploads/2023/12/wiu.jpg",
  wiuHero:
    "https://billboard-com-br.s3.amazonaws.com/wp-content/uploads/2026/01/23021331/Wiu-e-Teto-_creditos-_juarez_.webp",
  wiuAlt: "https://billboard.com.br/wp-content/uploads/2023/12/wiu.jpg",
  tetoPortrait:
    "https://upload.wikimedia.org/wikipedia/commons/8/83/-i---i-_%2854360758422%29.jpg",
  tetoHero:
    "https://upload.wikimedia.org/wikipedia/commons/4/41/-i---i-_%2854361310936%29.jpg",
  tetoAlt:
    "https://upload.wikimedia.org/wikipedia/commons/8/83/-i---i-_%2854360758422%29.jpg",
  brandaoPortrait:
    "https://billboard-com-br.s3.amazonaws.com/wp-content/uploads/2024/09/13170121/WhatsApp-Image-2024-09-13-at-16.51.09.jpg",
  brandaoHero:
    "https://billboard-com-br.s3.amazonaws.com/wp-content/uploads/2024/09/13170121/WhatsApp-Image-2024-09-13-at-16.51.09.jpg",
  brandaoAlt:
    "https://billboard-com-br.s3.amazonaws.com/wp-content/uploads/2024/09/13170121/WhatsApp-Image-2024-09-13-at-16.51.09.jpg",
  coverXtranho: "/assets/covers/xtranho.jpg", 
  coverColapsoGlobal: "/assets/covers/colapso_global.jpg", 
  coverIssoETrap: "/assets/covers/japones_warzone.jpg", 
  coverMaquinaDoTempo: "/assets/covers/maquina_do_tempo.jpg",
  plantaoHero26: "/figma-plantao/hero.png", 
  plantaoHero25: "/figma-plantao/past-2025.png", 
  plantaoHero24: "/figma-plantao/past-2024.png", 
  plantaoPoster26: "/figma-plantao/poster-vertical.png", 
  plantaoPoster25: "/figma-plantao/past-1.png",
  plantaoPoster24: "/figma-plantao/past-2.png",
  plantaoGallery1: "/figma-plantao/past-1.png", 
  plantaoGallery2: "/figma-plantao/past-2.png", 
  plantaoGallery3: "/figma-plantao/past-3.png",
  plantaoGallery4: "/figma-plantao/past-2024.png",
  plantaoGallery5: "/figma-plantao/past-2025.png",
  plantaoGallery6: "/figma-plantao/poster-vertical.png",
  lineupMatue:
    "https://upload.wikimedia.org/wikipedia/commons/d/df/Matu%C3%AA.jpg",
  lineupTetoWiu:
    "https://upload.wikimedia.org/wikipedia/commons/4/41/-i---i-_%2854361310936%29.jpg",
  lineupBrandao:
    "https://billboard-com-br.s3.amazonaws.com/wp-content/uploads/2024/09/13170121/WhatsApp-Image-2024-09-13-at-16.51.09.jpg",
  lineupBK: UCROP("1521572163474-6864f9cf17ab", 1400, 2100), 
  lineupRecayd: UCROP("1492562080023-ab3db95bfbce", 1400, 2100),
  lineupTZ: UCROP("1500648767791-00dcc994a43e", 1400, 2100),
  lineupAjullia: UCROP("1488426862026-3ee34a7d66df", 1400, 2100), 
  lineupAlee: UCROP("1517732306149-e8f829eb588a", 1400, 2100),
  lineupRyu: UCROP("1521119989659-a83eee488004", 1400, 2100),
  lineupDJThales: UCROP("1571266028253-6c4f1d4d0e4f", 1400, 2100), 
  saborHero: U("1488477181946-6428a0291777", 2400), 
  saborReiTue: U("1497034825429-c343d7c6a68f", 900),
  saborVampiro: U("1488900128323-21503983a07e", 900), 
  sabor333: U("1606312619070-d48b4c652a52", 900), 
  saborIconeFashion: U("1551529834-525807d6b4f3", 900), 
  saborMaquinaDoTempo: U("1567206563064-6f60f40a2b57", 900),
  partnerRenner: U("1556905055-8f358a7a47b2", 2400), 
  partnerRennerGallery1: U("1542272604-787c3835535d", 1200),
  partnerRennerGallery2: U("1521572163474-6864f9cf17ab", 1200),
  partnerRennerGallery3: U("1583743814966-8936f5b7be1a", 1200),
  partnerRennerGallery4: U("1620799140408-edc6dcb6d633", 1200),
  partnerEdHardy:
    "https://30praum.store/cdn/shop/files/DSC2402.jpg?v=1777298638&width=2400",
  partnerEdHardyGallery1:
    "https://30praum.store/cdn/shop/files/ZIPVERMELHO-HOODIE-AGUI_556d7335-548e-44de-9f1b-393b27980a1c.png?v=1777298639&width=1200",
  partnerEdHardyGallery2:
    "https://30praum.store/cdn/shop/files/Matue-Edhardy_Calca-3_1_d468efeb-7449-43a7-9bab-8c856fdf0876.png?v=1777298638&width=1200",
  partnerEdHardyGallery3:
    "https://30praum.store/cdn/shop/files/ZIPUPTUE-FULLGRAPHIC_feac9cca-3698-4034-8efd-4611e3ecf159.png?v=1777298648&width=1200",
  partnerRaw: U("1620916566398-39f1143ab7be", 2400), 
  partnerRawGallery1: U("1508739773434-c26b3d09e071", 1200),
  partnerRawGallery2: U("1485178575877-1a13bf489dfe", 1200),
  partnerRawGallery3: U("1612528443702-f6741f70a049", 1200),
  partnerKenner: "/assets/fortaleza/praia_meireles.jpg", 
  partnerKennerGallery1: "/assets/fortaleza/praia_meireles.jpg",
  partnerKennerGallery2: "/assets/fortaleza/ponte_ingleses.jpg",
  partnerKennerGallery3: "/assets/fortaleza/fortaleza_skyline.jpg",
  partnerPlantao: "/figma-plantao/hero.png",
  partnerSabor: U("1488477181946-6428a0291777", 2400),
  newsSiteLaunch: "/figma-home/card-30praum.png", 
  newsPlantaoLineup: "/figma-plantao/hero.png",
  newsDistribuidora: U("1611532736597-de2d4265fba3", 2400), 
  newsSabor: U("1488477181946-6428a0291777", 2400),
  newsIncubadora: U("1571266028253-6c4f1d4d0e4f", 2400), 
  news333: "/assets/covers/333.jpg",
  newsRenner: U("1556905055-8f358a7a47b2", 2400),
  newsWarzone: "/assets/covers/japones_warzone.jpg",
  incubBrandao:
    "https://billboard-com-br.s3.amazonaws.com/wp-content/uploads/2024/09/13170121/WhatsApp-Image-2024-09-13-at-16.51.09.jpg",
  incubTeto:
    "https://upload.wikimedia.org/wikipedia/commons/4/41/-i---i-_%2854361310936%29.jpg",
  incubWiu: "https://billboard.com.br/wp-content/uploads/2023/12/wiu.jpg",
  pressLogo30praum: "/figma-home/logo-30praum.png",
  pressLogoPlantao: "/figma-plantao/title-plantao.png",
  pressLogoSabor: U("1488477181946-6428a0291777", 600),
  pressPhotoMatue:
    "https://upload.wikimedia.org/wikipedia/commons/d/df/Matu%C3%AA.jpg",
  pressPhotoTeto:
    "https://upload.wikimedia.org/wikipedia/commons/8/83/-i---i-_%2854360758422%29.jpg",
  pressPhotoWiu: "https://billboard.com.br/wp-content/uploads/2023/12/wiu.jpg",
  pressPhotoBrandao:
    "https://billboard-com-br.s3.amazonaws.com/wp-content/uploads/2024/09/13170121/WhatsApp-Image-2024-09-13-at-16.51.09.jpg",
  pressMediaKit: UCROP("1611532736597-de2d4265fba3", 600, 750),
  pressPlantaoPack: "/figma-plantao/past-3.png",
  pressBio: U("1499750310107-5fef28a66643", 600), 
  lookbookA1: "/figma-loja/mv-1.png",
  lookbookA2: "/figma-loja/mv-2.png",
  lookbookA3: "/figma-loja/ep-1.png",
  lookbookA4: "/figma-loja/ep-2.png",
  lookbookA5: "/figma-loja/ep-3.png",
  productTshirtBlack: "https://cdn.shopify.com/s/files/1/0445/4980/0093/files/MOCKUP-XDISTRESS.png?v=1766075770&width=1200",
  productTshirtWhite: "https://cdn.shopify.com/s/files/1/0445/4980/0093/files/MOCKUP-BASEFACE.png?v=1766075781&width=1200",
  productHoodie: "https://cdn.shopify.com/s/files/1/0445/4980/0093/files/HOODIE-ZIP-COSTAS.png?v=1771938782&width=1200",
  productHoodieDark: "https://cdn.shopify.com/s/files/1/0445/4980/0093/files/HOODIE_BLACK_1.png?v=1778685273&width=1200",
  productCap: "https://cdn.shopify.com/s/files/1/0445/4980/0093/files/BoneX_Branco.png?v=1771935832&width=1200",
  productCapBlack: "https://cdn.shopify.com/s/files/1/0445/4980/0093/files/BoneX_Preto.png?v=1771935851&width=1200",
  productJacket: "https://30praum.store/cdn/shop/files/ZIPVERMELHO-HOODIE-AGUI_556d7335-548e-44de-9f1b-393b27980a1c.png?v=1777298639&width=1200",
  productSweatpants: "https://30praum.store/cdn/shop/files/Matue-Edhardy_Calca-3_1_d468efeb-7449-43a7-9bab-8c856fdf0876.png?v=1777298638&width=1200",
  productTote: "https://cdn.shopify.com/s/files/1/0445/4980/0093/files/BANDANA_BLACK.png?v=1778613362&width=1200",
  productAccessory: "https://cdn.shopify.com/s/files/1/0445/4980/0093/files/e3761e51-2bef-4c71-939a-bfba4310ca3a_ac915b31-101a-48fb-92a8-25270751a592.jpg?v=1732395968&width=1200",
};
export function unsplash(id: string, opts?: { w?: number; h?: number; q?: number }) {
  const w = opts?.w ?? 1600;
  const q = opts?.q ?? 80;
  if (opts?.h) {
    return `https://images.unsplash.com/photo-${id}?w=${w}&h=${opts.h}&q=${q}&auto=format&fit=crop`;
  }
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;
}
