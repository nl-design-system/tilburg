/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-form-field.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-form-field.examples.ts`). The React
   storybook's `tilburg-form-field.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Form Field',
  id: 'tilburg-form-field',
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

export const Invalid: Story = {
  name: examples.invalid.name,
  render: () => ({ template: examples.invalid.html }),
};

export const Warning: Story = {
  name: examples.warning.name,
  render: () => ({ template: examples.warning.html }),
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => ({ template: examples.disabled.html }),
};
