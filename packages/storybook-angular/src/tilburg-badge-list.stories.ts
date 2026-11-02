/* @license CC0-1.0 */

import { TilburgBadgeList } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-badge-list.examples';

const meta: Meta<TilburgBadgeList> = {
  title: 'Tilburg Angular/Badge List',
  id: 'tilburg-badge-list-angular',
  component: TilburgBadgeList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgBadgeList>;

export const AllPermutations: Story = {
  render: () => ({
    template: `
      <tilburg-badge-list>
        <tilburg-data-badge>Parkeren</tilburg-data-badge>
        <tilburg-data-badge>Afval</tilburg-data-badge>
        <tilburg-data-badge>Paspoort en ID-kaart</tilburg-data-badge>
        <tilburg-data-badge>Verhuizen</tilburg-data-badge>
      </tilburg-badge-list>
    `,
  }),
};
