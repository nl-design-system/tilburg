/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-link-button.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-link-button.examples.ts`). The Angular
   storybook's `tilburg-link-button-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Link Button',
  id: 'tilburg-link-button',
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

export const Inline: Story = {
  name: examples.inline.name,
  render: () => <HtmlExample html={examples.inline.html} />,
};

export const Pressed: Story = {
  name: examples.pressed.name,
  render: () => <HtmlExample html={examples.pressed.html} />,
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => <HtmlExample html={examples.disabled.html} />,
};
