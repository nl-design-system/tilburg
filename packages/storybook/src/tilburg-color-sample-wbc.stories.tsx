/* @license CC0-1.0 */

import { TilburgWbcColorSample } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-color-sample.examples';

/* Stencil `<tilburg-wbc-color-sample>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Color Sample',
  id: 'tilburg-color-sample-wbc',
  component: TilburgWbcColorSample,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcColorSample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <p className="utrecht-paragraph">
        <TilburgWbcColorSample color="#00a4db" /> Blauw, hoog water
      </p>
      <p className="utrecht-paragraph">
        <TilburgWbcColorSample color="#ffd800" /> Geel, laag water
      </p>
      <p className="utrecht-paragraph">
        <TilburgWbcColorSample color="#008a6a" /> Groen, normaal peil
      </p>
    </>
  ),
};
