/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-image.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-image.examples.ts`). The React
   storybook's `tilburg-image.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Image',
  id: 'tilburg-image',
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

export const Photo: Story = {
  name: examples.photo.name,
  render: () => ({ template: examples.photo.html }),
};

export const Decorative: Story = {
  name: examples.decorative.name,
  render: () => ({ template: examples.decorative.html }),
};
