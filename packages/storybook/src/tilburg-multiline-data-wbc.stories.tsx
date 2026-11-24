/* @license CC0-1.0 */

import { TilburgWbcMultilineData } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-multiline-data.examples';

/* Stencil `<tilburg-wbc-multiline-data>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Multiline Data',
  id: 'tilburg-multiline-data-wbc',
  component: TilburgWbcMultilineData,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcMultilineData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <TilburgWbcMultilineData>{'Gemeente Tilburg\nStadhuisplein 130\n5038 TC Tilburg'}</TilburgWbcMultilineData>
  ),
};
