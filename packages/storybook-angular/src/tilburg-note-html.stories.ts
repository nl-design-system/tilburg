/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-note.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-note.examples.ts`). The React
   storybook's `tilburg-note.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Note',
  id: 'tilburg-note',
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

export const WithHeading: Story = {
  name: examples.withHeading.name,
  render: () => ({ template: examples.withHeading.html }),
};
