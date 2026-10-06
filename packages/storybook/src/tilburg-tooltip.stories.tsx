/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-tooltip.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup (`packages/storybook-shared/src/tilburg-tooltip.examples.ts`).
   The behaviour comes from the `enhanceTooltip()` script, run in `config/preview.tsx`. */

const meta = {
  title: 'Tilburg HTML/Tooltip',
  id: 'tilburg-tooltip',
  tags: ['tilburg'],
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

export const IconButton: Story = {
  name: examples.iconButton.name,
  render: () => <HtmlExample html={examples.iconButton.html} />,
};

export const Below: Story = {
  name: examples.below.name,
  render: () => <HtmlExample html={examples.below.html} />,
};

export const ExistingDescription: Story = {
  name: examples.existingDescription.name,
  render: () => <HtmlExample html={examples.existingDescription.html} />,
};

export const Edge: Story = {
  name: examples.edge.name,
  render: () => <HtmlExample html={examples.edge.html} />,
};
