/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg checkbox. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fcheckbox';

const intro = `Custom-styled checkbox built on \`.utrecht-checkbox--custom\`. Tilburg layer adds invalid-state background, focus-visible borders, and the inline SVG check mark on the focused-checked state.`;

const usageAngular = `### Angular

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

Inputs: \`id\`, \`control\` (\`FormControl\`), \`name\`, \`ariaLabel\`, \`ariaDescribedBy\`, \`invalid\`, \`required\`, \`disabled\`, \`checked\`. Output: \`(checkChanged)\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<input
  id="consent"
  type="checkbox"
  class="utrecht-checkbox utrecht-checkbox--html-input utrecht-checkbox--custom"
  required
/>
<label class="utrecht-form-label" for="consent">Ik ga akkoord met de voorwaarden</label>
\`\`\``;

const usageReact = `### React

\`Checkbox\` renders a bare \`<input type="checkbox">\` — there is no reactive-forms layer, so nothing corresponds to Angular's \`[control]\`. Drive it the ordinary React way: \`checked\` + \`onChange\` for a controlled checkbox, or \`defaultChecked\` for an uncontrolled one.

\`\`\`tsx
import { Checkbox, FormLabel } from '@gemeente-tilburg/components-react';
import { useState } from 'react';

export function ConsentField() {
  const [consent, setConsent] = useState(false);
  const invalid = !consent;

  return (
    <>
      <FormLabel type="checkbox" checked={consent}>
        <Checkbox
          id="consent"
          name="consent"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          required
          invalid={invalid}
          aria-describedby="consent-error"
        />{' '}
        Ik ga akkoord met de voorwaarden
      </FormLabel>
      {invalid && <span id="consent-error">Je moet akkoord gaan voordat je verder kunt.</span>}
    </>
  );
}
\`\`\`

The component is wrapped in \`forwardRef\` and forwards the ref to the underlying \`<input>\`, and every prop it does not consume itself is spread onto that input. That ref is the integration point for react-hook-form's \`register()\`, Formik's \`getFieldProps()\`, or a manual \`.focus()\` — it is what takes the place of Angular's \`[control]\` / \`[(ngModel)]\` binding.

Instead of \`ariaLabel\` / \`ariaDescribedBy\` you write the DOM attributes directly: \`aria-label\`, \`aria-describedby\`. There is no \`(checkChanged)\` output; use \`onChange\` and read \`event.target.checked\`.

Props: \`invalid?: boolean\` (adds \`aria-invalid="true"\` and \`utrecht-checkbox--invalid\`), \`indeterminate?: boolean\` (default \`false\`; sets the DOM \`indeterminate\` flag plus \`aria-checked="mixed"\` and \`utrecht-checkbox--indeterminate\`), plus every native input attribute except \`type\` (fixed to \`"checkbox"\`) — \`checked\`, \`defaultChecked\`, \`onChange\`, \`name\`, \`id\`, \`required\`, \`disabled\`, \`className\`, \`aria-*\`, … \`CheckboxProps\` is exported as a type alias.`;

export const description = `${intro}

## Usage

${usageAngular}

${usagePlainHtml}
`;

export const descriptionReact = `${intro}

## Usage

${usageReact}

${usagePlainHtml}
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
