/* @license CC0-1.0 */

import { TilburgPreserveData } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-preserve-data.examples';

const meta: Meta<TilburgPreserveData> = {
  title: 'Tilburg Angular/Preserve Data',
  id: 'tilburg-preserve-data-angular',
  component: TilburgPreserveData,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgPreserveData>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    props: { naam: 'J.  de  Vries', postcode: '5038 AB' },
    template: `
      <tilburg-paragraph>Uw naam: <tilburg-preserve-data>{{ naam }}</tilburg-preserve-data></tilburg-paragraph>
      <tilburg-paragraph>Postcode: <tilburg-preserve-data [value]="postcode">{{ postcode }}</tilburg-preserve-data></tilburg-paragraph>
      <tilburg-paragraph>Geboortedatum: <tilburg-preserve-data dateTime="2026-05-19">19 mei 2026</tilburg-preserve-data></tilburg-paragraph>
    `,
  }),
};
