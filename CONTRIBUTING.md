<!-- @license CC0-1.0 -->

# Bijdragen aan het Tilburg Design System

Deze handleiding is voor wie aan de repository zelf werkt. Wil je de componenten gebruiken in een project, lees dan
_Aan de slag_ in de Storybook.

## Vereisten

| Tool    | Versie                                    | Hoe                                                         |
| ------- | ----------------------------------------- | ----------------------------------------------------------- |
| Node.js | 24 (zie `.nvmrc`; `engines`: `>=24 <=25`) | `nvm use`                                                   |
| pnpm    | 11 (`packageManager` in `package.json`)   | `corepack enable`, dan kiest corepack de juiste versie zelf |

`pnpm install` controleert eerst je Node-versie (`scripts/preflight.mjs`) en stopt met uitleg als het niet Node 24 is;
daarnaast weigert pnpm zelf een andere versie (`engineStrict`). Zie je `ERR_UNKNOWN_BUILTIN_MODULE: node:sqlite` of
"This version of pnpm requires at least Node.js", dan start pnpm 11 op een oudere Node uit je `PATH` (vaak een
nvm-default van 20) en komt het niet eens aan die controle toe: `nvm use`, of `nvm alias default 24`.
`node scripts/check.mjs` werkt ook zonder pnpm en zegt welke van de twee het is.

Goed om te weten over `pnpm-workspace.yaml` en `.npmrc`:

- **`minimumReleaseAge: 1440`** — pnpm installeert alleen versies die al minstens 24 uur op npm staan (tegen
  supply-chain-aanvallen). Een net uitgebrachte versie kun je dus pas een dag later toevoegen. Uitzondering: de scopes
  onder `minimumReleaseAgeExclude`.
- **`autoInstallPeers: false`** — peer-dependencies voeg je zelf expliciet toe.
- **`saveExact: true`** — versies worden zonder `^` of `~` opgeslagen.
- **`allowBuilds`** — install-scripts van dependencies draaien alleen voor de pakketten die daar staan. Een nieuw
  pakket met een install-script geeft `ERR_PNPM_IGNORED_BUILDS`: kijk wat het doet en zet het er dan bij.
  (`ignore-scripts=true` in `.npmrc` leest pnpm 11 niet meer; de scripts van de root, zoals `preinstall` en husky's
  `prepare`, draaien gewoon.)

## Eerste keer opzetten

```bash
git clone git@github.com:nl-design-system/tilburg.git
cd tilburg
node scripts/setup.mjs   # of `pnpm setup` als pnpm al werkt
```

Setup doet alles wat nog ontbreekt en slaat over wat al klopt, dus je kunt hem altijd opnieuw draaien:

1. **Node 24** — staat die er niet, dan installeert hij hem met nvm (na een vraag) en gaat daarop verder. Hij biedt ook
   aan om 24 de standaard te maken voor nieuwe terminals (`nvm alias default 24`); anders start pnpm daar niet.
2. **pnpm** via corepack, de versie uit `packageManager`. Staat er een andere pnpm vóór op je `PATH` (Homebrew, een
   globale npm-install), dan zegt hij welke.
3. **`pnpm install`**, de **git-hooks** (husky) en de **libraries** die de Storybooks uit `dist/` laden.
4. De tabel van `pnpm check`, en de vraag of hij `pnpm dev` meteen start.

Opties gaan via `pnpm run setup …` (pnpm leest opties bij `pnpm setup` als zijn eigen ingebouwde commando): `--yes`
(geen vragen), `--skip-dev` (niet aanbieden `pnpm dev` te starten). `pnpm setup:reset` begint met een schone
`node_modules`. Daarna werk je met:

```bash
pnpm check   # klopt alles? Node, pnpm, install, builds, poorten
pnpm dev     # beide Storybooks; elke library wordt opnieuw gebouwd zodra je opslaat
```

`pnpm dev` start van elke library de watcher (tokens, React, Angular, Stencil en de React-wrappers), wacht op de eerste
build en start dan de Storybook(s) op 6006 en 6007, of op de eerstvolgende vrije poort. Draait er al een Storybook op
die poort, dan gebruikt hij die. Je ziet alleen rebuilds en fouten (met waarom en wat te doen); `v` toont alle output,
`o` opent de browser, `q` stopt alles. Alleen één Storybook: `pnpm dev:react` of `pnpm dev:angular`. De SCSS van
`components-css` en de voorbeelden in `storybook-shared` lezen de Storybooks direct uit de bron; die hebben geen
watcher nodig.

In VS Code: installeer de aanbevolen extensies (de melding bij het openen, of _Extensions → Recommended_). Opslaan
formatteert dan met Prettier en past de fixes van ESLint, stylelint en markdownlint toe. _Run and Debug_ heeft
configuraties om de open React-test, Angular-spec of een script te debuggen, en _Terminal → Run Task_ start `pnpm dev`,
`check`, `parity` en `verify`.

### Handige commando's

