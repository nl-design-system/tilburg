/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Form Field Description',
  id: 'tilburg-form-field-description',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fform-field-description',
    docs: {
      description: {
        component: `Inline helper text rendered between a label and its input. Three modifier flavours: default, \`--invalid\` (error), \`--warning\`. Connect to the input via \`aria-describedby\` referencing the description's \`id\`.

## Usage

### Angular

\`\`\`html
<tilburg-form-field-description id="email-desc">
  We gebruiken dit alleen om u te bereiken.
</tilburg-form-field-description>
\`\`\`

Inputs: \`id\`, \`valid\`, \`invalid\`, \`warning\`, \`class\`.

### Plain HTML / CSS

\`\`\`html
<div id="email-desc" class="utrecht-form-field-description">
  We gebruiken dit alleen om u te bereiken.
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
  name: 'Default',
  render: () => <div className="utrecht-form-field-description">We gebruiken dit alleen om u te bereiken.</div>,
};

export const Invalid: Story = {
  name: 'Invalid (error)',
  render: () => (
    <div className="utrecht-form-field-description utrecht-form-field-description--invalid" role="alert">
      Vul een geldig e-mailadres in.
    </div>
  ),
};

export const Warning: Story = {
  name: 'Warning',
  render: () => (
    <div className="utrecht-form-field-description utrecht-form-field-description--warning">
      De aanvraagperiode sluit binnenkort.
    </div>
  ),
};
