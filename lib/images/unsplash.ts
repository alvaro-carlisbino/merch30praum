/**
 * URLs Unsplash determinísticas, escolhidas a dedo para o site 30praum.
 * Cada imagem é referenciada por ID público estável do Unsplash (sem precisar de API call).
 * Tamanho padrão otimizado via query params do Unsplash CDN.
 */

const U = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;

const UCROP = (id: string, w: number, h: number, q = 80) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&q=${q}&auto=format&fit=crop`;

export const IMG = {
  /* ── Hero institucional ─────────────────────────────────────────────── */
  heroFortaleza: U("1581373449483-37449f962b6c", 2400), // Fortaleza skyline noturno
  heroPraia: U("1517181398085-93cdac9f8385", 2400),

  /* ── Retratos · artistas (homens jovens, urbano dark) ───────────────── */
  matuePortrait: U("1539571696357-5a69c17a67c6", 1200), // homem street wear noturno
  matueHero: U("1492562080023-ab3db95bfbce", 2400), // luzes neon urbanas
  matueAlt: U("1507003211169-0a1dd7228f2d", 1600), // retrato escuro

  wiuPortrait: U("1611042553484-d61f84d22784", 1200), // jovem retrato dramático
  wiuHero: U("1516834474-48c0abc2a902", 2400), // pôr do sol urbano
  wiuAlt: U("1500648767791-00dcc994a43e", 1600),

  tetoPortrait: U("1492288991661-058aa541ff43", 1200), // jovem black retrato
  tetoHero: U("1571266028253-6c4f1d4d0e4f", 2400), // estúdio musical
  tetoAlt: U("1521119989659-a83eee488004", 1600),

  brandaoPortrait: U("1535713875002-d1d0cf377fde", 1200), // urbano dark
  brandaoHero: U("1493225457124-a3eb161ffa5f", 2400), // concerto luzes vermelhas
  brandaoAlt: U("1517732306149-e8f829eb588a", 1600),

  /* ── Capas de álbum (textura, abstrato cinematográfico) ─────────────── */
  coverXtranho: U("1614624532983-4ce03382d63d", 1400), // azul cyber/glitch
  coverColapsoGlobal: U("1535378620166-273708d44e4c", 1400), // burgundy dramático
  coverIssoETrap: U("1518972559570-7cc1309f3229", 1400), // preto/vermelho urbano
  coverMaquinaDoTempo: U("1518972734183-c4b56d50a056", 1400),

  /* ── Plantão Festival (palco, multidão, neon vermelho) ──────────────── */
  plantaoHero26: U("1540575467063-178a50c2df87", 2400), // festival noturno multidão
  plantaoHero25: U("1493225457124-a3eb161ffa5f", 2400), // palco luzes vermelhas
  plantaoHero24: U("1514525253161-7a46d19cd819", 2400), // crowd festival
  plantaoPoster26: U("1429962714451-bb934ecdc4ec", 1200), // festival vertical
  plantaoPoster25: U("1501281668745-f7f57925c3b4", 1200),
  plantaoPoster24: U("1459749411175-04bf5292ceea", 1200),
  plantaoGallery1: U("1470229722913-7c0e2dbbafd3", 1800), // multidão braços
  plantaoGallery2: U("1506157786151-b8491531f063", 1800), // palco luz amarela
  plantaoGallery3: U("1524368535928-5b5e00ddc76b", 1800),
  plantaoGallery4: U("1429962714451-bb934ecdc4ec", 1800),
  plantaoGallery5: U("1501281668745-f7f57925c3b4", 1800),
  plantaoGallery6: U("1459749411175-04bf5292ceea", 1800),

  /* ── Lineup (cada artista do Plantão) ───────────────────────────────── */
  lineupMatue: UCROP("1539571696357-5a69c17a67c6", 1400, 2100),
  lineupTetoWiu: UCROP("1511671782779-c97d3d27a1d4", 1400, 2100), // dupla street
  lineupBrandao: UCROP("1535713875002-d1d0cf377fde", 1400, 2100),
  lineupBK: UCROP("1521572163474-6864f9cf17ab", 1400, 2100), // streetwear
  lineupRecayd: UCROP("1492562080023-ab3db95bfbce", 1400, 2100),
  lineupTZ: UCROP("1500648767791-00dcc994a43e", 1400, 2100),
  lineupAjullia: UCROP("1488426862026-3ee34a7d66df", 1400, 2100), // mulher retrato
  lineupAlee: UCROP("1517732306149-e8f829eb588a", 1400, 2100),
  lineupRyu: UCROP("1521119989659-a83eee488004", 1400, 2100),
  lineupDJThales: UCROP("1571266028253-6c4f1d4d0e4f", 1400, 2100), // DJ

  /* ── Sabor Matuê (geladinho, doces, gelo) ───────────────────────────── */
  saborHero: U("1488477181946-6428a0291777", 2400), // ice cream artístico
  saborReiTue: U("1497034825429-c343d7c6a68f", 900),
  saborVampiro: U("1488900128323-21503983a07e", 900), // doce vermelho
  sabor333: U("1606312619070-d48b4c652a52", 900), // chocolate
  saborIconeFashion: U("1551529834-525807d6b4f3", 900), // verde pastel
  saborMaquinaDoTempo: U("1567206563064-6f60f40a2b57", 900),

  /* ── Parcerias (cada parceiro tem hero foto + galeria) ──────────────── */
  partnerRenner: U("1556905055-8f358a7a47b2", 2400), // streetwear lifestyle
  partnerRennerGallery1: U("1542272604-787c3835535d", 1200),
  partnerRennerGallery2: U("1521572163474-6864f9cf17ab", 1200),
  partnerRennerGallery3: U("1583743814966-8936f5b7be1a", 1200),
  partnerRennerGallery4: U("1620799140408-edc6dcb6d633", 1200),

  partnerEdHardy: U("1611501301329-d4677540e84b", 2400), // tattoo aesthetic
  partnerEdHardyGallery1: U("1542736667-069246bdbc6d", 1200),
  partnerEdHardyGallery2: U("1556905055-8f358a7a47b2", 1200),
  partnerEdHardyGallery3: U("1583744946564-b52ac1c389c8", 1200),

  partnerRaw: U("1620916566398-39f1143ab7be", 2400), // lifestyle dark
  partnerRawGallery1: U("1542736667-069246bdbc6d", 1200),
  partnerRawGallery2: U("1611501301329-d4677540e84b", 1200),
  partnerRawGallery3: U("1612528443702-f6741f70a049", 1200),

  partnerKenner: U("1542291026-7eec264c27ff", 2400), // tênis/calçado
  partnerKennerGallery1: U("1595950653106-6c9ebd614d3a", 1200),
  partnerKennerGallery2: U("1606107557195-0e29a4b5b4aa", 1200),
  partnerKennerGallery3: U("1600185365926-3a2ce3cdb9eb", 1200),

  partnerPlantao: U("1540575467063-178a50c2df87", 2400),
  partnerSabor: U("1488477181946-6428a0291777", 2400),

  /* ── News (hero images por tipo de matéria) ─────────────────────────── */
  newsSiteLaunch: U("1497032628192-86f99bcd76bc", 2400), // estúdio computador
  newsPlantaoLineup: U("1540575467063-178a50c2df87", 2400),
  newsDistribuidora: U("1611532736597-de2d4265fba3", 2400), // disco vinil
  newsSabor: U("1488477181946-6428a0291777", 2400),
  newsIncubadora: U("1571266028253-6c4f1d4d0e4f", 2400), // estúdio gravação
  news333: U("1614624532983-4ce03382d63d", 2400),
  newsRenner: U("1556905055-8f358a7a47b2", 2400),
  newsWarzone: U("1535713875002-d1d0cf377fde", 2400),

  /* ── Incubadora (cases de sucesso) ──────────────────────────────────── */
  incubBrandao: UCROP("1517732306149-e8f829eb588a", 1200, 1600),
  incubTeto: UCROP("1492288991661-058aa541ff43", 1200, 1600),
  incubWiu: UCROP("1611042553484-d61f84d22784", 1200, 1600),

  /* ── Press kit thumbs ───────────────────────────────────────────────── */
  pressLogo30praum: U("1614680376573-df3480f0c6ff", 600),
  pressLogoPlantao: U("1571266028253-6c4f1d4d0e4f", 600),
  pressLogoSabor: U("1488477181946-6428a0291777", 600),
  pressPhotoMatue: UCROP("1539571696357-5a69c17a67c6", 600, 750),
  pressPhotoTeto: UCROP("1492288991661-058aa541ff43", 600, 750),
  pressPhotoWiu: UCROP("1611042553484-d61f84d22784", 600, 750),
  pressPhotoBrandao: UCROP("1535713875002-d1d0cf377fde", 600, 750),
  pressMediaKit: UCROP("1611532736597-de2d4265fba3", 600, 750),
  pressPlantaoPack: UCROP("1540575467063-178a50c2df87", 600, 750),
  pressBio: U("1499750310107-5fef28a66643", 600), // máquina escrever

  /* ── Lookbook produtos (streetwear genérico) ────────────────────────── */
  lookbookA1: U("1521572163474-6864f9cf17ab", 900),
  lookbookA2: U("1542272604-787c3835535d", 900),
  lookbookA3: U("1556905055-8f358a7a47b2", 900),
  lookbookA4: U("1583743814966-8936f5b7be1a", 900),
  lookbookA5: U("1620799140408-edc6dcb6d633", 900),

  /* ── Produtos merch (Shopify mock) ──────────────────────────────────── */
  productTshirtBlack: U("1521572163474-6864f9cf17ab", 1200),
  productTshirtWhite: U("1571945153237-4929e783af4a", 1200),
  productHoodie: U("1556821840-3a63f95609a7", 1200),
  productHoodieDark: U("1542272604-787c3835535d", 1200),
  productCap: U("1588850561407-ed78c282e89b", 1200),
  productCapBlack: U("1521369909029-2afed882baee", 1200),
  productJacket: U("1551488831-00ddcb6c6bd3", 1200),
  productSweatpants: U("1517466787929-bc90951d0974", 1200),
  productTote: U("1582719188393-bb71ca45dbb9", 1200),
  productAccessory: U("1620799140408-edc6dcb6d633", 1200),
};

/**
 * Helper para gerar uma URL Unsplash com tamanho/quality custom.
 */
export function unsplash(id: string, opts?: { w?: number; h?: number; q?: number }) {
  const w = opts?.w ?? 1600;
  const q = opts?.q ?? 80;
  if (opts?.h) {
    return `https://images.unsplash.com/photo-${id}?w=${w}&h=${opts.h}&q=${q}&auto=format&fit=crop`;
  }
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;
}
