/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-paragraph.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-paragraph.examples.ts`). The Angular
   storybook's `tilburg-paragraph-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Paragraph',
  id: 'tilburg-paragraph',
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

export const Lead: Story = {
  name: examples.lead.name,
  render: () => <HtmlExample html={examples.lead.html} />,
};

export const Small: Story = {
  name: examples.small.name,
  render: () => <HtmlExample html={examples.small.html} />,
};
