/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-index-char-nav.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-index-char-nav.examples.ts`). The React
   storybook's `tilburg-index-char-nav.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Index Char Nav',
  id: 'tilburg-index-char-nav',
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

export const Short: Story = {
  name: examples.short.name,
  render: () => ({ template: examples.short.html }),
};
