/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-badge-status.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-badge-status.examples.ts`). The
   React storybook's `tilburg-badge-status.stories.tsx` consumes the same
   source. */

const meta: Meta = {
  title: 'Tilburg HTML/Badge Status',
  id: 'tilburg-badge-status',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const All: Story = {
  name: examples.all.name,
  render: () => ({ template: examples.all.html }),
};
