<!-- @license CC0-1.0 -->

## Plain HTML / CSS

Voor elk framework — schrijf BEM-classes direct in je markup. Geen JS-runtime nodig.

### Installatie (HTML/CSS)

```bash
npm install @gemeente-tilburg/components-css \
            @gemeente-tilburg/design-tokens \
            @utrecht/component-library-css
```

### Gebruik (HTML/CSS)

Laad de design tokens en utrecht-basis, en importeer per-component SCSS uit `@gemeente-tilburg/components-css/{name}/index`:

```scss
@import "@gemeente-tilburg/design-tokens/dist/tilburg/theme.css";
@import "@utrecht/component-library-css/dist/index.css";

@import "@gemeente-tilburg/components-css/alert/index";
@import "@gemeente-tilburg/components-css/textbox/index";
/* …alleen de componenten die je nodig hebt */
```

Schrijf de BEM-markup zoals onder `Tilburg HTML/…` in de zijbalk getoond:

```html
<button type="button" class="utrecht-button utrecht-button--primary-action tilburg-medium">Versturen</button>
```

De Tilburg-klassen (`tilburg-*` / `.tilburg-…__*`) cascaden bovenop de utrecht-klassen — utrecht levert de basis, Tilburg geeft de huisstijl.
