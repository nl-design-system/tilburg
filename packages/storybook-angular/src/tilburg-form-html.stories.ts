/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-form.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-form.examples.ts`). The React
   storybook's `tilburg-form.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Form',
  id: 'tilburg-form',
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

export const Labelled: Story = {
  name: examples.labelled.name,
  render: () => ({ template: examples.labelled.html }),
};
