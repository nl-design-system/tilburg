/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-textbox.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-textbox.examples.ts`). The React
   storybook's `tilburg-textbox.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Textbox',
  id: 'tilburg-textbox',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: examples.default.name,
  render: () => ({ template: examples.default.html }),
};

export const Filled: Story = {
  name: examples.filled.name,
  render: () => ({ template: examples.filled.html }),
};

export const Invalid: Story = {
  name: examples.invalid.name,
  render: () => ({ template: examples.invalid.html }),
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => ({ template: examples.disabled.html }),
};
