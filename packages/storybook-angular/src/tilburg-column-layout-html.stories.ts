/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-column-layout.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-column-layout.examples.ts`). The React
   storybook's `tilburg-column-layout.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Column Layout',
  id: 'tilburg-column-layout',
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

export const Rule: Story = {
  name: examples.rule.name,
  render: () => ({ template: examples.rule.html }),
};
