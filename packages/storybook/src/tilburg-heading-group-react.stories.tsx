/* @license CC0-1.0 */

import { Heading1, Heading2, HeadingGroup, Paragraph, PreHeading } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-heading-group.examples';

const meta = {
  title: 'Tilburg React/Heading Group',
  id: 'tilburg-heading-group-react',
  component: HeadingGroup,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof HeadingGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HeadingGroup>
      <Heading1>Afvalkalender</Heading1>
      <PreHeading>Afval en recycling</PreHeading>
    </HeadingGroup>
  ),
};

export const Level2: Story = {
  name: 'Heading 2',
  render: () => (
    <HeadingGroup>
      <Heading2>Parkeervergunning aanvragen</Heading2>
      <PreHeading>Parkeren</PreHeading>
    </HeadingGroup>
  ),
};

export const Subtitle: Story = {
  name: 'With subtitle paragraph',
  render: () => (
    <HeadingGroup>
      <Heading1>Spoorpark</Heading1>
      <Paragraph>Het stadspark dat Tilburgers samen hebben gemaakt</Paragraph>
    </HeadingGroup>
  ),
};
