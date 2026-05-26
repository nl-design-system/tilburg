/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-form-field-description.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-form-field-description.examples.ts`).
   The Angular storybook's `tilburg-form-field-description-html.stories.ts`
   consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Form Field Description',
  id: 'tilburg-form-field-description',
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

export const Invalid: Story = {
  name: examples.invalid.name,
  render: () => <HtmlExample html={examples.invalid.html} />,
};

export const Warning: Story = {
  name: examples.warning.name,
  render: () => <HtmlExample html={examples.warning.html} />,
};
