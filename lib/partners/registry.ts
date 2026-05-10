export type PartnerSlug = "renner" | "sony" | "plantao";

export interface PartnerInfo {
  slug: PartnerSlug;
  name: string;
  category: string;
  years: string;
  brandColor: string;
  bgColor: string;
  headline: string;
  story: string;
  quote: string;
  release: { name: string; format: string; year: string };
  externalLink: string;
  logoPath?: string;
}

export const PARTNER_SLUGS: PartnerSlug[] = ["renner", "plantao", "sony"];

export const PARTNERS: Record<PartnerSlug, PartnerInfo> = {
  renner: {
    slug: "renner",
    name: "Renner",
    category: "Moda · Varejo",
    years: "2023 — agora",
    brandColor: "#e85a3c",
    bgColor: "#1a0e0a",
    headline: "RENNER × 30PRAUM\nA RUA NA VITRINE",
    story:
      "Lançada em 25 de agosto de 2023, a coleção 30praum × Renner colocou o trap brasileiro nas 600 lojas Renner do país. Sete peças no primeiro drop — camisetas, calças e moletons em branco, preto, bege e marrom — com fotografias e colagens de Matuê, Wiu e Teto. Tamanhos P–GG, R$ 79,90 a R$ 219,90. Drops sucessivos em 2024 expandiram pra peças femininas, gender-neutral e até um colar oficial.",
    quote: "Pela primeira vez, o trap saiu do feed e entrou no shopping.",
    release: {
      name: "Coleção Cápsula 30praum × Renner",
      format: "7+ peças · pt-BR · 600 lojas",
      year: "2023",
    },
    externalLink: "https://www.lojasrenner.com.br/marca/30praum/-/N-o54xd7",
    logoPath: "/assets/logos/renner.svg",
  },

  plantao: {
    slug: "plantao",
    name: "Plantão Festival",
    category: "Palco próprio · Fortaleza",
    years: "2023 — agora",
    brandColor: "#c89858",
    bgColor: "#14110d",
    headline: "PLANTÃO FESTIVAL\nFORTALEZA NO MAPA DO RAP",
    story:
      "O Plantão é o festival próprio da 30praum, sediado em Fortaleza pra fixar o Nordeste como polo nacional do trap e do rap. 1ª edição em abril/2023 reuniu 20 mil pessoas. Em 2024, com investimento de R$ 5 milhões, a 2ª edição bateu 30 mil pessoas em dois dias no Marina Park, com 18 atrações. A edição de 2026 celebra os 10 anos da gravadora — line-up com BK', Djonga, Teto, Wiu, Brandão85, Alee, Ryu The Runner, Recayd Mob, TZ da Coronel.",
    quote: "Não vamos abrir edição em SP nem no Rio. Plantão é Fortaleza.",
    release: {
      name: "Plantão Festival 2026",
      format: "10 anos da 30praum · Marina Park",
      year: "2026",
    },
    externalLink: "https://plantaofestival.com/",
  },

  sony: {
    slug: "sony",
    name: "Sony Music",
    category: "Distribuição · Gravadora",
    years: "2022 — agora",
    brandColor: "#cccccc",
    bgColor: "#0a0a0a",
    headline: "SONY × 30PRAUM\nDISTRIBUIÇÃO MAINSTREAM",
    story:
      "Desde Manual de Como Amar Errado (Wiu, 2022), a 30praum distribui seus álbuns oficiais via Sony Music Brasil — alavancando o catálogo do selo cearense para todas as plataformas globais com força de major. A independência criativa fica em Fortaleza; a logística e a expansão global vêm de São Paulo.",
    quote: "Independente na alma, escala no braço.",
    release: {
      name: "Catálogo 30praum",
      format: "Distribuição global · streaming · físico",
      year: "2022 — agora",
    },
    externalLink: "https://www.sonymusic.com.br/",
    logoPath: "/assets/logos/sony.svg",
  },
};

export function getPartner(slug: string): PartnerInfo | undefined {
  return PARTNERS[slug as PartnerSlug];
}
