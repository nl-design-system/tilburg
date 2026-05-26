/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-radio-button.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-radio-button.examples.ts`). The React
   storybook's `tilburg-radio-button.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Radio Button',
  id: 'tilburg-radio-button',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const Group: Story = {
  name: examples.group.name,
  render: () => ({ template: examples.group.html }),
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => ({ template: examples.disabled.html }),
};
