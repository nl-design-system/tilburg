/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-card.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-card.examples.ts`). The React
   storybook's `tilburg-card.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Card',
  id: 'tilburg-card',
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

export const Link: Story = {
  name: examples.link.name,
  render: () => ({ template: examples.link.html }),
};

export const Image: Story = {
  name: examples.image.name,
  render: () => ({ template: examples.image.html }),
};
