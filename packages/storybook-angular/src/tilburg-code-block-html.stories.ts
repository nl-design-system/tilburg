/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-code-block.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-code-block.examples.ts`). The React
   storybook's `tilburg-code-block.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Code Block',
  id: 'tilburg-code-block',
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

export const Multiline: Story = {
  name: examples.multiline.name,
  render: () => ({ template: examples.multiline.html }),
};
