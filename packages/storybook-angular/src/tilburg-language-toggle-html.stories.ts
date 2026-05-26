/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-language-toggle.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-language-toggle.examples.ts`). The
   React storybook's `tilburg-language-toggle.stories.tsx` consumes the same
   source. */

const meta: Meta = {
  title: 'Tilburg HTML/Language Toggle',
  id: 'tilburg-language-toggle',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const NLActive: Story = {
  name: examples.nlActive.name,
  render: () => ({ template: examples.nlActive.html }),
};

export const ENActive: Story = {
  name: examples.enActive.name,
  render: () => ({ template: examples.enActive.html }),
};
