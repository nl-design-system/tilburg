# Je eerste wijziging in 15 minuten

Een rondleiding langs alles wat je bij een wijziging tegenkomt, met een echte, kleine wijziging: de Tooltip krijgt
rondere hoeken. Onderweg zie je hoe de vier lagen samenhangen en welke commando's je daarbij helpen. Het is een
oefening: aan het eind zet je hem weer terug, of je maakt er een echte pull request van.

## 0. Eenmalig: opzetten

```bash
git clone git@github.com:nl-design-system/tilburg.git && cd tilburg
node scripts/setup.mjs
```

Setup installeert wat ontbreekt (Node 24, pnpm, de dependencies, de git-hooks, de eerste builds) en sluit af met de
vraag of hij de Storybooks start. Al opgezet? `pnpm check` laat zien of alles nog klopt.

## 1. Vind de component

```bash
pnpm where tooltip
```

Je ziet waar de Tooltip in elke laag staat. Het belangrijkste om te onthouden:

- **De HTML/CSS-laag is leidend.** `components-css/tooltip/index.scss` is de enige stylesheet. React, Angular en de Web
  Component zijn dunne wrappers die precies dezelfde HTML maken, dus één CSS-wijziging geldt voor alle vier.
- **De voorbeelden staan op één plek**: `storybook-shared/src/tilburg-tooltip.examples.ts`. Beide Storybooks lezen daaruit.
- **TLB** betekent een eigen Tilburg-component zonder Utrecht-basis (zoals de Tooltip); de andere bouwen op Utrecht.

`pnpm where --list` toont alle componenten; een naam mag ook `PasswordInput` of `tilburg-wbc-tooltip` zijn.

## 2. Start de Storybooks op die component

```bash
pnpm dev tooltip
```

Dit start de watchers van alle libraries en beide Storybooks, en opent de browser op de Tooltip (React en Angular). Laat
het draaien. In de terminal zie je voortaan alleen rebuilds en fouten; `v` toont alles, `q` stopt.

## 3. Maak de wijziging

Open `packages/components-css/tooltip/index.scss` en zoek de `border-radius`:

```scss
border-radius: var(--tilburg-tooltip-border-radius, 4px);
```

Maak er `8px` van en sla op. Hover in de Storybook over een knop met tooltip: de hoeken zijn ronder, en dat geldt in
**alle** lagen (HTML, React, Web Components én Angular), want ze delen deze CSS. De Storybooks lezen de SCSS direct
uit de bron, dus hier is geen rebuild nodig.

Pas je een wrapper aan (bijvoorbeeld `components-react/src/Tooltip.tsx`), dan bouwt de watcher die library opnieuw en
zie je in de terminal `✓ components-react rebuilt`. Een fout verschijnt daar ook, met bestand en regel.

> Waarom een `var(--tilburg-tooltip-border-radius, …)`? Zo kan een thema (zoals BAT) de waarde met een token
> overschrijven zonder dat de CSS verandert. Voor een vaste Tilburg-waarde pas je de fallback aan, of je voegt een
> token toe in `proprietary/design-tokens/src/patches/`.

## 4. Test het

```bash
pnpm test tooltip
```

Draait alleen de tests van de Tooltip, in React, Angular en Web Components, met één tabel als uitkomst. Gaat er iets mis,
dan zie je per test wat er verwacht werd en wat er kwam.

## 5. Is de component nog compleet?

```bash
pnpm parity tooltip
```

Controleert of elke laag die `implementation-status.md` belooft er is, met stories en tests. Voor een CSS-wijziging
verandert hier niets; bij een nieuwe component of laag is dit je checklist.

## 6. Beschrijf de wijziging voor de release

```bash
pnpm changeset
```

Kies de packages die afnemers krijgen. De CSS-laag zelf (`components-css`) is private en wordt niet gepubliceerd; hij
komt bij afnemers via `@gemeente-tilburg/components-react` en `@gemeente-tilburg/components-angular`, die hem inbouwen.
Kies die twee, `patch`, en schrijf één zin over wat er voor gebruikers verandert. Gepubliceerd wordt naar npm
(`@gemeente-tilburg/*`), na een merge naar `main`. Een refactor of alleen tests heeft geen changeset nodig.

## 7. Wat CI straks controleert, nu al

```bash
pnpm verify
```

Audit, lint, build, type-check, exports, tests, parity, en of er een changeset bij zit: in één tabel. Draait `pnpm dev`
nog, dan vraagt hij eerst of hij mag bouwen (twee builds in dezelfde `dist/` tegelijk gaan mis).

## 8. Pull request

Maak een branch en commit (de pre-commit-hook lint en formatteert de bestanden die je stagede). Daarna doet `pnpm ship`
de rest: hij draait `pnpm verify`, toont je commits, pusht na een vraag en geeft de link om de pull request te openen.
Het PR-sjabloon heeft een korte checklist: alle lagen, het BAT-thema, toetsenbord en schermlezer.

Was het een oefening? Zet de wijziging terug met `git checkout -- packages/components-css/tooltip/index.scss` en
verwijder de changeset uit `.changeset/`.

## Bonus: bekijk het in een afnemende applicatie

```bash
pnpm sync --to bq-tlb-frontend
```

Packt de Angular-library en de tokens en installeert ze in `../bq-tlb-frontend` (of `--to hltsamen`). Herstart daar de
dev-server en je ziet je wijziging in de echte applicatie.

## Als iets niet werkt

- `pnpm check`: wat is er mis met je omgeving, en welk commando lost het op.
- Een stap die faalt, toont de foutregels van de tool zelf en een link naar de volledige log.
- `pnpm commands` (of `pnpm menu`): alle commando's op een rij.
- `CONTRIBUTING.md` in de repository: hoe alles in elkaar zit.
