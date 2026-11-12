<!-- @license CC0-1.0 -->

## Web Components (Stencil)

Voor elke stack zonder React of Angular — of voor een CMS, micro-frontend of een mix van frameworks. De componenten zijn
native custom elements (`<tilburg-wbc-alert>`, `<tilburg-wbc-textbox>`, …) gebouwd met [Stencil](https://stenciljs.com/).
Ze renderen in de **light DOM** exact dezelfde DOM en klassen als de HTML/CSS-laag, dus dezelfde tokens en utrecht-basis
stylen ze. Het `wbc`-tussenvoegsel voorkomt een botsing met de Angular-selectors (`<tilburg-alert>`) als beide op één
pagina geladen worden.

### Installatie (Web Components)

```bash
npm install ../tilburg/.tarballs/gemeente-tilburg-web-components-stencil-0.0.0.tgz \
            ../tilburg/.tarballs/gemeente-tilburg-design-tokens-0.0.1.tgz \
            @utrecht/component-library-css
```

> `@gemeente-tilburg/web-components-stencil` is **experimenteel en wordt niet op npm gepubliceerd**: je installeert de
> tarball uit de repository, zie _Installeren vanuit een tarball_ op _Aan de slag_. De tokens komen na de eerste
> release van npm (`@gemeente-tilburg/design-tokens`).

### Gebruik (Web Components)

Laad de tokens en de Utrecht-basis globaal en zet `tilburg-theme` en `utrecht-document` op `<body>`; elk component
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

- **Attributen** volgen de Angular-inputs in kebab-case (`heading-level`, `close-button-aria-label`). Eén uitzondering:
  de titel heet `heading` en niet `title` (Alert, Modal, Page Header, Progress Bar, Loading Spinner), omdat `title` een
  globaal HTML-attribuut is. Lijsten en objecten (bijv. combobox-items) zet je als JavaScript-property.
- **`aria-label`, `title`, `id`** en andere globale attributen schrijf je gewoon op het element; het component verplaatst
  ze naar het binnenliggende native element (`<button>`, `<input>`), zodat `<label for>` en de toegankelijke naam kloppen.
- **Events** heten `tilburg…`: `tilburgClose`, `tilburgToggle`, `tilburgChange`, `tilburgNavigate`, `tilburgItemClick`
  en `tilburgBackClick`. Native events van binnenliggende controls (`input`, `change`, `click`) bubbelen gewoon door.
- **Slots** vervangen Angular's `ng-content` (`<svg slot="icon">`).

In React kun je `@gemeente-tilburg/web-components-react` gebruiken: door Stencil gegenereerde wrappers
(`<TilburgWbcAlert heading="…" onTilburgClose={…}>`), ook alleen als tarball. Dat package vraagt React 17 of 18. De
stories onder `Tilburg Web Components/…` in de React-Storybook gebruiken die wrappers. De attributen en events per
component staan op die pagina's.
