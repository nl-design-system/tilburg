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

\`Checkbox\` renders a bare \`<input type="checkbox">\` — there is no form-state abstraction layered on top of it. Drive it the ordinary React way: \`checked\` + \`onChange\` for a controlled checkbox, or \`defaultChecked\` for an uncontrolled one.

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

The component is wrapped in \`forwardRef\` and forwards the ref to the underlying \`<input>\`, and every prop it does not consume itself is spread onto that input. That ref is the integration point for react-hook-form's \`register()\`, Formik's \`getFieldProps()\`, or a manual \`.focus()\`, so \`{...register('consent')}\` or \`{...getFieldProps('consent')}\` can be spread straight onto it.

Accessibility is wired with the plain DOM attributes — \`aria-label\`, \`aria-describedby\` — and change notifications come from \`onChange\`, where you read \`event.target.checked\`.

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

export const descriptionHtml = `${intro}

## Usage

${usagePlainHtml}
`;

export interface Example {
  name: string;
  html: string;
}

/* The row layout (flex, gap, vertical rhythm) comes from
   `.utrecht-form-label--checkbox:has(> .utrecht-checkbox)` in
   `packages/components-css/checkbox/index.scss`, so the reference markup carries
   no inline styles: a label that wraps its own control is the canonical
   structure and is exactly what the React `<FormLabel type="checkbox">` renders. */
const baseClasses = 'utrecht-checkbox utrecht-checkbox--html-input utrecht-checkbox--custom';
const labelClasses = 'utrecht-form-label utrecht-form-label--checkbox';

export const examples = {
  unchecked: {
    name: 'Unchecked',
    html: `<label class="${labelClasses}" for="cb-unchecked">
  <input id="cb-unchecked" type="checkbox" class="${baseClasses}" />
  Ik ga akkoord met de voorwaarden
</label>`,
  },
  checked: {
    name: 'Checked',
    html: `<label class="${labelClasses}" for="cb-checked">
  <input id="cb-checked" type="checkbox" class="${baseClasses}" checked />
  Ik ga akkoord met de voorwaarden
</label>`,
  },
  invalid: {
    name: 'Invalid',
    html: `<label class="${labelClasses}" for="cb-invalid">
  <input id="cb-invalid" type="checkbox" class="${baseClasses}" required aria-invalid="true" />
  Verplicht akkoord
</label>`,
  },
  disabled: {
    name: 'Disabled',
    html: `<label class="${labelClasses}" for="cb-disabled">
  <input id="cb-disabled" type="checkbox" class="${baseClasses}" disabled />
  Disabled (unchecked)
</label>
<label class="${labelClasses}" for="cb-disabled-checked">
  <input id="cb-disabled-checked" type="checkbox" class="${baseClasses}" checked disabled />
  Disabled (checked)
</label>`,
  },
} satisfies Record<string, Example>;
