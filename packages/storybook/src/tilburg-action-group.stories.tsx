/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-action-group.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-action-group.examples.ts`). The Angular
   storybook's `tilburg-action-group-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Action Group',
  id: 'tilburg-action-group',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionHtml } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const Row: Story = {
  name: examples.row.name,
  render: () => <HtmlExample html={examples.row.html} />,
};

export const Column: Story = {
  name: examples.column.name,
  render: () => <HtmlExample html={examples.column.html} />,
};

export const ColumnStretch: Story = {
  name: examples.columnStretch.name,
  render: () => <HtmlExample html={examples.columnStretch.html} />,
};
