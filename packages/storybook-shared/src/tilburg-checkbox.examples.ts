/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg checkbox. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fcheckbox';

export const description = `Custom-styled checkbox built on \`.utrecht-checkbox--custom\`. Tilburg layer adds invalid-state background, focus-visible borders, and the inline SVG check mark on the focused-checked state.

## Usage

### Angular

\`\`\`html
<tilburg-checkbox
  id="consent"
  name="consent"
  [control]="form.controls.consent"
  ariaLabel="Ik ga akkoord met de voorwaarden"
  [required]="true"
  [invalid]="form.controls.consent.invalid && form.controls.consent.touched"
  (checkChanged)="onChange($event)"
/>
\`\`\`

Inputs: \`id\`, \`control\` (\`FormControl\`), \`name\`, \`ariaLabel\`, \`ariaDescribedBy\`, \`invalid\`, \`required\`, \`disabled\`, \`checked\`. Output: \`(checkChanged)\`.

### Plain HTML / CSS

\`\`\`html
<input
  id="consent"
  type="checkbox"
  class="utrecht-checkbox utrecht-checkbox--html-input utrecht-checkbox--custom"
  required
/>
<label class="utrecht-form-label" for="consent">Ik ga akkoord met de voorwaarden</label>
\`\`\`
`;

export interface Example {
  name: string;
  html: string;
}

const rowStyle = 'align-items:center;display:flex;gap:0.5rem;margin-block-end:0.5rem';
const baseClasses = 'utrecht-checkbox utrecht-checkbox--html-input utrecht-checkbox--custom';

export const examples = {
  unchecked: {
    name: 'Unchecked',
    html: `<div style="${rowStyle}">
  <input id="cb-unchecked" type="checkbox" class="${baseClasses}" />
  <label class="utrecht-form-label" for="cb-unchecked">Ik ga akkoord met de voorwaarden</label>
</div>`,
  },
  checked: {
    name: 'Checked',
    html: `<div style="${rowStyle}">
  <input id="cb-checked" type="checkbox" class="${baseClasses}" checked />
  <label class="utrecht-form-label" for="cb-checked">Ik ga akkoord met de voorwaarden</label>
</div>`,
  },
  invalid: {
    name: 'Invalid',
    html: `<div style="${rowStyle}">
  <input id="cb-invalid" type="checkbox" class="${baseClasses}" required aria-invalid="true" />
  <label class="utrecht-form-label" for="cb-invalid">Verplicht akkoord</label>
</div>`,
  },
  disabled: {
    name: 'Disabled',
    html: `<div style="${rowStyle}">
  <input id="cb-disabled" type="checkbox" class="${baseClasses}" disabled />
  <label class="utrecht-form-label" for="cb-disabled">Disabled (unchecked)</label>
</div>
<div style="${rowStyle}">
  <input id="cb-disabled-checked" type="checkbox" class="${baseClasses}" checked disabled />
  <label class="utrecht-form-label" for="cb-disabled-checked">Disabled (checked)</label>
</div>`,
  },
} satisfies Record<string, Example>;
