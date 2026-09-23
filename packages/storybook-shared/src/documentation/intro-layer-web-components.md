<!-- @license CC0-1.0 -->

## Web Components (Stencil)

Voor elke stack zonder React of Angular — of voor een CMS, micro-frontend of een mix van frameworks. De componenten zijn
native custom elements (`<tilburg-wbc-alert>`, `<tilburg-wbc-textbox>`, …) gebouwd met [Stencil](https://stenciljs.com/).
Ze renderen in de **light DOM** exact dezelfde DOM en klassen als de HTML/CSS-laag, dus dezelfde tokens en utrecht-basis
stylen ze. Het `wbc`-tussenvoegsel voorkomt een botsing met de Angular-selectors (`<tilburg-alert>`) als beide op één
pagina geladen worden.

### Installatie (Web Components)

`@gemeente-tilburg/web-components-stencil` is **experimenteel en nog niet op npm gepubliceerd**. Vraag het Design
System-team om een build als je hem wilt proberen. Tokens en Utrecht-basis installeer je via npm:

```bash
npm install @gemeente-tilburg/design-tokens @utrecht/component-library-css
```

### Gebruik (Web Components)

Laad de tokens en de Utrecht-basis globaal en zet `tilburg-theme` en `utrecht-document` op `<body>`; elke component
laadt zijn eigen `components-css`-regels zelf.

```html
<link rel="stylesheet" href="…/@gemeente-tilburg/design-tokens/dist/tilburg/theme.css" />
<link rel="stylesheet" href="…/@utrecht/component-library-css/dist/index.css" />

<script type="module">
  import { defineCustomElements } from "@gemeente-tilburg/web-components-stencil/loader";
  defineCustomElements();
</script>

<body class="tilburg-theme utrecht-document">
  <tilburg-wbc-alert variant="info" heading="Informatie">De openingstijden zijn gewijzigd.</tilburg-wbc-alert>
</body>
```

- **Attributen** volgen de Angular-inputs in kebab-case (`heading-level`, `close-button-aria-label`). Lijsten en objecten
  (bijv. combobox-items) zet je als JavaScript-property.
- **`aria-label`, `title`, `id`** en andere globale attributen schrijf je gewoon op het element; de component verplaatst
  ze naar het binnenliggende native element (`<button>`, `<input>`), zodat `<label for>` en de toegankelijke naam kloppen.
- **Events** heten `tilburg…` (`tilburgClose`, `tilburgToggle`); native events van binnenliggende controls (`input`,
  `change`, `click`) bubbelen gewoon door.
- **Slots** vervangen Angular's `ng-content` (`<svg slot="icon">`).

In React kun je `@gemeente-tilburg/web-components-react` gebruiken: door Stencil gegenereerde wrappers
(`<TilburgWbcAlert heading="…" onTilburgClose={…}>`), ook nog niet gepubliceerd. De stories onder
`Tilburg Web Components/…` gebruiken die wrappers.
