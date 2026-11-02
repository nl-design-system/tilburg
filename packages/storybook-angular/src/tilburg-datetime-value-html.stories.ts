/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-datetime-value.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-datetime-value.examples.ts`). The React
   storybook's `tilburg-datetime-value.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Datetime Value',
  id: 'tilburg-datetime-value',
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

export const Date: Story = {
  name: examples.date.name,
  render: () => ({ template: examples.date.html }),
};

export const Time: Story = {
  name: examples.time.name,
  render: () => ({ template: examples.time.html }),
};
