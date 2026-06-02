/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg combobox. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`) so the HTML lives in one place. Each
   storybook's `tilburg-combobox.stories.*` file is a thin renderer wrapper
   around the strings below.

   The `data-tilburg-combobox-enhance` attribute on each host opts the
   markup into the JS enhancement that lives in
   `packages/components-css/combobox/index.js` (loaded by each Storybook's
   preview). The enhancement makes the chevron toggle the popover, options
   selectable, chips removable, and keyboard navigation work without any
   framework. Wrapper stories (Angular/React) do NOT emit the opt-in
   attribute — their own component code drives the same behaviour.

   Each example uses a unique `id` prefix so multiple examples can render on
   the same autodocs page without WCAG duplicate-id violations. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fcombobox';

/* Inline SVG icons — the framework wrappers emit the same paths, so the HTML
   reference, Angular, and React all draw the same tabler-style chevron / × .
   Declared up here (and not next to `examples` below) so the `description`
   template literal can interpolate them — `const`s declared further down the
   file are in the temporal dead zone at the time the description is
   evaluated and would throw `Cannot access 'chevronSvg' before initialization`. */
const chevronSvg =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
const closeSvg =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>';

export const description = `Combobox primitive on top of \`utrecht-combobox\` + \`utrecht-listbox\`. Two visual modes share the same outer shell:

- **Normal** (\`multiple=false\`): single-line input + chevron; selecting an option replaces the value and closes the popover.
- **Chiplist** (\`multiple=true\`): selected options render as removable chips inside the host before the input.

Active option (keyboard hover) is signalled with \`[data-active="true"]\` on the listbox option; selected is signalled with \`[aria-selected="true"]\`. WCAG 1.4.1 is satisfied by also drawing a coloured left border (pink for active, blue for selected) so state is communicated by shape as well as colour. The visible field is the \`.utrecht-combobox\` host; the inner input is borderless.

## Usage

### Plain HTML / CSS

The CSS in \`@gemeente-tilburg/components-css/combobox/index.scss\` paints the field but doesn't make it work — it has no idea when the popover should open, what an option click means, or how to add/remove chips. To get the same UX as the Angular/React wrappers without writing your own controller, opt in to the bundled JS enhancement.

**How to load it.** The enhancement is shipped as an ES module alongside the SCSS:

\`\`\`html
<script type="module" src="/node_modules/@gemeente-tilburg/components-css/combobox/index.js"></script>
\`\`\`

or, if you bundle your own JS:

\`\`\`ts
import { enhanceCombobox } from '@gemeente-tilburg/components-css/combobox';
enhanceCombobox();           // walk \`document\` and enhance every opt-in host
enhanceCombobox(myFragment); // or scope to a subtree
\`\`\`

When loaded as a \`<script type="module">\`, the file auto-runs once on \`DOMContentLoaded\` (or immediately if the DOM is already parsed). It's safe in SSR — every browser-only call is guarded on \`typeof document\`.

**Opting in.** Add \`data-tilburg-combobox-enhance\` to the \`.utrecht-combobox\` host. Hosts without that attribute are skipped — that's how the Angular/React wrappers stay untouched (they have their own controllers and don't emit the flag). The enhancer is idempotent: it stamps each enhanced host with \`data-tilburg-combobox-enhanced\` and re-runs are no-ops, so it's safe to call again after dynamically inserting more markup (e.g. via a SPA mutation observer).

**What it wires up.**

- *Click to open/close.* Clicking anywhere inside the field — the input, the chevron, the empty space between chips — toggles the popover. Clicks on the listbox itself (e.g., the scrollbar) are ignored. Clicks outside the host close it.
- *Option select.* Clicking an option (\`.utrecht-listbox__option\`) selects it. Single-mode replaces the input value and closes; multi-mode toggles \`aria-selected\` and rebuilds the chip row from \`[aria-selected="true"]\` options.
- *Keyboard.* On the inner input: ArrowDown/Up move \`data-active\` through the options (opening the popover first if it's closed), Home/End jump to the first/last, Enter selects the active option, Escape closes, Backspace on multi-mode with an empty input removes the last chip.
- *Pointer hover.* Mousing over an option sets \`data-active\` on it — the same attribute keyboard nav uses — so the pink "marked" stripe tracks the pointer.
- *Chip removal.* Clicking a chip's \`.tilburg-combobox__chip-remove\` (×) button toggles the matching option back to \`aria-selected="false"\` and rebuilds the chip stack.
- *Placeholder management.* In multi-mode, the input's \`placeholder\` is stashed and removed while any chip is present, then restored once the selection is empty.

**State lives in the DOM.** There's no internal store — the enhancement reads from and writes to attributes you can also inspect or drive yourself:

- \`input[aria-expanded]\` — popover open/closed
- \`input[aria-activedescendant]\` — id of the active option
- \`li[role=option][aria-selected]\` — selected values
- \`li[role=option][data-active]\` — currently marked option (keyboard or pointer)

**The reference markup.**

\`\`\`html
<label class="utrecht-form-label" for="cb-input">Voorkeurscontact</label>
<div class="utrecht-combobox" data-tilburg-combobox-enhance>
  <div class="tilburg-combobox__value-container">
    <input
      id="cb-input"
      class="tilburg-combobox__input"
      type="text"
      role="combobox"
      aria-expanded="false"
      aria-controls="cb-input-listbox"
      readonly
    />
    <button type="button" class="tilburg-combobox__chevron" aria-label="Toon opties"><!-- inline SVG chevron --></button>
  </div>
  <ul id="cb-input-listbox" role="listbox"
      class="utrecht-listbox utrecht-combobox__popover utrecht-combobox__popover--hidden">
    <li id="cb-input-opt-0" role="option" class="utrecht-listbox__option">E-mail</li>
    <li id="cb-input-opt-1" role="option" class="utrecht-listbox__option" aria-selected="true">Per post</li>
  </ul>
</div>
\`\`\`

For chiplist mode, add the \`tilburg-combobox--multiple\` modifier to the host, set \`aria-multiselectable="true"\` on the listbox, and ship a pre-rendered \`<span class="tilburg-combobox__chip">\` for each already-selected option — the enhancer will keep the chip row and the option \`aria-selected\` attributes in sync from there.
`;

