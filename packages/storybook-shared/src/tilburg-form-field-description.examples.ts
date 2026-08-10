/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg form field description.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fform-field-description';

const intro = `Inline helper text rendered between a label and its input. Three modifier flavours: default, \`--invalid\` (error), \`--warning\`. Connect to the input via \`aria-describedby\` referencing the description's \`id\`.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-form-field-description id="email-desc">
  We gebruiken dit alleen om je te bereiken.
</tilburg-form-field-description>
\`\`\`

Inputs: \`id\`, \`valid\`, \`invalid\`, \`warning\`, \`class\`.`;

const usageReact = `### React

\`\`\`tsx
import { FormFieldDescription, Textbox } from '@gemeente-tilburg/components-react';

export function EmailHint({ invalid }: { invalid: boolean }) {
  return (
    <>
      <Textbox id="email" type="email" invalid={invalid} aria-describedby="email-desc" />
      <FormFieldDescription id="email-desc" invalid={invalid}>
        {invalid ? 'Vul een geldig e-mailadres in.' : 'We gebruiken dit alleen om je te bereiken.'}
      </FormFieldDescription>
    </>
  );
}
\`\`\`

Props: \`invalid\`, \`valid\`, \`warning\`, plus any standard \`<div>\` attribute — \`id\` is a plain DOM attribute here, so wire it to the control's \`aria-describedby\` yourself. Setting \`invalid\` also adds \`role="alert"\`, so the message is announced when it appears; don't add a second live region around it. \`FormFieldDescriptionProps\` is exported as a type alias.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<div id="email-desc" class="utrecht-form-field-description">
  We gebruiken dit alleen om je te bereiken.
</div>
\`\`\``;

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
