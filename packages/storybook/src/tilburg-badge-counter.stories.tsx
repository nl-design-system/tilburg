/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-badge-counter.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-badge-counter.examples.ts`). The
   Angular storybook's `tilburg-badge-counter-html.stories.ts` consumes the
   same source. */

const meta = {
  title: 'Tilburg HTML/Counter Badge',
  id: 'tilburg-badge-counter',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const Single: Story = {
  name: examples.single.name,
  render: () => <HtmlExample html={examples.single.html} />,
};

export const Double: Story = {
  name: examples.double.name,
  render: () => <HtmlExample html={examples.double.html} />,
};

export const Triple: Story = {
  name: examples.triple.name,
  render: () => <HtmlExample html={examples.triple.html} />,
};

export const Overflow: Story = {
  name: examples.overflow.name,
  render: () => <HtmlExample html={examples.overflow.html} />,
};

export const InContext: Story = {
  name: examples.inContext.name,
  render: () => <HtmlExample html={examples.inContext.html} />,
};
