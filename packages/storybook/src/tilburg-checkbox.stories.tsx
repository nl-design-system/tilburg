/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-checkbox.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-checkbox.examples.ts`). The Angular
   storybook's `tilburg-checkbox-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Checkbox',
  id: 'tilburg-checkbox',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const Unchecked: Story = {
  name: examples.unchecked.name,
  render: () => <HtmlExample html={examples.unchecked.html} />,
};

export const Checked: Story = {
  name: examples.checked.name,
  render: () => <HtmlExample html={examples.checked.html} />,
};

export const Invalid: Story = {
  name: examples.invalid.name,
  render: () => <HtmlExample html={examples.invalid.html} />,
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => <HtmlExample html={examples.disabled.html} />,
};
