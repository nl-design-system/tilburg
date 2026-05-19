/* @license CC0-1.0 */

import { Checkbox, FormLabel, RadioButton, Textbox } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Form Label',
  id: 'tilburg-form-label-react',
  component: FormLabel,
  tags: ['autodocs'],
} satisfies Meta<typeof FormLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div>
        <FormLabel htmlFor="email1">Default (text)</FormLabel>
        <Textbox id="email1" name="email" type="email" />
      </div>
      <FormLabel type="checkbox">
        <Checkbox name="agree" /> type=&quot;checkbox&quot;
      </FormLabel>
      <FormLabel type="checkbox" checked>
        <Checkbox name="agree" defaultChecked /> type=&quot;checkbox&quot; + checked
      </FormLabel>
      <FormLabel type="checkbox" disabled>
        <Checkbox name="agree" disabled /> type=&quot;checkbox&quot; + disabled
      </FormLabel>
      <FormLabel type="radio">
        <RadioButton name="r" value="a" /> type=&quot;radio&quot;
      </FormLabel>
    </div>
  ),
};
