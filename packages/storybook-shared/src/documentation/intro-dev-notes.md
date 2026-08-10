<!-- @license CC0-1.0 -->

---

## Voor ontwikkelaars

Technische details over de twee Storybooks — relevant als je lokaal werkt of de Storybook-output deployt:

- **React / HTML-CSS Storybook** — `packages/storybook`, draait in dev op port **`6006`**, builder `@storybook/react-vite` (Vite). Toont de HTML/CSS-referentie + de React-componenten.
- **Angular Storybook** — `packages/storybook-angular`, draait in dev op port **`6007`**, builder `@storybook/angular` (Webpack + Angular CLI). Toont de HTML/CSS-referentie + de Angular-componenten.

De twee zijn niet aan elkaar gekoppeld; start de andere Storybook apart als je beide framework-lagen wilt zien. De HTML/CSS-stories zijn in beide identiek — ze documenteren dezelfde gedeelde markup.

### Lokaal starten

```bash
# Beide Storybooks tegelijk (parallel — port 6006 + 6007)
pnpm storybook

# Alleen de React Storybook (port 6006)
pnpm storybook:react

# Alleen de Angular Storybook (port 6007)
pnpm storybook:angular
```

De prerequisite-builds (`design-tokens` en `web-components-stencil` voor de React-kant; `components-angular` voor de Angular-kant) draaien automatisch mee in elk van bovenstaande commando's.

### Gedeelde HTML/CSS-stories

De HTML/CSS-stories worden uit één bron gegenereerd: `packages/storybook-shared/src/tilburg-{name}.examples.ts`. Beide Storybooks importeren die bestanden — de React-laag rendert via `dangerouslySetInnerHTML`, de Angular-laag via een `template`-string. Pas de markup daar één keer aan en beide Storybooks volgen.

### Gedeelde documentatie

De intro-teksten hierboven komen uit `packages/storybook-shared/src/documentation/*.md`. Beide Storybooks stellen hun intro samen uit dezelfde fragmenten; alleen de titel en het stukje "hoe deze Storybook in elkaar zit" staan lokaal per Storybook. Pas gedeelde tekst dus één keer aan in `storybook-shared`.

De aparte builds zijn nodig omdat `@storybook/angular` alleen op Webpack + Angular CLI werkt, terwijl de React-Storybook op Vite draait. Voor productie kun je beide builds onder verschillende paden hosten.
