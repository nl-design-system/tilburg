/* @license CC0-1.0 */

import { UnorderedList } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Unordered List',
  id: 'tilburg-unordered-list-react',
  component: UnorderedList,
  tags: ['autodocs'],
} satisfies Meta<typeof UnorderedList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>Default</h4>
        <UnorderedList>
          <li>Eerste</li>
          <li>Tweede</li>
          <li>Derde</li>
        </UnorderedList>
      </div>
      <div>
        <h4>Nested</h4>
        <UnorderedList>
          <li>
            Bovenste
            <UnorderedList>
              <li>Geneste 1</li>
              <li>Geneste 2</li>
            </UnorderedList>
          </li>
          <li>Volgende</li>
        </UnorderedList>
      </div>
    </div>
  ),
};
