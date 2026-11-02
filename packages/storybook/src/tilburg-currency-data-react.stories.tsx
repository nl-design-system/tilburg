/* @license CC0-1.0 */

import { CurrencyData, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-currency-data.examples';

const meta = {
  title: 'Tilburg React/Currency Data',
  id: 'tilburg-currency-data-react',
  component: CurrencyData,
  args: { amount: 1234.5 },
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof CurrencyData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <Paragraph>
        Te betalen: <CurrencyData amount={1234.5} />
      </Paragraph>
      <Paragraph>
        Terug te ontvangen: <CurrencyData amount={-85} />
      </Paragraph>
      <Paragraph>
        Openstaand saldo: <CurrencyData amount={0} />
      </Paragraph>
      <Paragraph>
        In dollars (en-US): <CurrencyData amount={-3} currency="USD" locale="en-US" />
      </Paragraph>
    </>
  ),
};
