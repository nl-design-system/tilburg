/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg form label.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fform-label';

const intro = `Label for a form control, themed with \`--tilburg-form-field-label-*\` tokens. Use the \`--checkbox\` / \`--radio\` modifiers on labels that sit next to those control types. An optional \`<span class="tilburg-form-label__optional">\` addon renders a muted "(optioneel)" hint.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-form-label for="email" type="text">
  E-mailadres
  <span class="tilburg-form-label__optional">(optioneel)</span>
</tilburg-form-label>
\`\`\`

Inputs: \`for\` (id of the associated input), \`type\` (\`'checkbox' | 'radio' | 'text'\`), \`disabled\`, \`checked\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<label class="utrecht-form-label" for="email">
  E-mailadres
  <span class="tilburg-form-label__optional">(optioneel)</span>
</label>
\`\`\``;

const usageReact = `### React

\`FormLabel\` renders a real \`<label>\`, so the association attribute is React's \`htmlFor\` — not \`for\`. The label text and the "(optioneel)" addon are ordinary children instead of Angular content projection.

\`\`\`tsx
import { Checkbox, FormLabel, Textbox } from '@gemeente-tilburg/components-react';
import { useState } from 'react';

export function ContactFields() {
  const [consent, setConsent] = useState(false);

  return (
    <>
      <FormLabel htmlFor="email" type="text">
        E-mailadres <span className="tilburg-form-label__optional">(optioneel)</span>
      </FormLabel>
      <Textbox id="email" name="email" type="email" placeholder="naam@voorbeeld.nl" />

      <FormLabel type="checkbox" checked={consent}>
        <Checkbox name="consent" checked={consent} onChange={(event) => setConsent(event.target.checked)} /> Ik ga
        akkoord met de voorwaarden
      </FormLabel>
    </>
  );
}
\`\`\`

Both association styles work: \`htmlFor\` pointing at the control's \`id\`, or wrapping the control in the label as children (shown above for the checkbox). \`checked\` and \`disabled\` only paint the label — they are presentational mirrors of the control's own state, so keep them in sync with whatever state drives the input.

The component is wrapped in \`forwardRef\` and forwards the ref to the \`<label>\`; every prop it does not consume is spread onto that element.

Props: \`type?: 'checkbox' | 'radio' | 'text'\` (adds \`utrecht-form-label--<type>\`; omit it for the unmodified label), \`checked?: boolean\`, \`disabled?: boolean\`, \`children\`, plus every native label attribute — \`htmlFor\`, \`id\`, \`className\`, \`aria-*\`, … \`FormLabelProps\` is exported as a type alias; the \`FormLabelType\` union is not re-exported from the package root, so type it as \`FormLabelProps['type']\` if you need it.`;

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

export const examples = {
  default: {
    name: 'Default',
    html: `<label class="utrecht-form-label" for="ex-default">Naam</label>`,
  },
  withOptional: {
    name: 'With optional addon',
    html: `<label class="utrecht-form-label" for="ex-optional">Telefoonnummer <span class="tilburg-form-label__optional">(optioneel)</span></label>`,
  },
  radioLabel: {
    name: 'Radio label (--radio modifier)',
    html: `<label class="utrecht-form-label utrecht-form-label--radio" for="ex-radio">E-mail</label>`,
  },
  checkboxLabel: {
    name: 'Checkbox label (--checkbox modifier)',
    html: `<label class="utrecht-form-label utrecht-form-label--checkbox" for="ex-checkbox">Ik ga akkoord met de voorwaarden</label>`,
  },
  disabled: {
    name: 'Disabled',
    html: `<label class="utrecht-form-label utrecht-form-label--disabled" for="ex-disabled">Burgerservicenummer</label>`,
  },
} satisfies Record<string, Example>;
