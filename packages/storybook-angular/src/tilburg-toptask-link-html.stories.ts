/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-toptask-link.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-toptask-link.examples.ts`). The React
   storybook's `tilburg-toptask-link.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Toptask Link',
  id: 'tilburg-toptask-link',
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

export const WithoutIcon: Story = {
  name: examples.withoutIcon.name,
  render: () => ({ template: examples.withoutIcon.html }),
};
