# Bijdragen aan de Angular-componenten

De algemene handleiding (opzetten, testen, een component in alle lagen toevoegen, releasen) staat in de root:
[`CONTRIBUTING.md`](../../CONTRIBUTING.md). Tips over toegankelijkheid voor afnemers staan in de Storybook onder
_Tips & valkuilen_. Hier alleen wat specifiek is voor dit package.

## `package.json` en de exports uit `dist/`

ng-packagr maakt bij de build een eigen `package.json` in `dist/`. Het `.`-entry (`types`, `default` →
`fesm2022/…`) schrijft hij zelf; andere subpaden in `exports` (zoals `./src/design-tokens.css`) kopieert hij letterlijk
uit de root-`package.json`. Kies voor zulke subpaden dus een pad dat zowel vanuit de package-root als vanuit `dist/`
bestaat.

De CI-release (changesets) publiceert vanuit de package-root, `pack:dist` pakt `dist/` in. `pnpm run test-build`
(script `test-exports.mjs`) controleert dat beide `package.json`'s dezelfde export-keys hebben en dat elk pad vanuit
dat bestand bestaat. Draai hem na een Angular- of ng-packagr-upgrade.

## Tests

Jest met `jest-preset-angular` (`setup-jest.ts`). Een spec staat naast de component als `component.spec.ts`; zie
`src/modal/component.spec.ts` voor een voorbeeld met een test-host-component.

```bash
pnpm test
```
