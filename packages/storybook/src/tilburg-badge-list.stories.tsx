/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-badge-list.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-badge-list.examples.ts`). The Angular
   storybook's `tilburg-badge-list-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Badge List',
  id: 'tilburg-badge-list',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionHtml } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const Default: Story = {
  name: examples.default.name,
  render: () => <HtmlExample html={examples.default.html} />,
};

export const Wrapping: Story = {
  name: examples.wrapping.name,
  render: () => <HtmlExample html={examples.wrapping.html} />,
};

export const WithoutList: Story = {
  name: examples.div.name,
  render: () => <HtmlExample html={examples.div.html} />,
};
