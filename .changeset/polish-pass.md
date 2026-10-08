---
"@gemeente-tilburg/components-angular": minor
"@gemeente-tilburg/components-react": patch
"@gemeente-tilburg/components-css": patch
"@gemeente-tilburg/design-tokens": patch
---

Polish pass (additive; old names stay as deprecated aliases):

- Angular textbox, textarea and radio button work without a `FormControl`; with one, they no longer bind `[disabled]`
  next to `[formControl]` (Angular's reactive-forms warning) and no longer write `id="undefined"`.
- Angular textbox, textarea and password input keep `name`, `dir` and `inputmode` on the native element (the utrecht
  directive stripped them, which broke autofill). Textarea gets a `name` input and respects `rows`.
- New outputs: `blur`/`focus` on textbox and textarea, `valueChange` on combobox (`change` is deprecated), `openChange`
  on modal. New inputs: `ariaLabelledBy` on combobox, button group, form fieldset and table (`ariaLabelledby` is
  deprecated), `ariaLabel` on password input.
- Combobox ships its CSS again, marks its control touched on blur and only reports `aria-invalid` once touched.
- Accordion ids are unique per instance without a `key`; the loading spinner clears its timer; the alert is
  `display: block`; components with a `title` input no longer show it as a native tooltip on the host.
- CSS: link and HTML-content focus colours, textarea focus and warning state, reduced-motion and forced-colors support,
  fallback values aligned with the tokens.
- Design tokens: the build now applies its transform group (units such as `--utrecht-focus-outline-offset: 1px`), BAT
  patches no longer leak into the Tilburg theme, and badge status danger/invalid get a background colour.
- Packages declare their peer dependencies (`@gemeente-tilburg/design-tokens`, utrecht); the React package has an
  `exports` map and `sideEffects`.
