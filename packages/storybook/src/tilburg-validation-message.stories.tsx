/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-validation-message.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-validation-message.examples.ts`). The Angular
   storybook's `tilburg-validation-message-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Validation Message',
  id: 'tilburg-validation-message',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const Error: Story = {
  name: examples.error.name,
  render: () => <HtmlExample html={examples.error.html} />,
};

export const Warning: Story = {
  name: examples.warning.name,
  render: () => <HtmlExample html={examples.warning.html} />,
};
