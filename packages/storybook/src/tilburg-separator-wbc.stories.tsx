/* @license CC0-1.0 */

import { TilburgWbcSeparator } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-separator.examples';

/* Stencil `<tilburg-wbc-separator>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Separator',
  id: 'tilburg-separator-wbc',
  component: TilburgWbcSeparator,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcSeparator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <p className="utrecht-paragraph">Eerste sectie met wat tekst boven de scheidingslijn.</p>
      <TilburgWbcSeparator />
      <p className="utrecht-paragraph">Tweede sectie onder de scheidingslijn.</p>
      <p className="utrecht-paragraph">Aanvraagdetails</p>
      <TilburgWbcSeparator decorative />
      <p className="utrecht-paragraph">Contactgegevens</p>
    </>
  ),
};
