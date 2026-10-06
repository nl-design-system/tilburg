/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg select. Imported by both the React storybook
   (`packages/storybook`) and the Angular storybook (`packages/storybook-angular`) so the HTML lives in one place. */

import { circleIcon } from './tilburg-validation-message.examples';

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fselect';

const intro = `Native \`<select>\` for choosing one option from a list. The utrecht base styles it from the form-control tokens; the Tilburg layer adds the chevron (the same one as the combobox) and the textbox hover state. In browsers that support customizable select (\`appearance: base-select\`, Chromium for now) the option list is styled like the combobox list, with the same active and selected stripes; other browsers show their own list, which works the same.

Use a select to choose **one** option from a known list (a district, a month): it works without JavaScript, gives the familiar system picker on phones and takes part in the form natively. To choose **several** options, use the combobox with \`multiple\` (removable chips); the Tilburg combobox does not filter by typing, so it is no better than a select for a single choice. An empty first option ("Maak een keuze") makes an explicit choice necessary; with \`required\` the browser then refuses to submit the form until something is chosen.`;

const usageAngular = `### Angular

\`\`\`html
<label class="utrecht-form-label" for="stadsdeel">Stadsdeel</label>
<tilburg-select
  id="stadsdeel"
  [control]="form.controls.stadsdeel"
  [options]="stadsdelen"
  placeholder="Maak een keuze"
  [required]="true"
/>
\`\`\`

\`options\` is a list of \`{ value, label, disabled? }\`. Inputs: \`id\`, \`name\`, \`control\` (\`FormControl\`), \`options\`, \`placeholder\` (renders an empty first option), \`disabled\`, \`invalid\`, \`required\`, \`ariaLabel\`, \`ariaLabelledBy\`, \`ariaDescribedBy\`. Output: \`valueChange\` (the chosen value), for use without a \`FormControl\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<label class="utrecht-form-label" for="stadsdeel">Stadsdeel</label>
<select id="stadsdeel" name="stadsdeel" class="utrecht-select utrecht-select--html-select" required>
  <option value="">Maak een keuze</option>
  <option value="centrum">Tilburg-Centrum</option>
  <option value="noord">Tilburg-Noord</option>
</select>
\`\`\`

Invalid: add \`aria-invalid="true"\` (and optionally \`utrecht-select--invalid\`). Disabled: the native \`disabled\` attribute.`;

const usageReact = `### React

\`Select\` is a styled \`<select>\`: put \`<option>\` elements inside it and bind it like any React select (\`value\` + \`onChange\`, or \`defaultValue\`).

\`\`\`tsx
import { FormLabel, Select } from '@gemeente-tilburg/components-react';

export const StadsdeelField = () => (
  <>
    <FormLabel htmlFor="stadsdeel">Stadsdeel</FormLabel>
    <Select id="stadsdeel" name="stadsdeel" defaultValue="" required>
      <option value="">Maak een keuze</option>
      <option value="centrum">Tilburg-Centrum</option>
      <option value="noord">Tilburg-Noord</option>
    </Select>
  </>
);
\`\`\`

The ref is forwarded to the \`<select>\`, and everything the component does not consume is spread onto it, so \`{...register('stadsdeel')}\` from react-hook-form works as is. Props: \`invalid?: boolean\` (adds \`aria-invalid="true"\` and \`utrecht-select--invalid\`), plus every native select attribute (\`value\`, \`defaultValue\`, \`onChange\`, \`name\`, \`id\`, \`required\`, \`disabled\`, \`className\`, \`aria-*\`, …).`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<label class="utrecht-form-label" for="stadsdeel">Stadsdeel</label>
<tilburg-wbc-select
  id="stadsdeel"
  name="stadsdeel"
  placeholder="Maak een keuze"
  required
  options='[{"value":"centrum","label":"Tilburg-Centrum"},{"value":"noord","label":"Tilburg-Noord"}]'
></tilburg-wbc-select>
\`\`\`

The real \`<select>\` is rendered in light DOM, so it takes part in the surrounding \`<form>\` and \`<label for>\` natively; listen to the native \`change\` event. \`options\` is a list of \`{ value, label, disabled? }\`, as a property or as JSON in the attribute. Attributes: \`name\`, \`value\` (kept in sync), \`options\`, \`placeholder\`, \`disabled\`, \`invalid\`, \`required\`. \`id\`, \`title\`, \`aria-label\`, \`aria-labelledby\` and \`aria-describedby\` are moved from the host onto the inner \`<select>\`.`;

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

/** The districts used as example options in every layer. */
export const stadsdelen = [
  { value: 'centrum', label: 'Tilburg-Centrum' },
  { value: 'noord', label: 'Tilburg-Noord' },
  { value: 'oost', label: 'Tilburg-Oost' },
  { value: 'west', label: 'Tilburg-West' },
  { value: 'zuid', label: 'Tilburg-Zuid' },
  { value: 'reeshof', label: 'Reeshof' },
  { value: 'berkel-enschot', label: 'Berkel-Enschot' },
  { value: 'udenhout', label: 'Udenhout' },
];

const rowStyle = 'display:flex;flex-direction:column;gap:0.25rem;max-width:24rem';

const options = (selected?: string) =>
  stadsdelen
    .map(({ value, label }) => `    <option value="${value}"${value === selected ? ' selected' : ''}>${label}</option>`)
    .join('\n');

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  default: {
    name: 'Default',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" for="select-default">Stadsdeel</label>
  <select id="select-default" name="stadsdeel" class="utrecht-select utrecht-select--html-select">
    <option value="">Maak een keuze</option>
${options()}
  </select>
</div>`,
  },
  selected: {
    name: 'With value',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" for="select-selected">Stadsdeel</label>
  <select id="select-selected" name="stadsdeel" class="utrecht-select utrecht-select--html-select">
${options('reeshof')}
  </select>
</div>`,
  },
  grouped: {
    name: 'With option groups',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" for="select-grouped">Soort afspraak</label>
  <select id="select-grouped" name="afspraak" class="utrecht-select utrecht-select--html-select">
    <optgroup label="Reisdocumenten">
      <option value="paspoort">Paspoort of ID-kaart</option>
      <option value="rijbewijs">Rijbewijs</option>
    </optgroup>
    <optgroup label="Burgerzaken">
      <option value="verhuizen">Verhuizen</option>
      <option value="uittreksel">Uittreksel of akte</option>
    </optgroup>
  </select>
</div>`,
  },
  invalid: {
    name: 'Invalid',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" for="select-invalid">Stadsdeel</label>
  <select id="select-invalid" name="stadsdeel" class="utrecht-select utrecht-select--html-select utrecht-select--invalid" aria-invalid="true" aria-describedby="select-invalid-error" required>
    <option value="">Maak een keuze</option>
${options()}
  </select>
  <div id="select-invalid-error" class="tilburg-validation-message tilburg-validation-message--error utrecht-form-field-error-message" role="alert">
    <span class="tilburg-validation-message__icon" aria-hidden="true">${circleIcon}</span>
    <span>Kies een stadsdeel.</span>
  </div>
</div>`,
  },
  disabled: {
    name: 'Disabled',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" for="select-disabled">Stadsdeel</label>
  <select id="select-disabled" name="stadsdeel" class="utrecht-select utrecht-select--html-select" disabled>
${options('centrum')}
  </select>
</div>`,
  },
} satisfies Record<string, Example>;
