# PLAN: Alma 30praum — Imersão e Identidade

O objetivo é elevar o site de um "merch genérico" para uma extensão dos universos cinematográficos da 30praum, trazendo fotos reais, profundidade aos álbuns e uma interface que respire a estética de cada artista.

---

## 🎯 Critérios de Sucesso
- [ ] Fotos reais (ou conceituais de alta fidelidade) substituindo todos os SVGs de fallback.
- [ ] Capas de álbum com estética física (texturas de vinil/CD/lacre).
- [ ] Interface imersiva com efeitos de "atmosfera" (grain, glitch, scanlines) variando por artista.
- [ ] Seções de "Processo Criativo" e "Manifesto" visualmente ricas.
- [ ] Navegação entre álbuns que parece uma curadoria de galeria.

---

## 🛠️ Tech Stack & Design System
- **Next.js 15 + React 19**
- **Motion (Framer Motion)** para animações de alma/atmosfera.
- **Vanilla CSS + CSS Variables** para temas dinâmicos por artista.
- **Geração de Imagens (DALL-E 3)** para ativos conceituais caso necessário.

---

## 🏗️ Estrutura de Arquivos (Novos/Modificados)
```bash
lib/
  ├── artists/registry.ts    # Expansão de metadados (lore, mood)
  └── albums/registry.ts     # Adição de informações de "backstage"
components/
  ├── effects/               # Componentes de atmosfera (Grain, Scanlines, GlitchOverlay)
  ├── artists/
  │   ├── AlbumDeepDive.tsx  # Nova seção detalhada de álbuns
  │   └── CreativeProcess.tsx # Visualização do "Voice/Process"
  └── ui/
      └── PhysicalMedia.tsx  # Renderizador de capas com textura
```

---

## 📅 Task Breakdown

### Fase 1: Ativos & Identidade (Análise)
- [ ] **Task 1.1: Geração de Fotos Conceituais (ou integração de oficiais)**
  - **Agent**: `frontend-specialist`
  - **Skill**: `frontend-design`
  - **Input**: `lib/artists/registry.ts`
  - **Output**: Imagens em `public/artists/`
  - **Verify**: Imagens capturam a "vibe" (ex: Matuê futurista, Brandão analógico/xerox).

- [ ] **Task 1.2: Design de Capas "Físicas"**
  - **Agent**: `frontend-specialist`
  - **Input**: Capas atuais
  - **Output**: Versões com texturas de plástico, papel ou vinil.
  - **Verify**: As capas não parecem apenas "quadrados chapados".

### Fase 2: Imersão Atmosférica (Implementation)
- [ ] **Task 2.1: Sistema de Efeitos de Camada (Overlay)**
  - **Agent**: `frontend-specialist`
  - **Skill**: `frontend-design`
  - **Action**: Criar componente `AtmosOverlay` que aplica ruído sutil e variações cromáticas por universo.
  - **Verify**: O site parece uma "película" de filme, não um site limpo demais.

- [ ] **Task 2.2: Refatoração do AlbumShowcase → AlbumDeepDive**
  - **Agent**: `frontend-specialist`
  - **Action**: Transformar a lista de faixas em algo interativo, com citações de letras e lore de produção.
  - **Verify**: O usuário sente que está conhecendo a obra, não apenas lendo uma lista.

### Fase 3: Detalhes de "Alma"
- [ ] **Task 3.1: Seção "O Processo"**
  - **Agent**: `frontend-specialist`
  - **Action**: Implementar visualmente os dados de `voice.process` do registry (ex: fotos de tecido, rascunhos de letras).
  - **Verify**: A seção transmite a ideia de "merch feito por artista".

---

## 🧪 Phase X: Verificação Final
- [ ] Auditoria de UX: O site ainda é fácil de comprar?
- [ ] Performance Check: Os efeitos de glitch/grain pesam no mobile?
- [ ] Teste de "Vibe": O site parece "30praum" ou apenas um site de trap genérico?
