/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg form toggle (switch). Imported by both the React storybook
   (`packages/storybook`) and the Angular storybook (`packages/storybook-angular`). */

import { circleIcon } from './tilburg-validation-message.examples';

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fform-toggle';

const intro = `On/off switch for a setting that takes effect straight away ("E-mailmeldingen aan"). It is a native \`<input type="checkbox" role="switch">\`, visually hidden, with a track and thumb drawn by a \`<label>\` next to it: the browser keeps the checked state, Space toggles it, screen readers announce "switch, on/off", and it submits with its form like a checkbox. Give it a visible label with \`<label for>\`. For a choice that only applies after submitting a form, use a checkbox. Tilburg tokens set the size (48 × 24 px) and colours: blue outline and thumb when off, the form-control accent colour with a white thumb when on.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-form-label for="meldingen">E-mailmeldingen</tilburg-form-label>
<tilburg-form-toggle id="meldingen" name="meldingen" [control]="form.controls.meldingen"></tilburg-form-toggle>

<!-- without a FormControl -->
<tilburg-form-toggle id="nieuwsbrief" [checked]="nieuwsbrief" (checkChanged)="nieuwsbrief = $any($event.target).checked"></tilburg-form-toggle>
\`\`\`

Same API as \`<tilburg-checkbox>\`: bind a boolean \`FormControl\` with \`control\` (it then owns the value and the disabled state), or use \`checked\` + \`(checkChanged)\`. The \`id\` moves from the host to the inner input, so \`<label for>\` and the track label resolve to it; without an \`id\` a unique one is generated.

Inputs: \`id\`, \`control\` (\`FormControl<boolean>\`), \`name\`, \`ariaLabel\`, \`ariaLabelledBy\`, \`ariaDescribedBy\`, \`invalid\`, \`required\`, \`disabled\`, \`checked\`. Output: \`(checkChanged)\` (the native \`change\` event).`;

const usageReact = `### React

\`\`\`tsx
import { FormLabel, FormToggle } from '@gemeente-tilburg/components-react';
import { useState } from 'react';

export function Meldingen() {
  const [aan, setAan] = useState(false);
  return (
    <>
      <FormLabel htmlFor="meldingen">E-mailmeldingen</FormLabel>
      <FormToggle id="meldingen" checked={aan} onChange={(event) => setAan(event.target.checked)} />
    </>
  );
}
\`\`\`

Like \`Checkbox\`: \`checked\` + \`onChange\` for a controlled switch, \`defaultChecked\` for an uncontrolled one. The \`ref\` and every prop it does not consume go to the inner \`<input>\`, so \`{...register('meldingen')}\` (react-hook-form) works.

Props: \`invalid?: boolean\` (adds \`aria-invalid="true"\` and \`utrecht-form-toggle--invalid\`), \`id\` (generated when left out, the track label needs it), plus every native input attribute except \`type\` and \`role\` (fixed to \`checkbox\` / \`switch\`). \`className\` goes on the outer \`<div>\`. \`FormToggleProps\` is exported as a type.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<label class="utrecht-form-label" for="meldingen">E-mailmeldingen</label>
<tilburg-wbc-form-toggle id="meldingen" name="meldingen"></tilburg-wbc-form-toggle>

<script type="module">
  document.querySelector('tilburg-wbc-form-toggle').addEventListener('change', (event) => {
    console.log(event.target.checked); // the native change event of the inner <input>
  });
</script>
\`\`\`

The real \`<input type="checkbox" role="switch">\` is rendered in light DOM, so it submits with the surrounding \`<form>\` and works with \`<label for>\`. As with \`<tilburg-wbc-checkbox>\`, Angular's \`(checkChanged)\` is the native \`change\` event, which bubbles through the host, so there is no custom event.

Attributes: \`name\`, \`value\`, \`checked\` (kept in sync with user interaction and reflected to the host), \`disabled\`, \`invalid\`, \`required\`. \`id\` (generated when left out), \`title\`, \`aria-label\`, \`aria-labelledby\` and \`aria-describedby\` are moved from the host onto the inner \`<input>\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<label class="utrecht-form-label" for="meldingen">E-mailmeldingen</label>
<div class="utrecht-form-toggle utrecht-form-toggle--html-checkbox">
  <input id="meldingen" name="meldingen" type="checkbox" role="switch" class="utrecht-form-toggle__checkbox" />
  <label for="meldingen" class="utrecht-form-toggle__track utrecht-form-toggle__track--html-label">
    <span class="utrecht-form-toggle__thumb"></span>
  </label>
</div>
\`\`\`

The thumb is a \`<span>\` (utrecht uses a \`<div>\`, which is not allowed inside a \`<label>\`). The \`for\` of the track label must match the input's \`id\`, otherwise clicking the track does nothing.`;

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

export interface Example {
  name: string;
  html: string;
}

const toggle = (
  id: string,
  label: string,
  { attrs = '', modifiers = '', after = '' } = {},
) => `<div class="utrecht-form-field">
  <label class="utrecht-form-label" for="${id}">${label}</label>
  <div class="utrecht-form-toggle utrecht-form-toggle--html-checkbox${modifiers}">
    <input id="${id}" name="${id}" type="checkbox" role="switch" class="utrecht-form-toggle__checkbox"${attrs} />
    <label for="${id}" class="utrecht-form-toggle__track utrecht-form-toggle__track--html-label">
      <span class="utrecht-form-toggle__thumb"></span>
    </label>
  </div>${after}
</div>`;

export const examples = {
  default: {
    name: 'Off',
    html: toggle('toggle-off', 'E-mailmeldingen'),
  },
  checked: {
    name: 'On',
    html: toggle('toggle-on', 'Herinnering per sms', { attrs: ' checked' }),
  },
  disabled: {
    name: 'Disabled',
    html: `${toggle('toggle-disabled', 'Digitale post (niet beschikbaar)', {
      attrs: ' disabled',
      modifiers: ' utrecht-form-toggle--disabled',
    })}
${toggle('toggle-disabled-on', 'Berichtenbox (altijd aan)', {
  attrs: ' checked disabled',
  modifiers: ' utrecht-form-toggle--disabled',
})}`,
  },
  invalid: {
    name: 'Invalid',
    html: toggle('toggle-invalid', 'Ik wil meldingen ontvangen', {
      attrs: ' required aria-required="true" aria-invalid="true" aria-describedby="toggle-invalid-error"',
      modifiers: ' utrecht-form-toggle--invalid utrecht-form-toggle--required',
      after: `
  <div id="toggle-invalid-error" class="tilburg-validation-message tilburg-validation-message--error utrecht-form-field-error-message" role="alert">
    <span class="tilburg-validation-message__icon" aria-hidden="true">${circleIcon}</span>
    <span>Zet meldingen aan om verder te gaan.</span>
  </div>`,
    }),
  },
} satisfies Record<string, Example>;
