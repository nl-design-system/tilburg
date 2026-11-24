/* @license CC0-1.0 */

import { TilburgWbcIndexCharNav } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-index-char-nav.examples';

/* Stencil `<tilburg-wbc-index-char-nav>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Index Char Nav',
  id: 'tilburg-index-char-nav-wbc',
  component: TilburgWbcIndexCharNav,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcIndexCharNav>;

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
      <TilburgWbcIndexCharNav characters={characters} currentChar="B" />
      <TilburgWbcIndexCharNav
        aria-label="Alfabetische index (kort)"
        characters={[
          { char: 'A', href: '#' },
          { char: 'B', href: '#' },
          { char: 'C', disabled: true },
        ]}
        currentChar="A"
        onTilburgCharClick={(event) => console.log('Letter aangeklikt:', event.detail.character.char)}
      />
    </div>
  ),
};
