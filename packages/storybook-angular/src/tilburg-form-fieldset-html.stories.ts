/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-form-fieldset.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-form-fieldset.examples.ts`). The
   React storybook's `tilburg-form-fieldset.stories.tsx` consumes the same
   source. */

const meta: Meta = {
  title: 'Tilburg HTML/Form Fieldset',
  id: 'tilburg-form-fieldset',
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
