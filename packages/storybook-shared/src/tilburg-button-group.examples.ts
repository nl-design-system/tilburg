/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg button group. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fbutton-group';

const intro = `Inline cluster of related buttons (e.g. form submit + cancel). Lays out children with a consistent gap and wraps on small viewports.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-button-group ariaLabel="Aanvraag verzenden">
  <tilburg-button appearance="primary-action">Bevestigen</tilburg-button>
  <tilburg-button appearance="secondary-action">Annuleren</tilburg-button>
</tilburg-button-group>
\`\`\`

Inputs: \`role\`, \`ariaLabel\`, \`ariaLabelledby\`. Project the buttons via \`<ng-content>\`.`;

const usageReact = `### React

\`\`\`tsx
import { Button, ButtonGroup } from '@gemeente-tilburg/components-react';

export function AanvraagActies() {
  return (
    <ButtonGroup aria-label="Aanvraag verzenden">
      <Button appearance="primary-action-button">Bevestigen</Button>
      <Button appearance="secondary-action-button">Annuleren</Button>
    </ButtonGroup>
  );
}
\`\`\`

Props: \`role\` (default \`'group'\` — pass \`'toolbar'\` for a toolbar cluster), plus any standard \`<div>\` attribute (\`aria-label\`, \`aria-labelledby\`, \`className\`, …). \`ButtonGroupProps\` is exported as a type alias.

Where Angular takes camelCased \`ariaLabel\` / \`ariaLabelledby\` inputs, React passes the DOM attributes straight through as \`aria-label\` / \`aria-labelledby\`. The buttons are ordinary children instead of projected \`<ng-content>\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<div class="utrecht-button-group" role="group" aria-label="Aanvraag verzenden">
  <button class="utrecht-button utrecht-button--primary-action tilburg-medium">Bevestigen</button>
  <button class="utrecht-button utrecht-button--secondary-action tilburg-medium">Annuleren</button>
</div>
\`\`\``;

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
