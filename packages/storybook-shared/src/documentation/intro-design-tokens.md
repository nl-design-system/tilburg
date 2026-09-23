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
