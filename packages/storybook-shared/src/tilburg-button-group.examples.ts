/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg button group. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fbutton-group';

export const description = `Inline cluster of related buttons (e.g. form submit + cancel). Lays out children with a consistent gap and wraps on small viewports.

## Usage

### Angular

\`\`\`html
<tilburg-button-group ariaLabel="Aanvraag verzenden">
  <tilburg-button appearance="primary-action">Bevestigen</tilburg-button>
  <tilburg-button appearance="secondary-action">Annuleren</tilburg-button>
</tilburg-button-group>
\`\`\`

Inputs: \`role\`, \`ariaLabel\`, \`ariaLabelledby\`. Project the buttons via \`<ng-content>\`.

### Plain HTML / CSS

\`\`\`html
<div class="utrecht-button-group" role="group" aria-label="Aanvraag verzenden">
  <button class="utrecht-button utrecht-button--primary-action tilburg-medium">Bevestigen</button>
  <button class="utrecht-button utrecht-button--secondary-action tilburg-medium">Annuleren</button>
</div>
\`\`\`
`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  default: {
    name: 'Primary + secondary',
    html: `<div class="utrecht-button-group" role="group" aria-label="Aanvraag verzenden">
  <button type="button" class="utrecht-button utrecht-button--primary-action tilburg-medium">Bevestigen</button>
  <button type="button" class="utrecht-button utrecht-button--secondary-action tilburg-medium">Annuleren</button>
</div>`,
  },
  three: {
    name: 'Three buttons',
    html: `<div class="utrecht-button-group" role="group" aria-label="Bestand">
  <button type="button" class="utrecht-button utrecht-button--primary-action tilburg-medium">Opslaan</button>
  <button type="button" class="utrecht-button utrecht-button--secondary-action tilburg-medium">Concept</button>
  <button type="button" class="utrecht-button utrecht-button--subtle tilburg-medium">Annuleren</button>
</div>`,
  },
} satisfies Record<string, Example>;
