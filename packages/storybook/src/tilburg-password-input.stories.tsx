/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-password-input.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-password-input.examples.ts`). The toggle works through the
   `enhancePasswordInput()` script, run in `config/preview.tsx`. */

const meta = {
  title: 'Tilburg HTML/Password Input',
  id: 'tilburg-password-input',
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

export const WithDescription: Story = {
  name: examples.withDescription.name,
  render: () => <HtmlExample html={examples.withDescription.html} />,
};

export const Invalid: Story = {
  name: examples.invalid.name,
  render: () => <HtmlExample html={examples.invalid.html} />,
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => <HtmlExample html={examples.disabled.html} />,
};
