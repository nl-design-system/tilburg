/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-datetime-value.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-datetime-value.examples.ts`). The Angular
   storybook's `tilburg-datetime-value-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Datetime Value',
  id: 'tilburg-datetime-value',
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

export const Date: Story = {
  name: examples.date.name,
  render: () => <HtmlExample html={examples.date.html} />,
};

export const Time: Story = {
  name: examples.time.name,
  render: () => <HtmlExample html={examples.time.html} />,
};
