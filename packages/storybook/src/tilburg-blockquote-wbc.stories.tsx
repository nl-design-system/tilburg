/* @license CC0-1.0 */

import { TilburgWbcBlockquote } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-blockquote.examples';

/* Stencil `<tilburg-wbc-blockquote>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Blockquote',
  id: 'tilburg-blockquote-wbc',
  component: TilburgWbcBlockquote,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcBlockquote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TilburgWbcBlockquote>
      <p className="utrecht-paragraph">Samen maken we Tilburg een stad waar iedereen mee kan doen.</p>
    </TilburgWbcBlockquote>
  ),
};

export const WithAttribution: Story = {
  name: 'With attribution',
  render: () => (
    <TilburgWbcBlockquote attribution="Inwoner van de Reeshof">
      <p className="utrecht-paragraph">
        Dankzij de wijkregisseur wist ik precies bij wie ik terecht kon met mijn vraag.
      </p>
    </TilburgWbcBlockquote>
  ),
};
