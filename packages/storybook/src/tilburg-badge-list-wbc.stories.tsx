/* @license CC0-1.0 */

import { TilburgWbcBadgeList, TilburgWbcDataBadge } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-badge-list.examples';

/* Stencil `<tilburg-wbc-badge-list>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Badge List',
  id: 'tilburg-badge-list-wbc',
  component: TilburgWbcBadgeList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcBadgeList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <TilburgWbcBadgeList>
      <TilburgWbcDataBadge>Parkeren</TilburgWbcDataBadge>
      <TilburgWbcDataBadge>Afval</TilburgWbcDataBadge>
      <TilburgWbcDataBadge>Paspoort en ID-kaart</TilburgWbcDataBadge>
      <TilburgWbcDataBadge>Verhuizen</TilburgWbcDataBadge>
    </TilburgWbcBadgeList>
  ),
};
