/* @license CC0-1.0 */

import { TilburgDataList } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-data-list.examples';

const meta: Meta<TilburgDataList> = {
  title: 'Tilburg Angular/Data List',
  id: 'tilburg-data-list-angular',
  component: TilburgDataList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgDataList>;

const SAMPLE_ITEMS_TEMPLATE = `
  <tilburg-data-list-item>
    <tilburg-data-list-key>Voornaam</tilburg-data-list-key>
    <tilburg-data-list-value>John</tilburg-data-list-value>
  </tilburg-data-list-item>
  <tilburg-data-list-item>
    <tilburg-data-list-key>Achternaam</tilburg-data-list-key>
    <tilburg-data-list-value>Doe</tilburg-data-list-value>
  </tilburg-data-list-item>
  <tilburg-data-list-item>
    <tilburg-data-list-key>Adres</tilburg-data-list-key>
    <tilburg-data-list-value>Stadhuisplein 130, 5038 TC Tilburg</tilburg-data-list-value>
  </tilburg-data-list-item>
  <tilburg-data-list-item>
    <tilburg-data-list-key>Geboortedatum</tilburg-data-list-key>
    <tilburg-data-list-value>12 mei 1985</tilburg-data-list-value>
  </tilburg-data-list-item>
`;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `<tilburg-data-list style="max-width:32rem;display:block">${SAMPLE_ITEMS_TEMPLATE}</tilburg-data-list>`,
  }),
};

export const Large: Story = {
  name: 'Large (3-column grid)',
  render: () => ({
    template: `<tilburg-data-list [large]="true">${SAMPLE_ITEMS_TEMPLATE}</tilburg-data-list>`,
  }),
};
