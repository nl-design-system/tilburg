/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-button.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-button.examples.ts`). The Angular
   storybook's `tilburg-button-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Button',
  id: 'tilburg-button',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const Sizes: Story = {
  name: examples.sizes.name,
  render: () => <HtmlExample html={examples.sizes.html} />,
};

export const PrimaryAction: Story = {
  name: examples.primaryAction.name,
  render: () => <HtmlExample html={examples.primaryAction.html} />,
};

export const SecondaryAction: Story = {
  name: examples.secondaryAction.name,
  render: () => <HtmlExample html={examples.secondaryAction.html} />,
};

export const Subtle: Story = {
  name: examples.subtle.name,
  render: () => <HtmlExample html={examples.subtle.html} />,
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => <HtmlExample html={examples.disabled.html} />,
};
