<!-- @license CC0-1.0 -->

## Plain HTML / CSS

Voor elke stack zonder React of Angular, bijvoorbeeld server-gerenderde pagina's of een CMS: je schrijft de BEM-classes
direct in je markup. Dit is de leidende laag; alle andere lagen renderen precies deze markup.

### Installatie (HTML/CSS)

`@gemeente-tilburg/components-css` is **nog niet op npm gepubliceerd**. Vraag het Design System-team om een build, of
gebruik de map `packages/components-css` uit de repository. Tokens en Utrecht-basis installeer je wel via npm:

```bash
npm install @gemeente-tilburg/design-tokens @utrecht/component-library-css
```

### Setup (HTML/CSS)

De component-CSS is SCSS, per component een map. Compileer alleen wat je gebruikt:

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

| Component | Script               | Opt-in attribuut                 |
| --------- | -------------------- | -------------------------------- |
| Accordion | `accordion/index.js` | `data-tilburg-accordion-enhance` |
| Combobox  | `combobox/index.js`  | `data-tilburg-combobox-enhance`  |

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

Neem de markup over van de pagina's onder `Tilburg HTML/…`:

```html
<button type="button" class="utrecht-button utrecht-button--primary-action tilburg-medium">Versturen</button>
```

De `tilburg-*`-classes komen bovenop de `utrecht-*`-classes: Utrecht levert de basis, Tilburg de huisstijl.
