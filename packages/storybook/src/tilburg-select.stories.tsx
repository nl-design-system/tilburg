/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-select.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup (`packages/storybook-shared/src/tilburg-select.examples.ts`).
   The Angular storybook's `tilburg-select-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Select',
  id: 'tilburg-select',
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

export const Selected: Story = {
  name: examples.selected.name,
  render: () => <HtmlExample html={examples.selected.html} />,
};

export const Grouped: Story = {
  name: examples.grouped.name,
  render: () => <HtmlExample html={examples.grouped.html} />,
};

export const Invalid: Story = {
  name: examples.invalid.name,
  render: () => <HtmlExample html={examples.invalid.html} />,
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => <HtmlExample html={examples.disabled.html} />,
};
