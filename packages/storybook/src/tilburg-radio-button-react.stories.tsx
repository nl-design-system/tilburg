/* @license CC0-1.0 */

import { Fieldset, FormLabel, RadioButton } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Radio Button',
  id: 'tilburg-radio-button-react',
  component: RadioButton,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Fieldset>
        <legend>Default group</legend>
        <FormLabel type="radio">
          <RadioButton name="g1" value="a" defaultChecked /> A (checked)
        </FormLabel>
        <FormLabel type="radio">
          <RadioButton name="g1" value="b" /> B
        </FormLabel>
        <FormLabel type="radio">
          <RadioButton name="g1" value="c" /> C
        </FormLabel>
      </Fieldset>
      <Fieldset>
        <legend>Disabled / required / invalid mix</legend>
        <FormLabel type="radio">
          <RadioButton name="g2" value="x" required /> Required
        </FormLabel>
        <FormLabel type="radio">
          <RadioButton name="g2" value="y" invalid /> Invalid
        </FormLabel>
        <FormLabel type="radio" disabled>
          <RadioButton name="g2" value="z" disabled /> Disabled
        </FormLabel>
      </Fieldset>
    </div>
  ),
};
