/* @license CC0-1.0 */

import { DatetimeValue, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-datetime-value.examples';

const meta = {
  title: 'Tilburg React/Datetime Value',
  id: 'tilburg-datetime-value-react',
  component: DatetimeValue,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof DatetimeValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div lang="nl">
      <Paragraph>
        Uw afspraak is op <DatetimeValue dateTime="2026-11-02T09:30">2 november 2026 om 09:30</DatetimeValue>.
      </Paragraph>
      <Paragraph>
        Ingediend op <DatetimeValue dateTime="2026-10-12">12 oktober 2026</DatetimeValue>
      </Paragraph>
      <Paragraph>
        Het Stadswinkel-loket sluit om <DatetimeValue dateTime="17:00">17:00 uur</DatetimeValue>.
      </Paragraph>
    </div>
  ),
};
