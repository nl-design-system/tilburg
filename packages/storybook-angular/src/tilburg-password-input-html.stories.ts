/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-password-input.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-password-input.examples.ts`). The toggle works through the
   `enhancePasswordInput()` script, run in `.storybook/preview.ts`. */

const meta: Meta = {
  title: 'Tilburg HTML/Password Input',
  id: 'tilburg-password-input',
  tags: ['!autodocs', 'tilburg'],
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

export const WithDescription: Story = {
  name: examples.withDescription.name,
  render: () => ({ template: examples.withDescription.html }),
};

export const Invalid: Story = {
  name: examples.invalid.name,
  render: () => ({ template: examples.invalid.html }),
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => ({ template: examples.disabled.html }),
};
