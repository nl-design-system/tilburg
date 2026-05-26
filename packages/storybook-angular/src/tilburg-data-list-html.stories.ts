/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-data-list.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-data-list.examples.ts`). The React
   storybook's `tilburg-data-list.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Data List',
  id: 'tilburg-data-list',
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

export const Large: Story = {
  name: examples.large.name,
  render: () => ({ template: examples.large.html }),
};
