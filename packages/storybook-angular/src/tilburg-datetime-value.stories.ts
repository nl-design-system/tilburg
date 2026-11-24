/* @license CC0-1.0 */

import { TilburgDatetimeValue } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-datetime-value.examples';

const meta: Meta<TilburgDatetimeValue> = {
  title: 'Tilburg Angular/Datetime Value',
  id: 'tilburg-datetime-value-angular',
  component: TilburgDatetimeValue,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgDatetimeValue>;

export const AllPermutations: Story = {
  render: () => ({
    template: `
      <div lang="nl">
        <tilburg-paragraph>Uw afspraak is op <tilburg-datetime-value dateTime="2026-11-02T09:30">2 november 2026 om 09:30</tilburg-datetime-value>.</tilburg-paragraph>
        <tilburg-paragraph>Ingediend op <tilburg-datetime-value dateTime="2026-10-12">12 oktober 2026</tilburg-datetime-value></tilburg-paragraph>
        <tilburg-paragraph>Het Stadswinkel-loket sluit om <tilburg-datetime-value dateTime="17:00">17:00 uur</tilburg-datetime-value>.</tilburg-paragraph>
      </div>
    `,
  }),
};
