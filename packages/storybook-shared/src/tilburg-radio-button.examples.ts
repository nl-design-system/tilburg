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

\`RadioButton\` renders a bare \`<input type="radio">\`. The selected value of a group is ordinary React state that you compare against each button's \`value\`, and a single shared \`onChange\` handler writes it back.

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

The component is wrapped in \`forwardRef\` and forwards the ref straight to the \`<input>\`; any prop it does not consume is spread onto that input. That ref is what form libraries register against — react-hook-form's \`register('delivery')\`, Formik, or a plain \`.focus()\` call. For uncontrolled groups use \`defaultChecked\` on one button and read the value from the surrounding \`<form>\` on submit.

Write the native \`aria-label\` / \`aria-describedby\` attributes directly on the component; they are spread onto the \`<input>\` as-is.

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

export const descriptionHtml = `${intro}

## Usage

${usagePlainHtml}
`;

export interface Example {
  name: string;
  html: string;
}

/* No inline styles: `.utrecht-fieldset` (packages/components-css/form-fieldset)
   already strips the user-agent border/padding/margin, and the row layout of each
   option comes from `.utrecht-form-label--radio:has(> .utrecht-radio-button)` in
   `packages/components-css/radio-button/index.scss`. A label that wraps its own
   control is the canonical structure and mirrors what React's
   `<FormLabel type="radio">` renders. */
const baseClasses = 'utrecht-radio-button utrecht-radio-button--html-input';
const labelClasses = 'utrecht-form-label utrecht-form-label--radio';

export const examples = {
  group: {
    name: 'Group (one checked)',
    html: `<fieldset class="utrecht-fieldset">
  <legend class="${labelClasses}">Hoe wil je je aanvraag ontvangen?</legend>
  <label class="${labelClasses}" for="rb-email">
    <input id="rb-email" type="radio" name="delivery" value="email" class="${baseClasses}" checked />
    E-mail
  </label>
  <label class="${labelClasses}" for="rb-post">
    <input id="rb-post" type="radio" name="delivery" value="post" class="${baseClasses}" />
    Per post
  </label>
  <label class="${labelClasses}" for="rb-pickup">
    <input id="rb-pickup" type="radio" name="delivery" value="pickup" class="${baseClasses}" />
    Ophalen bij de balie
  </label>
</fieldset>`,
  },
  disabled: {
    name: 'Disabled options',
    html: `<fieldset class="utrecht-fieldset">
  <legend class="${labelClasses}">Niet beschikbaar</legend>
  <label class="${labelClasses}" for="rb-d1">
    <input id="rb-d1" type="radio" name="disabled" value="a" class="${baseClasses}" disabled />
    Disabled (unchecked)
  </label>
  <label class="${labelClasses}" for="rb-d2">
    <input id="rb-d2" type="radio" name="disabled" value="b" class="${baseClasses}" checked disabled />
    Disabled (checked)
  </label>
</fieldset>`,
  },
} satisfies Record<string, Example>;
