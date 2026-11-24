/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-side-nav.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-side-nav.examples.ts`). The Angular
   storybook's `tilburg-side-nav-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Side Nav',
  id: 'tilburg-side-nav',
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

export const WithChildren: Story = {
  name: examples.withChildren.name,
  render: () => <HtmlExample html={examples.withChildren.html} />,
};
