/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-link-social.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-link-social.examples.ts`). The React
   storybook's `tilburg-link-social.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Link Social',
  id: 'tilburg-link-social',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionHtml } },
  },
};

export default meta;
type Story = StoryObj;

export const Single: Story = {
  name: examples.single.name,
  render: () => ({ template: examples.single.html }),
};

export const List: Story = {
  name: examples.list.name,
  render: () => ({ template: examples.list.html }),
};
