/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-nav-list.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-nav-list.examples.ts`). The Angular
   storybook's `tilburg-nav-list-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Nav List',
  id: 'tilburg-nav-list',
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

export const Center: Story = {
  name: examples.center.name,
  render: () => <HtmlExample html={examples.center.html} />,
};
