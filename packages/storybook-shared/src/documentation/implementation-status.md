# Implementatiestatus

Welke van de vier lagen bestaat er per component. De tabel is afgeleid uit de repository zelf — uit
`packages/components-css/*/index.scss`, `packages/components-angular/src/*/component.ts`,
`packages/web-components-stencil/src/*` en de story-bestanden van beide Storybooks — en is bijgewerkt op 12 oktober 2026. `pnpm parity` controleert in de repository of de bestanden nog kloppen met deze
tabel; `pnpm verify` draait die controle mee.

**42 componenten** zijn gedocumenteerd. **41** hebben een React-wrapper, **41** een Angular-wrapper en **41** een
Web Component (`@gemeente-tilburg/web-components-stencil`).
Er is op dit moment geen enkel component dat wél in React maar niet in Angular bestaat, of andersom.

## Wat de kolommen betekenen

- **HTML/CSS** — de leidende laag. ✅ betekent dat er een eigen `@gemeente-tilburg/components-css`-laag
  bovenop utrecht ligt (35 componenten). `utrecht` betekent dat de utrecht-basisstijl volstaat en Tilburg
  niets overschrijft (7 componenten) — dat is een bewuste keuze, geen ontbrekend werk.
- **React** — er is een component in `@gemeente-tilburg/components-react`.
- **Angular** — er is een component in `@gemeente-tilburg/components-angular`.
- **Web Components** — er is een `<tilburg-wbc-…>`-element in `@gemeente-tilburg/web-components-stencil`. Table is
  één element dat een native `<table>` verrijkt (of hem uit data rendert), in plaats van losse rij-/cel-elementen: de
  HTML-parser haalt custom elements uit een tabel voordat JavaScript draait.

| Component              | HTML/CSS | React | Angular | Web Components |
| ---------------------- | -------- | ----- | ------- | -------------- |
| Accordion              | ✅       | ✅    | ✅      | ✅             |
| Action Group           | ✅       | ✅    | ✅      | ✅             |
| Alert                  | ✅       | ✅    | ✅      | ✅             |
| Article                | utrecht  | ✅    | ✅      | ✅             |
| Backdrop               | utrecht  | ✅    | ✅      | ✅             |
| Badge Counter          | ✅       | —     | —       | —              |
| Badge List             | utrecht  | ✅    | ✅      | ✅             |
| Badge Status           | ✅       | ✅    | ✅      | ✅             |
| Blockquote             | utrecht  | ✅    | ✅      | ✅             |
| Breadcrumb             | ✅       | ✅    | ✅      | ✅             |
| Button                 | ✅       | ✅    | ✅      | ✅             |
| Button Group           | utrecht  | ✅    | ✅      | ✅             |
| Button Link            | ✅       | ✅    | ✅      | ✅             |
| Card                   | ✅       | ✅    | ✅      | ✅             |
| Checkbox               | ✅       | ✅    | ✅      | ✅             |
| Code                   | utrecht  | ✅    | ✅      | ✅             |
| Code Block             | ✅       | ✅    | ✅      | ✅             |
| Color Sample           | utrecht  | ✅    | ✅      | ✅             |
| Column Layout          | utrecht  | ✅    | ✅      | ✅             |
| Combobox               | ✅       | ✅    | ✅      | ✅             |
| Currency Data          | utrecht  | ✅    | ✅      | ✅             |
| Data Badge             | ✅       | ✅    | ✅      | ✅             |
| Data List              | ✅       | ✅    | ✅      | ✅             |
| Data Placeholder       | utrecht  | ✅    | ✅      | ✅             |
| Datetime Value         | utrecht  | ✅    | ✅      | ✅             |
| Document               | utrecht  | ✅    | ✅      | ✅             |
| Drawer                 | utrecht  | ✅    | ✅      | ✅             |
| Emphasis               | utrecht  | ✅    | ✅      | ✅             |
| Figure                 | utrecht  | ✅    | ✅      | ✅             |
| Form Field             | ✅       | ✅    | ✅      | ✅             |
| Form Field Description | utrecht  | ✅    | ✅      | ✅             |
| Form Fieldset          | ✅       | ✅    | ✅      | ✅             |
| Form Label             | ✅       | ✅    | ✅      | ✅             |
| Heading                | ✅       | ✅    | ✅      | ✅             |
| Heading Group          | utrecht  | ✅    | ✅      | ✅             |
| HTML Content           | ✅       | ✅    | ✅      | ✅             |
| IBAN Data              | utrecht  | ✅    | ✅      | ✅             |
| Icon                   | utrecht  | ✅    | ✅      | ✅             |
| Image                  | utrecht  | ✅    | ✅      | ✅             |
| Index Char Nav         | ✅       | ✅    | ✅      | ✅             |
| Language Toggle        | ✅       | ✅    | ✅      | ✅             |
| Link                   | ✅       | ✅    | ✅      | ✅             |
| Link Button            | ✅       | ✅    | ✅      | ✅             |
| Link List              | ✅       | ✅    | ✅      | ✅             |
| Link Social            | utrecht  | ✅    | ✅      | ✅             |
| Loading Spinner        | ✅       | ✅    | ✅      | ✅             |
| Mark                   | utrecht  | ✅    | ✅      | ✅             |
| Modal                  | ✅       | ✅    | ✅      | ✅             |
| Multiline Data         | utrecht  | ✅    | ✅      | ✅             |
| Nav Bar                | ✅       | ✅    | ✅      | ✅             |
| Nav List               | ✅       | ✅    | ✅      | ✅             |
| Note                   | ✅       | ✅    | ✅      | ✅             |
| Number Data            | utrecht  | ✅    | ✅      | ✅             |
| Ordered List           | ✅       | ✅    | ✅      | ✅             |
| Page                   | utrecht  | ✅    | ✅      | ✅             |
| Page Content           | utrecht  | ✅    | ✅      | ✅             |
| Page Footer            | ✅       | ✅    | ✅      | ✅             |
| Page Header            | ✅       | ✅    | ✅      | ✅             |
| Pagination             | ✅       | ✅    | ✅      | ✅             |
| Paragraph              | utrecht  | ✅    | ✅      | ✅             |
| Password Input         | ✅       | ✅    | ✅      | ✅             |
| Pre Heading            | utrecht  | ✅    | ✅      | ✅             |
| Preserve Data          | utrecht  | ✅    | ✅      | ✅             |
| Progress Bar           | ✅       | ✅    | ✅      | ✅             |
| Radio Button           | ✅       | ✅    | ✅      | ✅             |
| Select                 | ✅       | ✅    | ✅      | ✅             |
| Separator              | ✅       | ✅    | ✅      | ✅             |
| Side Nav               | ✅       | ✅    | ✅      | ✅             |
| Skip Link              | ✅       | ✅    | ✅      | ✅             |
| Subscript              | ✅       | ✅    | ✅      | ✅             |
| Superscript            | ✅       | ✅    | ✅      | ✅             |
| Table                  | ✅       | ✅    | ✅      | ✅             |
| Textarea               | ✅       | ✅    | ✅      | ✅             |
| Textbox                | ✅       | ✅    | ✅      | ✅             |
| Tooltip                | ✅       | ✅    | ✅      | ✅             |
| Top Nav                | ✅       | ✅    | ✅      | ✅             |
| Toptask Link           | ✅       | ✅    | ✅      | ✅             |
| Toptask Nav            | utrecht  | ✅    | ✅      | ✅             |
| Unordered List         | ✅       | ✅    | ✅      | ✅             |
| URL Data               | utrecht  | ✅    | ✅      | ✅             |
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
