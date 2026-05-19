/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Button Group',
  id: 'tilburg-button-group',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fbutton-group',
    docs: {
      description: {
        component: `Inline cluster of related buttons (e.g. form submit + cancel). Lays out children with a consistent gap and wraps on small viewports.

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
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Primary + secondary',
  render: () => (
    <div className="utrecht-button-group" role="group" aria-label="Aanvraag verzenden">
      <button type="button" className="utrecht-button utrecht-button--primary-action tilburg-medium">
        Bevestigen
      </button>
      <button type="button" className="utrecht-button utrecht-button--secondary-action tilburg-medium">
        Annuleren
      </button>
    </div>
  ),
};

export const Three: Story = {
  name: 'Three buttons',
  render: () => (
    <div className="utrecht-button-group" role="group" aria-label="Bestand">
      <button type="button" className="utrecht-button utrecht-button--primary-action tilburg-medium">
        Opslaan
      </button>
      <button type="button" className="utrecht-button utrecht-button--secondary-action tilburg-medium">
        Concept
      </button>
      <button type="button" className="utrecht-button utrecht-button--subtle tilburg-medium">
        Annuleren
      </button>
    </div>
  ),
};
