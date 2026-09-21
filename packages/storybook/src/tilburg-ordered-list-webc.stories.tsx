/* @license CC0-1.0 */

import { TilburgWebcOrderedList } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-ordered-list.examples';

/* Stencil `<tilburg-webc-ordered-list>` rendered through its generated React proxy. */

const meta = {
  title: 'Tilburg Web Components/Ordered List',
  id: 'tilburg-ordered-list-webc',
  component: TilburgWebcOrderedList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcOrderedList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>Default (numeric)</h4>
        <TilburgWebcOrderedList>
          <li>Gemeente Tilburg rekenkamer</li>
          <li>Gemeente Tilburg college</li>
          <li>Gemeente Tilburg contact</li>
        </TilburgWebcOrderedList>
      </div>
      <div>
        <h4>byLetter</h4>
        <TilburgWebcOrderedList byLetter>
          <li>Eerste stap</li>
          <li>Tweede stap</li>
          <li>Derde stap</li>
        </TilburgWebcOrderedList>
      </div>
      <div>
        <h4>Nested</h4>
        <TilburgWebcOrderedList>
          <li>
            Bovenste
            <TilburgWebcOrderedList>
              <li>Geneste 1</li>
              <li>Geneste 2</li>
            </TilburgWebcOrderedList>
          </li>
          <li>Volgende</li>
        </TilburgWebcOrderedList>
      </div>
    </div>
  ),
};
