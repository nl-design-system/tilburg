/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-progress-bar.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-progress-bar.examples.ts`). The React
   storybook's `tilburg-progress-bar.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Progress Bar',
  id: 'tilburg-progress-bar',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const Quarter: Story = {
  name: examples.quarter.name,
  render: () => ({ template: examples.quarter.html }),
};

export const Half: Story = {
  name: examples.half.name,
  render: () => ({ template: examples.half.html }),
};

export const ThreeQuarter: Story = {
  name: examples.threeQuarter.name,
  render: () => ({ template: examples.threeQuarter.html }),
};

export const Complete: Story = {
  name: examples.complete.name,
  render: () => ({ template: examples.complete.html }),
};

export const WithBackLink: Story = {
  name: examples.withBackLink.name,
  render: () => ({ template: examples.withBackLink.html }),
};
