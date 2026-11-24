/* @license CC0-1.0 */

import { SideNav } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-side-nav.examples';

const meta = {
  title: 'Tilburg React/Side Nav',
  id: 'tilburg-side-nav-react',
  component: SideNav,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
      <SideNav
        items={[
          { label: 'Afval', href: '#' },
          { label: 'Parkeren', href: '#', current: true },
          { label: 'Paspoort en ID-kaart', href: '#' },
          { label: 'Verhuizen', href: '#' },
        ]}
      />
      <SideNav
        ariaLabel="Submenu Parkeren"
        items={[
          { label: 'Afval', href: '#' },
          {
            label: 'Parkeren',
            href: '#',
            children: [
              { label: 'Bewonersvergunning', href: '#', current: true },
              { label: 'Bezoekersvergunning', href: '#' },
            ],
          },
          { label: 'Paspoort en ID-kaart', href: '#' },
        ]}
      />
    </div>
  ),
};
