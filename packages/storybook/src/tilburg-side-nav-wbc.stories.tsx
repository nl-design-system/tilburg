/* @license CC0-1.0 */

import { TilburgWbcSideNav } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-side-nav.examples';

/* Stencil `<tilburg-wbc-side-nav>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Side Nav',
  id: 'tilburg-side-nav-wbc',
  component: TilburgWbcSideNav,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcSideNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
      <TilburgWbcSideNav
        items={[
          { label: 'Afval', href: '#' },
          { label: 'Parkeren', href: '#', current: true },
          { label: 'Paspoort en ID-kaart', href: '#' },
          { label: 'Verhuizen', href: '#' },
        ]}
      />
      <TilburgWbcSideNav
        aria-label="Submenu Parkeren"
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
