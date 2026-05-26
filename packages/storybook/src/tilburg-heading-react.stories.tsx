/* @license CC0-1.0 */

import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description } from '../../storybook-shared/src/tilburg-heading.examples';

const meta = {
  title: 'Tilburg React/Heading',
  id: 'tilburg-heading-react',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllLevels: Story = {
  render: () => (
    <>
      <Heading1>Heading 1 — primair</Heading1>
      <Heading2>Heading 2 — sectietitel</Heading2>
      <Heading3>Heading 3 — subsectie</Heading3>
      <Heading4>Heading 4 — kleinere subsectie</Heading4>
      <Heading5>Heading 5</Heading5>
      <Heading6>Heading 6</Heading6>
    </>
  ),
};
