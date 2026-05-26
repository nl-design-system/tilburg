/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-breadcrumb.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-breadcrumb.examples.ts`). The React
   storybook's `tilburg-breadcrumb.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Breadcrumb',
  id: 'tilburg-breadcrumb',
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

export const TwoLevels: Story = {
  name: examples.twoLevels.name,
  render: () => ({ template: examples.twoLevels.html }),
};
