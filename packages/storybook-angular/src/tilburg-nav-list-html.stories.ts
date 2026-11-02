/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-nav-list.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-nav-list.examples.ts`). The React
   storybook's `tilburg-nav-list.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Nav List',
  id: 'tilburg-nav-list',
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

export const Center: Story = {
  name: examples.center.name,
  render: () => ({ template: examples.center.html }),
};
