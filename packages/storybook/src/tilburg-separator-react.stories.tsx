/* @license CC0-1.0 */

import { Separator } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description } from '../../storybook-shared/src/tilburg-separator.examples';

const meta = {
  title: 'Tilburg React/Separator',
  id: 'tilburg-separator-react',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <h4>Default (semantic)</h4>
      <p>Sectie A</p>
      <Separator />
      <p>Sectie B</p>
      <h4>Decorative (aria-hidden)</h4>
      <p>Decoratief gebruik</p>
      <Separator decorative />
      <p>Geen ARIA-rol</p>
    </div>
  ),
};
