/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-heading-group.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-heading-group.examples.ts`). The React
   storybook's `tilburg-heading-group.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Heading Group',
  id: 'tilburg-heading-group',
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

export const Level2: Story = {
  name: examples.level2.name,
  render: () => ({ template: examples.level2.html }),
};

export const Subtitle: Story = {
  name: examples.subtitle.name,
  render: () => ({ template: examples.subtitle.html }),
};
