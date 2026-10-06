/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-select.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup (`packages/storybook-shared/src/tilburg-select.examples.ts`).
   The React storybook's `tilburg-select.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Select',
  id: 'tilburg-select',
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

export const Selected: Story = {
  name: examples.selected.name,
  render: () => ({ template: examples.selected.html }),
};

export const Grouped: Story = {
  name: examples.grouped.name,
  render: () => ({ template: examples.grouped.html }),
};

export const Invalid: Story = {
  name: examples.invalid.name,
  render: () => ({ template: examples.invalid.html }),
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => ({ template: examples.disabled.html }),
};
