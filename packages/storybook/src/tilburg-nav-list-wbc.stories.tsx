/* @license CC0-1.0 */

import { TilburgWbcNavList } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-nav-list.examples';

/* Stencil `<tilburg-wbc-nav-list>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Nav List',
  id: 'tilburg-nav-list-wbc',
  component: TilburgWbcNavList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcNavList>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { label: 'Home', href: '#' },
  { label: 'Wonen', href: '#', current: true },
  { label: 'Parkeren', href: '#' },
  { label: 'Afval', href: '#' },
];

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <nav aria-label="Onderwerpen">
        <TilburgWbcNavList items={items} />
      </nav>
      <nav aria-label="Onderwerpen gecentreerd">
        <TilburgWbcNavList items={items} center />
      </nav>
      <nav aria-label="Client-side routing">
        <TilburgWbcNavList
          items={items}
          onTilburgItemClick={(event) => {
            event.detail.event.preventDefault();
            console.log('Menu-item aangeklikt:', event.detail.item.label);
          }}
        />
      </nav>
    </div>
  ),
};
