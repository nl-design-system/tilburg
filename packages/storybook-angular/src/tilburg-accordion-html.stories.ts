/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-accordion.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-accordion.examples.ts`). The React
   storybook's `tilburg-accordion.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Accordion',
  id: 'tilburg-accordion',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const MultipleSections: Story = {
  name: examples.multipleSections.name,
  render: () => ({ template: examples.multipleSections.html }),
};

export const WithDisabledSection: Story = {
  name: examples.withDisabledSection.name,
  render: () => ({ template: examples.withDisabledSection.html }),
};
