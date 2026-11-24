/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-blockquote.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-blockquote.examples.ts`). The React
   storybook's `tilburg-blockquote.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Blockquote',
  id: 'tilburg-blockquote',
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

export const Attribution: Story = {
  name: examples.attribution.name,
  render: () => ({ template: examples.attribution.html }),
};

export const Language: Story = {
  name: examples.language.name,
  render: () => ({ template: examples.language.html }),
};
