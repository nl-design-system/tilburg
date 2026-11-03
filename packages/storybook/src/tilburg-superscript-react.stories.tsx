/* @license CC0-1.0 */

import { Paragraph, Superscript } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-superscript.examples';

const meta = {
  title: 'Tilburg React/Superscript',
  id: 'tilburg-superscript-react',
  component: Superscript,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Superscript>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Paragraph>
      Een dakkapel aan de achterkant tot 4 m<Superscript>2</Superscript> is meestal vergunningvrij.
    </Paragraph>
  ),
};
