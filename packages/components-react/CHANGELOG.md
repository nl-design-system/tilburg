# @gemeente-tilburg/components-react

## 0.1.0

### Minor Changes

- d4e6bbf: Accessibility fixes brought over from bq-tlb-frontend (the Tilburg Blueriq app):
  
  - Form fields are no longer red before the user has touched them: checkbox, radio button, textarea and textbox show the
    invalid look on `:user-invalid` or `aria-invalid="true"` instead of `:invalid` (TIL-69).
  - Angular checkbox and radio button pass `invalid` to the utrecht directive, so `aria-invalid` and the invalid class no
    longer fight with the directive's own binding; the checkbox now binds `control` (`FormControl`).
  - Alert: `srPrefix` defaults per variant ("Informatie:", "Succes:", "Waarschuwing:", "Fout:"; `''` for none) (TIL-51),
    and a new `announce` option reads the alert out through a persistent live region (TIL-40). React gets `srPrefix` too.
  - Badge status: the visible text is the accessible name (the status code no longer replaces it), and `danger`, `error`
    and `invalid` are announced as an assertive alert.
  - Validation message: the role follows the live region (`assertive`, now the default, is an alert; `polite` a status;
    `off` none), so `role="alert"` and `aria-live="polite"` no longer contradict each other.
  - Page header: a logo without a title gets "Gemeente Tilburg" as alt text, so the brand link has a name (TIL-89).
  - Modal: `aria-describedby` (Angular `ariaDescribedBy`) to link the text that explains the dialog.
  - Headings wrap long words at 320px / 400% zoom (WCAG 1.4.10); table row headers in the body get the row look (TIL-88).
  - Reduced motion for the accordion, progress bar and loading spinner; Windows high contrast (`forced-colors`) support
    for checkbox, radio button, combobox and select options, progress bar and modal.
- dcb38e6: New Tilburg components, brought over from bq-tlb-frontend:
  
  - **Password input** (TIL-72): a password textbox with a show/hide toggle button. The button keeps the label
    "Wachtwoord tonen" and reports its state with `aria-pressed`; a status line says "Wachtwoord is zichtbaar." /
    "Wachtwoord is verborgen." after each click. 44px target, visible focus, reduced motion and forced-colours support,
    and Edge's own reveal eye hidden. React `PasswordInput`, Angular `<tilburg-password-input>`, Web Component
    `<tilburg-wbc-password-input>`, and an `enhancePasswordInput()` script for plain HTML.
  - **Tooltip** (TIL-53/54): a short description of a control, meeting WCAG 1.4.13: opens on hover (with a short delay)
    and focus, closes on Escape, the pointer can move onto it, a tap toggles it on touch screens. The trigger keeps its
    name and gets the tooltip added to its `aria-describedby`. React `Tooltip`, Angular `<tilburg-tooltip>`, Web
    Component `<tilburg-wbc-tooltip>`, and an `enhanceTooltip()` script for plain HTML. A white border in high contrast.
    It stays in view: when the preferred side has no room (top of the page, or the edge of an `overflow: hidden`
    container such as a table cell) it opens on the other side, and it shifts sideways instead of sticking out past the
    left or right edge.
  
  BAT theme: BAT focuses form fields with white text on dark blue. The password input's eye button now takes the
  field's focus text colour, and the select shows a white chevron while focused (new optional token
  `--tilburg-select-focus-background-image`, set by the BAT theme), so both keep their contrast.
  
  Fix: Angular `<tilburg-textbox type="…">` rendered every field as a text field — `type` only reached the utrecht
  directive, which never writes it to the element — so a password field showed the password. The real input type is now
  set.
