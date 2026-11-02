/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-process-steps.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-process-steps.examples.ts`). The Angular
   storybook's `tilburg-process-steps-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Process Steps',
  id: 'tilburg-process-steps',
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

export const SubSteps: Story = {
  name: examples.subSteps.name,
  render: () => <HtmlExample html={examples.subSteps.html} />,
};

export const Completed: Story = {
  name: examples.completed.name,
  render: () => <HtmlExample html={examples.completed.html} />,
};
