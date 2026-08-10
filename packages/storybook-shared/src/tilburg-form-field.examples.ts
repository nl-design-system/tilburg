/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg form field. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fform-field';

const intro = `Form field grouping a label, description, and control. The Tilburg layer adds a \`tilburg-warning\` modifier that colours the field with the warning palette (used for non-blocking advisory messages).`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-form-field type="text" [invalid]="emailCtrl.invalid && emailCtrl.touched" [warning]="aboutToExpire">
  <label class="utrecht-form-label" for="email">E-mailadres</label>
  <tilburg-textbox id="email" [control]="emailCtrl" />
  <tilburg-validation-message *ngIf="emailCtrl.invalid && emailCtrl.touched" type="error">
    Vul een geldig e-mailadres in.
  </tilburg-validation-message>
</tilburg-form-field>
\`\`\`

Inputs: \`invalid\`, \`warning\`, \`type\` (\`'checkbox' | 'radio' | 'text'\`), \`class\`.`;

const usageReact = `### React

\`FormField\` is a plain wrapper: it renders the \`<div class="utrecht-form-field">\` and its modifier classes, and you compose the label, description, control, and validation message as children.

\`\`\`tsx
import {
  FormField,
  FormFieldDescription,
  FormLabel,
  Textbox,
  ValidationMessage,
} from '@gemeente-tilburg/components-react';

export function EmailField({ invalid, aboutToExpire }: { invalid: boolean; aboutToExpire: boolean }) {
  return (
    <FormField type="text" invalid={invalid} warning={aboutToExpire}>
      <FormLabel htmlFor="email">E-mailadres</FormLabel>
      <FormFieldDescription id="email-desc">We gebruiken dit alleen om je te bereiken.</FormFieldDescription>
      <Textbox id="email" type="email" invalid={invalid} aria-describedby="email-desc" />
      {invalid && <ValidationMessage type="error">Vul een geldig e-mailadres in.</ValidationMessage>}
    </FormField>
  );
}
\`\`\`

Props: \`invalid\`, \`warning\`, \`type\` (\`'checkbox' | 'radio' | 'text'\`), plus any standard \`<div>\` attribute (\`className\`, \`id\`, …) — \`className\` is merged with the utrecht classes, it does not replace them. \`FormFieldProps\` and \`FormFieldType\` are exported as type aliases.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<!-- Standard invalid -->
<div class="utrecht-form-field utrecht-form-field--text utrecht-form-field--invalid">
  …
</div>

<!-- Tilburg warning -->
<div class="utrecht-form-field utrecht-form-field--text utrecht-form-field--invalid tilburg-warning">
  …
</div>
\`\`\`

Adding \`tilburg-warning\` on top of \`utrecht-form-field--invalid\` swaps the invalid colour set for the warning palette.`;

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

const triangleIcon = `<svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1 1 19h18L10 1Zm0 5 1 7h-2l1-7Zm0 9a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"/></svg>`;
const circleIcon = `<svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm1 13H9v-2h2v2Zm0-4H9V5h2v5Z"/></svg>`;

export const examples = {
  default: {
    name: 'Default',
    html: `<div class="utrecht-form-field utrecht-form-field--text" style="max-width:24rem">
  <label class="utrecht-form-label" for="ff-default">E-mailadres</label>
  <div class="utrecht-form-field-description">We gebruiken dit alleen om je te bereiken.</div>
  <input id="ff-default" type="email" class="utrecht-textbox utrecht-textbox--html-input" placeholder="naam@voorbeeld.nl" />
</div>`,
  },
  invalid: {
    name: 'Invalid',
    html: `<div class="utrecht-form-field utrecht-form-field--text utrecht-form-field--invalid" style="max-width:24rem">
  <label class="utrecht-form-label utrecht-form-label--invalid" for="ff-invalid">E-mailadres</label>
  <input id="ff-invalid" type="email" class="utrecht-textbox utrecht-textbox--html-input utrecht-textbox--invalid" value="niet-geldig" aria-invalid="true" aria-describedby="ff-invalid-error" />
  <div id="ff-invalid-error" class="tilburg-validation-message tilburg-validation-message--error utrecht-form-field-error-message" role="alert" aria-live="polite">
    <span class="tilburg-validation-message__icon" aria-hidden="true">${circleIcon}</span>
    <span>Vul een geldig e-mailadres in.</span>
  </div>
</div>`,
  },
  warning: {
    name: 'Warning (Tilburg modifier)',
    html: `<div class="utrecht-form-field utrecht-form-field--text utrecht-form-field--invalid tilburg-warning" style="max-width:24rem">
  <label class="utrecht-form-label" for="ff-warning">Aanvraagdatum</label>
  <input id="ff-warning" type="text" class="utrecht-textbox utrecht-textbox--html-input utrecht-textbox--invalid" value="2026-05-31" aria-describedby="ff-warning-msg" />
  <div id="ff-warning-msg" class="tilburg-validation-message tilburg-validation-message--warning utrecht-form-field-description utrecht-form-field-description--warning" role="alert" aria-live="polite">
    <span class="tilburg-validation-message__icon" aria-hidden="true">${triangleIcon}</span>
    <span>De aanvraagperiode sluit binnenkort.</span>
  </div>
</div>`,
  },
  disabled: {
    name: 'Disabled',
    html: `<div class="utrecht-form-field utrecht-form-field--text utrecht-form-field--disabled" style="max-width:24rem">
  <label class="utrecht-form-label utrecht-form-label--disabled" for="ff-disabled">Burgerservicenummer</label>
  <input id="ff-disabled" type="text" class="utrecht-textbox utrecht-textbox--html-input" value="123456789" disabled />
</div>`,
  },
} satisfies Record<string, Example>;
