/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-drawer.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-drawer.examples.ts`). The React
   storybook's `tilburg-drawer.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Drawer',
  id: 'tilburg-drawer',
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

export const InlineEnd: Story = {
  name: examples.inlineEnd.name,
  render: () => ({ template: examples.inlineEnd.html }),
};

export const BlockStart: Story = {
  name: examples.blockStart.name,
  render: () => ({ template: examples.blockStart.html }),
};

export const BlockEnd: Story = {
  name: examples.blockEnd.name,
  render: () => ({ template: examples.blockEnd.html }),
};
