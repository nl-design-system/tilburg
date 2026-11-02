/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-currency-data.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-currency-data.examples.ts`). The React
   storybook's `tilburg-currency-data.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Currency Data',
  id: 'tilburg-currency-data',
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

export const Negative: Story = {
  name: examples.negative.name,
  render: () => ({ template: examples.negative.html }),
};

export const Zero: Story = {
  name: examples.zero.name,
  render: () => ({ template: examples.zero.html }),
};
