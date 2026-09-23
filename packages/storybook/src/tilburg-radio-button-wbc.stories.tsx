/* @license CC0-1.0 */

import { TilburgWbcFormLabel, TilburgWbcRadioButton } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-radio-button.examples';

/* Stencil `<tilburg-wbc-radio-button>` rendered through its generated React
   proxy. The custom elements themselves are registered once in
   `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Radio Button',
  id: 'tilburg-radio-button-wbc',
  component: TilburgWbcRadioButton,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcRadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <fieldset className="utrecht-fieldset">
        <legend className="utrecht-form-label utrecht-form-label--radio">Default group</legend>
        <TilburgWbcFormLabel type="radio">
          <TilburgWbcRadioButton name="wbc-g1" value="a" checked /> A (checked)
        </TilburgWbcFormLabel>
        <TilburgWbcFormLabel type="radio">
          <TilburgWbcRadioButton name="wbc-g1" value="b" /> B
        </TilburgWbcFormLabel>
        <TilburgWbcFormLabel type="radio">
          <TilburgWbcRadioButton name="wbc-g1" value="c" /> C
        </TilburgWbcFormLabel>
      </fieldset>
      <fieldset className="utrecht-fieldset">
        <legend className="utrecht-form-label utrecht-form-label--radio">Disabled / required / invalid mix</legend>
        <TilburgWbcFormLabel type="radio">
          <TilburgWbcRadioButton name="wbc-g2" value="x" required /> Required
        </TilburgWbcFormLabel>
        <TilburgWbcFormLabel type="radio">
          <TilburgWbcRadioButton name="wbc-g2" value="y" invalid /> Invalid
        </TilburgWbcFormLabel>
        <TilburgWbcFormLabel type="radio" disabled>
          <TilburgWbcRadioButton name="wbc-g2" value="z" disabled /> Disabled
        </TilburgWbcFormLabel>
      </fieldset>
    </div>
  ),
};