- 4c19e63: Port the full Angular component catalogue (43 components) to React as
  self-contained wrappers that render the exact DOM Tilburg's Angular
  templates produce. The React library no longer depends on
  `@utrecht/component-library-react` or `@utrecht/button-react` — every
  component is a minimal React function that emits the correct
  `utrecht-*` / `tilburg-*` class set against raw HTML elements, so the
  `@gemeente-tilburg/components-css` SCSS cascade applies identically to
  Angular and React consumers.
  
  Components added: Accordion (+ AccordionSection), Alert, Article,
  BadgeStatus, Breadcrumb, ButtonGroup, ButtonLink, Checkbox, DataList
  (+ Item, Key, Value), Document, Fieldset, FormField, FormFieldDescription,
  FormLabel, Heading1–6, HtmlContent, LanguageToggle, Link, LoadingSpinner,
  OrderedList, Page, PageContent, PageFooter, PageHeader, Pagination,
  Paragraph, ProgressBar, RadioButton, Separator, Table (+ Body, Caption,
  Cell, Footer, Header, HeaderCell, Row), Textarea, Textbox, UnorderedList,
  ValidationMessage. The existing `Button` is upgraded to accept `size`,
  `appearance`, `pressed`, `busy`, `disabled`, mapped 1:1 to the same
  `utrecht-button*` state classes the Angular directive emits.
  
  `Accordion` + `AccordionSection` mirror the Angular template
  (`<div class="utrecht-accordion">` containing `<button
  class="utrecht-button utrecht-button--subtle utrecht-accordion__button">`
  
  - `<div class="utrecht-accordion__panel">`) so the Tilburg icon-slot
    contract is preserved. They do NOT use `<details>` / `<summary>`.
  
  `HtmlContent` renders `<div class="utrecht-html-content">` directly;
  `Fieldset` renders `<fieldset class="utrecht-fieldset">` directly — no
  bridge-class plumbing required.
  
  Tilburg SCSS dual-targets element + class for headings and form-field
  (`utrecht-heading-N, .utrecht-heading-N`; `utrecht-form-field.tilburg-warning,
  .utrecht-form-field.tilburg-warning`) so both Angular's custom-element
  render and React's class-based render pick up the styles.
  
  Bundle is now ~55 KB ESM / 38 KB CJS (was ~316 KB / 273 KB when Utrecht React
  was bundled). Consumers should import:
  
  - `@gemeente-tilburg/design-tokens/dist/tilburg/theme.css` (tokens),
  - `@utrecht/component-library-css/dist/index.css` (Utrecht base reset),
  - `@gemeente-tilburg/components-react/dist/style.css` (Tilburg overrides).
  
  Package is now `private: false` (published) and ships ESM + CJS + `.d.ts`.
- d4e6bbf: Add the Select component: a native `<select class="utrecht-select utrecht-select--html-select">` with the Tilburg
  chevron (the combobox chevron, and a white one in high contrast) and the textbox hover state. React `Select` takes
  `<option>` children; Angular `<tilburg-select>` takes `options` (`{ value, label, disabled? }`) with either a
  `FormControl` (`control`) or `value` + `(valueChange)`, and keeps the `id` on the inner `<select>` so `<label for>`
  works.
- 92babb9: Make more of the components themeable through tokens, without any visual change for the Tilburg and BAT themes: every
  new token has the value the CSS used before, and the CSS keeps that value as fallback.
  
  - Combobox: `--utrecht-combobox-popover-z-index` is now set (`10`), so the open list no longer falls behind positioned
    content further down the page (a page footer, for example).
  - Accordion: the label reads `--tilburg-accordion-button-font-weight` (now `700`; it was the Figma string `Bold`, which
    is not a valid CSS font weight).
  - Colours that were painted straight from the palette now read a component token first: combobox (focus, disabled,
    icon hover, chip focus, option active/selected), modal (background, border radius), badge status (background and
    text per status) and checkbox (invalid, checked + focus).
  - Motion: a small scale `--tilburg-motion-duration-{short,medium,long}` and `--tilburg-motion-easing-{standard,
  emphasized}`; the accordion, progress bar and modal use it. The modal animation is now set by tokens instead of on
    the component, so a theme can change it.
  - High contrast (opt-in): `dist/high-contrast.css` and the class `tilburg-high-contrast`, on the same element as the
    theme class. Black background, white text and outlines, for every theme.

### Patch Changes

- c24fa8c: Polish pass (additive; old names stay as deprecated aliases):
  
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
- Updated dependencies [4b246ec]
- Updated dependencies [dcb38e6]
- Updated dependencies [c24fa8c]
- Updated dependencies [d4e6bbf]
- Updated dependencies [92babb9]
  - @gemeente-tilburg/design-tokens@0.1.0
