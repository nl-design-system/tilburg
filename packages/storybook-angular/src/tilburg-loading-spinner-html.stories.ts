/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-loading-spinner.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-loading-spinner.examples.ts`). The
   React storybook's `tilburg-loading-spinner.stories.tsx` consumes the same
   source. */

const meta: Meta = {
  title: 'Tilburg HTML/Loading Spinner',
  id: 'tilburg-loading-spinner',
  tags: ['autodocs', 'tilburg'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionHtml } },
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
