/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-page-footer.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-page-footer.examples.ts`). The Angular
   storybook's `tilburg-page-footer-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Page Footer',
  id: 'tilburg-page-footer',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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

export const WithPrimaryAction: Story = {
  name: examples.withPrimaryAction.name,
  render: () => <HtmlExample html={examples.withPrimaryAction.html} />,
};
