/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-heading-group.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-heading-group.examples.ts`). The Angular
   storybook's `tilburg-heading-group-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Heading Group',
  id: 'tilburg-heading-group',
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

export const Level2: Story = {
  name: examples.level2.name,
  render: () => <HtmlExample html={examples.level2.html} />,
};

export const Subtitle: Story = {
  name: examples.subtitle.name,
  render: () => <HtmlExample html={examples.subtitle.html} />,
};
