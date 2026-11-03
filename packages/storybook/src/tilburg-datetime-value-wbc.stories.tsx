/* @license CC0-1.0 */

import { TilburgWbcDatetimeValue } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-datetime-value.examples';

/* Stencil `<tilburg-wbc-datetime-value>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Datetime Value',
  id: 'tilburg-datetime-value-wbc',
  component: TilburgWbcDatetimeValue,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcDatetimeValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div lang="nl">
      <p className="utrecht-paragraph">
        Uw afspraak is op{' '}
        <TilburgWbcDatetimeValue dateTime="2026-11-02T09:30">2 november 2026 om 09:30</TilburgWbcDatetimeValue>.
      </p>
      <p className="utrecht-paragraph">
        Ingediend op <TilburgWbcDatetimeValue dateTime="2026-10-12">12 oktober 2026</TilburgWbcDatetimeValue>
      </p>
      <p className="utrecht-paragraph">
        Het Stadswinkel-loket sluit om <TilburgWbcDatetimeValue dateTime="17:00">17:00 uur</TilburgWbcDatetimeValue>.
      </p>
    </div>
  ),
};
