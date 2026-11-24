/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-action-group.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-action-group.examples.ts`). The React
   storybook's `tilburg-action-group.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Action Group',
  id: 'tilburg-action-group',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionHtml } },
  },
};

export default meta;
type Story = StoryObj;

export const Row: Story = {
  name: examples.row.name,
  render: () => ({ template: examples.row.html }),
};

export const Column: Story = {
  name: examples.column.name,
  render: () => ({ template: examples.column.html }),
};

export const ColumnStretch: Story = {
  name: examples.columnStretch.name,
  render: () => ({ template: examples.columnStretch.html }),
};
