/* @license CC0-1.0 */

import { OrderedList } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description } from '../../storybook-shared/src/tilburg-ordered-list.examples';

const meta = {
  title: 'Tilburg React/Ordered List',
  id: 'tilburg-ordered-list-react',
  component: OrderedList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof OrderedList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>Default (numeric)</h4>
        <OrderedList>
          <li>Eerste stap</li>
          <li>Tweede stap</li>
          <li>Derde stap</li>
        </OrderedList>
      </div>
      <div>
        <h4>byLetter</h4>
        <OrderedList byLetter>
          <li>Eerste</li>
          <li>Tweede</li>
          <li>Derde</li>
        </OrderedList>
      </div>
      <div>
        <h4>Nested</h4>
        <OrderedList>
          <li>
            Bovenste
            <OrderedList>
              <li>Geneste 1</li>
              <li>Geneste 2</li>
            </OrderedList>
          </li>
          <li>Volgende</li>
        </OrderedList>
      </div>
    </div>
  ),
};
