# Fotos reais dos artistas — onde salvar

O site está pronto pra carregar fotos reais. Enquanto não houver, ele cai no SVG estilizado automaticamente (fallback no [ArtistPortrait](../../components/artists/ArtistPortrait.tsx)).

## Salve assim:

| Foto | Path | Crop |
|---|---|---|
| **Matuê** (dreads, regata preta, vibe dark) | `public/artists/matue/photo.jpg` | retrato 3:4 ou 4:5 |
| **Wiu + Teto** (foto dupla — bege e verde) | `public/artists/duo.jpg` | a mesma foto serve aos dois |
| **Brandão85** (óculos, regata roxa, grillz) | `public/artists/brandao/photo.jpg` | retrato 3:4 ou 4:5 |

## Quem é quem na foto duo

No [registry.ts](../../lib/artists/registry.ts) está configurado:

- **Wiu** → `photoObjectPosition: "right 30%"` (foco no lado direito da foto — verde + óculos)
- **Teto** → `photoObjectPosition: "left 30%"` (foco no lado esquerdo da foto — bege + grillz)

Se eu errei quem é quem, troca os valores no registry — leva 10s.

## Tamanho recomendado

- Mínimo: 1200×1500px (3:4)
- Ideal: 1600×2000px (3:4) ou 1920×2400px
- Formato: JPG (mais leve) ou WebP

Next/Image otimiza sozinho — pode salvar pesado.

## Filtro por artista

Cada um tem um `photoFilter` no registry que aplica grading sutil pra combinar com a paleta do universo:

- **Matuê**: leve hue azulado (`hue-rotate(-8deg)`)
- **Wiu**: hue rosado/burgundy (`hue-rotate(330deg) saturate(1.15)`)
- **Teto**: dessaturado + sépia leve (`saturate(0.75) sepia(0.18)`)
- **Brandão**: alto contraste vermelho (`contrast(1.15) saturate(1.1)`)

Se quiser ajustar, é só editar `photoFilter` no [registry.ts](../../lib/artists/registry.ts) — é CSS filter padrão.

## Como salvar via Finder

1. Tenha as 3 fotos no seu Mac (Downloads, Desktop, etc)
2. Abre o Finder
3. Cmd+Shift+G → cola: `/Users/alvarocarlisbino/Documents/merch30praum/public/artists`
4. Arrasta:
   - foto do Matuê → pasta `matue/` e renomeia pra `photo.jpg`
   - foto Wiu+Teto → solta direto na pasta `artists/` e renomeia pra `duo.jpg`
   - foto do Brandão → pasta `brandao/` e renomeia pra `photo.jpg`

## Recarregar

Depois que salvar, é só dar um Cmd+Shift+R no navegador. O Next/Image carrega na hora.
