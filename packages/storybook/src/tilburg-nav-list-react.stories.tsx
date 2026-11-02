/* @license CC0-1.0 */

import { NavList } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-nav-list.examples';

const meta = {
  title: 'Tilburg React/Nav List',
  id: 'tilburg-nav-list-react',
  component: NavList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof NavList>;

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
        <NavList items={items} />
      </nav>
      <nav aria-label="Onderwerpen gecentreerd">
        <NavList items={items} center />
      </nav>
      <nav aria-label="Client-side routing">
        <NavList
          items={items}
          onItemClick={({ item, event }) => {
            event.preventDefault();
            console.log('Menu-item aangeklikt:', item.label);
          }}
        />
      </nav>
    </div>
  ),
};
