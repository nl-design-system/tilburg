/* @license CC0-1.0 */

import { TilburgWbcNumberData } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-number-data.examples';

/* Stencil `<tilburg-wbc-number-data>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Number Data',
  id: 'tilburg-number-data-wbc',
  component: TilburgWbcNumberData,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcNumberData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div lang="nl">
      <p className="utrecht-paragraph">
        Aantal inwoners van Tilburg: <TilburgWbcNumberData value={226000}>226.000</TilburgWbcNumberData>
      </p>
      <p className="utrecht-paragraph">
        Groei ten opzichte van vorig jaar:{' '}
        <TilburgWbcNumberData value="1.8" variant="positive">
          +1,8%
        </TilburgWbcNumberData>
      </p>
      <p className="utrecht-paragraph">
        Verandering in restafval per inwoner:{' '}
        <TilburgWbcNumberData value="-12.4" variant="negative">
          −12,4 kg
        </TilburgWbcNumberData>
      </p>
    </div>
  ),
};
