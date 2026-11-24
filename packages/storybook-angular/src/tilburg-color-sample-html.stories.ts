/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-color-sample.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-color-sample.examples.ts`). The React
   storybook's `tilburg-color-sample.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Color Sample',
  id: 'tilburg-color-sample',
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

export const Legend: Story = {
  name: examples.legend.name,
  render: () => ({ template: examples.legend.html }),
};
