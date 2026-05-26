/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, examples } from '../../storybook-shared/src/tilburg-tokens.examples';

const meta = {
  title: 'Tokens/Colors',
  id: 'tokens-colors',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    bugs,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const Reference: Story = {
  name: 'Reference',
  render: () => <HtmlExample html={examples.colors.html} />,
};
