<!-- @license CC0-1.0 -->

# Tilburg Design System

![Tilburg](.github/banner.svg)

Componenten en design tokens voor de websites en applicaties van Gemeente Tilburg, gebouwd op de architectuur van het
[NL Design System](https://nldesignsystem.nl) en de [Utrecht](https://nl-design-system.github.io/utrecht/)-componenten.

> De componenten zijn in ontwikkeling (versie 0.x). API's kunnen nog veranderen; lees de changelog bij een update.

**Storybook:** [React, HTML/CSS en Web Components](https://nl-design-system.github.io/tilburg/) ·
[Angular en HTML/CSS](https://nl-design-system.github.io/tilburg/angular/)

## Lagen en packages

| Laag             | Package                                    | Voor wie                                   | Op npm                   |
| ---------------- | ------------------------------------------ | ------------------------------------------ | ------------------------ |
| Design tokens    | `@gemeente-tilburg/design-tokens`          | iedereen, nodig voor elke laag             | ja                       |
| Plain HTML / CSS | `@gemeente-tilburg/components-css`         | elke stack: BEM-classes in je eigen markup | nog niet                 |
| React            | `@gemeente-tilburg/components-react`       | React 18- en 19-projecten                  | bij de eerste release    |
| Angular          | `@gemeente-tilburg/components-angular`     | Angular 20-, 21- en 22-projecten           | bij de eerste release    |
| Web Components   | `@gemeente-tilburg/web-components-stencil` | elke stack: `<tilburg-wbc-*>`-elementen    | nog niet (experimenteel) |

De HTML/CSS-laag is leidend: React, Angular en Web Components renderen precies dezelfde DOM en classes.

Elke laag heeft de tokens en de Utrecht-basis-CSS nodig. Installeren gaat zo (React en Angular zodra ze op npm staan;
tot dan via een tarball, zie [Lokaal gebruiken in een andere repository](CONTRIBUTING.md#lokaal-gebruiken-in-een-andere-repository)):

```bash
# basis, voor elke laag
npm install @gemeente-tilburg/design-tokens @utrecht/component-library-css

# React
npm install @gemeente-tilburg/components-react

# Angular
npm install @gemeente-tilburg/components-angular @utrecht/component-library-angular@1.1.0
```

Zet daarna `class="tilburg-theme utrecht-document"` op `<body>` (of een wrapper) en laad de fonts. Zonder die class
zijn de tokens leeg en ziet niets er goed uit.

## Aan de slag

De documentatie voor afnemers staat in de Storybook: begin bij **Tilburg → Aan de slag** (in de Angular-Storybook
**Tilburg Angular → Aan de slag**). Daar staat de basis-setup die elke laag nodig heeft (tokens, de
`tilburg-theme`-class, Utrecht-basis-CSS, fonts), per laag een eerste component, en wat je doet als het er niet goed
uitziet.

- **React-Storybook** — HTML/CSS, React en Web Components. Wordt bij elke push naar `main` gepubliceerd op
  <https://nl-design-system.github.io/tilburg/>; lokaal met `pnpm dev react` (poort 6006).
- **Angular-Storybook** — HTML/CSS en Angular. Wordt op dezelfde site gepubliceerd onder
  <https://nl-design-system.github.io/tilburg/angular/>; lokaal met `pnpm dev angular` (poort 6007).

## Bijdragen

Je hebt Node 24 nodig (`.nvmrc`) en pnpm 11 via corepack; npm weigert in deze repository. Eén commando na het clonen
zet alles op wat ontbreekt (Node 24, pnpm, dependencies, git-hooks, builds) en start daarna de Storybooks:

```bash
git clone git@github.com:nl-design-system/tilburg.git && cd tilburg
nvm use && corepack enable   # optioneel: setup biedt dit ook zelf aan
node scripts/setup.mjs       # of `pnpm setup` als pnpm al werkt
pnpm dev                     # beide Storybooks, met live rebuild van alle libraries
```

Daarna is `pnpm start` het beginpunt: een menu met alle commando's. Nieuw hier? Volg
[Je eerste wijziging in 15 minuten](packages/storybook-shared/src/documentation/first-change.md). Hoe alles in elkaar
zit (lagen, testen, een component toevoegen, releasen) staat in [`CONTRIBUTING.md`](CONTRIBUTING.md). Werkt iets niet?
`pnpm check --fix` zegt wat ontbreekt en biedt de oplossing aan; wat de scripts herkennen staat in
[Als een script misgaat](CONTRIBUTING.md#als-een-script-misgaat).

### Commando's

| Commando                                | Wat het doet                                                          |
| --------------------------------------- | --------------------------------------------------------------------- |
| `pnpm start`                            | Menu met alle commando's (`pnpm commands` print ze op een rij)        |
| `pnpm setup`                            | Van verse clone naar draaiende Storybook; slaat over wat al klopt     |
| `pnpm check [--fix]`                    | Klopt je omgeving? Node, pnpm, install, builds, poorten               |
| `pnpm dev [react\|angular] [component]` | Storybook(s) met live rebuild; met een component opent hij die pagina |
| `pnpm where <component>`                | Waar een component staat, per laag                                    |
| `pnpm test [component]`                 | Alle tests, of die van één component in alle lagen                    |
| `pnpm parity`                           | Is elk component compleet in elke laag?                               |
| `pnpm new badge --html '<span …>'`      | Een nieuw component in elke laag, afgeleid van zijn HTML              |
| `pnpm verify`                           | Wat CI op een pull request controleert, in één tabel                  |
| `pnpm ship`                             | Verify, pushen na een vraag, en de link voor de pull request          |
| `pnpm sync` / `pnpm pack:local`         | De packages als tarball naar een afnemende applicatie                 |
| `pnpm logs` / `pnpm clean:pick`         | De laatste stap-logs bekijken; build-output en caches opruimen        |

### Opbouw van de repository

```text
proprietary/design-tokens        tokens (Style Dictionary): thema's Tilburg en BAT, hoog contrast
proprietary/assets, font         logo's en diagrammen; fontmap (nu leeg)
packages/components-css          HTML/CSS-laag: SCSS per component + kleine enhancer-scripts
packages/components-react        React-componenten
packages/components-angular      Angular-componenten
packages/web-components-stencil  Stencil Web Components (<tilburg-wbc-*>), experimenteel
packages/web-components-react    door Stencil gegenereerde React-wrappers
packages/storybook-shared        gedeelde HTML-voorbeelden en documentatie voor beide Storybooks
packages/storybook               React-Storybook: HTML, React, Web Components
packages/storybook-angular       Angular-Storybook: HTML, Angular
scripts/                         de ontwikkelcommando's (alleen Node, geen dependencies)
```

### Releasen

Versies en changelogs gaan via [changesets](https://github.com/changesets/changesets): beschrijf je wijziging met
`pnpm changeset`. Na een merge naar `main` maakt `.github/workflows/publish.yml` een release-PR; na het mergen daarvan
publiceert hij de packages die niet `private` zijn (`design-tokens`, `components-react`, `components-angular`) op npm.
`.github/workflows/deploy.yml` zet bij elke push naar `main` beide Storybooks op GitHub Pages. Meer in
[Releasen](CONTRIBUTING.md#releasen).

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
