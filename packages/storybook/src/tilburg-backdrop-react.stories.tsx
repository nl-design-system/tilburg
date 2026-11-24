/* @license CC0-1.0 */

import { Backdrop, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-backdrop.examples';

const meta = {
  title: 'Tilburg React/Backdrop',
  id: 'tilburg-backdrop-react',
  component: Backdrop,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Backdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxInlineSize: '32rem', padding: '1rem', position: 'relative' }}>
      <Paragraph>Je aanvraag wordt verstuurd. De inhoud van het formulier is even niet te gebruiken.</Paragraph>
      <Paragraph>Sluit dit venster niet.</Paragraph>
      <Backdrop {...args} />
    </div>
  ),
};
