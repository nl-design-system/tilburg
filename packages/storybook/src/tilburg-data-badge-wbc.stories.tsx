/* @license CC0-1.0 */

import { TilburgWbcDataBadge } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-data-badge.examples';

/* Stencil `<tilburg-wbc-data-badge>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Data Badge',
  id: 'tilburg-data-badge-wbc',
  component: TilburgWbcDataBadge,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcDataBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <p className="utrecht-paragraph">
        Kenmerken van de woning: <TilburgWbcDataBadge>Energielabel A</TilburgWbcDataBadge>{' '}
        <TilburgWbcDataBadge>Tuin op het zuiden</TilburgWbcDataBadge>
      </p>
      <p className="utrecht-paragraph">
        Perceeloppervlakte: <TilburgWbcDataBadge value="259">≥ 250㎡</TilburgWbcDataBadge>
      </p>
      <p className="utrecht-paragraph">
        Uw afspraak: <TilburgWbcDataBadge dateTime="2026-12-24">24 december 2026</TilburgWbcDataBadge>, duur{' '}
        <TilburgWbcDataBadge dateTime="PT30M">30 minuten</TilburgWbcDataBadge>
      </p>
    </>
  ),
};
