/* @license CC0-1.0 */

import { Mark, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-mark.examples';

const meta = {
  title: 'Tilburg React/Mark',
  id: 'tilburg-mark-react',
  component: Mark,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Mark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Paragraph>
      Openingstijden <Mark>Stadswinkel</Mark> Stadhuisplein: maandag tot en met vrijdag van 9.00 tot 17.00 uur.
    </Paragraph>
  ),
};
