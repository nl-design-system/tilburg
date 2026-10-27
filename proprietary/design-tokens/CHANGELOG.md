# @gemeente-tilburg/design-tokens

## 0.1.0

### Minor Changes

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

- 4b246ec: Optically centre button text by shifting the line-box down with asymmetric
  `padding-block` to compensate for TradeGothicCondensed18's font metrics.
  Adds `--tilburg-fix-button-{small,medium,large}-baseline-offset` and
  `--tilburg-fix-button-link-baseline-offset` design tokens
  (2px / 2px / 4px / 2px) and consumes them from the button and button-link
  SCSS. Adds a `pack:dist` script to `components-angular` and `design-tokens`
  for the local build-and-pack release flow.
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
- d4e6bbf: Add the Select component: a native `<select class="utrecht-select utrecht-select--html-select">` with the Tilburg
  chevron (the combobox chevron, and a white one in high contrast) and the textbox hover state. React `Select` takes
  `<option>` children; Angular `<tilburg-select>` takes `options` (`{ value, label, disabled? }`) with either a
  `FormControl` (`control`) or `value` + `(valueChange)`, and keeps the `id` on the inner `<select>` so `<label for>`
  works.

## 0.0.1

### Patch Changes

- 9842fc4: Release npm package with provenance.
