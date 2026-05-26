/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-checkbox.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-checkbox.examples.ts`). The React
   storybook's `tilburg-checkbox.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Checkbox',
  id: 'tilburg-checkbox',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const Unchecked: Story = {
  name: examples.unchecked.name,
  render: () => ({ template: examples.unchecked.html }),
};

export const Checked: Story = {
  name: examples.checked.name,
  render: () => ({ template: examples.checked.html }),
};

export const Invalid: Story = {
  name: examples.invalid.name,
  render: () => ({ template: examples.invalid.html }),
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => ({ template: examples.disabled.html }),
};
