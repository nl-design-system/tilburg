/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-badge-list.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-badge-list.examples.ts`). The React
   storybook's `tilburg-badge-list.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Badge List',
  id: 'tilburg-badge-list',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionHtml } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: examples.default.name,
  render: () => ({ template: examples.default.html }),
};

export const Wrapping: Story = {
  name: examples.wrapping.name,
  render: () => ({ template: examples.wrapping.html }),
};
