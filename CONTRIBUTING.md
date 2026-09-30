<!-- @license CC0-1.0 -->

# Bijdragen aan het Tilburg Design System

Deze handleiding is voor wie aan de repository zelf werkt. Wil je de componenten gebruiken in een project, lees dan
_Aan de slag_ in de Storybook.

## Vereisten

| Tool    | Versie                                    | Hoe                                                         |
| ------- | ----------------------------------------- | ----------------------------------------------------------- |
| Node.js | 24 (zie `.nvmrc`; `engines`: `>=24 <=25`) | `nvm use`                                                   |
| pnpm    | 11 (`packageManager` in `package.json`)   | `corepack enable`, dan kiest corepack de juiste versie zelf |

pnpm weigert te installeren onder een andere Node-versie (`engineStrict`). Zie je
`ERR_UNKNOWN_BUILTIN_MODULE: node:sqlite`, dan draai je nog op een oudere Node.

Goed om te weten over `pnpm-workspace.yaml` en `.npmrc`:

- **`minimumReleaseAge: 1440`** — pnpm installeert alleen versies die al minstens 24 uur op npm staan (tegen
  supply-chain-aanvallen). Een net uitgebrachte versie kun je dus pas een dag later toevoegen. Uitzondering: de scopes
  onder `minimumReleaseAgeExclude`.
- **`autoInstallPeers: false`** — peer-dependencies voeg je zelf expliciet toe.
- **`saveExact: true`** — versies worden zonder `^` of `~` opgeslagen.
- **`ignore-scripts=true`** (`.npmrc`) — install-scripts draaien niet; pakketten die dat wel mogen staan onder
  `allowBuilds`.

## Eerste keer opzetten

```bash
git clone git@github.com:nl-design-system/tilburg.git
cd tilburg
nvm use && corepack enable
pnpm install
pnpm storybook:react     # React-Storybook op http://localhost:6006
pnpm storybook:angular   # Angular-Storybook op http://localhost:6007
```

Beide `storybook:*`-scripts bouwen eerst wat ze nodig hebben (tokens, de React- of Angular-library, de Web Components)
en starten daarna de Storybook. `pnpm storybook` start beide tegelijk. Een volledige build van alles doe je met
`pnpm build`.

## Hoe de repository in elkaar zit

```text
proprietary/design-tokens     tokens (Style Dictionary) → dist/tilburg/theme.css, variables.css, …
proprietary/assets, font      logo's, diagrammen; fontmap (nu leeg)
packages/components-css       HTML/CSS-laag: SCSS per component + kleine enhancer-scripts (accordion, combobox)
packages/components-react     React-componenten (Vite-build)
packages/components-angular   Angular-componenten (ng-packagr)
packages/web-components-stencil  Stencil Web Components (<tilburg-wbc-*>), experimenteel
packages/web-components-react    door Stencil gegenereerde React-wrappers
packages/storybook-shared     gedeelde HTML-voorbeelden (*.examples.ts) en documentatie (documentation/*.md)
packages/storybook            React-Storybook (Vite): HTML, React, Web Components
packages/storybook-angular    Angular-Storybook (Webpack): HTML, Angular
```

De twee Storybooks zijn los van elkaar, omdat `@storybook/angular` alleen op Webpack + Angular CLI draait en de
React-Storybook op Vite. De HTML-voorbeelden en de documentatie komen uit `storybook-shared`: pas die één keer aan en
beide Storybooks volgen.

## Werkafspraken

- **De HTML/CSS-referentie is leidend.** De markup in `packages/storybook-shared/src/tilburg-<naam>.examples.ts` is de
  DOM die elke laag rendert. React, Angular en Web Components maken dezelfde elementen, classes, ARIA en id's.
- **Angular is de API-referentie.** Props en attributen in React en Web Components volgen de Angular-inputs (namen en
  standaardwaarden). Wijk je af, documenteer het dan in de usage-tekst van die laag.
- **Stijl hoort in `components-css`.** Laag-specifieke CSS alleen voor de host-elementen (bv. `display: block`) of waar
  een wrapper-element de CSS-selector doorbreekt.
- **Documentatie** voor afnemers staat in `storybook-shared/src/documentation/` (Nederlands). De usage per component
  staat in de `description*`-strings van de `*.examples.ts`.

## Een nieuwe component toevoegen in alle lagen

1. **CSS** — `packages/components-css/<naam>/index.scss`. Ontbreekt er een token, voeg het toe in
   `proprietary/design-tokens/src/`.
2. **HTML-referentie** — `packages/storybook-shared/src/tilburg-<naam>.examples.ts`, met de voorbeelden (`examples`),
   `bugs` en `descriptionHtml` / `description` / `descriptionReact` / `descriptionWebComponents`. Kijk naar
   `tilburg-alert.examples.ts` als voorbeeld.
