/* @license CC0-1.0 */

import { TilburgWbcOrderedList } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-ordered-list.examples';

/* Stencil `<tilburg-wbc-ordered-list>` rendered through its generated React proxy. */

const meta = {
  title: 'Tilburg Web Components/Ordered List',
  id: 'tilburg-ordered-list-wbc',
  component: TilburgWbcOrderedList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcOrderedList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>Default (numeric)</h4>
        <TilburgWbcOrderedList>
          <li>Gemeente Tilburg rekenkamer</li>
          <li>Gemeente Tilburg college</li>
          <li>Gemeente Tilburg contact</li>
        </TilburgWbcOrderedList>
      </div>
      <div>
        <h4>byLetter</h4>
        <TilburgWbcOrderedList byLetter>
          <li>Eerste stap</li>
          <li>Tweede stap</li>
          <li>Derde stap</li>
        </TilburgWbcOrderedList>
      </div>
      <div>
        <h4>Nested</h4>
        <TilburgWbcOrderedList>
          <li>
            Bovenste
            <TilburgWbcOrderedList>
              <li>Geneste 1</li>
              <li>Geneste 2</li>
            </TilburgWbcOrderedList>
          </li>
          <li>Volgende</li>
        </TilburgWbcOrderedList>
      </div>
    </div>
  ),
};
