# Implementatiestatus

Welke van de vier lagen bestaat er per component. De tabel is afgeleid uit de repository zelf — uit
`packages/components-css/*/index.scss`, `packages/components-angular/src/*/component.ts`,
`packages/web-components-stencil/src/*` en de story-bestanden van beide Storybooks — en is een momentopname van 21 september 2026.

**39 componenten** zijn gedocumenteerd. **38** hebben een React-wrapper, **38** een Angular-wrapper en **38** een
Web Component (`@gemeente-tilburg/web-components-stencil`).
Er is op dit moment geen enkel component dat wél in React maar niet in Angular bestaat, of andersom.

## Wat de kolommen betekenen

- **HTML/CSS** — de leidende laag. ✅ betekent dat er een eigen `@gemeente-tilburg/components-css`-laag
  bovenop utrecht ligt (32 componenten). `utrecht` betekent dat de utrecht-basisstijl volstaat en Tilburg
  niets overschrijft (7 componenten) — dat is een bewuste keuze, geen ontbrekend werk.
- **React** — er is een component in `@gemeente-tilburg/components-react`.
- **Angular** — er is een component in `@gemeente-tilburg/components-angular`.
- **Web Components** — er is een `<tilburg-wbc-…>`-element in `@gemeente-tilburg/web-components-stencil`. Table is
  één element dat een native `<table>` verrijkt (of hem uit data rendert), in plaats van losse rij-/cel-elementen: de
  HTML-parser haalt custom elements uit een tabel voordat JavaScript draait.

| Component              | HTML/CSS | React | Angular | Web Components |
| ---------------------- | -------- | ----- | ------- | -------------- |
| Accordion              | ✅       | ✅    | ✅      | ✅             |
| Alert                  | ✅       | ✅    | ✅      | ✅             |
| Article                | utrecht  | ✅    | ✅      | ✅             |
| Badge Counter          | ✅       | —     | —       | —              |
| Badge Status           | ✅       | ✅    | ✅      | ✅             |
| Breadcrumb             | ✅       | ✅    | ✅      | ✅             |
| Button                 | ✅       | ✅    | ✅      | ✅             |
| Button Group           | utrecht  | ✅    | ✅      | ✅             |
| Button Link            | ✅       | ✅    | ✅      | ✅             |
| Checkbox               | ✅       | ✅    | ✅      | ✅             |
| Combobox               | ✅       | ✅    | ✅      | ✅             |
| Data List              | ✅       | ✅    | ✅      | ✅             |
| Document               | utrecht  | ✅    | ✅      | ✅             |
| Form Field             | ✅       | ✅    | ✅      | ✅             |
| Form Field Description | utrecht  | ✅    | ✅      | ✅             |
| Form Fieldset          | ✅       | ✅    | ✅      | ✅             |
| Form Label             | ✅       | ✅    | ✅      | ✅             |
| Heading                | ✅       | ✅    | ✅      | ✅             |
| HTML Content           | ✅       | ✅    | ✅      | ✅             |
| Language Toggle        | ✅       | ✅    | ✅      | ✅             |
| Link                   | ✅       | ✅    | ✅      | ✅             |
| Loading Spinner        | ✅       | ✅    | ✅      | ✅             |
| Modal                  | ✅       | ✅    | ✅      | ✅             |
| Ordered List           | ✅       | ✅    | ✅      | ✅             |
| Page                   | utrecht  | ✅    | ✅      | ✅             |
| Page Content           | utrecht  | ✅    | ✅      | ✅             |
| Page Footer            | ✅       | ✅    | ✅      | ✅             |
| Page Header            | ✅       | ✅    | ✅      | ✅             |
| Pagination             | ✅       | ✅    | ✅      | ✅             |
| Paragraph              | utrecht  | ✅    | ✅      | ✅             |
| Progress Bar           | ✅       | ✅    | ✅      | ✅             |
| Radio Button           | ✅       | ✅    | ✅      | ✅             |
| Separator              | ✅       | ✅    | ✅      | ✅             |
| Skip Link              | ✅       | ✅    | ✅      | ✅             |
| Table                  | ✅       | ✅    | ✅      | ✅             |
| Textarea               | ✅       | ✅    | ✅      | ✅             |
| Textbox                | ✅       | ✅    | ✅      | ✅             |
| Unordered List         | ✅       | ✅    | ✅      | ✅             |
| Validation Message     | ✅       | ✅    | ✅      | ✅             |

## Alleen HTML/CSS

Eén component heeft bewust geen wrapper (ook geen Web Component):

- **Badge Counter** — puur presentatie, één `<span>` met een class.

**Modal** was eerder alleen HTML/CSS. Het heeft nu in alle lagen een component (`Modal`, `<tilburg-modal>`,
`<tilburg-wbc-modal>`), omdat die wél iets toevoegen bovenop `showModal()`/`close()`: de toegankelijke naam via de
titel, sluiten via backdrop en Escape met één close-event, en de footer die verdwijnt als hij leeg is. De oude React
`AlertDialog` is een deprecated alias van `Modal`.

## Bekende hiaten

Twee design-tokens ontbreken, waardoor de bijbehorende utrecht-regels op dit moment niets doen:

- `--utrecht-article-max-inline-size` is nergens gedefinieerd, dus `.utrecht-article` heeft geen regelbreedte.
- `--utrecht-page-content-padding-block-*`, `--utrecht-page-padding-inline-*` en `--utrecht-page-max-inline-size`
  ontbreken, waardoor `.utrecht-page-content` geen padding en geen maximale breedte krijgt. Page Header en Page
  Footer begrenzen hun inhoud wél, via `--tilburg-page-{header,footer}-max-inline-size` (1150px).
