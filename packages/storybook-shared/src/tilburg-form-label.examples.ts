/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg form label.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fform-label';

export const description = `Label for a form control, themed with \`--tilburg-form-field-label-*\` tokens. Use the \`--checkbox\` / \`--radio\` modifiers on labels that sit next to those control types. An optional \`<span class="tilburg-form-label__optional">\` addon renders a muted "(optioneel)" hint.

## Usage

### Angular

\`\`\`html
<tilburg-form-label for="email" type="text">
  E-mailadres
  <span class="tilburg-form-label__optional">(optioneel)</span>
</tilburg-form-label>
\`\`\`

Inputs: \`for\` (id of the associated input), \`type\` (\`'checkbox' | 'radio' | 'text'\`), \`disabled\`, \`checked\`.

### Plain HTML / CSS

\`\`\`html
<label class="utrecht-form-label" for="email">
  E-mailadres
  <span class="tilburg-form-label__optional">(optioneel)</span>
</label>
\`\`\`
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
