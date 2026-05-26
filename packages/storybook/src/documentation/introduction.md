<!-- @license CC0-1.0 -->

# Tilburg Design System

De Tilburg-componenten zijn een gemeentelijke uitbreiding op het [NL Design System](https://nldesignsystem.nl). Ze leunen op `@utrecht/component-library-css` als basis en op `@gemeente-tilburg/design-tokens` voor kleuren, ruimtes en typografie. De huisstijl van Tilburg wordt daarbovenop gelegd.

> ⚠️ **LET OP**
>
> Het NL Design System bevindt zich nog in de pilotfase en is daarmee niet volwassen genoeg om op te leunen voor productie-werk. Bijdragen op GitHub of via [info@nldesignsystem.nl](mailto:info@nldesignsystem.nl) zijn welkom.

## Drie consumptie-lagen

De componenten zijn in drie lagen beschikbaar — kies de laag die past bij je stack:

| Laag                 | Package                                | Voor wie                                                                            |
| -------------------- | -------------------------------------- | ----------------------------------------------------------------------------------- |
| **Plain HTML / CSS** | `@gemeente-tilburg/components-css`     | elk framework — schrijf BEM-classes (`utrecht-…` / `tilburg-…`) direct in je markup |
| **React**            | `@gemeente-tilburg/components-react`   | React-projecten — `<Alert>`, `<Textbox>`, etc.                                      |
| **Angular**          | `@gemeente-tilburg/components-angular` | Angular-projecten — `<tilburg-alert>`, `<tilburg-textbox>`, etc.                    |

De **HTML/CSS-laag is leidend**: elke React- en Angular-component is een dunne wrapper die exact dezelfde DOM en klassen emit als de gedeelde HTML/CSS-referentie. Wat je onder `Tilburg HTML/…` ziet is de gedeelde render — `Tilburg React/…` en `Tilburg Angular/…` zijn parity-checks bovenop.

<!-- markdownlint-disable MD033 -->
<figure style="margin: 1.5rem 0;">
  <svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="layers-title layers-desc" style="width: 100%; max-width: 760px; height: auto; font-family: 'Roboto', sans-serif;">
    <title id="layers-title">Tilburg-lagen-architectuur</title>
    <desc id="layers-desc">React- en Angular-wrappers bouwen op de Tilburg HTML/CSS-laag, die zelf op de design-tokens leunt. Consumenten kunnen HTML/CSS direct gebruiken of via een wrapper.</desc>
    <defs>
      <marker id="layers-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#5B6E8A" />
      </marker>
    </defs>
    <rect x="100" y="20" width="240" height="74" rx="6" fill="#E6F6FF" stroke="#5B6E8A" stroke-width="1.5" />
    <text x="220" y="48" text-anchor="middle" font-size="14" font-weight="700" fill="#333">React-wrapper</text>
    <text x="220" y="68" text-anchor="middle" font-size="11" fill="#5B6E8A" font-family="monospace">components-react</text>
    <text x="220" y="86" text-anchor="middle" font-size="10" fill="#5B6E8A">&lt;Alert /&gt; &lt;Textbox /&gt;</text>
    <rect x="420" y="20" width="240" height="74" rx="6" fill="#E6F6FF" stroke="#5B6E8A" stroke-width="1.5" />
    <text x="540" y="48" text-anchor="middle" font-size="14" font-weight="700" fill="#333">Angular-wrapper</text>
    <text x="540" y="68" text-anchor="middle" font-size="11" fill="#5B6E8A" font-family="monospace">components-angular</text>
    <text x="540" y="86" text-anchor="middle" font-size="10" fill="#5B6E8A">&lt;tilburg-alert&gt; &lt;tilburg-textbox&gt;</text>
    <line x1="220" y1="94" x2="280" y2="139" stroke="#5B6E8A" stroke-width="1.5" marker-end="url(#layers-arrow)" />
    <line x1="540" y1="94" x2="480" y2="139" stroke="#5B6E8A" stroke-width="1.5" marker-end="url(#layers-arrow)" />
    <rect x="40" y="144" width="680" height="76" rx="6" fill="#C8006C" stroke="#C8006C" stroke-width="1.5" />
    <text x="380" y="172" text-anchor="middle" font-size="16" font-weight="700" fill="#fff">Gedeelde HTML / CSS</text>
    <text x="380" y="194" text-anchor="middle" font-size="11" fill="#fff" font-family="monospace">@gemeente-tilburg/components-css · @utrecht/component-library-css</text>
    <text x="380" y="210" text-anchor="middle" font-size="10" fill="#fff" font-style="italic">BEM-markup — direct te gebruiken óf via een wrapper</text>
    <line x1="380" y1="220" x2="380" y2="259" stroke="#5B6E8A" stroke-width="1.5" marker-end="url(#layers-arrow)" />
    <rect x="160" y="264" width="440" height="60" rx="6" fill="#fff" stroke="#5B6E8A" stroke-width="1.5" />
    <text x="380" y="290" text-anchor="middle" font-size="14" font-weight="700" fill="#333">Design tokens</text>
    <text x="380" y="310" text-anchor="middle" font-size="11" fill="#5B6E8A" font-family="monospace">@gemeente-tilburg/design-tokens</text>
  </svg>
  <figcaption style="margin-top: 0.5rem; font-size: 0.875rem; color: #5B6E8A; text-align: center;">
    Pijlen wijzen naar onderliggende lagen. React/Angular-wrappers zijn optioneel — de HTML/CSS-laag is rechtstreeks te gebruiken in elke stack.
  </figcaption>
</figure>
<!-- markdownlint-enable MD033 -->

## Hoe deze Storybook in elkaar zit

Deze Storybook bevat de **HTML/CSS-referentie** (`Tilburg HTML/…`) en de **React-componenten** (`Tilburg React/…`).

Er bestaat **een tweede, onafhankelijke Storybook** voor de Angular-laag, die de Angular-componenten (`Tilburg Angular/…`) plus dezelfde HTML/CSS-referentie documenteert. De twee Storybooks zijn niet aan elkaar gekoppeld — open de Angular-Storybook direct als je Angular-werk doet.

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

Schrijf de BEM-markup zoals onder **Plain HTML / CSS** in elke story staat:

```html
<button type="button" class="utrecht-button utrecht-button--primary-action tilburg-medium">Versturen</button>
```

De Tilburg-klassen (`tilburg-*` / `.tilburg-…__*`) cascaden bovenop de utrecht-klassen — utrecht levert de basis, Tilburg geeft de huisstijl.

## React

Voor React-projecten — `<Alert>`, `<Textbox>`, etc. Onder de motorkap rendert de React-laag dezelfde DOM als de HTML/CSS-laag.

### Installatie (React)

```bash
npm install @gemeente-tilburg/components-react \
            @gemeente-tilburg/design-tokens
```

### Gebruik (React)

`@gemeente-tilburg/components-react` importeert zijn eigen SCSS automatisch — je hoeft alleen de tokens en utrecht-basis globaal te laden.

```scss
/* in je entry stylesheet, bv. src/index.scss */
@import "@gemeente-tilburg/design-tokens/dist/tilburg/theme.css";
@import "@utrecht/component-library-css/dist/index.css";
```

```tsx
import { Alert, Textbox } from "@gemeente-tilburg/components-react";

export function ContactForm() {
  return (
    <>
      <Alert variant="info" title="Informatie">
        De openingstijden zijn gewijzigd.
      </Alert>
      <Textbox id="email" type="email" placeholder="naam@voorbeeld.nl" />
    </>
  );
}
```

Elke React-story onder `Tilburg React/…` documenteert de beschikbare props in de **Usage**-sectie van zijn auto-docs-pagina.

## Angular

Voor Angular-projecten — `<tilburg-alert>`, `<tilburg-textbox>`, etc. Volledige API-docs in de aparte Angular Storybook (`packages/storybook-angular`).

### Installatie (Angular)

```bash
npm install @gemeente-tilburg/components-angular \
            @gemeente-tilburg/design-tokens \
            @utrecht/component-library-angular
```

### Gebruik (Angular)

```ts
import { NgModule } from "@angular/core";
import { TilburgComponentsModule } from "@gemeente-tilburg/components-angular";

@NgModule({
  imports: [TilburgComponentsModule],
  /* … */
})
export class AppModule {}
```

```scss
/* in styles.scss */
@import "@gemeente-tilburg/design-tokens/dist/tilburg/theme.css";
@import "@utrecht/component-library-css/dist/index.css";
```

```html
<tilburg-alert variant="info" title="Informatie" [closable]="true" (closed)="dismiss()">
  De openingstijden zijn gewijzigd.
</tilburg-alert>

<tilburg-textbox id="email" type="email" [control]="form.controls.email" placeholder="naam@voorbeeld.nl" />
```

## Standaard-iconen

Componenten met iconen (Alert, Validation Message, Accordion-section, Progress Bar) renderen een passende standaard-glyph zodra je de juiste `variant`/`type` meegeeft — je hoeft zelf geen SVG-markup te leveren. Overschrijven kan in alle drie de lagen:

- **HTML/CSS** — vul `.utrecht-alert__icon` (of `.tilburg-validation-message__icon`) met je eigen `<svg>`; de CSS `::before` met de standaard-glyph wordt automatisch verborgen via `:has()`.
- **React** — geef de `icon` (of `closeIcon` / `backIcon` / `iconCollapsed` / `iconExpanded`) prop een eigen ReactNode.
- **Angular** — project een element met `slot="icon"` (of `slot="close-icon"` / `slot="back-icon"` / `slot="icon-collapsed"` / `slot="icon-expanded"`) in het component.

## Design tokens

Alle componenten zijn via CSS-custom-properties te tunen. De Tilburg-tokens (`--tilburg-*`) en bovenliggende utrecht-tokens (`--utrecht-*`) zijn in DevTools onder de root te inspecteren; overschrijven kan per scope:

```scss
.brand-zone {
  --tilburg-interaction-color: #c4007a;
}
```

Zie de [Tokens](?path=/docs/tilburg-tokens--docs) story voor het complete overzicht.

## Bijdragen

De broncode staat op <https://github.com/nl-design-system/tilburg>. PR's voor nieuwe componenten, bug-fixes en documentatie zijn welkom — zorg dat HTML/CSS, React en Angular dezelfde DOM en klassen blijven emitten (zie de stories als parity-check).

---

## Voor ontwikkelaars

Technische details over de twee Storybooks — relevant als je lokaal werkt of de Storybook-output deployt:

- **Deze Storybook** — `packages/storybook`, draait in dev op port **`6006`**, builder `@storybook/react-vite` (Vite).
- **Angular Storybook** — `packages/storybook-angular`, draait in dev op port **`6007`**, builder `@storybook/angular` (Webpack + Angular CLI).

### Lokaal starten

```bash
# Beide Storybooks tegelijk (parallel — port 6006 + 6007)
pnpm storybook

# Alleen deze Storybook (port 6006)
pnpm storybook:react

# Alleen de Angular Storybook (port 6007)
pnpm storybook:angular
```

De prerequisite-builds (`design-tokens`, `web-components-stencil` voor de React-kant; `components-angular` voor de Angular-kant) draaien automatisch mee in elk van bovenstaande commando's.

### Gedeelde HTML/CSS-stories

De HTML/CSS-stories worden uit één bron gegenereerd: `packages/storybook-shared/src/tilburg-{name}.examples.ts`. Beide Storybooks importeren die bestanden — de React-laag rendert via `dangerouslySetInnerHTML`, de Angular-laag via een `template`-string. Pas de markup daar één keer aan en beide Storybooks volgen.

De aparte builds zijn nodig omdat `@storybook/angular` alleen op Webpack + Angular CLI werkt, terwijl deze Storybook op Vite draait. Voor productie kun je beide builds onder verschillende paden hosten.
