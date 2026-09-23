/* @license CC0-1.0 */

import { TilburgWbcCheckbox, TilburgWbcFormLabel } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-checkbox.examples';

/* Stencil `<tilburg-wbc-checkbox>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Checkbox',
  id: 'tilburg-checkbox-wbc',
  component: TilburgWbcCheckbox,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <TilburgWbcFormLabel type="checkbox">
        <TilburgWbcCheckbox name="c" /> Default
      </TilburgWbcFormLabel>
      <TilburgWbcFormLabel type="checkbox" checked>
        <TilburgWbcCheckbox name="c" checked /> Checked
      </TilburgWbcFormLabel>
      <TilburgWbcFormLabel type="checkbox">
        <TilburgWbcCheckbox name="c" indeterminate /> Indeterminate
      </TilburgWbcFormLabel>
      <TilburgWbcFormLabel type="checkbox">
        <TilburgWbcCheckbox name="c" required /> Required
      </TilburgWbcFormLabel>
      <TilburgWbcFormLabel type="checkbox">
        <TilburgWbcCheckbox name="c" invalid /> Invalid
      </TilburgWbcFormLabel>
      <TilburgWbcFormLabel type="checkbox" disabled>
        <TilburgWbcCheckbox name="c" disabled /> Disabled
      </TilburgWbcFormLabel>
      <TilburgWbcFormLabel type="checkbox" disabled>
        <TilburgWbcCheckbox name="c" disabled checked /> Disabled + checked
      </TilburgWbcFormLabel>
    </div>
  ),
};
