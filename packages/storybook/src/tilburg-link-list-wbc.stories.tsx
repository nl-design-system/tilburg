/* @license CC0-1.0 */

import { TilburgWbcLinkList } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-link-list.examples';

/* Stencil `<tilburg-wbc-link-list>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Link List',
  id: 'tilburg-link-list-wbc',
  component: TilburgWbcLinkList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcLinkList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TilburgWbcLinkList
        aria-label="Meer over afval"
        links={[
          { label: 'Afvalkalender', href: '/afval/afvalkalender' },
          { label: 'Grofvuil laten ophalen', href: '/afval/grofvuil' },
          { label: 'Afvalscheiding in Nederland', href: 'https://www.milieucentraal.nl', external: true },
        ]}
      />
      <TilburgWbcLinkList
        aria-label="Parkeren"
        links={[
          { label: 'Parkeervergunning aanvragen', href: '/parkeren/vergunning', current: 'page' },
          { label: 'Bezoekersparkeren', href: '/parkeren/bezoekers' },
        ]}
      />
    </div>
  ),
};
