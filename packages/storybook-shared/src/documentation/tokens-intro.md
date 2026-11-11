<!-- @license CC0-1.0 -->

# Design tokens

Alles over de tokens uit `@gemeente-tilburg/design-tokens`: welke er zijn, hoe je ze overschrijft, de thema's en hoog
contrast. Hoe je de tokens laadt, staat in de basis van [Aan de slag](?path=/docs/tilburg-aan-de-slag--docs).

De tokens gelden binnen `.tilburg-theme` (de Storybook zet elke story in die scope) of op `:root` als je `variables.css`
gebruikt. Daar zijn ze in DevTools te inspecteren. De pagina's per categorie tonen de namen met hun echte waarde:

- **Colors** — het huisstijlpalet en de grijsschaal
- **Space** — block-, row-, column- en inline-afstanden op de schaal met dierennamen
- **Typography** — lettergroottes (en lettertypes)
- **Interaction** — accenten voor links, focus en actief

## Voor ontwerpers

Werk je in Figma aan de huisstijl, dan is dit wat je moet weten. De rest van deze pagina is voor wie de CSS schrijft.

- **Figma is de bron.** Elke kleur, afstand en lettergrootte in de componenten komt uit de Figma-export: één bestand
  per thema, `figma/tilburg/figma.tokens.json` en `figma/bat/figma.tokens.json` in het package `design-tokens`.
- **Een wijziging gaat één kant op**: je past het token aan in Figma, exporteert opnieuw, en het nieuwe bestand
  vervangt het oude in de repository (met een pull request, of via een ontwikkelaar). De waarde in de code met de hand
  aanpassen werkt niet: de volgende export overschrijft hem.
- **Je ziet het resultaat in deze Storybook.** Draait `pnpm dev`, dan wordt het thema opnieuw gebouwd zodra het bestand
  verandert. De pagina's _Colors_, _Space_, _Typography_ en _Interaction_ tonen elke naam met zijn uitgerekende waarde;
  de componenten staan onder `Tilburg HTML/…`.
- **Controleer na een wijziging** het contrast (WCAG AA, ook van tekst op de nieuwe kleur), de focusrand, en beide
  thema's: Tilburg en BAT delen de componenten en verschillen alleen in tokens. Kijk ook met hoog contrast aan.
- **Een token dat nog niet in Figma staat**, staat tijdelijk in de code (`src/patches/`), zodat de bouw niet hoeft te
  wachten. Die lijst is het werk dat in Figma nog open staat: staat het token daar, dan kan de patch weg. Zie
  _Waar de tokens vandaan komen_.
- **Een naam** zegt van wie het token is, welk onderdeel en welke eigenschap: `--tilburg-color-blue-300`,
  `--tilburg-alert-margin-block-end`. Een nieuw token voor een component volgt dat patroon; stem de naam af met een
  ontwikkelaar voordat je exporteert.

## Twee tokenfamilies: van Tilburg en van Utrecht

Het Tilburg Design System gebruikt **twee namespaces van custom properties**, allebei op dezelfde
`.tilburg-theme`-scope. Beide worden in de browser uitgerekend; het verschil is wie de naam beheert en wat hij regelt.

### 1. `--tilburg-*` — de keuzes van Tilburg

Het huisstijlpalet (`--tilburg-color-*`), de afstandsschaal met dierennamen (`--tilburg-space-{block,row,column,inline}-*`),
typografie (`--tilburg-typography-font-size-*`, `--tilburg-typography-font-family-*`), randen
(`--tilburg-border-width-sm/md/lg`), interactie-accenten (`--tilburg-interaction-color`) en tokens per component
(`--tilburg-table-footer-border-width`, `--tilburg-accordion-section-border-color`, …). Gebruik deze direct in de CSS van
je applicatie.

### 2. `--utrecht-*` — de basis uit @utrecht/component-library-css

