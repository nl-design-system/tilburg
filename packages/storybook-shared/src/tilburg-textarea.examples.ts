/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg textarea. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Ftextarea';

export const description = `Multi-line text input. Tilburg layer enforces minimum block/inline size and adds hover + focus-visible rules.

## Usage

### Angular

\`\`\`html
<label class="utrecht-form-label" for="explanation">Toelichting</label>
<tilburg-textarea
  id="explanation"
  [control]="form.controls.explanation"
  placeholder="Schrijf hier je toelichting…"
  [rows]="4"
  [required]="true"
/>
\`\`\`

Inputs: \`id\`, \`control\` (\`FormControl\`), \`placeholder\`, \`rows\`, \`cols\`, \`dir\`, \`disabled\`, \`invalid\`, \`required\`, \`readonly\`, \`ariaLabel\`, \`ariaDescribedBy\`.

### Plain HTML / CSS

\`\`\`html
<label class="utrecht-form-label" for="explanation">Toelichting</label>
<textarea id="explanation" class="utrecht-textarea" placeholder="Schrijf hier je toelichting…"></textarea>
\`\`\`
`;

export interface Example {
  name: string;
  html: string;
}

const rowStyle = 'display:flex;flex-direction:column;gap:1rem;max-width:32rem';
const labelStyle = 'display:block;font-weight:700;margin-bottom:0.25rem';

export const examples = {
  default: {
    name: 'Default',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="ta-default">Toelichting</label>
  <textarea id="ta-default" class="utrecht-textarea" placeholder="Schrijf hier je toelichting…"></textarea>
</div>`,
  },
  filled: {
    name: 'With value',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="ta-filled">Toelichting</label>
  <textarea id="ta-filled" class="utrecht-textarea">Ik wil graag een afspraak maken voor de aanvraag van een nieuwe vergunning.</textarea>
</div>`,
  },
  invalid: {
    name: 'Invalid',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="ta-invalid">Toelichting</label>
  <textarea id="ta-invalid" class="utrecht-textarea" aria-invalid="true">ongeldige inhoud</textarea>
</div>`,
  },
  disabled: {
    name: 'Disabled',
    html: `<div style="${rowStyle}">
  <label class="utrecht-form-label" style="${labelStyle}" for="ta-disabled">Toelichting</label>
  <textarea id="ta-disabled" class="utrecht-textarea" disabled>Deze toelichting kan niet bewerkt worden.</textarea>
</div>`,
  },
} satisfies Record<string, Example>;
