/* @license CC0-1.0 */

import {
  TilburgWebcCheckbox,
  TilburgWebcFormLabel,
  TilburgWebcRadioButton,
  TilburgWebcTextbox,
} from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-form-label.examples';

/* Stencil `<tilburg-webc-form-label>` rendered through its generated React
   proxy. The custom elements themselves are registered once in
   `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Form Label',
  id: 'tilburg-form-label-webc',
  component: TilburgWebcFormLabel,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcFormLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div>
        <TilburgWebcFormLabel for="webc-email1">
          Default (text) <span className="tilburg-form-label__optional">(optioneel)</span>
        </TilburgWebcFormLabel>
        <TilburgWebcTextbox id="webc-email1" name="email" type="email" />
      </div>
      <TilburgWebcFormLabel type="checkbox">
        <TilburgWebcCheckbox name="agree" /> type=&quot;checkbox&quot;
      </TilburgWebcFormLabel>
      <TilburgWebcFormLabel type="checkbox" checked>
        <TilburgWebcCheckbox name="agree" checked /> type=&quot;checkbox&quot; + checked
      </TilburgWebcFormLabel>
      <TilburgWebcFormLabel type="checkbox" disabled>
        <TilburgWebcCheckbox name="agree" disabled /> type=&quot;checkbox&quot; + disabled
      </TilburgWebcFormLabel>
      <TilburgWebcFormLabel type="radio">
        <TilburgWebcRadioButton name="r" value="a" /> type=&quot;radio&quot;
      </TilburgWebcFormLabel>
    </div>
  ),
};
