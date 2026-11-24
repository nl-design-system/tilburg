/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-link-button.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-link-button.examples.ts`). The React
   storybook's `tilburg-link-button.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Link Button',
  id: 'tilburg-link-button',
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

export const Inline: Story = {
  name: examples.inline.name,
  render: () => ({ template: examples.inline.html }),
};

export const Pressed: Story = {
  name: examples.pressed.name,
  render: () => ({ template: examples.pressed.html }),
};

export const Disabled: Story = {
  name: examples.disabled.name,
  render: () => ({ template: examples.disabled.html }),
};
