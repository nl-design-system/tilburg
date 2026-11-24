/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-data-badge.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-data-badge.examples.ts`). The React
   storybook's `tilburg-data-badge.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Data Badge',
  id: 'tilburg-data-badge',
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

export const Value: Story = {
  name: examples.value.name,
  render: () => ({ template: examples.value.html }),
};

export const DateTime: Story = {
  name: examples.dateTime.name,
  render: () => ({ template: examples.dateTime.html }),
};
