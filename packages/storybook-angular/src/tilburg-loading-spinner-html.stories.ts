/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-loading-spinner.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-loading-spinner.examples.ts`). The
   React storybook's `tilburg-loading-spinner.stories.tsx` consumes the same
   source. */

const meta: Meta = {
  title: 'Tilburg HTML/Loading Spinner',
  id: 'tilburg-loading-spinner',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const Visible: Story = {
  name: examples.visible.name,
  render: () => ({ template: examples.visible.html }),
  parameters: {
    layout: 'fullscreen',
  },
};

export const SpinnerOnly: Story = {
  name: examples.spinnerOnly.name,
  render: () => ({ template: examples.spinnerOnly.html }),
};
