/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-pagination.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-pagination.examples.ts`). The React
   storybook's `tilburg-pagination.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Pagination',
  id: 'tilburg-pagination',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const NumericFirst: Story = {
  name: examples.numericFirst.name,
  render: () => ({ template: examples.numericFirst.html }),
};

export const NumericMiddle: Story = {
  name: examples.numericMiddle.name,
  render: () => ({ template: examples.numericMiddle.html }),
};

export const NumericNearEnd: Story = {
  name: examples.numericNearEnd.name,
  render: () => ({ template: examples.numericNearEnd.html }),
};

export const NumericLast: Story = {
  name: examples.numericLast.name,
  render: () => ({ template: examples.numericLast.html }),
};

export const NumericSmall: Story = {
  name: examples.numericSmall.name,
  render: () => ({ template: examples.numericSmall.html }),
};

export const RangeOnly: Story = {
  name: examples.rangeOnly.name,
  render: () => ({ template: examples.rangeOnly.html }),
};

export const NoFeedback: Story = {
  name: examples.noFeedback.name,
  render: () => ({ template: examples.noFeedback.html }),
};
