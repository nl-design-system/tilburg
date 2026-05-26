/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg form field description.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fform-field-description';

export const description = `Inline helper text rendered between a label and its input. Three modifier flavours: default, \`--invalid\` (error), \`--warning\`. Connect to the input via \`aria-describedby\` referencing the description's \`id\`.

## Usage

### Angular

\`\`\`html
<tilburg-form-field-description id="email-desc">
  We gebruiken dit alleen om je te bereiken.
</tilburg-form-field-description>
\`\`\`

Inputs: \`id\`, \`valid\`, \`invalid\`, \`warning\`, \`class\`.

### Plain HTML / CSS

\`\`\`html
<div id="email-desc" class="utrecht-form-field-description">
  We gebruiken dit alleen om je te bereiken.
</div>
\`\`\`
`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  default: {
    name: 'Default',
    html: `<div class="utrecht-form-field-description">We gebruiken dit alleen om je te bereiken.</div>`,
  },
  invalid: {
    name: 'Invalid (error)',
    html: `<div class="utrecht-form-field-description utrecht-form-field-description--invalid" role="alert">Vul een geldig e-mailadres in.</div>`,
  },
  warning: {
    name: 'Warning',
    html: `<div class="utrecht-form-field-description utrecht-form-field-description--warning">De aanvraagperiode sluit binnenkort.</div>`,
  },
} satisfies Record<string, Example>;
