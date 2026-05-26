/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-table.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-table.examples.ts`). The Angular
   storybook's `tilburg-table-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Table',
  id: 'tilburg-table',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const Default: Story = {
  name: examples.default.name,
  render: () => <HtmlExample html={examples.default.html} />,
};

export const WithCaptionAndFooter: Story = {
  name: examples.withCaptionAndFooter.name,
  render: () => <HtmlExample html={examples.withCaptionAndFooter.html} />,
};
