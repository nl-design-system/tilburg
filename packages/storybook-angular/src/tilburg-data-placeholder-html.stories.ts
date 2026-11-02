/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-data-placeholder.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-data-placeholder.examples.ts`). The React
   storybook's `tilburg-data-placeholder.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Data Placeholder',
  id: 'tilburg-data-placeholder',
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

export const Loading: Story = {
  name: examples.loading.name,
  render: () => ({ template: examples.loading.html }),
};
