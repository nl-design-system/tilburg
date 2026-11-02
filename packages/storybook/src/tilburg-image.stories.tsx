/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-image.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-image.examples.ts`). The Angular
   storybook's `tilburg-image-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Image',
  id: 'tilburg-image',
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

export const Photo: Story = {
  name: examples.photo.name,
  render: () => <HtmlExample html={examples.photo.html} />,
};

export const Decorative: Story = {
  name: examples.decorative.name,
  render: () => <HtmlExample html={examples.decorative.html} />,
};