[Utrecht](https://github.com/nl-design-system/utrecht) definieert honderden `--utrecht-<component>-*`-tokens
(`--utrecht-button-primary-action-background-color`, `--utrecht-form-control-border-width`, …). Het Tilburg-thema
**laat elk daarvan naar het juiste `--tilburg-*`-token wijzen**, zodat de Utrecht-componenten vanzelf de Tilburg-stijl
krijgen, zonder aparte CSS per component:

```css
.tilburg-theme {
  --utrecht-button-primary-action-background-color: var(--tilburg-interaction-color);
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

Overschrijf een waarde voor de hele applicatie door hem opnieuw te declareren op `.tilburg-theme`, of per onderdeel met
een eigen scope daarbinnen:

```css
.tilburg-theme .promo-zone {
  --tilburg-interaction-color: #c4007a;
}
```

### Componenttokens

Componenten schilderen hun kleuren niet rechtstreeks uit het palet, maar lezen eerst een componenttoken, met de
Tilburg-waarde als standaard. Een ander thema zet alleen het token, bijvoorbeeld de focusrand van de combobox:

```css
.promo-zone {
  --tilburg-combobox-focus-border-color: #00568a;
  --tilburg-modal-border-radius: 8px;
}
```

Zo zijn onder meer de combobox (focus, uitgeschakeld, opties), de modal (achtergrond, afronding, animatie), de
statusbadge (per status) en de checkbox (ongeldig, aangevinkt met focus) aan te passen. Niet elk componenttoken staat in
`theme.css`: een token zonder thema-waarde heeft zijn standaard als fallback in de SCSS
(`var(--tilburg-tooltip-border-radius, 4px)`), dus je vindt het daar en niet in DevTools.

### Beweging

Animaties gebruiken een kleine schaal: `--tilburg-motion-duration-short` (200ms), `-medium` (400ms) en `-long`
(500ms), met `--tilburg-motion-easing-standard` en `--tilburg-motion-easing-emphasized`. Pas je die aan, dan bewegen
accordion, voortgangsbalk en modal mee.

## Thema's

Er zijn twee thema's met dezelfde componenten: **Tilburg** (`dist/tilburg/`, class `tilburg-theme`) en **BAT**
(`dist/bat/`, class `bat-theme`). Ze verschillen alleen in tokens. Een voorbeeld: BAT toont een veld met focus als witte
tekst op donkerblauw, dus het oogje van het wachtwoordveld en het pijltje van de select worden daar wit; dat regelt het
BAT-thema zelf (`--tilburg-select-focus-background-image`). Controleer een wijziging daarom ook in BAT.

## Hoog contrast

Laad `@gemeente-tilburg/design-tokens/dist/high-contrast.css` en zet de class `tilburg-high-contrast` **op hetzelfde
element** als de thema-class. Dan worden alle componenten zwart met wit, voor elk thema:

```html
<body class="tilburg-theme tilburg-high-contrast">
  …
</body>
```

Op een dieper element werkt het niet: de thema-tokens verwijzen naar elkaar met `var()`, en die worden uitgerekend op
het element met de thema-class. De wisselknop en het onthouden van de keuze horen bij de website.

## Waar de tokens vandaan komen

De waarden komen uit Figma: per thema één export (`proprietary/design-tokens/figma/tilburg/`, `figma/bat/`), die de build
omzet in de bestanden in `dist/<thema>/`. Tokens die (nog) niet in Figma staan, staan in `src/patches/` (en
`src/patches/bat/` voor BAT): een brug, zodat de code verder kan terwijl Figma bijloopt. Die tokens horen uiteindelijk in
Figma; daarna kan de patch weg.

De afspraak: tokens gaan één kant op, **Figma → export → repository**, en na elke ontwerpwijziging wordt opnieuw
geëxporteerd. Zo werken ontwerp en code met dezelfde waarden. Meer staat in de
[README van het package](https://github.com/nl-design-system/tilburg/blob/main/proprietary/design-tokens/README.md).

## Uitgerekende waarden

Elke categoriepagina toont de **tokennaam**, een **voorbeeld** dat het token via `var(--…)` gebruikt, en een kolom met de
**uitgerekende waarde**. Die vult een klein script in de browser: `@gemeente-tilburg/components-css/tokens/resolve`. Beide
Storybooks importeren en draaien dat script bij elke render; wie zelf HTML/CSS schrijft, importeert het zelf (of houdt
de vaste `—` uit de markup).
