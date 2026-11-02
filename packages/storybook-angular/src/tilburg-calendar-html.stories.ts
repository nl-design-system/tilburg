/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-calendar.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-calendar.examples.ts`). The React
   storybook's `tilburg-calendar.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Calendar',
  id: 'tilburg-calendar',
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

export const Selected: Story = {
  name: examples.selected.name,
  render: () => ({ template: examples.selected.html }),
};

export const MinMax: Story = {
  name: examples.minMax.name,
  render: () => ({ template: examples.minMax.html }),
};