3. **HTML-stories** — `packages/storybook/src/tilburg-<naam>.stories.tsx` en
   `packages/storybook-angular/src/tilburg-<naam>-html.stories.ts`.
4. **React** — `packages/components-react/src/<Naam>.tsx` (importeert de SCSS uit `components-css`), export in
   `src/index.ts`, test in `src/<Naam>.test.tsx`, story `packages/storybook/src/tilburg-<naam>-react.stories.tsx`.
5. **Angular** — `packages/components-angular/src/<naam>/` (`component.ts`, `index.html`, `index.scss`,
   `public-api.ts`, `component.spec.ts`). Registreer de component in `src/index.module.ts` en exporteer hem in
   `src/components.ts`. Story: `packages/storybook-angular/src/tilburg-<naam>.stories.ts`.
6. **Web Component** — `packages/web-components-stencil/src/<naam>/`. De conventies (light DOM, attributen
   doorgeven, slots, events) staan in `packages/web-components-stencil/README.md`. Story:
   `packages/storybook/src/tilburg-<naam>-wbc.stories.tsx`.
7. **Implementatiestatus** — een rij in `packages/storybook-shared/src/documentation/implementation-status.md`.
8. **Changeset** — `pnpm changeset` (zie _Releasen_).

## Testen

| Package                  | Commando                                                      | Opmerking                                                         |
| ------------------------ | ------------------------------------------------------------- | ----------------------------------------------------------------- |
| alles                    | `pnpm test`                                                   |                                                                   |
| `components-react`       | `pnpm --filter @gemeente-tilburg/components-react test`       | Jest + Testing Library                                            |
| `components-angular`     | `pnpm --filter @gemeente-tilburg/components-angular test`     | Jest + `jest-preset-angular`; `test-build` checkt de exports      |
| `web-components-stencil` | `pnpm --filter @gemeente-tilburg/web-components-stencil test` | Stencil-spec-tests, `--runInBand` (zie de README van het package) |

jsdom kent geen `showModal()` / `close()` op `<dialog>`; de modal-tests zetten daar een kleine polyfill voor neer.

## Linten en formatteren

```bash
pnpm lint        # stylelint, eslint, markdownlint, package.json-lint en de lint-scripts van alle packages
pnpm lint-fix    # repareert wat automatisch kan, en draait prettier
```

Een pre-commit-hook (husky + lint-staged) controleert de gestagede bestanden met dezelfde tools.

## Releasen

Er zijn nu twee manieren waarop packages bij afnemers komen:

1. **npm, via changesets (CI).** Beschrijf je wijziging met `pnpm changeset` (kies patch/minor/major per package). Na
   een merge naar `main` maakt `.github/workflows/publish.yml` een release-PR; na het mergen daarvan publiceert hij de
   packages die niet `private` zijn: `design-tokens`, `components-react` en `components-angular`.
2. **Lokaal gepackte tarballs.** `pnpm --filter <package> run pack:dist` bouwt en maakt een `.tgz` (voor
   `components-react`, `components-angular` en `design-tokens`), bv. om een nog niet gepubliceerde versie in een
   afnemend project te testen.

Let op bij `design-tokens`: `pack:dist` pakt de map `dist/` in als root van het package. In die tarball is het pad
dus `@gemeente-tilburg/design-tokens/tilburg/theme.css`, zonder `dist/`. Via npm (changesets) is het
`…/dist/tilburg/theme.css`, zoals de Storybook-documentatie beschrijft.

## Lokaal gebruiken in een andere repository

Wil je de packages gebruiken in een andere repo voordat ze gepubliceerd zijn (bijvoorbeeld HLTsamen), maak dan
lokale tarballs:

```bash
pnpm run pack:local
```

Dat bouwt de design tokens, `components-css`, `components-react`, de Web Components (+ React-wrappers),
`components-angular` en `storybook-shared`, en zet ze met `pnpm pack` in `.tarballs/` (niet in git). `pnpm pack` zet
`workspace:*` om naar echte versies. Een andere repo verwijst ernaar met
`"@gemeente-tilburg/components-css": "file:../tilburg/.tarballs/gemeente-tilburg-components-css-0.0.0.tgz"`; na een
nieuwe `pack:local` haalt een gewone `pnpm install` daar de wijzigingen op.

`@gemeente-tilburg/storybook-shared` (de HTML-voorbeelden en documentatie) en de token-bronnen in
`@gemeente-tilburg/design-tokens` (`figma/tilburg/`, `src/`) worden meegepakt zodat zo'n repo dezelfde stories kan
tonen en eigen thema's op de Tilburg-tokens kan bouwen.

## Deployen

`.github/workflows/deploy.yml` bouwt bij elke push naar `main` en zet de **React-Storybook** op GitHub Pages. De
Angular-Storybook wordt nu niet gedeployed.
