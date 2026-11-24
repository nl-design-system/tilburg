/* @license CC0-1.0 */

import { TilburgCurrencyData } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-currency-data.examples';

const meta: Meta<TilburgCurrencyData> = {
  title: 'Tilburg Angular/Currency Data',
  id: 'tilburg-currency-data-angular',
  component: TilburgCurrencyData,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgCurrencyData>;

export const AllPermutations: Story = {
  render: () => ({
    template: `
      <div lang="nl">
        <tilburg-paragraph>Te betalen: <tilburg-currency-data [amount]="1234.5"></tilburg-currency-data></tilburg-paragraph>
        <tilburg-paragraph>Terug te ontvangen: <tilburg-currency-data [amount]="-85"></tilburg-currency-data></tilburg-paragraph>
        <tilburg-paragraph>Openstaand saldo: <tilburg-currency-data [amount]="0"></tilburg-currency-data></tilburg-paragraph>
        <tilburg-paragraph>In dollars (en-US): <tilburg-currency-data [amount]="-3" currency="USD" locale="en-US"></tilburg-currency-data></tilburg-paragraph>
      </div>
    `,
  }),
};
