/* @license CC0-1.0 */

import { TilburgUnorderedList } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-unordered-list.examples';

const meta: Meta<TilburgUnorderedList> = {
  title: 'Tilburg Angular/Unordered List',
  id: 'tilburg-unordered-list-angular',
  component: TilburgUnorderedList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgUnorderedList>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-unordered-list>
        <li class="utrecht-unordered-list__item">
          In deze app staan niet de dagen waarop wij de wijkcontainers legen, alleen de huiscontainers (kliko's).
        </li>
        <li class="utrecht-unordered-list__item">
          Je kunt je afval gescheiden aanbieden via de kliko of de milieustraat.
        </li>
        <li class="utrecht-unordered-list__item">
          Op feestdagen kan de ophaaldag verschuiven; controleer de afvalkalender.
        </li>
      </tilburg-unordered-list>
    `,
  }),
};

export const Nested: Story = {
  name: 'Nested',
  render: () => ({
    template: `
      <tilburg-unordered-list>
        <li class="utrecht-unordered-list__item">
          Aanvragen
          <tilburg-unordered-list>
            <li class="utrecht-unordered-list__item">Vergunningen</li>
            <li class="utrecht-unordered-list__item">Subsidies</li>
          </tilburg-unordered-list>
        </li>
        <li class="utrecht-unordered-list__item">Contact</li>
      </tilburg-unordered-list>
    `,
  }),
};
