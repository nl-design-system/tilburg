/* @license CC0-1.0 */

import { TilburgWbcPreserveData } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-preserve-data.examples';

/* Stencil `<tilburg-wbc-preserve-data>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Preserve Data',
  id: 'tilburg-preserve-data-wbc',
  component: TilburgWbcPreserveData,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcPreserveData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <p className="utrecht-paragraph">
        Uw naam: <TilburgWbcPreserveData>J. de Vries</TilburgWbcPreserveData>
      </p>
      <p className="utrecht-paragraph">
        Postcode: <TilburgWbcPreserveData value="5038 AB">5038 AB</TilburgWbcPreserveData>
      </p>
      <p className="utrecht-paragraph">
        Geboortedatum: <TilburgWbcPreserveData dateTime="2026-05-19">19 mei 2026</TilburgWbcPreserveData>
      </p>
    </>
  ),
};
