/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-heading.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-heading.examples.ts`). The Angular
   storybook's `tilburg-heading-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Heading',
  id: 'tilburg-heading',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const AllLevels: Story = {
  name: examples.allLevels.name,
  render: () => <HtmlExample html={examples.allLevels.html} />,
};
