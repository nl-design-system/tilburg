/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-table.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-table.examples.ts`). The React
   storybook's `tilburg-table.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Table',
  id: 'tilburg-table',
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

export const WithCaptionAndFooter: Story = {
  name: examples.withCaptionAndFooter.name,
  render: () => ({ template: examples.withCaptionAndFooter.html }),
};
