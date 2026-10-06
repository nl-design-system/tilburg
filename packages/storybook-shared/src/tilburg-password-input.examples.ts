/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg password input. Imported by both the React storybook
   (`packages/storybook`) and the Angular storybook (`packages/storybook-angular`) so the HTML lives in one place. */

import { circleIcon } from './tilburg-validation-message.examples';

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fpassword-input';

/** The open eye (shown while the password is hidden) and the crossed-out eye (while it is visible). */
export const eyeIcon = `<svg class="tilburg-password-input__icon tilburg-password-input__icon--show" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
export const eyeOffIcon = `<svg class="tilburg-password-input__icon tilburg-password-input__icon--hide" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.1 9.1 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24"/><path d="M1 1l22 22"/></svg>`;

const intro = `**Tilburg component**: not based on an Utrecht component; its markup and CSS use the \`tilburg-*\` class set.

A textbox for a password, with a button that shows or hides what was typed (bq-tlb-frontend TIL-72). The button is a toggle button: it keeps the label "Wachtwoord tonen" and reports its state with \`aria-pressed\` (\`true\` = the password is visible), and a status line tells screen-reader users "Wachtwoord is zichtbaar." or "Wachtwoord is verborgen." after each click. The button is 44px wide (WCAG 2.5.8), has a visible focus ring, follows reduced motion and Windows high contrast, and Edge's own reveal eye is hidden so there is only one.

Use \`autocomplete="current-password"\` on a login form and \`autocomplete="new-password"\` when someone chooses a new password, so password managers fill in or suggest the right one.`;

const usageAngular = `### Angular

\`\`\`html
<label class="utrecht-form-label" for="wachtwoord">Wachtwoord</label>
<tilburg-password-input id="wachtwoord" [control]="form.controls.wachtwoord" autocomplete="current-password" />
\`\`\`

Inputs: \`id\`, \`name\`, \`control\` (\`FormControl\`), \`autocomplete\`, \`placeholder\`, \`disabled\`, \`invalid\`, \`required\`, \`ariaDescribedBy\`, and the texts \`toggleLabel\` ("Wachtwoord tonen"), \`statusShown\` ("Wachtwoord is zichtbaar."), \`statusHidden\` ("Wachtwoord is verborgen.").`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<label class="utrecht-form-label" for="wachtwoord">Wachtwoord</label>
<div class="tilburg-password-input" data-tilburg-password-input-enhance>
  <input
    id="wachtwoord"
    name="wachtwoord"
    type="password"
    autocomplete="current-password"
    class="utrecht-textbox utrecht-textbox--html-input utrecht-textbox--password"
  />
  <button type="button" class="tilburg-password-input__toggle" aria-pressed="false" aria-controls="wachtwoord" aria-label="Wachtwoord tonen">
    <!-- the open eye (…__icon--show) and the crossed-out eye (…__icon--hide), both aria-hidden -->
  </button>
  <span class="tilburg-password-input__status" aria-live="polite"></span>
</div>

<script type="module">
  import { enhancePasswordInput } from "@gemeente-tilburg/components-css/password-input/index.js";
  enhancePasswordInput();
</script>
\`\`\`

The script switches the input type, \`aria-pressed\` and the status line; translate the status line with \`data-status-shown\` / \`data-status-hidden\` on the wrapper.`;

const usageReact = `### React

\`\`\`tsx
import { FormLabel, PasswordInput } from '@gemeente-tilburg/components-react';

export const Wachtwoord = () => (
  <>
    <FormLabel htmlFor="wachtwoord">Wachtwoord</FormLabel>
    <PasswordInput id="wachtwoord" name="wachtwoord" autoComplete="current-password" required />
  </>
);
\`\`\`

\`PasswordInput\` takes the same props as \`Textbox\` (every native input attribute, \`invalid\`, a forwarded ref to the \`<input>\`), minus \`type\`, plus the texts \`toggleLabel\`, \`statusShown\` and \`statusHidden\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<label class="utrecht-form-label" for="wachtwoord">Wachtwoord</label>
<tilburg-wbc-password-input id="wachtwoord" name="wachtwoord" autocomplete="current-password" required></tilburg-wbc-password-input>
\`\`\`

The real \`<input>\` is rendered in light DOM, so it takes part in the surrounding \`<form>\` and \`<label for>\` natively. Attributes: \`name\`, \`value\` (kept in sync), \`autocomplete\`, \`placeholder\`, \`disabled\`, \`invalid\`, \`required\`, and the texts \`toggle-label\`, \`status-shown\`, \`status-hidden\`. \`id\`, \`aria-describedby\` and \`aria-labelledby\` are moved from the host onto the inner \`<input>\`.`;

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

