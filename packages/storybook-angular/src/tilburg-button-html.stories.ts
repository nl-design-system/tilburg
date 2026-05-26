/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-button.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-button.examples.ts`). The React
   storybook's `tilburg-button.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Button',
  id: 'tilburg-button',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const Sizes: Story = {
  name: examples.sizes.name,
  render: () => ({ template: examples.sizes.html }),
};

export const PrimaryAction: Story = {
  name: examples.primaryAction.name,
  render: () => ({ template: examples.primaryAction.html }),
};

export const SecondaryAction: Story = {
  name: examples.secondaryAction.name,
  render: () => ({ template: examples.secondaryAction.html }),
};

export const Subtle: Story = {
  name: examples.subtle.name,
  render: () => ({ template: examples.subtle.html }),
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => ({ template: examples.disabled.html }),
};
