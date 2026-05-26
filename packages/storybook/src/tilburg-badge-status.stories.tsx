/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-badge-status.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-badge-status.examples.ts`). The
   Angular storybook's `tilburg-badge-status-html.stories.ts` consumes the
   same source. */

const meta = {
  title: 'Tilburg HTML/Badge Status',
  id: 'tilburg-badge-status',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const All: Story = {
  name: examples.all.name,
  render: () => <HtmlExample html={examples.all.html} />,
};
