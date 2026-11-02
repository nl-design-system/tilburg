/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-toptask-nav.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-toptask-nav.examples.ts`). The React
   storybook's `tilburg-toptask-nav.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Toptask Nav',
  id: 'tilburg-toptask-nav',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionHtml } },
  },
};

export default meta;
type Story = StoryObj;

export const Grid: Story = {
  name: examples.grid.name,
  render: () => ({ template: examples.grid.html }),
};

export const Stacked: Story = {
  name: examples.stacked.name,
  render: () => ({ template: examples.stacked.html }),
};
