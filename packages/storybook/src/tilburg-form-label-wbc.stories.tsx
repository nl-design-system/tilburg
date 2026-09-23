/* @license CC0-1.0 */

import {
  TilburgWbcCheckbox,
  TilburgWbcFormLabel,
  TilburgWbcRadioButton,
  TilburgWbcTextbox,
} from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-form-label.examples';

/* Stencil `<tilburg-wbc-form-label>` rendered through its generated React
   proxy. The custom elements themselves are registered once in
   `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Form Label',
  id: 'tilburg-form-label-wbc',
  component: TilburgWbcFormLabel,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcFormLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div>
        <TilburgWbcFormLabel for="wbc-email1">
          Default (text) <span className="tilburg-form-label__optional">(optioneel)</span>
        </TilburgWbcFormLabel>
        <TilburgWbcTextbox id="wbc-email1" name="email" type="email" />
      </div>
      <TilburgWbcFormLabel type="checkbox">
        <TilburgWbcCheckbox name="agree" /> type=&quot;checkbox&quot;
      </TilburgWbcFormLabel>
      <TilburgWbcFormLabel type="checkbox" checked>
        <TilburgWbcCheckbox name="agree" checked /> type=&quot;checkbox&quot; + checked
      </TilburgWbcFormLabel>
      <TilburgWbcFormLabel type="checkbox" disabled>
        <TilburgWbcCheckbox name="agree" disabled /> type=&quot;checkbox&quot; + disabled
      </TilburgWbcFormLabel>
      <TilburgWbcFormLabel type="radio">
        <TilburgWbcRadioButton name="r" value="a" /> type=&quot;radio&quot;
      </TilburgWbcFormLabel>
    </div>
  ),
};
