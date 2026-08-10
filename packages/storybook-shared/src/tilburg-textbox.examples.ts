/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg textbox. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`) so the HTML lives in one place. Each
   storybook's `tilburg-textbox.stories.*` file is a thin renderer wrapper
   around the strings below. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Ftextbox';

const intro = `Single-line text input. Tilburg layer adds hover and focus-visible rules on top of utrecht-textbox.`;

const usageAngular = `### Angular

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

Inputs: \`id\`, \`control\` (\`FormControl\`), \`type\`, \`name\`, \`placeholder\`, \`dir\`, \`inputMode\`, \`disabled\`, \`invalid\`, \`required\`, \`readonly\`, \`ariaLabel\`, \`ariaDescribedBy\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<label class="utrecht-form-label" for="email">E-mailadres</label>
<input
  id="email"
  type="email"
  class="utrecht-textbox utrecht-textbox--html-input"
  placeholder="naam@voorbeeld.nl"
/>
\`\`\``;

const usageReact = `### React

\`Textbox\` is a styled \`<input>\` and nothing more — bind it like any React input: \`value\` + \`onChange\` when controlled, \`defaultValue\` when uncontrolled.

\`\`\`tsx
import { FormLabel, Textbox } from '@gemeente-tilburg/components-react';
import { useState } from 'react';

export function EmailField() {
  const [email, setEmail] = useState('');
  const invalid = email.length > 0 && !email.includes('@');

  return (
    <>
      <FormLabel htmlFor="email">E-mailadres</FormLabel>
      <Textbox
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="naam@voorbeeld.nl"
        required
        invalid={invalid}
        aria-describedby="email-hint"
      />
      <span id="email-hint">We gebruiken je e-mailadres alleen voor deze aanvraag.</span>
    </>
  );
}
\`\`\`

The component is wrapped in \`forwardRef\` and forwards the ref to the \`<input>\`, and everything it does not consume itself is spread onto that input. Spreading \`{...register('email')}\` from react-hook-form (or Formik's \`getFieldProps('email')\`) therefore just works, with no extra binding layer in between.

Watch the naming: the prop is \`readOnly\` (camel case), and the ARIA hooks are written as the DOM attributes \`aria-label\` / \`aria-describedby\`.

Props: \`invalid?: boolean\` (adds \`aria-invalid="true"\` and \`utrecht-textbox--invalid\`), plus every native input attribute — \`type\` (default \`'text'\`), \`value\`, \`defaultValue\`, \`onChange\`, \`name\`, \`id\`, \`placeholder\`, \`dir\`, \`inputMode\`, \`required\`, \`readOnly\`, \`disabled\`, \`className\`, \`aria-*\`, … \`TextboxProps\` is exported as a type alias.`;

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
