/* @license CC0-1.0 */

import { Emphasis, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-emphasis.examples';

const meta = {
  title: 'Tilburg React/Emphasis',
  id: 'tilburg-emphasis-react',
  component: Emphasis,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Emphasis>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Stressed: Story = {
  name: 'Stressed (em)',
  render: () => (
    <Paragraph>
      Je kunt je aanvraag <Emphasis>niet</Emphasis> meer wijzigen nadat je hem hebt verstuurd.
    </Paragraph>
  ),
};

export const Strong: Story = {
  render: () => (
    <Paragraph>
      Je afspraak staat vast. <Emphasis strong>Neem je identiteitsbewijs mee</Emphasis>, anders kunnen we je niet
      helpen.
    </Paragraph>
  ),
};
