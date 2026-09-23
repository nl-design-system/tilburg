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
