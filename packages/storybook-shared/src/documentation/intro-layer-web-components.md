<!-- @license CC0-1.0 -->

## Web Components (Stencil)

Voor elke stack zonder React of Angular — of voor een CMS, micro-frontend of een mix van frameworks. De componenten zijn
native custom elements (`<tilburg-webc-alert>`, `<tilburg-webc-textbox>`, …) gebouwd met [Stencil](https://stenciljs.com/).
Ze renderen in de **light DOM** exact dezelfde DOM en klassen als de HTML/CSS-laag, dus dezelfde tokens en utrecht-basis
stylen ze. Het `webc`-tussenvoegsel voorkomt een botsing met de Angular-selectors (`<tilburg-alert>`) als beide op één
pagina geladen worden.

### Installatie (Web Components)

```bash
npm install @gemeente-tilburg/web-components-stencil \
            @gemeente-tilburg/design-tokens \
            @utrecht/component-library-css
```

### Gebruik (Web Components)

Laad de tokens en de utrecht-basis globaal; elke component laadt zijn eigen `components-css`-regels zelf.

```html
<link rel="stylesheet" href="…/@gemeente-tilburg/design-tokens/dist/tilburg/theme.css" />
<link rel="stylesheet" href="…/@utrecht/component-library-css/dist/index.css" />

<script type="module">
  import { defineCustomElements } from "@gemeente-tilburg/web-components-stencil/loader";
  defineCustomElements();
</script>

<tilburg-webc-alert variant="info" heading="Informatie">De openingstijden zijn gewijzigd.</tilburg-webc-alert>
```

- **Attributen** volgen de Angular-inputs in kebab-case (`heading-level`, `close-button-aria-label`). Lijsten en objecten
  (bijv. combobox-items) zet je als JavaScript-property.
- **`aria-label`, `title`, `id`** en andere globale attributen schrijf je gewoon op het element; de component verplaatst
  ze naar het binnenliggende native element (`<button>`, `<input>`), zodat `<label for>` en de toegankelijke naam kloppen.
- **Events** heten `tilburg…` (`tilburgClose`, `tilburgToggle`); native events van binnenliggende controls (`input`,
  `change`, `click`) bubbelen gewoon door.
- **Slots** vervangen Angular's `ng-content` (`<svg slot="icon">`).

In React kun je `@gemeente-tilburg/web-components-react` gebruiken: door Stencil gegenereerde wrappers
(`<TilburgWebcAlert heading="…" onTilburgClose={…}>`). De stories onder `Tilburg Web Components/…` gebruiken die wrappers.
