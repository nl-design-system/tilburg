/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-validation-message.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-validation-message.examples.ts`). The React
   storybook's `tilburg-validation-message.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Validation Message',
  id: 'tilburg-validation-message',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const Error: Story = {
  name: examples.error.name,
  render: () => ({ template: examples.error.html }),
};

export const Warning: Story = {
  name: examples.warning.name,
  render: () => ({ template: examples.warning.html }),
};
