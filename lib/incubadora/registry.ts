import { IMG } from "@/lib/images/paths";
import { CONTACT } from "@/lib/contact";
export const INCUBADORA = {
  programName: "Incubadora 30praum",
  shortTagline: "Pra quem faz som autoral e quer ser ouvido pela 30praum.",
  manifesto: [
    "Quase todo artista da casa chegou por um caminho informal: indicação, mensagem, alguém que mostrou um som pra alguém. Wiu fazia beat antes de cantar. Teto subia música do interior da Bahia. Brandão85 já tinha nome em Fortaleza quando assinou, em 2024.",
    "Este formulário é a forma organizada de fazer a mesma coisa. Você manda o link, conta quem é, e o envio vai direto pra quem cuida de A&R na gravadora.",
    "A gente não responde todo mundo e não tem prazo. Se fizer sentido, entramos em contato pelo e-mail ou Instagram que você deixar.",
  ],
  howItWorks: [
    {
      step: "01",
      title: "Manda o link",
      description:
        "Spotify, SoundCloud ou YouTube com pelo menos três faixas autorais. Não precisa ser gravado em estúdio.",
    },
    {
      step: "02",
      title: "Conta quem você é",
      description:
        "Até 500 caracteres: de onde você é, há quanto tempo faz som e o que quer que a gente saiba.",
    },
    {
      step: "03",
      title: "A gente escuta",
      description:
        "Os envios chegam num painel interno. Não existe fila nem resposta automática.",
    },
    {
      step: "04",
      title: "Se fizer sentido, a gente chama",
      description: "O contato vem pelo e-mail ou Instagram informado no formulário.",
    },
  ],
  casesOfSuccess: [
    {
      artistSlug: "brandao",
      displayName: "Brandão85",
      joinedYear: 2024,
      excerpt:
        "Já tinha lançado Isso É Trap em 2022 quando assinou, em setembro de 2024. Em 2026 saiu o Vol. 2, que passou de 100 milhões de plays.",
      image: IMG.incubBrandao,
    },
    {
      artistSlug: "teto",
      displayName: "Teto",
      excerpt:
        "Saiu de Jacobina, no interior da Bahia, com sons que circulavam no YouTube e no TikTok. Em 2026 lançou Colapso Global com Wiu.",
      image: IMG.incubTeto,
    },
    {
      artistSlug: "wiu",
      displayName: "Wiu",
      excerpt:
        "Começou produzindo beat e foi pro microfone depois. Hoje assina voz e produção nos próprios discos.",
      image: IMG.incubWiu,
    },
  ],
  whatWeLookFor: [
    "Som que não pareça com o de mais ninguém",
    "Letra que diga alguma coisa",
    "Faixas lançadas, não só ideias",
    "Paciência: carreira leva tempo",
  ],
  whatWeDontLookFor: [
    "Número de seguidores. Tanto faz se são 5 mil ou 500 mil",
    "Cover ou faixa que não é sua",
    "Cobrança de resposta em prazo",
  ],
  formFields: {
    submissionUrl: "/incubadora/submeter",
    contactEmail: CONTACT.geral,
  },
};
