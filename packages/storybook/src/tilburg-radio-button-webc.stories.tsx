/* @license CC0-1.0 */

import { TilburgWebcFormLabel, TilburgWebcRadioButton } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-radio-button.examples';

/* Stencil `<tilburg-webc-radio-button>` rendered through its generated React
   proxy. The custom elements themselves are registered once in
   `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Radio Button',
  id: 'tilburg-radio-button-webc',
  component: TilburgWebcRadioButton,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcRadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <fieldset className="utrecht-fieldset">
        <legend className="utrecht-form-label utrecht-form-label--radio">Default group</legend>
        <TilburgWebcFormLabel type="radio">
          <TilburgWebcRadioButton name="webc-g1" value="a" checked /> A (checked)
        </TilburgWebcFormLabel>
        <TilburgWebcFormLabel type="radio">
          <TilburgWebcRadioButton name="webc-g1" value="b" /> B
        </TilburgWebcFormLabel>
        <TilburgWebcFormLabel type="radio">
          <TilburgWebcRadioButton name="webc-g1" value="c" /> C
        </TilburgWebcFormLabel>
      </fieldset>
      <fieldset className="utrecht-fieldset">
        <legend className="utrecht-form-label utrecht-form-label--radio">Disabled / required / invalid mix</legend>
        <TilburgWebcFormLabel type="radio">
          <TilburgWebcRadioButton name="webc-g2" value="x" required /> Required
        </TilburgWebcFormLabel>
        <TilburgWebcFormLabel type="radio">
          <TilburgWebcRadioButton name="webc-g2" value="y" invalid /> Invalid
        </TilburgWebcFormLabel>
        <TilburgWebcFormLabel type="radio" disabled>
          <TilburgWebcRadioButton name="webc-g2" value="z" disabled /> Disabled
        </TilburgWebcFormLabel>
      </fieldset>
    </div>
  ),
};
