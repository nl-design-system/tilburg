/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-emphasis.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-emphasis.examples.ts`). The Angular
   storybook's `tilburg-emphasis-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Emphasis',
  id: 'tilburg-emphasis',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionHtml } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const Stressed: Story = {
  name: examples.stressed.name,
  render: () => <HtmlExample html={examples.stressed.html} />,
};

export const Strong: Story = {
  name: examples.strong.name,
  render: () => <HtmlExample html={examples.strong.html} />,
};
