/* @license CC0-1.0 */

import { FormFieldDescription } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Form Field Description',
  id: 'tilburg-form-field-description-react',
  component: FormFieldDescription,
  tags: ['autodocs'],
} satisfies Meta<typeof FormFieldDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <FormFieldDescription>Default — gebruik je officiële e-mailadres.</FormFieldDescription>
      <FormFieldDescription valid>Valid — ziet er goed uit.</FormFieldDescription>
      <FormFieldDescription warning>Warning — dit veld is verplicht na 1 januari.</FormFieldDescription>
      <FormFieldDescription invalid>Invalid (role=alert) — dit e-mailadres is niet geldig.</FormFieldDescription>
    </div>
  ),
};
