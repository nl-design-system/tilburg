<!-- @license CC0-1.0 -->

# @gemeente-tilburg/storybook-shared

De gedeelde bron van beide Tilburg-Storybooks: de HTML/CSS-referentievoorbeelden per component
(`src/tilburg-<naam>.examples.ts`) en de documentatie (`src/documentation/*.md`).

De Tilburg-Storybooks importeren de bron direct. Andere design systems die de Tilburg-componenten hergebruiken
(bijvoorbeeld HLTsamen) gebruiken het gebouwde package:

```ts
import { bugs, descriptionHtml, examples } from "@gemeente-tilburg/storybook-shared/tilburg-alert.examples";
import gettingStarted from "@gemeente-tilburg/storybook-shared/documentation/getting-started.md?raw";
```

`pnpm run build` compileert de voorbeelden naar `dist/` (ESM + `.d.ts`, zonder afhankelijkheden). Niet op npm
gepubliceerd; lokaal te packen met `pnpm run pack:local` in de root.
