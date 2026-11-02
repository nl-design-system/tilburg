/* @license CC0-1.0 */

import { TilburgWbcCurrencyData } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-currency-data.examples';

/* Stencil `<tilburg-wbc-currency-data>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Currency Data',
  id: 'tilburg-currency-data-wbc',
  component: TilburgWbcCurrencyData,
  args: { amount: 1234.5 },
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcCurrencyData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <p className="utrecht-paragraph">
        Te betalen: <TilburgWbcCurrencyData amount={1234.5} />
      </p>
      <p className="utrecht-paragraph">
        Terug te ontvangen: <TilburgWbcCurrencyData amount={-85} />
      </p>
      <p className="utrecht-paragraph">
        Openstaand saldo: <TilburgWbcCurrencyData amount={0} />
      </p>
      <p className="utrecht-paragraph">
        In dollars (en-US): <TilburgWbcCurrencyData amount={-3} currency="USD" locale="en-US" />
      </p>
    </>
  ),
};
