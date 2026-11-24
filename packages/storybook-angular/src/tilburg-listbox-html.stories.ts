/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-listbox.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-listbox.examples.ts`). The React
   storybook's `tilburg-listbox.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Listbox',
  id: 'tilburg-listbox',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionHtml } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: examples.default.name,
  render: () => ({ template: examples.default.html }),
};

export const Active: Story = {
  name: examples.active.name,
  render: () => ({ template: examples.active.html }),
};

export const Multiple: Story = {
  name: examples.multiple.name,
  render: () => ({ template: examples.multiple.html }),
};

export const Invalid: Story = {
  name: examples.invalid.name,
  render: () => ({ template: examples.invalid.html }),
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => ({ template: examples.disabled.html }),
};
