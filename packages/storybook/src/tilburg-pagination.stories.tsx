/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-pagination.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-pagination.examples.ts`). The Angular
   storybook's `tilburg-pagination-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Pagination',
  id: 'tilburg-pagination',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const NumericFirst: Story = {
  name: examples.numericFirst.name,
  render: () => <HtmlExample html={examples.numericFirst.html} />,
};

export const NumericMiddle: Story = {
  name: examples.numericMiddle.name,
  render: () => <HtmlExample html={examples.numericMiddle.html} />,
};

export const NumericNearEnd: Story = {
  name: examples.numericNearEnd.name,
  render: () => <HtmlExample html={examples.numericNearEnd.html} />,
};

export const NumericLast: Story = {
  name: examples.numericLast.name,
  render: () => <HtmlExample html={examples.numericLast.html} />,
};

export const NumericSmall: Story = {
  name: examples.numericSmall.name,
  render: () => <HtmlExample html={examples.numericSmall.html} />,
};

export const RangeOnly: Story = {
  name: examples.rangeOnly.name,
  render: () => <HtmlExample html={examples.rangeOnly.html} />,
};

export const NoFeedback: Story = {
  name: examples.noFeedback.name,
  render: () => <HtmlExample html={examples.noFeedback.html} />,
};
