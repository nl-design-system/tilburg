/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg textarea. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Ftextarea';

const intro = `Multi-line text input. Tilburg layer enforces minimum block/inline size and adds hover + focus-visible rules.`;

const usageAngular = `### Angular

\`\`\`html
<label class="utrecht-form-label" for="explanation">Toelichting</label>
<tilburg-textarea
  id="explanation"
  [control]="form.controls.explanation"
  placeholder="Schrijf hier je toelichting…"
  [rows]="4"
  [required]="true"
/>
\`\`\`

Inputs: \`id\`, \`control\` (\`FormControl\`), \`placeholder\`, \`rows\`, \`cols\`, \`dir\`, \`disabled\`, \`invalid\`, \`required\`, \`readonly\`, \`ariaLabel\`, \`ariaDescribedBy\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<label class="utrecht-form-label" for="explanation">Toelichting</label>
<textarea id="explanation" class="utrecht-textarea utrecht-textarea--html-textarea" placeholder="Schrijf hier je toelichting…"></textarea>
\`\`\``;

const usageReact = `### React

\`Textarea\` is a styled \`<textarea>\`. Bind it like any React field: \`value\` + \`onChange\` for a controlled field, or \`defaultValue\` for an uncontrolled one.

\`\`\`tsx
import { FormLabel, Textarea } from '@gemeente-tilburg/components-react';
import { useState } from 'react';

export function ExplanationField() {
  const [explanation, setExplanation] = useState('');

  return (
    <>
      <FormLabel htmlFor="explanation">Toelichting</FormLabel>
      <Textarea
        id="explanation"
        name="explanation"
        value={explanation}
        onChange={(event) => setExplanation(event.target.value)}
        placeholder="Schrijf hier je toelichting…"
        rows={4}
        required
        aria-describedby="explanation-hint"
      />
      <span id="explanation-hint">Maximaal 500 tekens.</span>
    </>
  );
}
\`\`\`

The component is wrapped in \`forwardRef\` and forwards the ref to the \`<textarea>\`, spreading every prop it does not consume onto it — so \`{...register('explanation')}\` from react-hook-form, Formik's \`getFieldProps()\`, or a manual \`.focus()\` all work without extra wiring.

Two React-specific rules: the initial text goes in \`value\` / \`defaultValue\`, never as children (unlike the plain-HTML \`<textarea>…</textarea>\`), and note the casing — the prop is \`readOnly\`, not \`readonly\`.

Props: \`invalid?: boolean\` (adds \`aria-invalid="true"\` and \`utrecht-textarea--invalid\`), plus every native textarea attribute — \`value\`, \`defaultValue\`, \`onChange\`, \`name\`, \`id\`, \`placeholder\`, \`rows\`, \`cols\`, \`dir\`, \`required\`, \`readOnly\`, \`disabled\`, \`className\`, \`aria-*\`, … \`TextareaProps\` is exported as a type alias.`;

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

const rowStyle = 'display:flex;flex-direction:column;gap:1rem;max-width:32rem';
const labelStyle = 'display:block;font-weight:700;margin-bottom:0.25rem';

export const examples = {
  default: {
    name: 'Default',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="ta-default">Toelichting</label>
  <textarea id="ta-default" class="utrecht-textarea utrecht-textarea--html-textarea" placeholder="Schrijf hier je toelichting…"></textarea>
</div>`,
  },
  filled: {
    name: 'With value',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="ta-filled">Toelichting</label>
  <textarea id="ta-filled" class="utrecht-textarea utrecht-textarea--html-textarea">Ik wil graag een afspraak maken voor de aanvraag van een nieuwe vergunning.</textarea>
</div>`,
  },
  invalid: {
    name: 'Invalid',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="ta-invalid">Toelichting</label>
  <textarea id="ta-invalid" class="utrecht-textarea utrecht-textarea--html-textarea" aria-invalid="true">ongeldige inhoud</textarea>
</div>`,
  },
  disabled: {
    name: 'Disabled',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="ta-disabled">Toelichting</label>
  <textarea id="ta-disabled" class="utrecht-textarea utrecht-textarea--html-textarea" disabled>Deze toelichting kan niet bewerkt worden.</textarea>
</div>`,
  },
} satisfies Record<string, Example>;
