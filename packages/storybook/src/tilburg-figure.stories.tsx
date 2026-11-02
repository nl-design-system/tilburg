/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-figure.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-figure.examples.ts`). The Angular
   storybook's `tilburg-figure-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Figure',
  id: 'tilburg-figure',
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

export const CodeSample: Story = {
  name: examples.codeSample.name,
  render: () => <HtmlExample html={examples.codeSample.html} />,
};

export const WithoutCaption: Story = {
  name: examples.withoutCaption.name,
  render: () => <HtmlExample html={examples.withoutCaption.html} />,
};
