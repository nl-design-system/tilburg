/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-spotlight-section.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-spotlight-section.examples.ts`). The React
   storybook's `tilburg-spotlight-section.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Spotlight Section',
  id: 'tilburg-spotlight-section',
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

export const Info: Story = {
  name: examples.info.name,
  render: () => ({ template: examples.info.html }),
};

export const Success: Story = {
  name: examples.success.name,
  render: () => ({ template: examples.success.html }),
};

export const Warning: Story = {
  name: examples.warning.name,
  render: () => ({ template: examples.warning.html }),
};

export const Danger: Story = {
  name: examples.danger.name,
  render: () => ({ template: examples.danger.html }),
};

export const Aside: Story = {
  name: examples.aside.name,
  render: () => ({ template: examples.aside.html }),
};
