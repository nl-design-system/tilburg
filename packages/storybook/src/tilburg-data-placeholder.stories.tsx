/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-data-placeholder.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-data-placeholder.examples.ts`). The Angular
   storybook's `tilburg-data-placeholder-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Data Placeholder',
  id: 'tilburg-data-placeholder',
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

export const Loading: Story = {
  name: examples.loading.name,
  render: () => <HtmlExample html={examples.loading.html} />,
};
