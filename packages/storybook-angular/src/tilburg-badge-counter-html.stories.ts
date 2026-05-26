/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-badge-counter.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-badge-counter.examples.ts`). The
   React storybook's `tilburg-badge-counter.stories.tsx` consumes the same
   source. */

const meta: Meta = {
  title: 'Tilburg HTML/Counter Badge',
  id: 'tilburg-badge-counter',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const Single: Story = {
  name: examples.single.name,
  render: () => ({ template: examples.single.html }),
};

export const Double: Story = {
  name: examples.double.name,
  render: () => ({ template: examples.double.html }),
};

export const Triple: Story = {
  name: examples.triple.name,
  render: () => ({ template: examples.triple.html }),
};

export const Overflow: Story = {
  name: examples.overflow.name,
  render: () => ({ template: examples.overflow.html }),
};

export const InContext: Story = {
  name: examples.inContext.name,
  render: () => ({ template: examples.inContext.html }),
};
