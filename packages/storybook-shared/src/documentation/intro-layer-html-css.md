<!-- @license CC0-1.0 -->

## Plain HTML / CSS

Voor elke stack zonder React of Angular, bijvoorbeeld server-gerenderde pagina's of een CMS: je schrijft de BEM-classes
direct in je markup. Dit is de leidende laag; alle andere lagen renderen precies deze markup.

### Installatie (HTML/CSS)

```bash
npm install ../tilburg/.tarballs/gemeente-tilburg-components-css-0.0.0.tgz \
            ../tilburg/.tarballs/gemeente-tilburg-design-tokens-0.0.1.tgz \
            @utrecht/component-library-css
```

> `@gemeente-tilburg/components-css` wordt niet op npm gepubliceerd: je installeert de tarball uit de repository (zie
> _Installeren vanuit een tarball_ op _Aan de slag_), of je gebruikt de map `packages/components-css` rechtstreeks. De
> tokens komen na de eerste release van npm (`@gemeente-tilburg/design-tokens`).

Het package bevat per component de SCSS (`index.scss`) en, waar nodig, het script (`index.js`); er is geen
gecompileerde CSS.

### Setup (HTML/CSS)

De component-CSS is SCSS, per component een map. Je hebt dus een Sass-stap nodig. Compileer alleen wat je gebruikt:

```scss
@import "@gemeente-tilburg/design-tokens/dist/tilburg/theme.css";
@import "@utrecht/component-library-css/dist/index.css";

@import "@gemeente-tilburg/components-css/alert/index";
@import "@gemeente-tilburg/components-css/button/index";
/* …alleen de componenten die je nodig hebt */
```

### Interactieve componenten (HTML/CSS)

Een paar componenten hebben gedrag nodig. Daarvoor zijn er kleine scripts, en je zet ze per element aan met een
`data-`-attribuut:

| Component      | Script                    | Opt-in attribuut                      |
| -------------- | ------------------------- | ------------------------------------- |
| Accordion      | `accordion/index.js`      | `data-tilburg-accordion-enhance`      |
| Combobox       | `combobox/index.js`       | `data-tilburg-combobox-enhance`       |
| Password Input | `password-input/index.js` | `data-tilburg-password-input-enhance` |
| Tooltip        | `tooltip/index.js`        | `data-tilburg-tooltip-enhance`        |

```html
<!-- initialiseert zichzelf bij het laden -->
<script type="module" src="…/components-css/accordion/index.js"></script>
```

Of in een bundler, zelf aanroepen, bijvoorbeeld na het renderen van nieuwe markup:

```js
import { enhanceAccordion } from "@gemeente-tilburg/components-css/accordion/index.js";
enhanceAccordion(document);
```

De scripts slaan elementen die ze al verwerkt hebben over, dus opnieuw aanroepen kan geen kwaad. Voor de modal is geen
script nodig: gebruik `showModal()` en `close()` van het native `<dialog>`-element.

### Gebruik (HTML/CSS)

Neem de markup over van de pagina's onder `Tilburg HTML/…`, of kopieer hem met de knop **`</> Gebruik`** in de werkbalk
van een story:

```html
<button type="button" class="utrecht-button utrecht-button--primary-action tilburg-medium">Versturen</button>
```

De `tilburg-*`-classes komen bovenop de `utrecht-*`-classes: Utrecht levert de basis, Tilburg de huisstijl.
