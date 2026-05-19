/* @license CC0-1.0 */

import { Checkbox, FormLabel } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Checkbox',
  id: 'tilburg-checkbox-react',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <FormLabel type="checkbox">
        <Checkbox name="c" /> Default
      </FormLabel>
      <FormLabel type="checkbox" checked>
        <Checkbox name="c" defaultChecked /> Checked
      </FormLabel>
      <FormLabel type="checkbox">
        <Checkbox name="c" indeterminate /> Indeterminate
      </FormLabel>
      <FormLabel type="checkbox">
        <Checkbox name="c" required /> Required
      </FormLabel>
      <FormLabel type="checkbox">
        <Checkbox name="c" invalid /> Invalid
      </FormLabel>
      <FormLabel type="checkbox" disabled>
        <Checkbox name="c" disabled /> Disabled
      </FormLabel>
      <FormLabel type="checkbox" disabled>
        <Checkbox name="c" disabled defaultChecked /> Disabled + checked
      </FormLabel>
    </div>
  ),
};
