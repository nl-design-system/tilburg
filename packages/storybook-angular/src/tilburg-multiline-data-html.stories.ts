/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-multiline-data.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-multiline-data.examples.ts`). The React
   storybook's `tilburg-multiline-data.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Multiline Data',
  id: 'tilburg-multiline-data',
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

export const Note: Story = {
  name: examples.note.name,
  render: () => ({ template: examples.note.html }),
};
