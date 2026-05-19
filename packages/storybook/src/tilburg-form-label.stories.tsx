/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Form Label',
  id: 'tilburg-form-label',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fform-label',
    docs: {
      description: {
        component: `Label for a form control, themed with \`--tilburg-form-field-label-*\` tokens. Use the \`--checkbox\` / \`--radio\` modifiers on labels that sit next to those control types. An optional \`<span class="tilburg-form-label__optional">\` addon renders a muted "(optioneel)" hint.

## Usage

### Angular

\`\`\`html
<tilburg-form-label for="email" type="text">
  E-mailadres
  <span class="tilburg-form-label__optional">(optioneel)</span>
</tilburg-form-label>
\`\`\`

Inputs: \`for\` (id of the associated input), \`type\` (\`'checkbox' | 'radio' | 'text'\`), \`disabled\`, \`checked\`.

### Plain HTML / CSS

\`\`\`html
<label class="utrecht-form-label" for="email">
  E-mailadres
  <span class="tilburg-form-label__optional">(optioneel)</span>
</label>
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
    <label className="utrecht-form-label" htmlFor="ex-default">
      Naam
    </label>
  ),
};

export const WithOptional: Story = {
  name: 'With optional addon',
  render: () => (
    <label className="utrecht-form-label" htmlFor="ex-optional">
      Telefoonnummer <span className="tilburg-form-label__optional">(optioneel)</span>
    </label>
  ),
};

export const RadioLabel: Story = {
  name: 'Radio label (--radio modifier)',
  render: () => (
    <label className="utrecht-form-label utrecht-form-label--radio" htmlFor="ex-radio">
      E-mail
    </label>
  ),
};

export const CheckboxLabel: Story = {
  name: 'Checkbox label (--checkbox modifier)',
  render: () => (
    <label className="utrecht-form-label utrecht-form-label--checkbox" htmlFor="ex-checkbox">
      Ik ga akkoord met de voorwaarden
    </label>
  ),
};

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <label className="utrecht-form-label utrecht-form-label--disabled" htmlFor="ex-disabled">
      Burgerservicenummer
    </label>
  ),
};
