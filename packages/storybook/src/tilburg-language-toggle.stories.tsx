/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-language-toggle.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-language-toggle.examples.ts`). The
   Angular storybook's `tilburg-language-toggle-html.stories.ts` consumes the
   same source. */

const meta = {
  title: 'Tilburg HTML/Language Toggle',
  id: 'tilburg-language-toggle',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const NLActive: Story = {
  name: examples.nlActive.name,
  render: () => <HtmlExample html={examples.nlActive.html} />,
};

export const ENActive: Story = {
  name: examples.enActive.name,
  render: () => <HtmlExample html={examples.enActive.html} />,
};
