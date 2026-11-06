<!-- @license CC0-1.0 -->

# Design tokens

Een naslag van de `--tilburg-*`-design tokens uit `@gemeente-tilburg/design-tokens`. De tokens gelden binnen
`.tilburg-theme` (de Storybook zet elke story in die scope), dus de namen op de pagina's per categorie tonen overal in
het design system hun echte waarde.

De tokens zijn per doel gegroepeerd:

- **Colors** — het huisstijlpalet en de grijsschaal
- **Space** — block-, row-, column- en inline-afstanden op de schaal met dierennamen
- **Typography** — lettergroottes (en lettertypes)
- **Interaction** — accenten voor links, focus en actief

## Twee tokenfamilies: van Tilburg en van Utrecht

Het Tilburg Design System gebruikt **twee namespaces van custom properties**, allebei op dezelfde
`.tilburg-theme`-scope. Beide worden in de browser uitgerekend; het verschil is wie de naam beheert en wat hij regelt.

### 1. `--tilburg-*` — de keuzes van Tilburg

Het huisstijlpalet (`--tilburg-color-*`), de afstandsschaal met dierennamen (`--tilburg-space-{block,row,column,inline}-*`),
typografie (`--tilburg-typography-font-size-*`, `--tilburg-typography-font-family-*`), randen
(`--tilburg-border-width-sm/md/lg`), interactie-accenten (`--tilburg-interaction-color`) en tokens per component
(`--tilburg-table-footer-border-width`, `--tilburg-accordion-section-border-color`, …). Per thema geëxporteerd uit Figma
(`proprietary/design-tokens/figma/tilburg/`, `figma/bat/`), aangevuld met `src/patches/` voor tokens die nog niet in
Figma staan, en gebouwd tot `dist/<thema>/theme.css`. Gebruik deze direct in de CSS van je applicatie.

### 2. `--utrecht-*` — de basis uit @utrecht/component-library-css

[Utrecht](https://github.com/nl-design-system/utrecht) definieert honderden `--utrecht-<component>-*`-tokens
(`--utrecht-button-primary-action-background-color`, `--utrecht-form-control-border-width`, …). Het Tilburg-thema
**laat elk daarvan naar het juiste `--tilburg-*`-token wijzen**, zodat de Utrecht-componenten vanzelf de Tilburg-stijl
krijgen, zonder aparte CSS per component:

```css
.tilburg-theme {
  --utrecht-button-primary-action-background-color: var(--tilburg-color-blue-300);
  --utrecht-form-control-border-width: var(--tilburg-border-width-sm);
  --utrecht-table-header-background-color: var(--tilburg-color-blue-100);
  /* …en nog honderden */
}
```

In de CSS van `@gemeente-tilburg/components-css/*/index.scss` zie je een van twee patronen:

1. **Een Utrecht-token gebruiken** als Utrecht al een token voor die eigenschap heeft, bv.
   `border-block-end-color: var(--utrecht-table-row-border-color)`. Het Tilburg-thema laat dat al naar
   `--tilburg-color-blue-200` wijzen.
2. **Direct een Tilburg-token gebruiken** als er geen passend Utrecht-token is, of als de regel specifiek voor Tilburg is
   (bv. zebrastrepen, de huisstijlkleur van de badge counter, het logo in de page header). Voorbeeld:
   `background-color: var(--tilburg-color-pink-300)`.

## Tokens overschrijven

Overschrijf waarden voor de hele applicatie door ze opnieuw te declareren op `.tilburg-theme`, of per onderdeel met een
specifiekere selector:

```css
.tilburg-theme .promo-zone {
  --tilburg-color-blue-300: #c4007a;
}
```

Meer staat in de README van het package: `proprietary/design-tokens/README.md`.

## Uitgerekende waarden

Elke categoriepagina toont de **tokennaam**, een **voorbeeld** dat het token via `var(--…)` gebruikt, en een kolom met de
**uitgerekende waarde**. Die vult een klein script in de browser: `@gemeente-tilburg/components-css/tokens/resolve`. Beide
Storybooks importeren en draaien dat script bij elke render; wie zelf HTML/CSS schrijft, importeert het zelf (of houdt
de vaste `—` uit de markup).
