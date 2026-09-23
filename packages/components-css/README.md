<!-- @license CC0-1.0 -->

# @gemeente-tilburg/components-css

De HTML/CSS-laag van het Tilburg Design System: per component een map met SCSS (`<naam>/index.scss`) die bovenop de
`@utrecht/component-library-css`-classes de Tilburg-huisstijl legt. Deze markup is de referentie waar React, Angular
en Web Components zich aan houden.

Niet op npm gepubliceerd. React en Angular importeren deze SCSS zelf. Wil je hem los gebruiken, vraag het Design
System-team dan om een build.

- **Markup per component** — de pagina's onder `Tilburg HTML/…` in de Storybook (bron:
  `packages/storybook-shared/src/tilburg-<naam>.examples.ts`).
- **Gedrag** — `accordion/index.js` en `combobox/index.js` zijn kleine enhancer-scripts. Je zet ze per element aan
  met `data-tilburg-accordion-enhance` / `data-tilburg-combobox-enhance`. `tokens/resolve.js` vult de
  tokentabellen in de documentatie.
- **Setup** — tokens, `tilburg-theme`, Utrecht-basis en fonts: zie **Aan de slag** in de Storybook.
