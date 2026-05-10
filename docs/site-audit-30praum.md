# Auditoria — 30praum.store atual

Data da visita: 2026-05-09 · capturado via Chrome MCP em browser real (1492×812).

## Tese curta

O site não é só genérico. Ele é **assimétrico**: chama-se "30PRAUM MERCH OFICIAL" mas funciona como o e-commerce pessoal do Matuê. Wiu e Teto dividem uma única coleção; Brandão85 — contratado em set/2024 — não tem peça nenhuma. Esse é o problema que o rebuild precisa atacar de frente.

## Mapa do site atual

### Navegação principal

- Header: `PRODUTOS ▾` + `CONTATO`. Sem menção a artistas no nível top.
- Dropdown PRODUTOS:
  1. XTRANHO (Matuê)
  2. 333 (Matuê)
  3. TETO & WIU (juntos, sem páginas individuais)
  4. Ed Hardy by Matuê (mais Matuê)
  5. VER TODOS

### Rotas testadas

| Rota | Status |
|---|---|
| `/` | 200 — vitrine XTRANHO |
| `/collections/333` | 200 — produtos Matuê (Hoodie 333 R$ 333, Boneco Matue Rock in Rio R$ 399, Baby Tee 333, Boné Trucker 333) |
| `/collections/teto-wiu` | (não testada, presumida 200 — está no menu) |
| `/collections/wiu` | **404** |
| `/collections/teto` | **404** |
| `/collections/brandao` | **404** |
| `/products/camiseta-xtranho-off-white` | 200 — PDP |

## Patologias visuais

1. **Hero da home:** logo XTRANHO em cor preta sozinho no fundo branco. Sem manifesto, sem vídeo, sem fotografia. Sem o nome "30praum" em destaque.
2. **Grid Shopify default:** 3 colunas brancas, fotos packshot sem lifestyle, nomes em CAPS pequenas, preço só. "ESGOTADO" como overlay cinza translúcido em ~70% dos itens.
3. **Tipografia:** sans-serif neutro (parece Karma/Dawn theme padrão). Mesma fonte em tudo, sem hierarquia editorial.
4. **PDP:** layout cookie-cutter Shopify — galeria à esquerda, painel à direita. Botão preto "ADICIONAR AO CARRINHO". Accordion "Descrição do produto" abre com: *"Camiseta confeccionada em malhão 100% algodão, com estampa aplicada na parte frontal"* + tabela de medidas. Zero voz do artista, zero história, zero porquê.
5. **Footer:** logo "30 PRAUM MERCH OFICIAL" + "AJUDA E ATENDIMENTO" (Minha conta, Troca rápida) + "POLÍTICAS E REGULAMENTOS" (Trocas, Envios, Privacidade). Frio, institucional, sem manifesto.
6. **Popup anti-fraude:** ao entrar, abre um popup "NÃO CAIA EM GOLPES! MERCH OFICIAL SÓ EM 30PRAUM.STORE". Mostra que falsificação é dor real.
7. **Security bag:** uma das fotos do produto Camiseta XTRANHO mostra a embalagem "PEDIDO ENVIADO EM SECURITY BAG LACRADA" — diferencial de serviço relevante, mas escondido em foto secundária.

## Sinais úteis pra preservar

- **Autenticidade como valor:** o popup anti-golpe + security bag = história forte. O rebuild deve verbalizar isso explicitamente (selo "Loja oficial · Pedido em security bag lacrada").
- **333 funciona como universo Matuê:** o álbum tem fan base e merch dedicado (incluindo um boneco do Matuê em Rock in Rio por R$ 399 — isso é colecionável, não roupa). A nossa rota `/matue` deve abraçar 333 como capítulo.
- **TETO & WIU como par:** existe uma coleção conjunta (provavelmente do álbum Colapso Global). Bom — vamos honrar isso na nossa estrutura via uma coleção cruzada `/colecoes/colapso`, mas mantendo as casas individuais.

## O que o rebuild já resolve

| Problema atual | Como resolvemos |
|---|---|
| Site é só Matuê | 4 universos com URL própria (`/matue`, `/wiu`, `/teto`, `/brandao`) e tema visual exclusivo |
| Hero da home sem alma | Hub split-screen cinematográfico com 4 painéis líquidos |
| Tipografia genérica | `next/font` por artista (Space Grotesk Matuê / Cormorant Wiu / Archivo Teto / Anton Brandão) |
| PDP cookie-cutter | Layout próprio + view-transition shared element |
| Cart Shopify nativo | Drawer otimista com paleta do universo ativo |
| Brandão85 ausente | Universo dedicado com badge de estreia |

## O que o rebuild ainda precisa atacar (próximas ações)

1. **Manifesto explícito:** "Quem manda é a 30praum" precisa aparecer em letra grande, não só ser sugerido.
2. **Trust band:** selo "Loja oficial · Security Bag lacrada" no header/sob-header.
3. **Voz do artista na PDP:** cada peça tem que ter uma frase do artista falando dela (mesmo que mockada).
4. **Drop metadata:** badge contextual no hero ("Drop ativo · 14 peças · Estreia" para Brandão).
5. **Footer com manifesto:** trocar "Ajuda + Políticas" por declaração + utilidades.
6. **Cross-universos na PDP:** após "Mais de Matuê", uma faixa "Os outros 3 universos" — força a casa-mãe.

## Observação cruel mas honesta

A operação atual entrega o que o cliente PEDIU enxergar — um merch Shopify funcional. Mas falha no que ele PRECISAVA: representar a gravadora. Quem entra hoje pensa "esse é o site do Matuê" e essa percepção destrói o pitch da 30praum como casa de talentos. O rebuild não é cosmética — é correção de identidade.
