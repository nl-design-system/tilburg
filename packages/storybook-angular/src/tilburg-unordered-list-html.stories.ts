/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-unordered-list.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-unordered-list.examples.ts`). The React
   storybook's `tilburg-unordered-list.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Unordered List',
  id: 'tilburg-unordered-list',
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

export const Nested: Story = {
  name: examples.nested.name,
  render: () => ({ template: examples.nested.html }),
};
