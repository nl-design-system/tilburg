/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-modal.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-modal.examples.ts`). The React
   storybook's `tilburg-modal.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Modal',
  id: 'tilburg-modal',
  tags: ['autodocs', 'tilburg'],
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

export const WithLink: Story = {
  name: examples.withLink.name,
  render: () => ({ template: examples.withLink.html }),
};
