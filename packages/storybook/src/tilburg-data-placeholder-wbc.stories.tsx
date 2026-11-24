/* @license CC0-1.0 */

import { TilburgWbcDataPlaceholder } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-data-placeholder.examples';

/* Stencil `<tilburg-wbc-data-placeholder>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Data Placeholder',
  id: 'tilburg-data-placeholder-wbc',
  component: TilburgWbcDataPlaceholder,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcDataPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <p className="utrecht-paragraph">
        Naam: <TilburgWbcDataPlaceholder />
      </p>
      <div aria-busy="true">
        <p className="utrecht-paragraph">
          Adres: <TilburgWbcDataPlaceholder loading />
        </p>
      </div>
    </>
  ),
};
