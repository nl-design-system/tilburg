<!-- @license CC0-1.0 -->

# @gemeente-tilburg/web-components-react

React-wrappers voor de Tilburg Web Components (`@gemeente-tilburg/web-components-stencil`). **Dit package wordt
gegenereerd:** `pnpm --filter @gemeente-tilburg/web-components-stencil run build:stencil` schrijft
`src/components.ts` en `src/react-component-lib/`. Pas die bestanden niet met de hand aan.

Elke `<tilburg-wbc-naam>` wordt een `TilburgWbcNaam`-component; events `tilburgX` worden props `onTilburgX`. De
stories onder `Tilburg Web Components/…` in de React-Storybook gebruiken deze wrappers.

Experimenteel en niet op npm gepubliceerd.
