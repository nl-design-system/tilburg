/* @license CC0-1.0 */

import { Code, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-code.examples';

const meta = {
  title: 'Tilburg React/Code',
  id: 'tilburg-code-react',
  component: Code,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Paragraph>
      Upload je bestand als <Code>.pdf</Code> of <Code>.jpg</Code>, maximaal 10 MB.
    </Paragraph>
  ),
};
