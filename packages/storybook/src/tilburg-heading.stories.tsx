/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Heading',
  id: 'tilburg-heading',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fheading',
    docs: {
      description: {
        component:
          'Headings 1–6 use Tilburg responsive font-size tokens: a large-viewport size by default and a small-viewport size below 768px.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllLevels: Story = {
  name: 'All six levels',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <h1 className="utrecht-heading-1">Heading 1 — Tilburg</h1>
      <h2 className="utrecht-heading-2">Heading 2 — Tilburg</h2>
      <h3 className="utrecht-heading-3">Heading 3 — Tilburg</h3>
      <h4 className="utrecht-heading-4">Heading 4 — Tilburg</h4>
      <h5 className="utrecht-heading-5">Heading 5 — Tilburg</h5>
      <h6 className="utrecht-heading-6">Heading 6 — Tilburg</h6>
    </div>
  ),
};
