# 🚦 Treino de Trânsito — CNH do Brasil

Aplicativo web **mobile-first** de uso pessoal para fixar o conteúdo necessário para a prova
teórica da CNH (categorias **A/B**) e para dirigir com mais segurança. O app organiza o
aprendizado em módulos (um por assunto da prova) e, em cada módulo, oferece um **catálogo de
consulta** e um **quiz com banco de perguntas randomizado**.

Módulos implementados até agora: **Sinalização Vertical** (placas de Regulamentação, Advertência
e Indicação) e **Sinalização Horizontal** (linhas, faixas e inscrições no pavimento). Os demais
módulos (Semafórica e Gestual, Direção Defensiva, Primeiros Socorros, Meio Ambiente e Cidadania,
Mecânica Básica e Legislação de Trânsito) já existem na tela inicial como "Em breve" e seguem a
mesma arquitetura para serem preenchidos depois.

> ⚠️ Projeto de estudo pessoal. O conteúdo foi escrito com base em material de referência público
> (curso "CNH do Brasil" do gov.br) e no Código de Trânsito Brasileiro, mas **não substitui** o
> material oficial do DETRAN nem tem qualquer vínculo institucional com ele.

---

## Índice

- [Funcionalidades](#funcionalidades)
- [Stack tecnológica](#stack-tecnológica)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Scripts disponíveis](#scripts-disponíveis)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Roteamento](#roteamento)
- [Sinalização Vertical: modelo de dados das placas](#sinalização-vertical-modelo-de-dados-das-placas)
- [Sinalização Vertical: como os ícones são desenhados](#sinalização-vertical-como-os-ícones-são-desenhados)
- [Sinalização Horizontal: modelo de dados das marcações](#sinalização-horizontal-modelo-de-dados-das-marcações)
- [Sinalização Horizontal: como os ícones são desenhados](#sinalização-horizontal-como-os-ícones-são-desenhados)
- [Banco de perguntas](#banco-de-perguntas)
- [Como adicionar conteúdo novo](#como-adicionar-conteúdo-novo)
- [Design / identidade visual](#design--identidade-visual)
- [Roadmap](#roadmap)
- [Aviso legal](#aviso-legal)

---

## Funcionalidades

- **Home** com cards de todas as etapas do aprendizado; módulos disponíveis levam para o
  conteúdo, módulos futuros aparecem como "Em breve".
- Cada módulo disponível tem navegação por abas fixas no rodapé (padrão de app mobile):
  - **Aprender** — estatísticas do módulo + bloco de destaque com um item sorteado
    aleatoriamente e **4 perguntas de múltipla escolha** sobre ele. Botão para sortear outro item
    a qualquer momento.
  - **Catálogo** — lista **completa** do conteúdo do módulo, com busca e (na Sinalização
    Vertical) filtro por categoria. Cada item expande para mostrar o significado e a atitude
    correta.
  - **Quiz** — sessão configurável (10/15/20 perguntas) sorteada de um **banco gerado
    dinamicamente**, com opções embaralhadas a cada tentativa, feedback imediato por pergunta e
    placar final.
- **Sinalização Vertical**: 103 placas (31 Regulamentação + 55 Advertência + 17 Indicação).
  Regulamentação e Advertência usam **reproduções vetoriais oficiais (CONTRAN)** baixadas do
  Wikimedia Commons; o restante é desenhado proceduralmente em SVG.
- **Sinalização Horizontal**: 13 marcações de solo (linhas de fluxo por cor/padrão, faixa de
  pedestres, linha de retenção, inscrição "PARE", área de cruzamento, canalização, faixa
  exclusiva, setas direcionais), todas desenhadas proceduralmente como uma pista vista de cima.
- Tema visual escuro "asfalto" com cores vibrantes de sinalização (vermelho, amarelo, verde e
  azul), pensado para leitura rápida em celular.

---

## Stack tecnológica

| Camada       | Tecnologia                                   |
| ------------ | --------------------------------------------- |
| Build tool   | [Vite](https://vite.dev)                       |
| UI           | [React 19](https://react.dev)                  |
| Linguagem    | [TypeScript](https://www.typescriptlang.org)   |
| Estilo       | [Tailwind CSS v4](https://tailwindcss.com) (via `@tailwindcss/vite`, config em CSS/`@theme`) |
| Roteamento   | [React Router v7](https://reactrouter.com) (`HashRouter`) |
| Lint         | [oxlint](https://oxc.rs)                       |

Não há backend, banco de dados ou serviços externos — todo o conteúdo (placas, marcações e
perguntas) é código/dados estáticos em TypeScript, e o app roda inteiramente no navegador.

---

## Como rodar o projeto

Pré-requisito: Node.js 18+ e npm.

```bash
# instalar dependências
npm install

# rodar em modo desenvolvimento (http://localhost:5173)
npm run dev

# checar tipos e gerar build de produção em dist/
npm run build

# servir o build de produção localmente
npm run preview

# rodar o linter
npm run lint
```

Como o roteamento usa `HashRouter`, o build gerado em `dist/` pode ser aberto direto como arquivo
estático (inclusive via `file://`) ou hospedado em qualquer servidor estático simples, sem
configuração especial de rotas no servidor.

---

## Scripts disponíveis

Definidos em [`package.json`](package.json):

- `dev` — inicia o servidor de desenvolvimento do Vite com HMR.
- `build` — roda `tsc -b` (checagem de tipos do projeto todo) e depois `vite build`.
- `preview` — sobe um servidor estático local servindo o conteúdo de `dist/`.
- `lint` — executa o `oxlint` sobre o código-fonte.

---

## Estrutura de pastas

```
src/
├── App.tsx                        # Definição das rotas (HashRouter)
├── main.tsx                       # Entry point React
├── index.css                      # Import do Tailwind + tema de cores (@theme)
├── types.ts                       # Tipos centrais (TrafficSign, RoadMarking, QuizQuestion...)
│
├── data/
│   ├── modules.ts                 # Lista dos módulos de aprendizado exibidos na Home
│   ├── signs/
│   │   ├── regulamentacao.ts      # 31 placas de Regulamentação (série R)
│   │   ├── advertencia.ts         # 55 placas de Advertência (série A)
│   │   ├── indicacao.ts           # 17 placas de Indicação (azul/verde/branca/marrom)
│   │   └── index.ts               # Agrega tudo + helpers (getSignById, getRandomSign, labels)
│   ├── markings/
│   │   ├── horizontal.ts          # 13 marcações de Sinalização Horizontal
│   │   └── index.ts               # Helpers (getMarkingById, getRandomMarking, labels)
│   └── questions/
│       ├── generateQuestions.ts         # Gerador de perguntas para as placas verticais
│       └── generateMarkingQuestions.ts  # Gerador de perguntas para as marcações horizontais
│
├── components/
│   ├── layout/
│   │   └── RootLayout.tsx         # Moldura mobile-first (container centralizado tipo "app")
│   ├── home/
│   │   ├── ModuleCard.tsx         # Card de módulo na Home
│   │   ├── FeaturedSignQuiz.tsx   # Bloco "Placa em destaque" (Sinalização Vertical)
│   │   └── FeaturedMarkingQuiz.tsx # Bloco "Marcação em destaque" (Sinalização Horizontal)
│   ├── quiz/
│   │   └── QuestionBlock.tsx      # Uma pergunta com 4 alternativas + feedback visual (genérico)
│   ├── signs/
│   │   ├── SignIcon.tsx           # Desenha a placa (forma + cor + glifo, ou SVG oficial)
│   │   ├── glyphs.tsx             # Biblioteca de "pictogramas" SVG reutilizáveis
│   │   └── SignCard.tsx           # Item de placa no catálogo (expansível)
│   └── markings/
│       ├── MarkingIcon.tsx        # Desenha a marcação como uma pista vista de cima
│       └── MarkingCard.tsx        # Item de marcação no catálogo (expansível)
│
└── pages/
    ├── Home.tsx                   # Página inicial
    ├── verticalSignage/
    │   ├── VerticalSignageLayout.tsx  # Header + abas (Aprender/Catálogo/Quiz)
    │   ├── ModuleHome.tsx             # Aba "Aprender"
    │   ├── Catalog.tsx                # Aba "Catálogo"
    │   └── Quiz.tsx                   # Aba "Quiz"
    └── horizontalSignage/
        ├── HorizontalSignageLayout.tsx
        ├── ModuleHome.tsx
        ├── Catalog.tsx
        └── Quiz.tsx

public/
└── signs/
    ├── README.md                  # Fonte e licença das imagens oficiais
    ├── regulamentacao/*.svg       # Placas R-* reais (Wikimedia Commons)
    └── advertencia/*.svg          # Placas A-* reais (Wikimedia Commons)
```

---

## Roteamento

O app usa `HashRouter` (rotas com `#/...`) para funcionar em qualquer hospedagem estática sem
configuração de fallback de servidor. Rotas atuais:

| Rota                                    | Página                                        |
| ---------------------------------------- | ---------------------------------------------- |
| `#/`                                      | `pages/Home.tsx`                                |
| `#/sinalizacao-vertical`                  | `pages/verticalSignage/ModuleHome.tsx`          |
| `#/sinalizacao-vertical/catalogo`         | `pages/verticalSignage/Catalog.tsx`             |
| `#/sinalizacao-vertical/quiz`             | `pages/verticalSignage/Quiz.tsx`                |
| `#/sinalizacao-horizontal`                | `pages/horizontalSignage/ModuleHome.tsx`        |
| `#/sinalizacao-horizontal/catalogo`       | `pages/horizontalSignage/Catalog.tsx`           |
| `#/sinalizacao-horizontal/quiz`           | `pages/horizontalSignage/Quiz.tsx`              |

As rotas de cada módulo são filhas do respectivo `*SignageLayout`, que desenha o cabeçalho e a
barra de abas fixa no rodapé.

---

## Sinalização Vertical: modelo de dados das placas

Cada placa é um objeto `TrafficSign` (definido em [`src/types.ts`](src/types.ts)):

```ts
interface TrafficSign {
  id: string;                 // identificador único, ex.: "r-1"
  code?: string;               // código oficial, ex.: "R-1", "A-14" (opcional p/ indicação)
  category: SignCategory;      // "regulamentacao" | "advertencia" | "indicacao"
  name: string;                // nome da placa
  shape: SignShape;            // "octagon" | "triangle-down" | "circle" | "diamond" | "rectangle"
  variant?: RegulationVariant; // "restrictive" (anel vermelho) | "mandatory" (círculo azul)
  tone?: IndicationTone;       // "blue" | "green" | "white" | "brown" (só para indicação)
  glyph: GlyphKey;              // qual pictograma desenhar dentro da placa
  glyphRotate?: number;         // rotação do pictograma em graus
  glyphMirror?: boolean;        // espelha o pictograma (ex.: esquerda ↔ direita)
  glyphText?: string;           // texto do pictograma quando glyph === "text" (use "\n" p/ quebrar linha)
  slash?: boolean;              // sobrepõe uma barra diagonal de proibição
  description: string;         // o que a placa significa
  action: string;               // qual a atitude correta do motorista
}
```

- `description` e `action` alimentam diretamente as perguntas do quiz — são o texto que aparece
  nas alternativas de "O que esta placa significa?" e "Qual é a atitude correta?".
- Em placas de Regulamentação/Advertência, o `code` também é usado para resolver a imagem oficial
  em `public/signs/{categoria}/{code}.svg` (ver seção seguinte) — por isso ele precisa bater
  exatamente com o nome do arquivo salvo naquela pasta.
- `signsByCategory`, `CATEGORY_LABEL`, `CATEGORY_DESCRIPTION`, `SHAPE_LABEL`, `getSignById` e
  `getRandomSign` (todos em `src/data/signs/index.ts`) são os helpers usados pelo resto do app —
  prefira importar deles em vez de mexer direto nos arrays de cada categoria.

---

## Sinalização Vertical: como os ícones são desenhados

[`SignIcon.tsx`](src/components/signs/SignIcon.tsx) usa uma estratégia híbrida:

1. **Imagem oficial (preferencial)** — para placas de **Regulamentação** e **Advertência** (que
   seguem um pictograma único e padronizado pelo CONTRAN), o componente tenta carregar um SVG real
   em `public/signs/{regulamentacao|advertencia}/{código}.svg` (ex.: `public/signs/regulamentacao/R-1.svg`).
   Esses arquivos são reproduções vetoriais baixadas do **Wikimedia Commons** — não são gerados
   pelo app. Veja a fonte e a licença em [`public/signs/README.md`](public/signs/README.md).
2. **Fallback procedural** — se o arquivo não existir (`<img onError>`) ou para placas de
   **Indicação** (que não têm um pictograma oficial único, já que na vida real são
   majoritariamente texto livre — nome de rodovia, distância, serviço), o ícone é **desenhado em
   SVG proceduralmente**, a partir dos campos `shape`, `category`, `variant`/`tone` e `glyph` de
   cada placa:
   - `shapeClipAndFrame()` desenha o contorno (octógono vermelho do PARE, triângulo do "Dê a
     preferência", círculo com anel vermelho para placas restritivas, círculo azul para
     mandatórias, losango amarelo para advertência, retângulo colorido por `tone` para indicação).
   - `GlyphInner` desenha o pictograma central pela chave `glyph` (seta, curva, bicicleta, ônibus,
     pedestre, cruzamento, semáforo, texto, etc.) — os pictogramas reutilizáveis ficam em
     [`glyphs.tsx`](src/components/signs/glyphs.tsx) e suportam `glyphRotate`/`glyphMirror` para
     cobrir variações de direção sem duplicar SVG.
   - Um `<clipPath>` recorta o glifo para dentro do contorno, evitando que texto/ícones longos
     vazem para fora da forma.

Ou seja: **quando existe uma imagem oficial baixada, ela é sempre priorizada**; o desenho
procedural é só uma rede de segurança (e o caminho principal para Indicação).

---

## Sinalização Horizontal: modelo de dados das marcações

Cada marcação é um objeto `RoadMarking` (também em [`src/types.ts`](src/types.ts)):

```ts
interface RoadMarking {
  id: string;
  name: string;
  color?: MarkingColor;     // "branca" | "amarela" | "vermelha" (só quando visual === "line")
  pattern?: LinePattern;    // "continua" | "tracejada" | "dupla-continua" | "mista"
  visual: MarkingVisual;    // "line" | "crosswalk" | "text" | "arrow" | "hatched"
                             // | "exclusive-lane" | "retention-line"
  visualText?: string;      // texto pintado no chão quando visual === "text" (ex.: "PARE")
  description: string;      // o que a marcação significa
  action: string;           // qual a atitude correta do motorista
}
```

Diferente das placas, as marcações horizontais não têm um catálogo numerado oficial amplamente
memorizado (R-1, A-14 etc.) — o que importa para a prova é reconhecer **cor** e **padrão da
linha**. Por isso o dado central aqui é `color` + `pattern` (para as 6 linhas de fluxo) ou apenas
`visual` (para faixa de pedestres, linha de retenção, inscrições, área de cruzamento, canalização,
faixa exclusiva e setas). Os dados ficam em
[`src/data/markings/horizontal.ts`](src/data/markings/horizontal.ts) e os helpers/labels em
[`src/data/markings/index.ts`](src/data/markings/index.ts).

---

## Sinalização Horizontal: como os ícones são desenhados

Não existem reproduções vetoriais "oficiais" reaproveitáveis para marcações de solo (elas são
recortes de uma pista, não um pictograma isolado como as placas), então
[`MarkingIcon.tsx`](src/components/markings/MarkingIcon.tsx) sempre desenha uma pista em SVG
(retângulo escuro arredondado, vista de cima) e pinta o padrão de acordo com `visual`:

- `line` — uma ou duas linhas verticais, sólidas e/ou tracejadas, na cor de `color`.
- `crosswalk` — faixas brancas horizontais (zebra).
- `retention-line` — uma barra branca grossa perpendicular ao sentido da via.
- `text` — o texto de `visualText` (ex.: "PARE") centralizado.
- `hatched` — hachura diagonal (área de cruzamento / canalização).
- `exclusive-lane` — preenchimento colorido + pictograma de ônibus (reaproveita `BusGlyph` de
  `glyphs.tsx`).
- `arrow` — seta direcional (reaproveita `ArrowGlyph` de `glyphs.tsx`).

---

## Banco de perguntas

Cada módulo tem seu próprio gerador, mas os dois seguem a mesma lógica: montar um pool grande a
partir de templates de pergunta aplicados a cada item, sortear distratores da mesma "família" e
embaralhar tudo a cada chamada.

### Sinalização Vertical — [`generateQuestions.ts`](src/data/questions/generateQuestions.ts)

| Template   | Pergunta                                                   | Fonte da resposta certa |
| ---------- | ----------------------------------------------------------- | ------------------------ |
| `meaning`  | "O que esta placa significa?"                                | `sign.description`       |
| `action`   | "Ao avistar esta placa, qual é a atitude correta?"           | `sign.action`             |
| `name`     | "Como se chama esta placa?"                                   | `sign.name`               |
| `category` | "A qual categoria de sinalização esta placa pertence?"        | `CATEGORY_LABEL`          |
| `shape`    | "Qual é o formato desta placa?"                                | `SHAPE_LABEL`              |

- `generateQuestionPool(signs)` — monta o pool completo (placas × templates).
- `sampleQuizSession(count, signs)` — sorteia `count` perguntas, priorizando placas distintas.
  Usada pela aba **Quiz**.
- `fourQuestionsForSign(sign, signs)` — gera exatamente as 4 perguntas (`meaning`, `action`,
  `name`, `shape`) sobre uma única placa. Usada pelo bloco **"Placa em destaque"**.

### Sinalização Horizontal — [`generateMarkingQuestions.ts`](src/data/questions/generateMarkingQuestions.ts)

| Template   | Pergunta                                                | Fonte da resposta certa | Disponível quando |
| ---------- | ---------------------------------------------------------- | ------------------------ | ------------------ |
| `meaning`  | "O que essa marcação no chão significa?"                     | `marking.description`    | sempre |
| `action`   | "Diante dessa marcação, qual é a atitude correta?"           | `marking.action`         | sempre |
| `name`     | "Como se chama essa marcação?"                                | `marking.name`           | sempre |
| `color`    | "Qual a cor dessa linha?"                                      | `COLOR_LABEL`             | só linhas (`color` definido) |
| `pattern`  | "Que tipo de linha é essa?"                                     | `PATTERN_LABEL`           | só linhas (`pattern` definido) |
| `visual`   | "Como essa marcação se apresenta no pavimento?"                 | `VISUAL_LABEL`            | sempre |

- `generateMarkingQuestionPool(markings)` / `sampleMarkingQuizSession(count, markings)` — mesma
  lógica da versão vertical, usada pela aba **Quiz**.
- `fourQuestionsForMarking(marking, markings)` — usa `color`/`pattern` como 4ª pergunta quando a
  marcação é uma linha, ou `visual` quando não é (faixa de pedestres, texto, hachurado etc.), para
  sempre entregar exatamente 4 perguntas relevantes.

Como tudo é recalculado (com `Math.random()`) a cada chamada, as perguntas e a ordem das
alternativas **mudam a cada visita/tentativa**, mesmo para o mesmo item.

---

## Como adicionar conteúdo novo

**Nova placa (Sinalização Vertical):**

1. Abra o arquivo da categoria correta em `src/data/signs/` (`regulamentacao.ts`,
   `advertencia.ts` ou `indicacao.ts`).
2. Copie um objeto existente parecido e ajuste `id`, `code`, `name`, `shape`
   (e `variant`/`tone` quando fizer sentido), `glyph` (veja as opções em `GlyphKey` dentro de
   `src/types.ts` e os componentes disponíveis em `glyphs.tsx`), `description` e `action`.
3. Se for uma placa de Regulamentação ou Advertência, procure `Brasil {code}.svg` no
   [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:SVG_regulatory_road_signs_of_Brazil)
   (ou na categoria de advertência) e salve o arquivo como `public/signs/{categoria}/{code}.svg`
   — o app passa a usar essa imagem oficial automaticamente. Se não encontrar o arquivo, sem
   problema: o app cai de volta para o ícone desenhado em SVG.
4. Não é necessário tocar em mais nada — o catálogo, as estatísticas da Home do módulo e o banco
   de perguntas usam os arrays automaticamente via `src/data/signs/index.ts`.

**Nova marcação (Sinalização Horizontal):**

1. Abra [`src/data/markings/horizontal.ts`](src/data/markings/horizontal.ts).
2. Adicione um objeto `RoadMarking`: escolha `visual` (o "molde" de desenho — veja a lista na
   seção acima) e, se for uma linha, `color`/`pattern`; preencha `name`, `description` e `action`.
3. Pronto — catálogo, quiz e o bloco de destaque usam o array automaticamente via
   `src/data/markings/index.ts`.

**Novo módulo de aprendizado:**

1. Adicione uma entrada em `src/data/modules.ts` com `status: "soon"` (ela já aparece na Home).
2. Quando o conteúdo estiver pronto, replique a pasta `src/pages/horizontalSignage/` (o exemplo
   mais simples, sem categorias nem imagens externas) como modelo — layout com abas + página de
   catálogo + página de quiz —, crie os dados equivalentes em `src/data/`, registre as rotas em
   `App.tsx` e mude o `status` do módulo para `"available"` com o `path` correspondente.

---

## Design / identidade visual

- Tema escuro "asfalto" (`--color-asphalt-*` em `src/index.css`) com faixa amarela tracejada no
  topo da Home, remetendo a uma pista de rolamento.
- Paleta de sinalização (`--color-signal-*`): vermelho (regulamentação/perigo), amarelo
  (advertência/atenção), verde (indicação de direção/acerto), azul (indicação de
  serviço/obrigatoriedade) e marrom (turístico).
- Layout mobile-first: em telas largas, o conteúdo permanece limitado a `max-w-md` e centralizado
  (efeito de "moldura de celular"), em vez de esticar para a largura toda do desktop.
- Navegação por abas fixas no rodapé dentro de cada módulo, no padrão de app nativo.

---

## Roadmap

- [x] Sinalização Vertical
- [x] Sinalização Horizontal
- [ ] Sinalização Semafórica e Gestual
- [ ] Direção Defensiva
- [ ] Primeiros Socorros
- [ ] Meio Ambiente e Cidadania
- [ ] Mecânica Básica
- [ ] Legislação de Trânsito
- [ ] Persistir progresso/estatísticas do quiz localmente (ex.: `localStorage`)

---

## Aviso legal

Conteúdo produzido para **estudo pessoal**, sem fins comerciais. As descrições das placas e
marcações foram elaboradas a partir de material de referência público e do Código de Trânsito
Brasileiro (CTB), mas podem conter imprecisões — sempre confira o material oficial do DETRAN do
seu estado e o Manual Brasileiro de Sinalização de Trânsito (CONTRAN) antes da prova.

As imagens das placas de Regulamentação e Advertência em `public/signs/` são reproduções de
terceiros hospedadas no Wikimedia Commons (majoritariamente CC BY-SA 3.0) — ver
[`public/signs/README.md`](public/signs/README.md) para a fonte e a licença de cada uma antes de
qualquer redistribuição. Os ícones da Sinalização Horizontal são 100% desenhados pelo app, sem
dependência de imagens de terceiros.
