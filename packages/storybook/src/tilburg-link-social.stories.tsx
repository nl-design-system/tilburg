/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-link-social.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-link-social.examples.ts`). The Angular
   storybook's `tilburg-link-social-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Link Social',
  id: 'tilburg-link-social',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionHtml } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const Single: Story = {
  name: examples.single.name,
  render: () => <HtmlExample html={examples.single.html} />,
};

export const List: Story = {
  name: examples.list.name,
  render: () => <HtmlExample html={examples.list.html} />,
};
