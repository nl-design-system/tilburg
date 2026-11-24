/* @license CC0-1.0 */

import { NavBar, NavList } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-nav-bar.examples';

const meta = {
  title: 'Tilburg React/Nav Bar',
  id: 'tilburg-nav-bar-react',
  component: NavBar,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <NavBar>
        <NavList
          items={[
            { label: 'Home', href: '#' },
            { label: 'Wonen', href: '#', current: true },
            { label: 'Parkeren', href: '#' },
            { label: 'Afval', href: '#' },
            { label: 'Werk en inkomen', href: '#' },
          ]}
        />
      </NavBar>
      <NavBar ariaLabel="Doelgroepen">
        <NavList
          center
          items={[
            { label: 'Inwoners', href: '#', current: true },
            { label: 'Ondernemers', href: '#' },
            { label: 'Bestuur', href: '#' },
          ]}
        />
      </NavBar>
    </div>
  ),
};
