/* @license CC0-1.0 */

import { TilburgWebcSeparator } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-separator.examples';

/* Stencil `<tilburg-webc-separator>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Separator',
  id: 'tilburg-separator-webc',
  component: TilburgWebcSeparator,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcSeparator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <p className="utrecht-paragraph">Eerste sectie met wat tekst boven de scheidingslijn.</p>
      <TilburgWebcSeparator />
      <p className="utrecht-paragraph">Tweede sectie onder de scheidingslijn.</p>
      <p className="utrecht-paragraph">Aanvraagdetails</p>
      <TilburgWebcSeparator decorative />
      <p className="utrecht-paragraph">Contactgegevens</p>
    </>
  ),
};
