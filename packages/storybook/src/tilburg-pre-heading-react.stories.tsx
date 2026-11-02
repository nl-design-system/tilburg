/* @license CC0-1.0 */

import { Heading1, HeadingGroup, PreHeading } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-pre-heading.examples';

const meta = {
  title: 'Tilburg React/Pre Heading',
  id: 'tilburg-pre-heading-react',
  component: PreHeading,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof PreHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PreHeading>Afval en recycling</PreHeading>,
};

export const InHeadingGroup: Story = {
  name: 'In a heading group',
  render: () => (
    <HeadingGroup>
      <Heading1>Afvalkalender</Heading1>
      <PreHeading>Afval en recycling</PreHeading>
    </HeadingGroup>
  ),
};
