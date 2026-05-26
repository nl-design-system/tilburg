/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg form fieldset.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fform-fieldset';

export const description = `Groups related form fields under a single legend so assistive tech announces the group label before each field. Wraps the native \`<fieldset>\` + \`<legend>\` pair with utrecht-fieldset styling.

## Usage

### Angular

\`\`\`html
<tilburg-form-fieldset ariaLabel="Persoonsgegevens">
  <legend class="utrecht-form-label">Persoonsgegevens</legend>
  <!-- form fields -->
</tilburg-form-fieldset>
\`\`\`

Inputs: \`disabled\`, \`invalid\`, \`ariaLabel\`, \`ariaLabelledby\`, \`ariaDescribedBy\`.

### Plain HTML / CSS

\`\`\`html
<fieldset class="utrecht-fieldset">
  <legend class="utrecht-form-label">Persoonsgegevens</legend>
  <!-- form fields -->
</fieldset>
\`\`\`
`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  default: {
    name: 'Default',
    html: `<fieldset class="utrecht-fieldset" style="max-width:24rem">
  <legend class="utrecht-form-label">Persoonsgegevens</legend>
  <div class="utrecht-form-field utrecht-form-field--text">
    <label class="utrecht-form-label" for="fs-naam">Naam</label>
    <input id="fs-naam" type="text" class="utrecht-textbox utrecht-textbox--html-input" />
  </div>
  <div class="utrecht-form-field utrecht-form-field--text">
    <label class="utrecht-form-label" for="fs-email">E-mailadres</label>
    <input id="fs-email" type="email" class="utrecht-textbox utrecht-textbox--html-input" />
  </div>
</fieldset>`,
  },
} satisfies Record<string, Example>;
