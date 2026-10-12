<!-- @license CC0-1.0 -->

## Design tokens

Alle componenten zijn via CSS-custom-properties te tunen. De Tilburg-tokens (`--tilburg-*`) en bovenliggende utrecht-tokens (`--utrecht-*`) staan op het element met `.tilburg-theme` (of op `:root` als je `variables.css` gebruikt) en zijn daar in DevTools te
inspecteren. Overschrijven kan per scope:

```scss
.brand-zone {
  --tilburg-interaction-color: #c4007a;
}
```

Zie de [Tokens](?path=/docs/tokens-intro--docs) story voor het complete overzicht.

### Componenttokens

Componenten schilderen hun kleuren niet rechtstreeks uit het palet, maar lezen eerst een componenttoken, met de
Tilburg-waarde als standaard. Een ander thema zet alleen het token, bijvoorbeeld de focusrand van de combobox:

```scss
.brand-zone {
  --tilburg-combobox-focus-border-color: #00568a;
  --tilburg-modal-border-radius: 8px;
}
```

Zo zijn onder meer de combobox (focus, uitgeschakeld, opties), de modal (achtergrond, afronding, animatie), de
statusbadge (per status) en de checkbox (ongeldig, aangevinkt met focus) aan te passen.

### Beweging

Animaties gebruiken een kleine schaal: `--tilburg-motion-duration-short` (200ms), `-medium` (400ms) en `-long`
(500ms), met `--tilburg-motion-easing-standard` en `--tilburg-motion-easing-emphasized`. Pas je die aan, dan bewegen
accordion, voortgangsbalk en modal mee.

### Thema's

Er zijn twee thema's met dezelfde componenten: **Tilburg** (`dist/tilburg/`, class `tilburg-theme`) en **BAT**
(`dist/bat/`, class `bat-theme`). Ze verschillen alleen in tokens. Een voorbeeld: BAT toont een veld met focus als witte
tekst op donkerblauw, dus het oogje van het wachtwoordveld en het pijltje van de select worden daar wit; dat regelt het
BAT-thema zelf (`--tilburg-select-focus-background-image`). Controleer een wijziging daarom ook in BAT.

### Waar de tokens vandaan komen

De waarden komen uit Figma: per thema één export (`figma/tilburg/`, `figma/bat/`), die de build omzet in de bestanden in
`dist/`. Tokens die (nog) niet in Figma staan, staan in `src/patches/` (en `src/patches/bat/` voor BAT): een brug, zodat
de code verder kan terwijl Figma bijloopt. Die tokens horen uiteindelijk in Figma; daarna kan de patch weg.

De afspraak: tokens gaan één kant op, **Figma → export → repository**, en na elke ontwerpwijziging wordt opnieuw
geëxporteerd. Zo werken ontwerp en code met dezelfde waarden, en loopt het tokenbestand in de ontwerpfase niet achter.

### Hoog contrast

Laad `@gemeente-tilburg/design-tokens/dist/high-contrast.css` en zet de class `tilburg-high-contrast` **op hetzelfde
element** als de thema-class. Dan worden alle componenten zwart met wit, voor elk thema:

```html
<body class="tilburg-theme tilburg-high-contrast">
  …
</body>
```

Op een dieper element werkt het niet: de thema-tokens verwijzen naar elkaar met `var()`, en die worden uitgerekend op
het element met de thema-class. De wisselknop en het onthouden van de keuze horen bij de website.
