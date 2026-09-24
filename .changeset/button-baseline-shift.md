---
"@gemeente-tilburg/components-angular": patch
"@gemeente-tilburg/design-tokens": patch
---

Optically centre button text by shifting the line-box down with asymmetric
`padding-block` to compensate for TradeGothicCondensed18's font metrics.
Adds `--tilburg-fix-button-{small,medium,large}-baseline-offset` and
`--tilburg-fix-button-link-baseline-offset` design tokens
(2px / 2px / 4px / 2px) and consumes them from the button and button-link
SCSS. Adds a `pack:dist` script to `components-angular` and `design-tokens`
for the local build-and-pack release flow.