const rowStyle = 'display:flex;flex-direction:column;gap:0.5rem;max-width:24rem';
const labelStyle = 'display:block;font-weight:700;margin-bottom:0.25rem';

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  normalClosed: {
    name: 'Normal — closed',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="cb-html-normal-closed">Voorkeurscontact</label>
  <div class="utrecht-combobox" data-tilburg-combobox-enhance>
    <div class="tilburg-combobox__value-container">
      <input id="cb-html-normal-closed" class="tilburg-combobox__input" type="text" role="combobox" aria-expanded="false" aria-controls="cb-html-normal-closed-listbox" readonly value="E-mail" />
      <button type="button" class="tilburg-combobox__chevron" aria-label="Toon opties">${chevronSvg}</button>
    </div>
    <ul id="cb-html-normal-closed-listbox" role="listbox" class="utrecht-listbox utrecht-combobox__popover utrecht-combobox__popover--hidden">
      <li id="cb-html-normal-closed-opt-0" role="option" class="utrecht-listbox__option" aria-selected="true">E-mail</li>
      <li id="cb-html-normal-closed-opt-1" role="option" class="utrecht-listbox__option">Per post</li>
      <li id="cb-html-normal-closed-opt-2" role="option" class="utrecht-listbox__option">Ophalen bij de balie</li>
    </ul>
  </div>
</div>`,
  },
  normalOpen: {
    name: 'Normal — open with active option',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="cb-html-normal-open">Voorkeurscontact</label>
  <div class="utrecht-combobox" data-tilburg-combobox-enhance>
    <div class="tilburg-combobox__value-container">
      <input id="cb-html-normal-open" class="tilburg-combobox__input" type="text" role="combobox" aria-expanded="true" aria-controls="cb-html-normal-open-listbox" aria-activedescendant="cb-html-normal-open-opt-1" readonly value="" />
      <button type="button" class="tilburg-combobox__chevron" aria-label="Sluit opties">${chevronSvg}</button>
    </div>
    <ul id="cb-html-normal-open-listbox" role="listbox" class="utrecht-listbox utrecht-combobox__popover utrecht-combobox__popover--block-end">
      <li id="cb-html-normal-open-opt-0" role="option" class="utrecht-listbox__option">E-mail</li>
      <li id="cb-html-normal-open-opt-1" role="option" class="utrecht-listbox__option" data-active="true">Per post</li>
      <li id="cb-html-normal-open-opt-2" role="option" class="utrecht-listbox__option" aria-selected="true">Ophalen bij de balie</li>
    </ul>
  </div>
</div>`,
  },
  chiplist: {
    name: 'Chiplist — multi-value with chips',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="cb-html-chiplist">Aanvraagdocumenten</label>
  <div class="utrecht-combobox tilburg-combobox--multiple" data-tilburg-combobox-enhance>
    <div class="tilburg-combobox__value-container">
      <span class="tilburg-combobox__chip" data-option-id="cb-html-chiplist-opt-0">Paspoort<button type="button" class="tilburg-combobox__chip-remove" aria-label="Verwijder Paspoort">×</button></span>
      <span class="tilburg-combobox__chip" data-option-id="cb-html-chiplist-opt-1">Geboorteakte<button type="button" class="tilburg-combobox__chip-remove" aria-label="Verwijder Geboorteakte">×</button></span>
      <input id="cb-html-chiplist" class="tilburg-combobox__input" type="text" role="combobox" aria-expanded="false" aria-controls="cb-html-chiplist-listbox" readonly placeholder="Voeg een document toe" />
      <button type="button" class="tilburg-combobox__clear" aria-label="Wis selectie">${closeSvg}</button>
      <button type="button" class="tilburg-combobox__chevron" aria-label="Toon opties">${chevronSvg}</button>
    </div>
    <ul id="cb-html-chiplist-listbox" role="listbox" aria-multiselectable="true" class="utrecht-listbox utrecht-combobox__popover utrecht-combobox__popover--hidden">
      <li id="cb-html-chiplist-opt-0" role="option" class="utrecht-listbox__option" aria-selected="true">Paspoort</li>
      <li id="cb-html-chiplist-opt-1" role="option" class="utrecht-listbox__option" aria-selected="true">Geboorteakte</li>
      <li id="cb-html-chiplist-opt-2" role="option" class="utrecht-listbox__option">Rijbewijs</li>
      <li id="cb-html-chiplist-opt-3" role="option" class="utrecht-listbox__option">Verblijfsdocument</li>
    </ul>
  </div>
</div>`,
  },
  invalid: {
    name: 'Invalid',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="cb-html-invalid">Voorkeurscontact</label>
  <div class="utrecht-combobox" data-tilburg-combobox-enhance>
    <div class="tilburg-combobox__value-container">
      <input id="cb-html-invalid" class="tilburg-combobox__input" type="text" role="combobox" aria-expanded="false" aria-controls="cb-html-invalid-listbox" aria-invalid="true" readonly value="" />
      <button type="button" class="tilburg-combobox__chevron" aria-label="Toon opties">${chevronSvg}</button>
    </div>
    <ul id="cb-html-invalid-listbox" role="listbox" class="utrecht-listbox utrecht-combobox__popover utrecht-combobox__popover--hidden">
      <li id="cb-html-invalid-opt-0" role="option" class="utrecht-listbox__option">E-mail</li>
      <li id="cb-html-invalid-opt-1" role="option" class="utrecht-listbox__option">Per post</li>
    </ul>
  </div>
</div>`,
  },
  disabled: {
    name: 'Disabled',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="cb-html-disabled">Voorkeurscontact</label>
  <div class="utrecht-combobox" data-tilburg-combobox-enhance>
    <div class="tilburg-combobox__value-container">
      <input id="cb-html-disabled" class="tilburg-combobox__input" type="text" role="combobox" aria-expanded="false" aria-controls="cb-html-disabled-listbox" disabled value="E-mail" />
      <button type="button" class="tilburg-combobox__chevron" aria-label="Toon opties" disabled>${chevronSvg}</button>
    </div>
    <ul id="cb-html-disabled-listbox" role="listbox" class="utrecht-listbox utrecht-combobox__popover utrecht-combobox__popover--hidden">
      <li id="cb-html-disabled-opt-0" role="option" class="utrecht-listbox__option" aria-selected="true">E-mail</li>
    </ul>
  </div>
</div>`,
  },
} satisfies Record<string, Example>;
