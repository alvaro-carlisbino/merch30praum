import type { ArtistConfig, ArtistSlug } from "./types";

export const ARTIST_SLUGS: ArtistSlug[] = ["matue", "wiu", "teto", "brandao"];

export const ARTISTS: Record<ArtistSlug, ArtistConfig> = {
  matue: {
    slug: "matue",
    displayName: "Matuê",
    realName: "Matheus Brasileiro Aguiar",
    origin: "Fortaleza · CE",
    bornYear: 1993,
    joinedYear: 2016,
    bioParagraphs: [
      "Nasceu em Fortaleza em 11 de outubro de 1993. Aos 8 anos mudou para Oakland, Califórnia, onde viveu até os 11 — quando voltou pro Brasil já com inglês fluente e ouvido pra um trap que ninguém aqui fazia ainda.",
      "Em 2016 cofundou a 30praum com Clara Mendes e Lucas Mendes — selo cearense montado pra descentralizar o trap brasileiro do eixo Rio-SP. Estreou em álbum em 2020 com Máquina do Tempo. 333 (2024) bateu o recorde de maior estreia do Spotify Brasil e ultrapassou 950 milhões de reproduções. XTRANHO (2025) é o terceiro capítulo.",
    ],
    facts: [
      { label: "Nome", value: "Matheus Brasileiro Aguiar" },
      { label: "Origem", value: "Fortaleza · CE" },
      { label: "Estreia 30praum", value: "2016 (cofundador)" },
      { label: "Discografia", value: "Máquina do Tempo · 333 · XTRANHO" },
      { label: "Marcos", value: "Recorde Spotify BR · Rock in Rio 2024" },
    ],
    signatureSongs: ["Máquina do Tempo", "Vampiro", "Quer Voar", "REI TUÊ", "ÍCONE FASHION"],

    universeName: "XTRANHO",
    tagline: "XTRANHO — sinal alien em transmissão estável",
    manifesto:
      "Aqui o tempo dobra. O alien não é o outro — é a versão sua que ainda não chegou. Vista o que veio do futuro.",
    shopifyCollectionHandle: "merch-matue",
    motionPreset: "glitch",
    portraitImage: "/artists/matue/portrait.svg",
    realPhotoUrl: "/assets/wiki/matue_atlantida_2026.jpg",
    photoObjectPosition: "center 30%",
    photoFilter: "brightness(0.95) contrast(1.05) saturate(0.9) hue-rotate(-6deg)",
    heroImage: "/assets/covers/xtranho.jpg",
    lookbookImages: [
      "https://picsum.photos/seed/matue-lookbook-1/900/1200",
      "https://picsum.photos/seed/matue-lookbook-2/900/1200",
      "https://picsum.photos/seed/matue-lookbook-3/900/1200",
    ],
    panelAccent: "#1f6bff",
    panelBackground: "#03050a",
    album: {
      title: "XTRANHO",
      year: "2025",
      coverImage: "/assets/covers/xtranho.jpg",
      tagline: "Sinal estável da terra de quem nunca foi daqui.",
      highlightedTracks: [
        "REI TUÊ",
        "TALKING BOUT",
        "MEU CEMITÉRIO",
        "ÍCONE FASHION",
        "AUTOBAHN",
      ],
    },
    drop: {
      status: "live",
      statusLabel: "Drop ativo",
      chapterName: "XTRANHO · capítulo final",
      availabilityNote: "Reposição limitada · enviado em security bag",
    },
    voice: {
      epigraph: "Se o mundo é simulação, o uniforme tem que vir de fora.",
      process: [
        "Sample do beat virou estampa.",
        "Tecido pesado pra aguentar o set.",
        "Cada peça sai com lacre — autêntica até o roteamento.",
      ],
    },
    signatureLyric: "Eu vim de outro lugar — esse mundo é só um set.",
  },

  wiu: {
    slug: "wiu",
    displayName: "Wiu",
    realName: "Vinicius William Sales de Lima",
    origin: "Fortaleza · CE",
    bornYear: 2001,
    joinedYear: 2019,
    bioParagraphs: [
      "Cearense, contemporâneo de Matuê. Antes de ser artista da 30praum era beatmaker — produziu seis das sete faixas de Máquina do Tempo (2020) e ajudou a desenhar o som do selo nos primeiros anos.",
      "Estreou cantando em 2019 com Sucrilhos. Em 2022 viralizou Felina e Vampira (com Matuê e Teto), e fechou o ano com Manual de Como Amar Errado — álbum solo onde se autodeclarou 'último romântico' do trap. Em 2026 dividiu o palco e a tracklist com Teto em Colapso Global.",
    ],
    facts: [
      { label: "Nome", value: "Vinicius William Sales de Lima" },
      { label: "Origem", value: "Fortaleza · CE" },
      { label: "Entrou na 30praum", value: "2019" },
      { label: "Discografia", value: "Manual de Como Amar Errado · Colapso Global" },
      { label: "Função", value: "Vocal · produção musical" },
    ],
    signatureSongs: ["Sucrilhos", "Felina", "Vampira", "Manual de Como Amar Errado", "Medicina"],

    universeName: "Colapso Global",
    tagline: "Colapso Global · com Teto",
    manifesto:
      "Tem coisa que só a saudade conta direito. Veste a peça que carrega a noite, o piano e o último abraço.",
    shopifyCollectionHandle: "merch-wiu",
    motionPreset: "slow",
    portraitImage: "/artists/wiu/portrait.svg",
    realPhotoUrl: "/assets/teto_wiu.jpg",
    photoObjectPosition: "25% 40%",
    photoFilter: "brightness(0.92) contrast(1.08) saturate(1.1) hue-rotate(340deg)",
    heroImage: "/assets/colapso_global.jpeg",
    lookbookImages: [
      "https://picsum.photos/seed/wiu-lookbook-1/900/1200",
      "https://picsum.photos/seed/wiu-lookbook-2/900/1200",
      "https://picsum.photos/seed/wiu-lookbook-3/900/1200",
    ],
    panelAccent: "#c8506a",
    panelBackground: "#1a0a10",
    album: {
      title: "Colapso Global",
      year: "2026",
      collaborator: "com Teto",
      coverImage: "/assets/colapso_global.jpeg",
      tagline: "Quando o mundo cai, ainda dá pra dançar uma última.",
      highlightedTracks: [
        "Isso Aqui É Brasil",
        "Medicina",
        "Lento",
        "Panela Suja",
        "À Beira",
      ],
    },
    drop: {
      status: "live",
      statusLabel: "Capítulo II · drop aberto",
      chapterName: "Colapso Global · com Teto",
      availabilityNote: "Edição em algodão pesado · soneto na etiqueta",
    },
    voice: {
      epigraph: "Vesti pra ir embora bonito. Acabei ficando.",
      process: [
        "Letra escrita às 4 da manhã virou bordado.",
        "Burgundy porque vermelho gritava demais.",
        "Cada peça vem com soneto inédito impresso na etiqueta.",
      ],
    },
    signatureLyric: "Se a saudade matasse, eu já tinha morrido bonito.",
  },

  teto: {
    slug: "teto",
    displayName: "Teto",
    realName: "Clériton Sávio Santos Silva",
    origin: "Jacobina · BA",
    bornYear: 2001,
    joinedYear: 2020,
    bioParagraphs: [
      "Nasceu em Jacobina, Bahia, em 19 de outubro de 2001. Começou a compor aos doze e até hoje grava no quarto — fez fama no YouTube e no TikTok antes de qualquer selo bater na porta.",
      "Estreou em 2018 com Fico Famoso e Say Yes. Em 2022 dividiu Vampira com Matuê e Wiu, e desde então virou pilar do trap brasileiro. Colapso Global (2026), feito a duas mãos com Wiu, mistura house, jazz, bossa, funk carioca e trap no mesmo disco.",
    ],
    facts: [
      { label: "Nome", value: "Clériton Sávio Santos Silva" },
      { label: "Origem", value: "Jacobina · BA" },
      { label: "Estreia", value: "2018 (Fico Famoso)" },
      { label: "Discografia", value: "Vampira · Colapso Global" },
      { label: "Marca", value: "Grava em casa · sem estúdio" },
    ],
    signatureSongs: ["Fico Famoso", "Say Yes", "Vampira", "Kraft", "Monalisa"],

    universeName: "Colapso Global",
    tagline: "Colapso Global · com Wiu",
    manifesto:
      "Recorte da rua, kraft no peito, marca de carimbo. O que você veste é o que aconteceu — sem filtro.",
    shopifyCollectionHandle: "merch-teto",
    motionPreset: "collage",
    portraitImage: "/artists/teto/portrait.svg",
    realPhotoUrl: "/assets/wiki/teto.jpg",
    photoObjectPosition: "center 20%",
    photoFilter: "brightness(0.92) contrast(1.08) saturate(0.8) sepia(0.15)",
    heroImage: "/assets/colapso_global.jpeg",
    lookbookImages: [
      "https://picsum.photos/seed/teto-lookbook-1/900/1200",
      "https://picsum.photos/seed/teto-lookbook-2/900/1200",
      "https://picsum.photos/seed/teto-lookbook-3/900/1200",
    ],
    panelAccent: "#c89858",
    panelBackground: "#14110d",
    album: {
      title: "Colapso Global",
      year: "2026",
      collaborator: "com Wiu",
      coverImage: "/assets/colapso_global.jpeg",
      tagline: "Roupa de quem aceitou que o mundo já caiu — e segue.",
      highlightedTracks: [
        "Isso Aqui É Brasil",
        "Ref",
        "Culpa do Fuso",
        "Facecard",
        "Monalisa",
      ],
    },
    drop: {
      status: "encore",
      statusLabel: "Reedição numerada",
      chapterName: "Colapso Global · drop 02",
      availabilityNote: "Numerada à mão (1/100 a 100/100)",
    },
    voice: {
      epigraph: "Roupa de quem aceitou que o mundo já caiu — e segue.",
      process: [
        "Colagem de capas antigas vira estampa nova.",
        "Sarja envelhecida no banho, não no Photoshop.",
        "Carimbo manual com data do drop em cada peça.",
      ],
    },
    signatureLyric: "Não é fim. É trilha.",
  },

  brandao: {
    slug: "brandao",
    displayName: "Brandão85",
    realName: "Gabriel Brandão da Costa",
    origin: "Caponga · CE",
    bornYear: 2000,
    joinedYear: 2024,
    bioParagraphs: [
      "Nasceu em 18 de fevereiro de 2000, na Caponga (Cascavel, Ceará). Começou na cena ainda em 2018 e construiu nome com Hash Produções — Zoo (2022) é desse período.",
      "Em 2024 saiu da Hash em acordo amigável e foi anunciado oficialmente como artista da 30praum em setembro do mesmo ano. Cocriou faixas do 333 do Matuê (Crack com Mussilon, Isso é Sério). CEO (2024) é seu primeiro álbum solo no selo; Isso é Trap Vol.2 (2026) é a confirmação — singles WARZONE e JAPONÊS chegaram virais antes do disco.",
    ],
    facts: [
      { label: "Nome", value: "Gabriel Brandão da Costa" },
      { label: "Origem", value: "Caponga · CE" },
      { label: "Entrou na 30praum", value: "Setembro 2024" },
      { label: "Discografia", value: "Zoo · CEO · Isso é Trap Vol.2" },
      { label: "Função", value: "Vocal · composição · produção" },
    ],
    signatureSongs: ["WARZONE", "JAPONÊS", "Pablo", "CEO", "Mustang"],

    universeName: "ISSO É TRAP",
    tagline: "Vol. 02 · estreia oficial no merch",
    manifesto:
      "Xerox da quebrada. O original some, mas a cópia áspera fica. Veste o que ninguém clonou direito.",
    shopifyCollectionHandle: "merch-brandao",
    motionPreset: "xerox",
    portraitImage: "/artists/brandao/portrait.svg",
    realPhotoUrl: "/assets/brandao.jpeg",
    photoObjectPosition: "center 30%",
    photoFilter: "brightness(1.1) contrast(1.6) saturate(0.4) grayscale(0.7) blur(0.4px)",
    heroImage: "/assets/isso_e_trap_vol2.jpeg",
    lookbookImages: [
      "https://picsum.photos/seed/brandao-lookbook-1/900/1200",
      "https://picsum.photos/seed/brandao-lookbook-2/900/1200",
      "https://picsum.photos/seed/brandao-lookbook-3/900/1200",
    ],
    panelAccent: "#ff3b1f",
    panelBackground: "#0c0c0c",
    album: {
      title: "Isso é Trap Vol. 02",
      year: "2026",
      coverImage: "/assets/isso_e_trap_vol2.jpeg",
      tagline: "Cresci copiando. Agora os outros copiam errado.",
      highlightedTracks: ["WARZONE", "JAPONÊS", "ROCKSTAR", "85", "QUEBRADA"],
    },
    drop: {
      status: "debut",
      statusLabel: "Estreia oficial",
      chapterName: "Drop debut · Vol. 02",
      availabilityNote: "Primeiro merch oficial Brandão85 · tiragem inicial 200 peças",
    },
    voice: {
      epigraph: "Cresci copiando. Agora os outros copiam errado.",
      process: [
        "Foto de Fortaleza, scan na fotocópia da esquina.",
        "Estampa em alta densidade — pra rachar com o uso.",
        "Etiqueta interna com CEP da quebrada bordada.",
      ],
    },
    signatureLyric: "Da quebrada pro mundo — sem perder o xerox.",
  },
};

export function getArtist(slug: string): ArtistConfig | undefined {
  return ARTISTS[slug as ArtistSlug];
}

export function isArtistSlug(slug: string): slug is ArtistSlug {
  return slug in ARTISTS;
}
