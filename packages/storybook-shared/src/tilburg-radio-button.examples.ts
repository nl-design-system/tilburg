/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg radio button. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fradio-button';

const intro = `Radio button with Tilburg-specific focus, hover, active, and checked states layered on top of \`.utrecht-radio-button\`.`;

const usageAngular = `### Angular

\`\`\`html
<fieldset>
  <legend class="utrecht-form-label utrecht-form-label--radio">Hoe wil je je aanvraag ontvangen?</legend>

  <tilburg-radio-button id="rb-email" name="delivery" value="email" [control]="form.controls.delivery" />
  <label class="utrecht-form-label utrecht-form-label--radio" for="rb-email">E-mail</label>

  <tilburg-radio-button id="rb-post" name="delivery" value="post" [control]="form.controls.delivery" />
  <label class="utrecht-form-label utrecht-form-label--radio" for="rb-post">Per post</label>
</fieldset>
\`\`\`

Inputs: \`id\`, \`name\`, \`value\`, \`control\` (\`FormControl\`), \`ariaLabel\`, \`ariaDescribedBy\`, \`invalid\`, \`required\`, \`disabled\`, \`checked\`.`;

const usagePlainHtml = `### Plain HTML / CSS

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
\`\`\``;

const usageReact = `### React

\`RadioButton\` renders a bare \`<input type="radio">\`. There is no \`[control]\` input — the selected value of a group is ordinary React state that you compare against each button's \`value\`, and a single shared \`onChange\` handler writes it back.

\`\`\`tsx
import { Fieldset, FormLabel, RadioButton } from '@gemeente-tilburg/components-react';
import { ChangeEvent, useState } from 'react';

export function DeliveryField() {
  const [delivery, setDelivery] = useState('email');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setDelivery(event.target.value);

  return (
    <Fieldset>
      <legend className="utrecht-form-label utrecht-form-label--radio">Hoe wil je je aanvraag ontvangen?</legend>

      <RadioButton id="rb-email" name="delivery" value="email" checked={delivery === 'email'} onChange={handleChange} />
      <FormLabel type="radio" htmlFor="rb-email">
        E-mail
      </FormLabel>

      <RadioButton id="rb-post" name="delivery" value="post" checked={delivery === 'post'} onChange={handleChange} />
      <FormLabel type="radio" htmlFor="rb-post">
        Per post
      </FormLabel>
    </Fieldset>
  );
}
\`\`\`

The component is wrapped in \`forwardRef\` and forwards the ref straight to the \`<input>\`; any prop it does not consume is spread onto that input. Registering that ref (react-hook-form's \`register('delivery')\`, Formik, or a plain \`.focus()\`) is the React answer to Angular's \`[control]\` / \`[(ngModel)]\`. For uncontrolled groups use \`defaultChecked\` on one button and read the value from the surrounding \`<form>\` on submit.

\`ariaLabel\` / \`ariaDescribedBy\` become the real DOM attributes \`aria-label\` / \`aria-describedby\`.

Props: \`invalid?: boolean\` (adds \`aria-invalid="true"\` and \`utrecht-radio-button--invalid\`), plus every native input attribute except \`type\` (fixed to \`"radio"\`) — \`name\`, \`value\`, \`checked\`, \`defaultChecked\`, \`onChange\`, \`id\`, \`required\`, \`disabled\`, \`className\`, \`aria-*\`, … \`RadioButtonProps\` is exported as a type alias.`;

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
