/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-figure.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-figure.examples.ts`). The React
   storybook's `tilburg-figure.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Figure',
  id: 'tilburg-figure',
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

export const CodeSample: Story = {
  name: examples.codeSample.name,
  render: () => ({ template: examples.codeSample.html }),
};

export const WithoutCaption: Story = {
  name: examples.withoutCaption.name,
  render: () => ({ template: examples.withoutCaption.html }),
};
