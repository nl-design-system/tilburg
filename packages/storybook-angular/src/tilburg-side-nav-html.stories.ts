/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-side-nav.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-side-nav.examples.ts`). The React
   storybook's `tilburg-side-nav.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Side Nav',
  id: 'tilburg-side-nav',
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

export const WithChildren: Story = {
  name: examples.withChildren.name,
  render: () => ({ template: examples.withChildren.html }),
};
