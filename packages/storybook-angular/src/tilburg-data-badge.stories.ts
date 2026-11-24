/* @license CC0-1.0 */

import { TilburgDataBadge } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-data-badge.examples';

const meta: Meta<TilburgDataBadge> = {
  title: 'Tilburg Angular/Data Badge',
  id: 'tilburg-data-badge-angular',
  component: TilburgDataBadge,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgDataBadge>;

export const AllPermutations: Story = {
  render: () => ({
    template: `
      <tilburg-paragraph>
        Kenmerken van de woning: <tilburg-data-badge>Energielabel A</tilburg-data-badge>&ngsp;<tilburg-data-badge>Tuin op het zuiden</tilburg-data-badge>
      </tilburg-paragraph>
      <tilburg-paragraph>Perceeloppervlakte: <tilburg-data-badge value="259">≥ 250㎡</tilburg-data-badge></tilburg-paragraph>
      <tilburg-paragraph>
        Uw afspraak: <tilburg-data-badge dateTime="2026-12-24">24 december 2026</tilburg-data-badge>, duur
        <tilburg-data-badge dateTime="PT30M">30 minuten</tilburg-data-badge>
      </tilburg-paragraph>
    `,
  }),
};
