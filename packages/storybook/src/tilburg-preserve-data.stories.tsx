/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-preserve-data.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-preserve-data.examples.ts`). The Angular
   storybook's `tilburg-preserve-data-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Preserve Data',
  id: 'tilburg-preserve-data',
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

export const RightToLeft: Story = {
  name: examples.rightToLeft.name,
  render: () => <HtmlExample html={examples.rightToLeft.html} />,
};

export const Value: Story = {
  name: examples.value.name,
  render: () => <HtmlExample html={examples.value.html} />,
};

export const DateTime: Story = {
  name: examples.dateTime.name,
  render: () => <HtmlExample html={examples.dateTime.html} />,
};
