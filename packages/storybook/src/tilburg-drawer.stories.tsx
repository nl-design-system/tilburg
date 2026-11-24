/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-drawer.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-drawer.examples.ts`). The Angular
   storybook's `tilburg-drawer-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Drawer',
  id: 'tilburg-drawer',
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

export const InlineEnd: Story = {
  name: examples.inlineEnd.name,
  render: () => <HtmlExample html={examples.inlineEnd.html} />,
};

export const BlockStart: Story = {
  name: examples.blockStart.name,
  render: () => <HtmlExample html={examples.blockStart.html} />,
};

export const BlockEnd: Story = {
  name: examples.blockEnd.name,
  render: () => <HtmlExample html={examples.blockEnd.html} />,
};
