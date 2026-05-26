/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-progress-bar.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-progress-bar.examples.ts`). The Angular
   storybook's `tilburg-progress-bar-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Progress Bar',
  id: 'tilburg-progress-bar',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const Quarter: Story = {
  name: examples.quarter.name,
  render: () => <HtmlExample html={examples.quarter.html} />,
};

export const Half: Story = {
  name: examples.half.name,
  render: () => <HtmlExample html={examples.half.html} />,
};

export const ThreeQuarter: Story = {
  name: examples.threeQuarter.name,
  render: () => <HtmlExample html={examples.threeQuarter.html} />,
};

export const Complete: Story = {
  name: examples.complete.name,
  render: () => <HtmlExample html={examples.complete.html} />,
};

export const WithBackLink: Story = {
  name: examples.withBackLink.name,
  render: () => <HtmlExample html={examples.withBackLink.html} />,
};
