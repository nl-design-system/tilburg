# Implementatiestatus

Welke van de drie lagen bestaat er per component. De tabel is afgeleid uit de repository zelf — uit
`packages/components-css/*/index.scss`, `packages/components-angular/src/*/component.ts` en de story-bestanden
van beide Storybooks — en is een momentopname van 10 augustus 2026.

**39 componenten** zijn gedocumenteerd. **37** hebben een React-wrapper, **37** een Angular-wrapper.
Er is op dit moment geen enkel component dat wél in React maar niet in Angular bestaat, of andersom.

## Wat de kolommen betekenen

- **HTML/CSS** — de leidende laag. ✅ betekent dat er een eigen `@gemeente-tilburg/components-css`-laag
  bovenop utrecht ligt (32 componenten). `utrecht` betekent dat de utrecht-basisstijl volstaat en Tilburg
  niets overschrijft (7 componenten) — dat is een bewuste keuze, geen ontbrekend werk.
- **React** — er is een component in `@gemeente-tilburg/components-react`.
- **Angular** — er is een component in `@gemeente-tilburg/components-angular`.

| Component              | HTML/CSS | React | Angular |
| ---------------------- | -------- | ----- | ------- |
| Accordion              | ✅       | ✅    | ✅      |
| Alert                  | ✅       | ✅    | ✅      |
| Article                | utrecht  | ✅    | ✅      |
| Badge Counter          | ✅       | —     | —       |
| Badge Status           | ✅       | ✅    | ✅      |
| Breadcrumb             | ✅       | ✅    | ✅      |
| Button                 | ✅       | ✅    | ✅      |
| Button Group           | utrecht  | ✅    | ✅      |
| Button Link            | ✅       | ✅    | ✅      |
| Checkbox               | ✅       | ✅    | ✅      |
| Combobox               | ✅       | ✅    | ✅      |
| Data List              | ✅       | ✅    | ✅      |
| Document               | utrecht  | ✅    | ✅      |
| Form Field             | ✅       | ✅    | ✅      |
| Form Field Description | utrecht  | ✅    | ✅      |
| Form Fieldset          | ✅       | ✅    | ✅      |
| Form Label             | ✅       | ✅    | ✅      |
| Heading                | ✅       | ✅    | ✅      |
| HTML Content           | ✅       | ✅    | ✅      |
| Language Toggle        | ✅       | ✅    | ✅      |
| Link                   | ✅       | ✅    | ✅      |
| Loading Spinner        | ✅       | ✅    | ✅      |
| Modal                  | ✅       | —     | —       |
| Ordered List           | ✅       | ✅    | ✅      |
| Page                   | utrecht  | ✅    | ✅      |
| Page Content           | utrecht  | ✅    | ✅      |
| Page Footer            | ✅       | ✅    | ✅      |
| Page Header            | ✅       | ✅    | ✅      |
| Pagination             | ✅       | ✅    | ✅      |
| Paragraph              | utrecht  | ✅    | ✅      |
| Progress Bar           | ✅       | ✅    | ✅      |
| Radio Button           | ✅       | ✅    | ✅      |
| Separator              | ✅       | ✅    | ✅      |
| Skip Link              | ✅       | ✅    | ✅      |
| Table                  | ✅       | ✅    | ✅      |
| Textarea               | ✅       | ✅    | ✅      |
| Textbox                | ✅       | ✅    | ✅      |
| Unordered List         | ✅       | ✅    | ✅      |
| Validation Message     | ✅       | ✅    | ✅      |

## Alleen HTML/CSS

Twee componenten hebben bewust geen wrapper:

- **Modal** — gebruikt het platform-element `<dialog>` met de BEM-classes. Een wrapper zou niets toevoegen:
  `showModal()` en `close()` zijn native.
- **Badge Counter** — puur presentatie, één `<span>` met een class.

## Bekende hiaten

Twee design-tokens ontbreken, waardoor de bijbehorende utrecht-regels op dit moment niets doen:

- `--utrecht-article-max-inline-size` is nergens gedefinieerd, dus `.utrecht-article` heeft geen regelbreedte.
- `--utrecht-page-content-padding-block-*`, `--utrecht-page-padding-inline-*` en `--utrecht-page-max-inline-size`
  ontbreken, waardoor `.utrecht-page-content` geen padding en geen maximale breedte krijgt. Page Header en Page
  Footer begrenzen hun inhoud wél, via `--tilburg-page-{header,footer}-max-inline-size` (1150px).
