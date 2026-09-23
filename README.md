<!-- @license CC0-1.0 -->

# Tilburg Design System

Componenten en design tokens voor de websites en applicaties van Gemeente Tilburg, gebouwd op de architectuur van het
[NL Design System](https://nldesignsystem.nl) en de [Utrecht](https://nl-design-system.github.io/utrecht/)-componenten.

> De componenten zijn in ontwikkeling (versie 0.x). API's kunnen nog veranderen; lees de changelog bij een update.

## Lagen en packages

| Laag             | Package                                    | Voor wie                                   | Op npm                   |
| ---------------- | ------------------------------------------ | ------------------------------------------ | ------------------------ |
| Design tokens    | `@gemeente-tilburg/design-tokens`          | iedereen, nodig voor elke laag             | ja                       |
| Plain HTML / CSS | `@gemeente-tilburg/components-css`         | elke stack: BEM-classes in je eigen markup | nog niet                 |
| React            | `@gemeente-tilburg/components-react`       | React 18-projecten                         | ja                       |
| Angular          | `@gemeente-tilburg/components-angular`     | Angular 20-projecten                       | ja                       |
| Web Components   | `@gemeente-tilburg/web-components-stencil` | elke stack: `<tilburg-wbc-*>`-elementen    | nog niet (experimenteel) |

De HTML/CSS-laag is leidend: React, Angular en Web Components renderen precies dezelfde DOM en classes.

## Aan de slag

De documentatie voor afnemers staat in de Storybook: begin bij **Tilburg → Aan de slag**. Daar staat de basis-setup die
elke laag nodig heeft (tokens, de `tilburg-theme`-class, Utrecht-basis-CSS, fonts), per laag een eerste component, en
wat je doet als het er niet goed uitziet.

- **React-Storybook** — HTML/CSS, React en Web Components. Wordt bij elke push naar `main` gepubliceerd op de GitHub
  Pages-site van deze repository.
- **Angular-Storybook** — HTML/CSS en Angular. Nu alleen lokaal: `pnpm storybook:angular`.

## Bijdragen

Hoe je de repository opzet (Node 24, pnpm 11), test, lint, een component in alle lagen toevoegt en releaset, staat in
[`CONTRIBUTING.md`](CONTRIBUTING.md). Kort:

```bash
nvm use && corepack enable
pnpm install
pnpm storybook:react   # http://localhost:6006
```

Vragen of bugs: [GitHub-issues](https://github.com/nl-design-system/tilburg/issues). Meer over de NL Design
System-community: het `#nl-design-system`-kanaal via [praatmee.codefor.nl](https://praatmee.codefor.nl).

## Code of Conduct

We streven naar een open, gastvrije, diverse, inclusieve en gezonde community. Lees
[onze gedragscode](CODE_OF_CONDUCT.nl.md) ([English](CODE_OF_CONDUCT.md)).

## Licentie

Deze software is vrije en open-source software onder de
[European Union Public License (EUPL) v1.2](LICENSE.md). Documentatie valt onder
[Creative Commons Zero 1.0 Universal (`CC0-1.0`)](https://creativecommons.org/publicdomain/zero/1.0/legalcode).

Voor de propriëtaire onderdelen in deze repository (logo, huisstijl, fonts): lees [NOTICE](NOTICE.md) zorgvuldig.
