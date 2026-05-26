/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg validation message.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fvalidation-message';

export const description = `Inline validation message shown alongside a form field. Variant modifiers \`--error\` and \`--warning\` colour the icon.

## Usage

### Angular

\`\`\`html
<tilburg-validation-message *ngIf="emailCtrl.invalid && emailCtrl.touched" type="error">
  Vul een geldig e-mailadres in.
</tilburg-validation-message>

<tilburg-validation-message type="warning">
  De aanvraagperiode sluit binnenkort.
</tilburg-validation-message>
\`\`\`

Inputs: \`type\` (\`'error' | 'warning'\`, default \`'error'\`), \`ariaLive\` (\`'polite' | 'assertive' | 'off'\`, default \`'polite'\`).

### Plain HTML / CSS

\`\`\`html
<div
  class="tilburg-validation-message tilburg-validation-message--error utrecht-form-field-error-message"
  role="alert"
  aria-live="polite"
>
  <span class="tilburg-validation-message__icon" aria-hidden="true">
    <svg><!-- icon --></svg>
  </span>
  <span>Vul een geldig e-mailadres in.</span>
</div>
\`\`\`
`;

export interface Example {
  name: string;
  html: string;
}

const circleIcon = `<svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm1 13H9v-2h2v2Zm0-4H9V5h2v5Z" /></svg>`;
const triangleIcon = `<svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1 1 19h18L10 1Zm0 5 1 7h-2l1-7Zm0 9a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" /></svg>`;

export const examples = {
  error: {
    name: 'Error',
    html: `<div class="tilburg-validation-message tilburg-validation-message--error utrecht-form-field-error-message" role="alert" aria-live="polite">
  <span class="tilburg-validation-message__icon" aria-hidden="true">${circleIcon}</span>
  <span>Vul een geldig e-mailadres in.</span>
</div>`,
  },
  warning: {
    name: 'Warning',
    html: `<div class="tilburg-validation-message tilburg-validation-message--warning utrecht-form-field-description utrecht-form-field-description--warning" role="alert" aria-live="polite">
  <span class="tilburg-validation-message__icon" aria-hidden="true">${triangleIcon}</span>
  <span>De aanvraagperiode sluit binnenkort.</span>
</div>`,
  },
} satisfies Record<string, Example>;
