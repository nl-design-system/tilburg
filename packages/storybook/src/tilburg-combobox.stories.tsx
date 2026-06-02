/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-combobox.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-combobox.examples.ts`). The Angular
   storybook's `tilburg-combobox-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Combobox',
  id: 'tilburg-combobox',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const NormalClosed: Story = {
  name: examples.normalClosed.name,
  render: () => <HtmlExample html={examples.normalClosed.html} />,
};

export const NormalOpen: Story = {
  name: examples.normalOpen.name,
  render: () => <HtmlExample html={examples.normalOpen.html} />,
};

export const Chiplist: Story = {
  name: examples.chiplist.name,
  render: () => <HtmlExample html={examples.chiplist.html} />,
};

export const Invalid: Story = {
  name: examples.invalid.name,
  render: () => <HtmlExample html={examples.invalid.html} />,
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => <HtmlExample html={examples.disabled.html} />,
};
