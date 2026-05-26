/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg textbox. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`) so the HTML lives in one place. Each
   storybook's `tilburg-textbox.stories.*` file is a thin renderer wrapper
   around the strings below. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Ftextbox';

export const description = `Single-line text input. Tilburg layer adds hover and focus-visible rules on top of utrecht-textbox.

## Usage

### Angular

\`\`\`html
<label class="utrecht-form-label" for="email">E-mailadres</label>
<tilburg-textbox
  id="email"
  type="email"
  [control]="form.controls.email"
  placeholder="naam@voorbeeld.nl"
  [required]="true"
/>
\`\`\`

Inputs: \`id\`, \`control\` (\`FormControl\`), \`type\`, \`name\`, \`placeholder\`, \`dir\`, \`inputMode\`, \`disabled\`, \`invalid\`, \`required\`, \`readonly\`, \`ariaLabel\`, \`ariaDescribedBy\`.

### Plain HTML / CSS

\`\`\`html
<label class="utrecht-form-label" for="email">E-mailadres</label>
<input
  id="email"
  type="email"
  class="utrecht-textbox utrecht-textbox--html-input"
  placeholder="naam@voorbeeld.nl"
/>
\`\`\`
`;

const rowStyle = 'display:flex;flex-direction:column;gap:1rem;max-width:24rem';
const labelStyle = 'display:block;font-weight:700;margin-bottom:0.25rem';

export interface Example {
  name: string;
  html: string;
}

/* Each named export is one story. Using a typed object literal (not a
   `Record<string, Example>`) so consumers' strict TS settings —
   `noPropertyAccessFromIndexSignature` in particular — still allow dot
   access (`examples.default.html` instead of `examples['default'].html`). */
export const examples = {
  default: {
    name: 'Default',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="tb-default">E-mailadres</label>
  <input id="tb-default" type="text" class="utrecht-textbox utrecht-textbox--html-input" placeholder="naam@voorbeeld.nl" />
</div>`,
  },
  filled: {
    name: 'With value',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="tb-filled">Voornaam</label>
  <input id="tb-filled" type="text" class="utrecht-textbox utrecht-textbox--html-input" value="Jan" />
</div>`,
  },
  invalid: {
    name: 'Invalid',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="tb-invalid">E-mailadres</label>
  <input id="tb-invalid" type="email" class="utrecht-textbox utrecht-textbox--html-input" value="niet-geldig" aria-invalid="true" />
</div>`,
  },
  disabled: {
    name: 'Disabled',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="tb-disabled">Burgerservicenummer</label>
  <input id="tb-disabled" type="text" class="utrecht-textbox utrecht-textbox--html-input" value="123456789" disabled />
</div>`,
  },
} satisfies Record<string, Example>;
