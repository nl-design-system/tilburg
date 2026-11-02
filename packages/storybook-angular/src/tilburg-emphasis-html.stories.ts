/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-emphasis.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-emphasis.examples.ts`). The React
   storybook's `tilburg-emphasis.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Emphasis',
  id: 'tilburg-emphasis',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionHtml } },
  },
};

export default meta;
type Story = StoryObj;

export const Stressed: Story = {
  name: examples.stressed.name,
  render: () => ({ template: examples.stressed.html }),
};

export const Strong: Story = {
  name: examples.strong.name,
  render: () => ({ template: examples.strong.html }),
};
