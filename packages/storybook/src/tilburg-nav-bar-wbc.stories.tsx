/* @license CC0-1.0 */

import { TilburgWbcNavBar, TilburgWbcNavList } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-nav-bar.examples';

/* Stencil `<tilburg-wbc-nav-bar>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Nav Bar',
  id: 'tilburg-nav-bar-wbc',
  component: TilburgWbcNavBar,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcNavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TilburgWbcNavBar>
        <TilburgWbcNavList
          items={[
            { label: 'Home', href: '#' },
            { label: 'Wonen', href: '#', current: true },
            { label: 'Parkeren', href: '#' },
            { label: 'Afval', href: '#' },
            { label: 'Werk en inkomen', href: '#' },
          ]}
        />
      </TilburgWbcNavBar>
      <TilburgWbcNavBar aria-label="Doelgroepen">
        <TilburgWbcNavList
          center
          items={[
            { label: 'Inwoners', href: '#', current: true },
            { label: 'Ondernemers', href: '#' },
            { label: 'Bestuur', href: '#' },
          ]}
        />
      </TilburgWbcNavBar>
    </div>
  ),
};
