/* @license CC0-1.0 */

import { Article, Heading2, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Article',
  id: 'tilburg-article-react',
  component: Article,
  tags: ['autodocs'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Article>
      <Heading2>Een artikel</Heading2>
      <Paragraph>Inhoud van het artikel.</Paragraph>
      <Paragraph small>Geplaatst op 19 mei 2026.</Paragraph>
    </Article>
  ),
};
