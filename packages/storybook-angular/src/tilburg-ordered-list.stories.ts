/* @license CC0-1.0 */

import { TilburgOrderedList } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-ordered-list.examples';

const meta: Meta<TilburgOrderedList> = {
  title: 'Tilburg Angular/Ordered List',
  id: 'tilburg-ordered-list-angular',
  component: TilburgOrderedList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgOrderedList>;

export const Default: Story = {
  name: 'Default (decimal)',
  render: () => ({
    template: `
      <tilburg-ordered-list>
        <li class="utrecht-ordered-list__item">Gemeente Tilburg rekenkamer</li>
        <li class="utrecht-ordered-list__item">Gemeente Tilburg college</li>
        <li class="utrecht-ordered-list__item">Gemeente Tilburg contact</li>
      </tilburg-ordered-list>
    `,
  }),
};

export const ByLetter: Story = {
  name: 'By letter (a, b, c, …)',
  render: () => ({
    template: `
      <tilburg-ordered-list [byLetter]="true">
        <li class="utrecht-ordered-list__item">Eerste stap</li>
        <li class="utrecht-ordered-list__item">Tweede stap</li>
        <li class="utrecht-ordered-list__item">Derde stap</li>
      </tilburg-ordered-list>
    `,
  }),
};

export const Nested: Story = {
  render: () => ({
    template: `
      <tilburg-ordered-list>
        <li class="utrecht-ordered-list__item">
          Bovenste
          <tilburg-ordered-list>
            <li class="utrecht-ordered-list__item">Geneste 1</li>
            <li class="utrecht-ordered-list__item">Geneste 2</li>
          </tilburg-ordered-list>
        </li>
        <li class="utrecht-ordered-list__item">Volgende</li>
      </tilburg-ordered-list>
    `,
  }),
};
