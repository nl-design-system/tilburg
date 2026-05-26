/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-alert.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-alert.examples.ts`). The React
   storybook's `tilburg-alert.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Alert',
  id: 'tilburg-alert',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

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

export const Closable: Story = {
  name: examples.closable.name,
  render: () => ({ template: examples.closable.html }),
};

export const MessageOnly: Story = {
  name: examples.messageOnly.name,
  render: () => ({ template: examples.messageOnly.html }),
};
