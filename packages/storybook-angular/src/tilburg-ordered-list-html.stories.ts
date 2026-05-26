/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-ordered-list.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-ordered-list.examples.ts`). The
   React storybook's `tilburg-ordered-list.stories.tsx` consumes the same
   source. */

const meta: Meta = {
  title: 'Tilburg HTML/Ordered List',
  id: 'tilburg-ordered-list',
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

export const ByLetter: Story = {
  name: examples.byLetter.name,
  render: () => ({ template: examples.byLetter.html }),
};
