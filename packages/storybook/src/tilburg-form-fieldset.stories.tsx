/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Form Fieldset',
  id: 'tilburg-form-fieldset',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fform-fieldset',
    docs: {
      description: {
        component: `Groups related form fields under a single legend so assistive tech announces the group label before each field. Wraps the native \`<fieldset>\` + \`<legend>\` pair with utrecht-fieldset styling.

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
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  render: () => (
    <fieldset className="utrecht-fieldset" style={{ maxWidth: '24rem' }}>
      <legend className="utrecht-form-label">Persoonsgegevens</legend>
      <div className="utrecht-form-field utrecht-form-field--text">
        <label className="utrecht-form-label" htmlFor="fs-naam">
          Naam
        </label>
        <input id="fs-naam" type="text" className="utrecht-textbox utrecht-textbox--html-input" />
      </div>
      <div className="utrecht-form-field utrecht-form-field--text">
        <label className="utrecht-form-label" htmlFor="fs-email">
          E-mailadres
        </label>
        <input id="fs-email" type="email" className="utrecht-textbox utrecht-textbox--html-input" />
      </div>
    </fieldset>
  ),
};
