/* @license CC0-1.0 */

import { Checkbox, Fieldset, FormLabel, RadioButton } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description } from '../../storybook-shared/src/tilburg-form-fieldset.examples';

const meta = {
  title: 'Tilburg React/Fieldset',
  id: 'tilburg-form-fieldset-react',
  component: Fieldset,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Fieldset>
        <legend>Default — voorkeuren</legend>
        <FormLabel type="checkbox">
          <Checkbox name="news" /> Nieuwsbrief
        </FormLabel>
        <FormLabel type="checkbox">
          <Checkbox name="updates" /> Updates
        </FormLabel>
      </Fieldset>
      <Fieldset invalid>
        <legend>Invalid (aria-invalid=true)</legend>
        <FormLabel type="radio">
          <RadioButton name="r1" value="a" invalid /> Optie A
        </FormLabel>
        <FormLabel type="radio">
          <RadioButton name="r1" value="b" invalid /> Optie B
        </FormLabel>
      </Fieldset>
      <Fieldset disabled>
        <legend>Disabled</legend>
        <FormLabel type="checkbox" disabled>
          <Checkbox name="d1" disabled /> Niet selecteerbaar
        </FormLabel>
      </Fieldset>
    </div>
  ),
};
