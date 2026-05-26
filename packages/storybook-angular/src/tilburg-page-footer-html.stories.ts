/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-page-footer.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-page-footer.examples.ts`). The React
   storybook's `tilburg-page-footer.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Page Footer',
  id: 'tilburg-page-footer',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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

export const WithPrimaryAction: Story = {
  name: examples.withPrimaryAction.name,
  render: () => ({ template: examples.withPrimaryAction.html }),
};
