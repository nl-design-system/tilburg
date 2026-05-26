/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-loading-spinner.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-loading-spinner.examples.ts`). The
   Angular storybook's `tilburg-loading-spinner-html.stories.ts` consumes the
   same source. */

const meta = {
  title: 'Tilburg HTML/Loading Spinner',
  id: 'tilburg-loading-spinner',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const Visible: Story = {
  name: examples.visible.name,
  render: () => <HtmlExample html={examples.visible.html} />,
  parameters: {
    layout: 'fullscreen',
  },
};

export const SpinnerOnly: Story = {
  name: examples.spinnerOnly.name,
  render: () => <HtmlExample html={examples.spinnerOnly.html} />,
};
