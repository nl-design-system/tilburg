/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-spotlight-section.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-spotlight-section.examples.ts`). The Angular
   storybook's `tilburg-spotlight-section-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Spotlight Section',
  id: 'tilburg-spotlight-section',
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

export const Aside: Story = {
  name: examples.aside.name,
  render: () => <HtmlExample html={examples.aside.html} />,
};
