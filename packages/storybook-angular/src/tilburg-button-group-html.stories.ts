/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-button-group.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-button-group.examples.ts`). The
   React storybook's `tilburg-button-group.stories.tsx` consumes the same
   source. */

const meta: Meta = {
  title: 'Tilburg HTML/Button Group',
  id: 'tilburg-button-group',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: examples.default.name,
  render: () => ({ template: examples.default.html }),
};

export const Three: Story = {
  name: examples.three.name,
  render: () => ({ template: examples.three.html }),
};
