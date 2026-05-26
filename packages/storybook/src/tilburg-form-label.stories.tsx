/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-form-label.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-form-label.examples.ts`). The
   Angular storybook's `tilburg-form-label-html.stories.ts` consumes the
   same source. */

const meta = {
  title: 'Tilburg HTML/Form Label',
  id: 'tilburg-form-label',
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

export const WithOptional: Story = {
  name: examples.withOptional.name,
  render: () => <HtmlExample html={examples.withOptional.html} />,
};

export const RadioLabel: Story = {
  name: examples.radioLabel.name,
  render: () => <HtmlExample html={examples.radioLabel.html} />,
};

export const CheckboxLabel: Story = {
  name: examples.checkboxLabel.name,
  render: () => <HtmlExample html={examples.checkboxLabel.html} />,
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => <HtmlExample html={examples.disabled.html} />,
};
