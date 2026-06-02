/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-combobox.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-combobox.examples.ts`). The React
   storybook's `tilburg-combobox.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Combobox',
  id: 'tilburg-combobox',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const NormalClosed: Story = {
  name: examples.normalClosed.name,
  render: () => ({ template: examples.normalClosed.html }),
};

export const NormalOpen: Story = {
  name: examples.normalOpen.name,
  render: () => ({ template: examples.normalOpen.html }),
};

export const Chiplist: Story = {
  name: examples.chiplist.name,
  render: () => ({ template: examples.chiplist.html }),
};

export const Invalid: Story = {
  name: examples.invalid.name,
  render: () => ({ template: examples.invalid.html }),
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => ({ template: examples.disabled.html }),
};
