/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-icon.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-icon.examples.ts`). The Angular
   storybook's `tilburg-icon-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Icon',
  id: 'tilburg-icon',
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

export const CustomSize: Story = {
  name: examples.customSize.name,
  render: () => <HtmlExample html={examples.customSize.html} />,
};

export const InheritColor: Story = {
  name: examples.inheritColor.name,
  render: () => <HtmlExample html={examples.inheritColor.html} />,
};