export const descriptionWebComponents = `${intro}

## Usage

${usageWebComponents}

${usagePlainHtml}
`;

export const descriptionHtml = `${intro}

## Usage

${usagePlainHtml}
`;

const rowStyle = 'display:flex;flex-direction:column;gap:0.25rem;max-width:24rem';

const field = ({
  id,
  autocomplete = 'current-password',
  extraInput = '',
  extraButton = '',
  after = '',
}: {
  id: string;
  autocomplete?: string;
  extraInput?: string;
  extraButton?: string;
  after?: string;
}) => `<div class="tilburg-password-input" data-tilburg-password-input-enhance>
    <input id="${id}" name="wachtwoord" type="password" autocomplete="${autocomplete}" class="utrecht-textbox utrecht-textbox--html-input utrecht-textbox--password"${extraInput} />
    <button type="button" class="tilburg-password-input__toggle" aria-pressed="false" aria-controls="${id}" aria-label="Wachtwoord tonen"${extraButton}>
      ${eyeIcon}
      ${eyeOffIcon}
    </button>
    <span class="tilburg-password-input__status" aria-live="polite"></span>
  </div>${after}`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  default: {
    name: 'Default',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" for="pw-default">Wachtwoord</label>
  ${field({ id: 'pw-default' })}
</div>`,
  },
  withDescription: {
    name: 'With a description',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" for="pw-new">Nieuw wachtwoord</label>
  <div class="utrecht-form-field-description" id="pw-new-description">Minimaal 12 tekens.</div>
  ${field({ id: 'pw-new', autocomplete: 'new-password', extraInput: ' aria-describedby="pw-new-description"' })}
</div>`,
  },
  invalid: {
    name: 'Invalid',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" for="pw-invalid">Wachtwoord</label>
  ${field({
    id: 'pw-invalid',
    extraInput: ' aria-invalid="true" aria-describedby="pw-invalid-error" required',
    after: `
  <div id="pw-invalid-error" class="tilburg-validation-message tilburg-validation-message--error utrecht-form-field-error-message" role="alert">
    <span class="tilburg-validation-message__icon" aria-hidden="true">${circleIcon}</span>
    <span>Vul uw wachtwoord in.</span>
  </div>`,
  })}
</div>`,
  },
  disabled: {
    name: 'Disabled',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" for="pw-disabled">Wachtwoord</label>
  ${field({ id: 'pw-disabled', extraInput: ' value="geheim123" disabled', extraButton: ' disabled' })}
</div>`,
  },
} satisfies Record<string, Example>;

/** Control descriptions, shared by the React, Web Components and Angular stories so the props tables agree. */
export const argDescriptions = {
  name: 'Name of the field in the submitted form data.',
  autocomplete:
    '`current-password` on a login form, `new-password` when choosing a new one, so password managers fill in or suggest the right password.',
  placeholder: 'Placeholder text. Do not use it for instructions: put those in a form field description.',
  disabled: 'Disables the textbox and the show/hide button.',
  invalid:
    'Shows the error state and sets `aria-invalid="true"`. Show the error text next to it and link it with `aria-describedby`.',
  required: 'A password is required.',
  toggleLabel: 'Accessible name of the show/hide button. It stays the same; `aria-pressed` reports the state.',
  statusShown: 'Read out by screen readers after the password is shown.',
  statusHidden: 'Read out by screen readers after the password is hidden.',
};

export const autocompleteOptions = ['current-password', 'new-password', 'off'];
