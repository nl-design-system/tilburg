<!-- @license CC0-1.0 -->

# @gemeente-tilburg/web-components-stencil

Framework-agnostic web components (`<tilburg-wbc-*>`) for the Municipality of Tilburg, built with
[Stencil](https://stenciljs.com/). This is the fourth layer next to HTML/CSS, React and Angular — it adds behaviour and
an attribute/event API on top of the HTML/CSS layer, it does not replace it.

```text
design-tokens → components-css (HTML + CSS, leading) → web-components-stencil → web-components-react (generated proxies)
```

## Usage

The components render the HTML/CSS layer's markup into **light DOM**, so the same global stylesheets apply:

```html
<link rel="stylesheet" href="@gemeente-tilburg/design-tokens/dist/tilburg/theme.css" />
<link rel="stylesheet" href="@utrecht/component-library-css/dist/index.css" />
<script type="module">
  import { defineCustomElements } from "@gemeente-tilburg/web-components-stencil/loader";
  defineCustomElements();
</script>

<tilburg-wbc-alert variant="info" heading="Informatie">De openingstijden zijn gewijzigd.</tilburg-wbc-alert>
```

Each component injects its own `components-css` rules; the tokens and the utrecht base CSS are the consumer's
responsibility (same as the React layer). React apps can use `@gemeente-tilburg/web-components-react`, the proxies
Stencil generates into `packages/web-components-react/src/components.ts`.

## Conventions

These keep the Stencil layer in lock-step with Angular and React. The Angular component is the API reference, the
HTML/CSS layer (`packages/storybook-shared/src/*.examples.ts` + `packages/components-css`) is the DOM reference.

### Files and names

- One folder per component, named like the Angular folder: `src/<name>/component.tsx`, `src/<name>/index.scss`,
  `src/<name>/component.spec.tsx`. Stencil allows one `@Component` per file, so sub-components get their own file in
  the same folder (`src/accordion/section.tsx`).
- Tag `tilburg-wbc-<angular-suffix>` (Angular `tilburg-accordion-section` → `tilburg-wbc-accordion-section`); class
  `TilburgWbc<Name>`. The `wbc` infix avoids clashing with the Angular selectors when both are loaded on one page.

### DOM and styling

- Always `shadow: false` (light DOM). `render()` returns exactly the markup of the Angular template / HTML reference:
  same elements, classes, ARIA and IDs. Nested Tilburg components render their `tilburg-wbc-*` counterpart where
  Angular renders a `tilburg-*` component (headings via the `Heading` helper in `src/utils/heading.tsx`).
- `index.scss` does `@use "../../../components-css/<name>/index";` (when that folder exists) and ports the Angular
  `:host { display: … }` rule to a tag selector: `tilburg-wbc-<name> { display: block; }`. `:host` does not work in
  light DOM.
- Write tag names literally in JSX (never `` `tilburg-wbc-heading-${n}` ``) so Stencil detects the dependency and the
  `dist-custom-elements` build defines it too.

### API

- Angular `@Input()` → `@Prop()` with the same camelCase name (attribute is kebab-case). Keep Angular's defaults.
- Global HTML attributes that belong on the inner native element (`aria-label`, `aria-describedby`, `title`, `id`,
  `lang`, …) are **not** props. Consumers write them on the host; `inheritAttributes()` from
  `src/utils/inherit-attributes.ts` moves them onto the inner element (see Button). Otherwise they would stay on the
  host: `aria-label` on a generic element, duplicate IDs, tooltips over the whole component.
- When an Angular input name clashes with a global attribute but means something else, rename it and document the
  rename: Alert `title` (heading text) → `heading`; Accordion section `key` (reserved by Stencil JSX) → `sectionKey`.
- Angular `@Output() foo` / React `onFoo` → `@Event() tilburgFoo: EventEmitter<T>` (React proxy: `onTilburgFoo`).
  Native events from inner light-DOM controls (`input`, `change`, `click`, `submit`) bubble through the host as-is —
  don't re-emit them.
- `<ng-content>` → `<slot />`; `<ng-content select="[slot=x]">` → `<slot name="x" />`. When `components-css` paints a
  default with `:empty` (alert icons), render the named slot only when used: `hasSlot()` from `src/utils/slots.ts`
  in `componentWillLoad`.
- State the component owns (Accordion `autoToggle`) → `@Prop({ mutable: true, reflect: true })`.
- Form controls render a real `<input>` / `<textarea>` / `<select>` in light DOM, so they take part in the surrounding
  `<form>` and `<label for>` without form-associated custom element plumbing.

### Tests

`component.spec.tsx` next to the component, using `newSpecPage` (see `src/alert/component.spec.tsx`). Cover the
rendered classes/ARIA against the HTML reference, prop → DOM mapping, attribute inheritance, slots and events.

```bash
pnpm --filter @gemeente-tilburg/web-components-stencil test
```

The script runs Jest `--runInBand`: with parallel workers, Jest 29 child processes intermittently die with `SIGSEGV`
on Node 24 (a random suite then reports "Test suite failed to run"). In-band is just as fast for this suite size.

Stencil 4 flags its integrated Jest runner as deprecated (removed in Stencil 5); the migration path is
`@stencil/vitest`.

`InheritedAttributes` is an index-signature type and the repo's tsconfig has `noPropertyAccessFromIndexSignature`, so
read inherited values with brackets: `this.inherited['aria-label']`, `this.inherited['role']`.

### Storybook

Stories live in the React Storybook as `packages/storybook/src/tilburg-<name>-wbc.stories.tsx`, title
`Tilburg Web Components/<Name>`, id `tilburg-<name>-wbc`, rendering through the React proxies. The docs text comes from
`descriptionWebComponents` in the component's `storybook-shared/src/*.examples.ts`.
