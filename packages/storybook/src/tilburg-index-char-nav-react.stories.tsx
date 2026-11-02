/* @license CC0-1.0 */

import { IndexCharNav } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-index-char-nav.examples';

const meta = {
  title: 'Tilburg React/Index Char Nav',
  id: 'tilburg-index-char-nav-react',
  component: IndexCharNav,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof IndexCharNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((char) => ({
  char,
  href: '#',
  disabled: ['Q', 'X', 'Y'].includes(char),
}));

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <IndexCharNav characters={characters} currentChar="B" />
      <IndexCharNav
        ariaLabel="Alfabetische index (kort)"
        characters={[
          { char: 'A', href: '#' },
          { char: 'B', href: '#' },
          { char: 'C', disabled: true },
        ]}
        currentChar="A"
      />
    </div>
  ),
};
