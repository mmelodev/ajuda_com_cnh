# Placas oficiais (assets)

Os arquivos `regulamentacao/*.svg` e `advertencia/*.svg` desta pasta são reproduções vetoriais
das placas oficiais do CONTRAN (Regulamentação e Advertência), baixadas do **Wikimedia Commons**
— não foram desenhadas por este projeto.

- Fonte: [Category:SVG regulatory road signs of Brazil](https://commons.wikimedia.org/wiki/Category:SVG_regulatory_road_signs_of_Brazil)
  e [Category:SVG warning road signs of Brazil](https://commons.wikimedia.org/wiki/Category:SVG_warning_road_signs_of_Brazil)
  no Wikimedia Commons.
- Nome original no Commons: `Brasil {código}.svg` (ex.: `Brasil R-1.svg`, `Brasil A-14.svg`).
  Aqui eles foram renomeados apenas para `{código}.svg` para facilitar o carregamento pelo app
  (`src/components/signs/SignIcon.tsx` monta o caminho como `/signs/{categoria}/{código}.svg`).
- Licença: a maioria dos arquivos está sob **CC BY-SA 3.0** (Creative Commons
  Atribuição-CompartilhaIgual), alguns podem estar em domínio público. Consulte a página de cada
  arquivo no Commons (pesquise por `Brasil {código}.svg`) para ver o autor e a licença exata antes
  de qualquer uso além de estudo pessoal.
- Placas de **Indicação** não têm um pictograma oficial único (são majoritariamente texto livre —
  nome de rodovia, distância, serviço), por isso continuam sendo desenhadas proceduralmente em
  `src/components/signs/glyphs.tsx`, sem depender de assets externos.

Se algum arquivo estiver ausente ou corrompido, `SignIcon.tsx` automaticamente cai de volta para
o ícone desenhado em SVG (ver `onError` do `<img>`), então o app continua funcionando mesmo sem
esta pasta completa.
