/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-preserve-data.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-preserve-data.examples.ts`). The React
   storybook's `tilburg-preserve-data.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Preserve Data',
  id: 'tilburg-preserve-data',
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

export const RightToLeft: Story = {
  name: examples.rightToLeft.name,
  render: () => ({ template: examples.rightToLeft.html }),
};

export const Value: Story = {
  name: examples.value.name,
  render: () => ({ template: examples.value.html }),
};

export const DateTime: Story = {
  name: examples.dateTime.name,
  render: () => ({ template: examples.dateTime.html }),
};
