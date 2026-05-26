/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg radio button. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fradio-button';

export const description = `Radio button with Tilburg-specific focus, hover, active, and checked states layered on top of \`.utrecht-radio-button\`.

## Usage

### Angular

\`\`\`html
<fieldset>
  <legend class="utrecht-form-label utrecht-form-label--radio">Hoe wil je je aanvraag ontvangen?</legend>

  <tilburg-radio-button id="rb-email" name="delivery" value="email" [control]="form.controls.delivery" />
  <label class="utrecht-form-label utrecht-form-label--radio" for="rb-email">E-mail</label>

  <tilburg-radio-button id="rb-post" name="delivery" value="post" [control]="form.controls.delivery" />
  <label class="utrecht-form-label utrecht-form-label--radio" for="rb-post">Per post</label>
</fieldset>
\`\`\`

Inputs: \`id\`, \`name\`, \`value\`, \`control\` (\`FormControl\`), \`ariaLabel\`, \`ariaDescribedBy\`, \`invalid\`, \`required\`, \`disabled\`, \`checked\`.

### Plain HTML / CSS

\`\`\`html
<input
  id="rb-email"
  type="radio"
  name="delivery"
  value="email"
  class="utrecht-radio-button utrecht-radio-button--html-input"
  checked
/>
<label class="utrecht-form-label utrecht-form-label--radio" for="rb-email">E-mail</label>
\`\`\`
`;

export interface Example {
  name: string;
  html: string;
}

const rowStyle = 'align-items:center;display:flex;gap:0.5rem;margin-block-end:0.5rem';
const fieldsetStyle = 'border:0;padding:0';
const baseClasses = 'utrecht-radio-button utrecht-radio-button--html-input';

export const examples = {
  group: {
    name: 'Group (one checked)',
    html: `<fieldset style="${fieldsetStyle}">
  <legend class="utrecht-form-label utrecht-form-label--radio">Hoe wil je je aanvraag ontvangen?</legend>
  <div style="${rowStyle}">
    <input id="rb-email" type="radio" name="delivery" value="email" class="${baseClasses}" checked />
    <label class="utrecht-form-label utrecht-form-label--radio" for="rb-email">E-mail</label>
  </div>
  <div style="${rowStyle}">
    <input id="rb-post" type="radio" name="delivery" value="post" class="${baseClasses}" />
    <label class="utrecht-form-label utrecht-form-label--radio" for="rb-post">Per post</label>
  </div>
  <div style="${rowStyle}">
    <input id="rb-pickup" type="radio" name="delivery" value="pickup" class="${baseClasses}" />
    <label class="utrecht-form-label utrecht-form-label--radio" for="rb-pickup">Ophalen bij de balie</label>
  </div>
</fieldset>`,
  },
  disabled: {
    name: 'Disabled options',
    html: `<fieldset style="${fieldsetStyle}">
  <legend class="utrecht-form-label utrecht-form-label--radio">Niet beschikbaar</legend>
  <div style="${rowStyle}">
    <input id="rb-d1" type="radio" name="disabled" value="a" class="${baseClasses}" disabled />
    <label class="utrecht-form-label utrecht-form-label--radio" for="rb-d1">Disabled (unchecked)</label>
  </div>
  <div style="${rowStyle}">
    <input id="rb-d2" type="radio" name="disabled" value="b" class="${baseClasses}" checked disabled />
    <label class="utrecht-form-label utrecht-form-label--radio" for="rb-d2">Disabled (checked)</label>
  </div>
</fieldset>`,
  },
} satisfies Record<string, Example>;
