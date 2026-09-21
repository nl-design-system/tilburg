/* @license CC0-1.0 */

import { TilburgWebcCheckbox, TilburgWebcFormLabel } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-checkbox.examples';

/* Stencil `<tilburg-webc-checkbox>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Checkbox',
  id: 'tilburg-checkbox-webc',
  component: TilburgWebcCheckbox,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <TilburgWebcFormLabel type="checkbox">
        <TilburgWebcCheckbox name="c" /> Default
      </TilburgWebcFormLabel>
      <TilburgWebcFormLabel type="checkbox" checked>
        <TilburgWebcCheckbox name="c" checked /> Checked
      </TilburgWebcFormLabel>
      <TilburgWebcFormLabel type="checkbox">
        <TilburgWebcCheckbox name="c" indeterminate /> Indeterminate
      </TilburgWebcFormLabel>
      <TilburgWebcFormLabel type="checkbox">
        <TilburgWebcCheckbox name="c" required /> Required
      </TilburgWebcFormLabel>
      <TilburgWebcFormLabel type="checkbox">
        <TilburgWebcCheckbox name="c" invalid /> Invalid
      </TilburgWebcFormLabel>
      <TilburgWebcFormLabel type="checkbox" disabled>
        <TilburgWebcCheckbox name="c" disabled /> Disabled
      </TilburgWebcFormLabel>
      <TilburgWebcFormLabel type="checkbox" disabled>
        <TilburgWebcCheckbox name="c" disabled checked /> Disabled + checked
      </TilburgWebcFormLabel>
    </div>
  ),
};
