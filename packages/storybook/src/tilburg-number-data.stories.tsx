/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-number-data.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-number-data.examples.ts`). The Angular
   storybook's `tilburg-number-data-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Number Data',
  id: 'tilburg-number-data',
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

export const Positive: Story = {
  name: examples.positive.name,
  render: () => <HtmlExample html={examples.positive.html} />,
};

export const Negative: Story = {
  name: examples.negative.name,
  render: () => <HtmlExample html={examples.negative.html} />,
};
