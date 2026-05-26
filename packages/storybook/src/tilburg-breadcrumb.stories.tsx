/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-breadcrumb.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-breadcrumb.examples.ts`). The Angular
   storybook's `tilburg-breadcrumb-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Breadcrumb',
  id: 'tilburg-breadcrumb',
  tags: ['autodocs'],
  parameters: {
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

export const TwoLevels: Story = {
  name: examples.twoLevels.name,
  render: () => <HtmlExample html={examples.twoLevels.html} />,
};
