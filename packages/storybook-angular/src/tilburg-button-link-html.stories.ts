/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-button-link.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-button-link.examples.ts`). The
   React storybook's `tilburg-button-link.stories.tsx` consumes the same
   source. */

const meta: Meta = {
  title: 'Tilburg HTML/Button Link',
  id: 'tilburg-button-link',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

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
