/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-icon.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-icon.examples.ts`). The React
   storybook's `tilburg-icon.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Icon',
  id: 'tilburg-icon',
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

export const CustomSize: Story = {
  name: examples.customSize.name,
  render: () => ({ template: examples.customSize.html }),
};

export const InheritColor: Story = {
  name: examples.inheritColor.name,
  render: () => ({ template: examples.inheritColor.html }),
};