| Commando          | Wat het doet                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm setup`      | Van verse clone naar draaiende Storybook; slaat over wat al klopt                                                                     |
| `pnpm check`      | Omgeving nalopen: Node, pnpm, install, verouderde builds, poorten, git-hooks, achterstand op `main`; `--fix` biedt de oplossingen aan |
| `pnpm parity`     | Is elke component compleet in elke laag? (`pnpm parity tooltip` voor één, `--tests` per test)                                         |
| `pnpm dev`        | Beide Storybooks met live rebuild van alle libraries                                                                                  |
| `pnpm verify`     | Wat CI op een pull request controleert, plus `parity` en of er een changeset bij hoort                                                |
| `pnpm ship`       | Verify, toont de commits, pusht na een vraag en geeft de link voor de pull request (`--dry-run`, `--no-verify`)                       |
| `pnpm logs`       | De nieuwste stap-logs; `--last` toont het einde van de laatst mislukte, `--open` opent de map                                         |
| `pnpm sync`       | Packt en installeert deze werkkopie in `../bq-tlb-frontend` en `../hltsamen` (`--to` voor één)                                        |
| `pnpm clean:pick` | Kiezen wat weg mag (build-output, caches, `node_modules`), met grootte                                                                |
| `pnpm commands`   | Alle commando's op een rij; `pnpm start` (of `pnpm menu`) als menu                                                                    |

De scripts staan in `scripts/` en gebruiken alleen Node zelf, zodat `pnpm check` ook werkt als de install kapot is.
Poorten, libraries en afnemende repo's staan op één plek: `scripts/dev-config.mjs`. Gaat een stap mis, dan herkennen
ze de bekende oorzaken (verkeerde Node, de 24-uursregel, `allowBuilds`, een Jest-crash op Node 24, een library die niet
gebouwd is, een bezette poort) en zeggen wat je moet doen.

Gaat een stap mis, dan zie je niet de hele uitvoer van de tool maar wat ertoe doet: waarom (als de oorzaak bekend is),
wat je moet doen, de foutregels van de tool zelf en een link naar de volledige log (in de temp-map, onder
`tilburg-logs/`; de laatste 40 blijven bewaard). Een tool die iets vraagt, krijgt geen invoer en stopt meteen in plaats
van eindeloos te wachten. Ctrl-C stopt ook alles wat het script gestart heeft. Draait `pnpm dev`, dan vragen `verify`,
`sync` en `setup` eerst of ze mogen bouwen: twee builds tegelijk in dezelfde `dist/` mislukken. De scripts hebben zelf
ook tests (`pnpm run test:scripts`, onderdeel van `pnpm test`).

### Als een script misgaat

De scripts herkennen deze oorzaken in de uitvoer van een mislukte stap (de eerste die past, wint) en tonen dan waarom en
wat te doen. De volledige uitvoer staat in de log: `pnpm logs --last`. De tabel komt uit `scripts/lib/recovery.mjs`;
staat er een nieuwe oorzaak in, draai dan `node scripts/troubleshooting.mjs`.

<!-- troubleshooting:start (generated by node scripts/troubleshooting.mjs from scripts/lib/recovery.mjs) -->

<!-- prettier-ignore-start -->
| Herkend als | Waarom | Wat te doen |
| ----------- | ------ | ----------- |
| `node-version` | This is not Node 24. pnpm 11 needs a newer Node (it uses node:sqlite), and engineStrict refuses anything but the version in .nvmrc. | nvm use (then run the command again in the same terminal) |
| `pnpm-version` | Another pnpm than the one in package.json "packageManager" is running. | corepack enable (corepack then runs the pinned pnpm in this folder) |
| `command-not-found` | A program the step needs is not installed, or not on your PATH (pnpm itself, or a tool from node_modules/.bin). | pnpm check (for pnpm: corepack enable; for a tool: pnpm install) |
| `missing-script` | The package has no script by that name: an older checkout, or the script was renamed. | update that repository (git pull), or look up the right name with pnpm run in its folder |
| `release-age` | That version was published less than 24 hours ago. minimumReleaseAge in pnpm-workspace.yaml holds new releases back on purpose (supply-chain attacks are usually caught within a day). | wait until it is a day old, or pin the previous version. Do not lower the guard; only NL Design System scopes are excluded. |
| `ignored-builds` | A dependency wants to run an install script. pnpm runs none unless the package is listed under allowBuilds in pnpm-workspace.yaml. | check what the package does, then add it to allowBuilds in pnpm-workspace.yaml and run pnpm install again |
| `outdated-lockfile` | A package.json changed without pnpm-lock.yaml (CI installs with --frozen-lockfile). | pnpm install, and commit pnpm-lock.yaml together with the package.json change |
| `audit` | pnpm audit found a critical advisory. CI runs pnpm audit --audit-level critical before installing and stops on it. | upgrade the package, or add an override in pnpm-workspace.yaml (with a comment saying when it can go), then pnpm install |
| `jest-crash` | A Jest worker crashed. Jest 29 workers crash now and then on Node 24; the Stencil tests run with --runInBand for that reason. It is not your test. | run it again, or one package on its own: pnpm --filter &lt;package&gt; run test |
| `library-not-built` | A Storybook or package imports a Tilburg library from its build output (dist/), and that is missing. | pnpm dev builds what is missing (or pnpm build for everything) |
| `dist-collision` | Two processes wrote the same dist/ folder at once (a second build, or pnpm dev, running at the same time). | run it again once the other build has finished |
| `tests-failed` | Tests failed; the reported lines below name the test and the expectation that did not hold. | run that package on its own: pnpm --filter &lt;package&gt; run test (add -- -t "&lt;test name&gt;" for one test) |
| `type-error` | TypeScript or the Angular compiler found an error; the lines below give the file, line and message. | fix the code at that line; pnpm dev shows the same error while you work |
| `angular-cache` | The Angular build cache looks corrupt. | pnpm run clean:pick and choose the .angular caches, then retry |
| `lint` | The linters found problems; the lines below give the file, line and rule. | pnpm lint-fix repairs what it can (formatting, import order, markdown); fix the rest by hand |
| `heap` | Node ran out of memory during the build. | NODE_OPTIONS=--max-old-space-size=8192, then retry |
| `no-space` | The disk is full (or macOS ran out of file watchers). | free some space (pnpm run clean:pick shows what takes room), then retry |
| `integrity` | A package in the pnpm store does not match its checksum. | pnpm store prune, then pnpm install |
| `port-in-use` | The port is taken by another process. | pnpm dev picks a free port itself; otherwise stop the other server (lsof -i :&lt;port&gt;) |
| `network` | A network request failed mid-way. | retry; if it keeps failing, check your connection |
| `missing-module` | A dependency is missing, usually after switching branches without installing. | pnpm install |
<!-- prettier-ignore-end -->

<!-- troubleshooting:end -->

### Je eerste wijziging

Nieuw hier? [Je eerste wijziging in 15 minuten](packages/storybook-shared/src/documentation/first-change.md) loopt met een
echte kleine wijziging langs alles: `pnpm where`, `pnpm dev tooltip`, de wijziging, `pnpm test tooltip`, `pnpm parity`,
een changeset, `pnpm verify` en de pull request. Dezelfde tekst staat in beide Storybooks onder _Tilburg / Je eerste
wijziging_.

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

`pnpm parity <naam>` laat zien welke van de stappen hieronder nog ontbreken, met het pad van elk bestand.

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

Een pre-commit-hook (husky + lint-staged) controleert de gestagede bestanden met dezelfde tools en formatteert ze met
prettier. Vóór een pull request: `pnpm verify` doet wat CI doet.

## Releasen

Er zijn nu twee manieren waarop packages bij afnemers komen:

1. **npm, via changesets (CI).** Beschrijf je wijziging met `pnpm changeset` (kies patch/minor/major per package). Na
   een merge naar `main` maakt `.github/workflows/publish.yml` een release-PR; na het mergen daarvan publiceert hij de
   packages die niet `private` zijn: `design-tokens`, `components-react` en `components-angular`.
2. **Lokaal gepackte tarballs.** `pnpm run pack:local` (zie hieronder) maakt ze voor alle packages tegelijk;
   `pnpm --filter <package> run pack:dist` doet het voor één package (`components-react`, `components-angular` of
   `design-tokens`) en zet de `.tgz` in diens `dist/`. Bv. om een nog niet gepubliceerde versie in een afnemend project
   te testen.

Beide routes pakken het package vanuit zijn root in, net als de release via npm. De paden in de tarball zijn dus
dezelfde als na een release, bv. `@gemeente-tilburg/design-tokens/dist/tilburg/theme.css`.

## Lokaal gebruiken in een andere repository

Voor bq-tlb-frontend en HLTsamen (naast deze repo uitgecheckt) doet `pnpm sync` alles in één keer: packen, de
tarballs controleren en het sync-script van die repo zelf draaien.

Voor een andere repo maak je de lokale tarballs zelf:

```bash
pnpm run pack:local
```

Dat bouwt de design tokens, `components-css`, `components-react`, de Web Components (+ React-wrappers),
`components-angular` en `storybook-shared`, en zet ze met `pnpm pack` in `.tarballs/` (niet in git). `pnpm pack` zet
`workspace:*` om naar echte versies. Een andere repo verwijst ernaar met
`"@gemeente-tilburg/components-css": "file:../tilburg/.tarballs/gemeente-tilburg-components-css-0.0.0.tgz"`; na een
nieuwe `pack:local` haalt een gewone `pnpm install` daar de wijzigingen op.

`@gemeente-tilburg/storybook-shared` (de HTML-voorbeelden en documentatie) en de token-bronnen in
`@gemeente-tilburg/design-tokens` (`figma/tilburg/`, `figma/bat/`, `src/`) worden meegepakt zodat zo'n repo dezelfde stories kan
tonen en eigen thema's op de Tilburg-tokens kan bouwen.

## Deployen

`.github/workflows/deploy.yml` bouwt bij elke push naar `main` beide Storybooks en zet ze op GitHub Pages: de
React-Storybook in de root, de Angular-Storybook onder `angular/`.
