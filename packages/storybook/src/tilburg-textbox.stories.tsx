/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-textbox.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-textbox.examples.ts`). The Angular
   storybook's `tilburg-textbox-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Textbox',
  id: 'tilburg-textbox',
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

export const Filled: Story = {
  name: examples.filled.name,
  render: () => <HtmlExample html={examples.filled.html} />,
};

export const Invalid: Story = {
  name: examples.invalid.name,
  render: () => <HtmlExample html={examples.invalid.html} />,
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => <HtmlExample html={examples.disabled.html} />,
};
