/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-number-data.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-number-data.examples.ts`). The React
   storybook's `tilburg-number-data.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Number Data',
  id: 'tilburg-number-data',
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

export const Positive: Story = {
  name: examples.positive.name,
  render: () => ({ template: examples.positive.html }),
};

export const Negative: Story = {
  name: examples.negative.name,
  render: () => ({ template: examples.negative.html }),
};
