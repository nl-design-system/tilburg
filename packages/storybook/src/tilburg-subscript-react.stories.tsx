/* @license CC0-1.0 */

import { Paragraph, Subscript } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-subscript.examples';

const meta = {
  title: 'Tilburg React/Subscript',
  id: 'tilburg-subscript-react',
  component: Subscript,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Subscript>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Paragraph>
      Tilburg wil de uitstoot van CO<Subscript>2</Subscript> in 2030 met de helft verminderen.
    </Paragraph>
  ),
};

export const OpenType: Story = {
  name: 'OpenType glyphs',
  render: () => (
    <Paragraph>
      Tilburg wil de uitstoot van CO<Subscript openType>2</Subscript> in 2030 met de helft verminderen.
    </Paragraph>
  ),
};
