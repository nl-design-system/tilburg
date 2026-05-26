/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-alert.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-alert.examples.ts`). The Angular
   storybook's `tilburg-alert-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Alert',
  id: 'tilburg-alert',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const Info: Story = {
  name: examples.info.name,
  render: () => <HtmlExample html={examples.info.html} />,
};

export const Success: Story = {
  name: examples.success.name,
  render: () => <HtmlExample html={examples.success.html} />,
};

export const Warning: Story = {
  name: examples.warning.name,
  render: () => <HtmlExample html={examples.warning.html} />,
};

export const Danger: Story = {
  name: examples.danger.name,
  render: () => <HtmlExample html={examples.danger.html} />,
};

export const Closable: Story = {
  name: examples.closable.name,
  render: () => <HtmlExample html={examples.closable.html} />,
};

export const MessageOnly: Story = {
  name: examples.messageOnly.name,
  render: () => <HtmlExample html={examples.messageOnly.html} />,
};
