---
"@gemeente-tilburg/components-angular": patch
"@gemeente-tilburg/design-tokens": patch
---

Optically centre button text by shifting the line-box down with asymmetric
`padding-block` to compensate for TradeGothicCondensed18's font metrics.
Per-size offsets (small 2px, medium 2px, large 4px) avoid skewing smaller
buttons. The same fix is applied to `.utrecht-button-link` (2px). Adds a
`pack:dist` script to `components-angular` and `design-tokens` for the
local build-and-pack release flow.
