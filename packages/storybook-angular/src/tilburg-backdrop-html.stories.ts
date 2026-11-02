/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-backdrop.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-backdrop.examples.ts`). The React
   storybook's `tilburg-backdrop.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Backdrop',
  id: 'tilburg-backdrop',
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

export const ReducedTransparency: Story = {
  name: examples.reducedTransparency.name,
  render: () => ({ template: examples.reducedTransparency.html }),
};
