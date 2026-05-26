/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-paragraph.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-paragraph.examples.ts`). The React
   storybook's `tilburg-paragraph.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Paragraph',
  id: 'tilburg-paragraph',
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

export const Lead: Story = {
  name: examples.lead.name,
  render: () => ({ template: examples.lead.html }),
};

export const Small: Story = {
  name: examples.small.name,
  render: () => ({ template: examples.small.html }),
};
